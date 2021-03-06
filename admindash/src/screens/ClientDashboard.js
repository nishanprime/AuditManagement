import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientLogoutAction, sendMessageAction } from "../actions/clientAction";
import { LinkContainer } from "react-router-bootstrap";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import AuditFIleViewComponent from "../components/AuditFIleViewComponent";
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

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clientLogin = useSelector((state) => state.clientLogin);
  const { loading, error, clientInfo } = clientLogin;

  useEffect(() => {
    if (!clientInfo || !clientInfo.name) {
      history.push("/login");
    } else {
    }
  }, [history, clientInfo]);

  const logoutHandler = () => {
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
          <Navbar
            fixed="top"
            bg="dark"
            variant="dark"
            expand="lg"
            collapseOnSelect
          >
            <Container>
              <LinkContainer to="/clientdashboard">
                <Navbar.Brand>
                  <Image
                    src="/dist/img/AdminLTELogo.png"
                    width="50"
                    roundedCircle
                    fluid
                    thumbnail
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ marginLeft: "auto" }}>
                  <Nav.Link href="#auditFiles">My Audit Files</Nav.Link>

                  {clientInfo && (
                    <>
                    <Nav.Link href="#Hello">{clientInfo.name}</Nav.Link>
                    <Nav.Link onClick={logoutHandler}>
                    <div className="float-left mr-2">Logout</div>
							<i className="fas fa-sign-out-alt"></i>
                  </Nav.Link>
                  </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container style={{ marginTop: "100px" }}>
            <div class="container d-flex justify-content-center align-items-center">
              <div class="card">
                <div class="user text-center">
                  <div class="profile m-3">
                    <Image src={clientInfo.dp} thumbnail fluid width="100" />
                  </div>
                </div>
                <div class="text-center px-4 pb-4 m-2">
                  <h4 class="mb-1">{clientInfo.name}</h4>{" "}
                  <span class="text-muted d-block mb-1">
                    Client ID: {clientInfo.clientId}
                  </span>{" "}
                  <span class="text-muted d-block mb-1">
                    Registration Number (PAN/VAT): {clientInfo.registrationNumber}
                  </span>{" "}
                  <span class="text-muted d-block mb-1">
                    Email: {clientInfo.email}
                  </span>
                  <span class="text-muted d-block mb-1">
                    Phone: {clientInfo.phone}
                  </span>
                  <span class="text-muted d-block mb-2">
                    {clientInfo.address}
                  </span>
                  <hr />
                  <span class="text-muted d-block mb-2">
                    Assigned Auditor: {clientInfo.user.name}
                  </span>
                  <span class="text-muted d-block mb-2">
                    Assigned Auditor's email:{" "}
                    <a href={`mailto:${clientInfo.user.email}`}>
                      {clientInfo.user.email}
                    </a>
                  </span>
                  <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                    <div class="stats">
                      <a href="#auditFiles" style={{ color: "black" }}>
                        <h6 class="mb-0">Total Audits</h6>{" "}
                        <span>{clientInfo.images.length}</span>
                      </a>
                    </div>
                    <div class="stats">
                      <h6 class="mb-0 ml-3">Account Created</h6>{" "}
                      <span>{clientInfo.createdAt.substring(0, 10)}</span>
                    </div>
                    <div class="stats">
                      <h6 class="mb-0 ml-3">Last Updated</h6>{" "}
                      <span>{clientInfo.updatedAt.substring(0, 10)}</span>
                    </div>
                  </div>
                  {/* Modal popup to send email to assigned auditor regarding auditfiles or editing personal details */}
                  <Button
                    variant="dark"
                    style={{ marginTop: "10px" }}
                    onClick={handleShow}
                  >
                    Send Message To Auditor
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (message.length > 0) {
                          let newMes =
                            message + "---_---" + Date.now().toString();
                          dispatch(
                            sendMessageAction({ messageToSend: newMes })
                          );
                        }
                        setMessage("");
                        handleClose();
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Any request? Let us know</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <InputGroup>
                          <FormControl
                            as="textarea"
                            aria-label="Your requests here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></FormControl>
                        </InputGroup>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          onClick={() => {}}
                        >
                          Send
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </div>
              </div>
            </div>
          </Container>
          <Container id="auditFiles">
            <h1>Audited Files</h1>
          </Container>
          <Container>
            <Row>
              {clientInfo.images.length === 0 ? (
                <Message variant="info">No Pending Audits</Message>
              ) : (
                clientInfo.images.reverse().map((image) => {
                  const uploadedDate = new Date(
                    parseInt(image.split("---_---")[1].split(".")[0])
                  ).toLocaleString();
                  const fileName = image
                    .split("/")
                    [image.split("/").length - 1].split("---_---")[0]
                    .split(".")[0];
                  console.log(image);
                  return (
                    <Col sm={4} md={3} xl={2} xs={6}>
                      <AuditFIleViewComponent
                        image={
                          "https://image.flaticon.com/icons/png/512/456/456700.png"
                        }
                        download={image}
                        name={fileName}
                        date={uploadedDate}
                      />
                    </Col>
                  );
                })
              )}
            </Row>
          </Container>
          <Container id="pendingAudits">
            <h1>Pending Audits</h1>
          </Container>
          <Container>
            <Row>
              <Message variant="info">No Pending Audits</Message>
              {/* {clientInfo.images.reverse().map((image) => {
              const uploadedDate = new Date(
                parseInt(image.split("---|---")[1].split(".")[0])
              ).toLocaleString();
              return (
                <Col sm={4} md={3} xl={2} xs={6}>
                  <AuditFIleViewComponent
                    image={
                      "https://image.flaticon.com/icons/png/512/456/456700.png"
                    }
                    download={image}
                    name="Hello"
                    date={uploadedDate}
                  />
                </Col>
              );
            })} */}
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default ClientDashboard;
