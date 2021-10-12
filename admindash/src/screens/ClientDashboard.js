import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientLogoutAction } from "../actions/clientAction";
import { Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ClientDashboard = ({ history }) => {
  const dispatch = useDispatch();
  // const [user, setUser]=useState([])
  // const [auditFiles, setAuditFiles]=useState([])
  // const [dp, setDp]=useState("")
  // const [clientId, setClientId]=useState("")
  // const [name, setName]=useState("")
  // const [email, setEmail]=useState("")
  // const [dp, setDp]=useState("")
  // const [dp, setDp]=useState("")
  // const [dp, setDp]=useState("")
  // const [dp, setDp]=useState("")
  // const [dp, setDp]=useState("")

  const clientLogin = useSelector((state) => state.clientLogin);
  const { loading, error, clientInfo } = clientLogin;

  useEffect(() => {
    if (!clientInfo || !clientInfo.name) {
      history.push("/login");
    } else {
    }
  }, [history, clientInfo]);

  const logouthandler = () => {
    try {
      if (window.confirm("Want to logout?")) {
        dispatch(clientLogoutAction());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : clientInfo ? (
        <div>
          <h1>This is clientDashboard</h1>
          <Button onClick={logouthandler}>Log Out</Button>
          <h1>ClientId: {clientInfo.clientId}</h1>
          <h1>Name: {clientInfo.name}</h1>
          <h1>Email: {clientInfo.email}</h1>
          <h1>Profile Pic:</h1>
          <img
            src={clientInfo.dp}
            alt="Girl in a jacket"
            width="500"
            height="600"
          ></img>
          <h1>Address: {clientInfo.address}</h1>
          <h2>Phone: {clientInfo.phone}</h2>
          <h2>Registration Number (PAN): {clientInfo.registrationNumber}</h2>
          <h2>Audit Files: </h2>
          {clientInfo.images.map((image) => {
            return (
              <img
                src={image}
                alt="Girl in a jacket"
                width="500"
                height="600"
              ></img>
            );
          })}
          <h2>Created At: {clientInfo.createdAt.substring(0, 10)}</h2>
          <h2>Updated At: {clientInfo.updatedAt.substring(0, 10)}</h2>
          <br />
          <h1>Assigned Auditor: {clientInfo.user.name}</h1>
          <h1>Assigned Auditor's Email: {clientInfo.user.email}</h1>
          <h1>Assigned Auditor's Picture:</h1>
          <img
            src={clientInfo.user.dp}
            alt="Girl in a jacket"
            width="500"
            height="600"
          ></img>
        </div>
      ) : null}
    </div>
  );
};

export default ClientDashboard;
