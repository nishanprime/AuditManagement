import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import {
  USER_SINGLE_DETAILS_RESET,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";
import {
  getASingleAuditorInfo,
  updateAuditorProfile,
} from "../actions/userActions";
import Breadcrumbs from "../components/dashboard/Breadcrumbs";

const AuditorEditScreen = ({ match, history,location }) => {
  const auditorId = match.params.id;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [dp, setDp] = useState("");
  const [dpUploading, setDpUploading] = useState(false);
  const [dpUploadError, setDpUploadError] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userInfoLoading,
    userInfo,
    error: userInfoError,
  } = userLogin;

  const currentAuditorDetails = useSelector(
    (state) => state.currentAuditorDetails
  );
  const { loading, error, auditor } = currentAuditorDetails;

  const auditorUpdate = useSelector((state) => state.auditorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = auditorUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAuditorProfile({
        _id: auditorId,
        name,
        password,
        email,
        dp,
        isAdmin,
        isMaster,
      })
    );
  };
  useEffect(() => {
    if (!userInfo || !userInfo.isMaster) {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: USER_SINGLE_DETAILS_RESET });
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      history.push("/dashboard");
    } else {
      if (!auditor || !auditor.name || auditor._id !== auditorId) {
        dispatch(getASingleAuditorInfo(auditorId));
      } else {
        setName(auditor.name);
        setEmail(auditor.email);
        setDp(auditor.dp);
        setIsAdmin(auditor.isAdmin);
        setIsMaster(auditor.isMaster);
      }
    }
  }, [auditor, dispatch, auditorId, successUpdate, history, userInfo]);

  const dpUploader = async (e) => {
    setDpUploadError("");
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("clientFile", file);
    setDpUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      console.log(data);
      setDp(data);
      setDpUploading(false);
    } catch (error) {
      console.log(error, " From uploadHandler in ProductEditScreen");
      setDpUploading(false);
    }
  };

  return (
    <>
      <div className="content-wrapper" style={{ padding: "12px" }}>
        {(location.search.split("=")[1] == "edit")?<Breadcrumbs page="Edit Auditor Details" />:<Breadcrumbs page="Add Auditor" />}
        
        <>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorUpdate && console.log(errorUpdate)}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="dp" className="py-3">
                <Message variant="warning">
                  Valid file types are: jpeg, jpg, png
                </Message>
                {dpUploadError && (
                  <Message variant="danger">{dpUploadError}</Message>
                )}
                <Row>
                  <Col xl={9}>
                    <Form.Label>
                      Enter Profile Image URL or Select an image
                    </Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="url"
                      value={dp}
                      onChange={(e) => setDp(e.target.value)}
                    ></Form.Control>
                  </Col>
                  <Col xl={3} style={{}}>
                    <Form.File
                      style={{ position: "relative", top: "50%" }}
                      id="dp-image"
                      onChange={dpUploader}
                    ></Form.File>
                  </Col>
                </Row>

                {dpUploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="name" className="py-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="py-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="py-3">
                <Form.Label>
                  Change Password (Leave as it is if you don't want to)
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password (Default Password is: 123456)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isAdmin" className="py-3">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => {
                    setIsAdmin(e.target.checked);
                  }}
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="isMaster" className="py-3">
                <Form.Check
                  type="checkbox"
                  label="Is Master"
                  checked={isMaster}
                  onChange={(e) => {
                    if (
                      window.confirm(
                        "Are you ready to give this user 100% access?"
                      )
                    ) {
                      setIsMaster(e.target.checked);
                    }
                  }}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </>
      </div>
      {/* <Link to="/dashboard" className="btn btn-light my-3">
        Go Back
      </Link> */}
    </>
  );
};

export default AuditorEditScreen;
