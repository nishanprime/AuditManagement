import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Col, Form, Row } from "react-bootstrap";
import { clientLoginAction } from "../actions/clientAction";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const dispatch = useDispatch();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";
  const submitHandler = (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setSubmitError("Make sure you enter both email and password!");
    } else {
      if (isAdmin) {
        dispatch(adminLogin(email, password));
      } else if (isClient) {
        dispatch(clientLoginAction(email, password));
      }
      setSubmitError("");
    }
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const clientLogin = useSelector((state) => state.clientLogin);
  const {
    loading: clientLoginLoading,
    clientInfo,
    clientLoginError,
  } = clientLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (clientInfo) {
      history.push("/clientdashboard");
    }
  }, [history, userInfo, redirect, clientInfo]);

  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
      {submitError && <Message variant="danger">{submitError}</Message>}
      <div
        style={{ height: "100vh" }}
        className=" d-flex justify-content-center align-items-center"
      >
        <div className="login-box">
          {/* <!-- /.login-logo --> */}
          <div className="card mt-4">
            <div className="card-body login-card-body">
              <div className="login-logo">
                <img
                  src="dist/img/AdminLTELogo.png"
                  alt="Master Logo"
                  className="brand-image img-circle elevation-3"
                  style={{ opacity: ".8" }}
                />
                <div className="pt-3" style={{ fontFamily: "Arial" }}>
                  <Link to="/">
                    <strong>
                      <h3>Saurya Auditors</h3>
                    </strong>
                  </Link>
                </div>
              </div>
              <hr />
              <p className="login-box-msg">
                <strong>Sign in to start your session</strong>
              </p>

              <Form onSubmit={submitHandler} method="post">
                <Form.Group className="input-group mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className="input-group mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="isAdmin" className="py-3">
                      <Form.Check
                        type="checkbox"
                        label="Admin Login"
                        checked={isAdmin}
                        onChange={(e) => {
                          setIsClient(!e.target.checked);
                          setIsAdmin(e.target.checked);
                        }}
                      ></Form.Check>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="isClient" className="py-3">
                      <Form.Check
                        type="checkbox"
                        label="Client Login"
                        checked={isClient}
                        onChange={(e) => {
                          setIsAdmin(!e.target.checked);
                          setIsClient(e.target.checked);
                        }}
                      ></Form.Check>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="row">
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  )}

                  {/* <!-- /.col --> */}
                </div>
              </Form>

              {/* <!-- /.social-auth-links --> */}
            </div>
            {/* <!-- /.login-card-body --> */}
          </div>
        </div>
        {/* <!-- /.login-box --> */}
      </div>
    </div>
  );
};

export default LoginScreen;
