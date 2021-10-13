import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientLogoutAction } from "../actions/clientAction";
import { LinkContainer } from "react-router-bootstrap";

import {
  Button,
  Col,
  Container,
  Image,
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
                    <NavDropdown title={clientInfo.name} id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Log Out
                      </NavDropdown.Item>
                    
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div style={{ padding: "1rem" }}></div>
          <h1>This is clientDashboard</h1>
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
          <h2 id="auditFiles">Audit Files: </h2>
          <Row>
            {clientInfo.images.reverse().map((image) => {
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
            })}
          </Row>

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
