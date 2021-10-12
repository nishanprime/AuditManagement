<?php
/**
 * WHMCS Sample Payment Callback File
 *
 * This sample file demonstrates how a payment gateway callback should be
 * handled within WHMCS.
 *
 * It demonstrates verifying that the payment gateway module is active,
 * validating an Invoice ID, checking for the existence of a Transaction ID,
 * Logging the Transaction for debugging and Adding Payment to an Invoice.
 *
 * For more information, please refer to the online documentation.
 *
 * @see https://developers.whmcs.com/payment-gateways/callbacks/
 *
 * @copyright Copyright (c) WHMCS Limited 2017
 * @license http://www.whmcs.com/license/ WHMCS Eula
 */

// Require libraries needed for gateway module functions.
require_once __DIR__ . '/../../../init.php';
require_once __DIR__ . '/../../../includes/gatewayfunctions.php';
require_once __DIR__ . '/../../../includes/invoicefunctions.php';

// Detect module name from filename.
$gatewayModuleName = 'esewagateway';

// Fetch gateway configuration parameters.
$gatewayParams = getGatewayVariables($gatewayModuleName);

// Die if module is not active.
if (!$gatewayParams['type']) {
    die("Module Not Activated");
}

// Retrieve data returned in payment gateway callback
// Varies per payment gateway
$invoiceId = $_POST["oid"];
$transactionId = $_POST["refId"];
$paymentAmount = $_POST["amt"];
$paymentFee = 0.0;
$url = "https://esewa.com.np/epay/transrec";
$data =[
    'amt'=> $paymentAmount,
    'rid'=> $transactionId,
    'pid'=> $invoiceId,
    'scd'=> 'NP-ES-NNBS'
];
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);
function get_xml_node_value($node, $xml) {
    if ($xml == false) {
        return false;
    }
    $found = preg_match('#<'.$node.'(?:\s+[^>]+)?>(.*?)'.
        '</'.$node.'>#s', $xml, $matches);
    if ($found != false) {

        return $matches[1];

    }

    return false;
}

$response_code =get_xml_node_value('response_code',$response );
$success = trim($response_code) == 'Success'?true:false;
$transactionStatus = $success ? 'Success' : 'Failure';

/**
 * Validate callback authenticity.
 *
 * Most payment gateways provide a method of verifying that a callback
 * originated from them. In the case of our example here, this is achieved by
 * way of a shared secret which is used to build and compare a hash.
 */
$secretKey = $gatewayParams['secretKey'];
if ($hash != md5($invoiceId . $transactionId . $paymentAmount . $secretKey)) {
    $transactionStatus = 'Hash Verification Failure';
    $success = false;
}

/**
 * Validate Callback Invoice ID.
 *
 * Checks invoice ID is a valid invoice number. Note it will count an
 * invoice in any status as valid.
 *
 * Performs a die upon encountering an invalid Invoice ID.
 *
 * Returns a normalised invoice ID.
 *
 * @param int $invoiceId Invoice ID
 * @param string $gatewayName Gateway Name
 */
$invoiceId = checkCbInvoiceID($invoiceId, $gatewayParams['name']);

/**
 * Check Callback Transaction ID.
 *
 * Performs a check for any existing transactions with the same given
 * transaction number.
 *
 * Performs a die upon encountering a duplicate.
 *
 * @param string $transactionId Unique Transaction ID
 */
checkCbTransID($transactionId);

/**
 * Log Transaction.
 *
 * Add an entry to the Gateway Log for debugging purposes.
 *
 * The debug data can be a string or an array. In the case of an
 * array it will be
 *
 * @param string $gatewayName        Display label
 * @param string|array $debugData    Data to log
 * @param string $transactionStatus  Status
 */
logTransaction($gatewayParams['name'], $_POST, $transactionStatus);

if ($success) {

    /**
     * Add Invoice Payment.
     *
     * Applies a payment transaction entry to the given invoice ID.
     *
     * @param int $invoiceId         Invoice ID
     * @param string $transactionId  Transaction ID
     * @param float $paymentAmount   Amount paid (defaults to full balance)
     * @param float $paymentFee      Payment fee (optional)
     * @param string $gatewayModule  Gateway module name
     */
    addInvoicePayment(
        $invoiceId,
        $transactionId,
        $paymentAmount,
        $paymentFee,
        $gatewayModuleName
    );
    $sucessurl=$gatewayParams['systemurl'].'/viewinvoice.php?id='.$invoiceId.'&paymentsuccess=true';
    header("Location:$sucessurl");

}else{
    $failurl=$gatewayParams['systemurl'].'/viewinvoice.php?id='.$invoiceId.'';
    header("Location:$failurl");
}

?>