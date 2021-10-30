import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getASingleClientDetails } from "../actions/clientAction";
import { Link } from "react-router-dom";
import { CLIENT_SINGLE_DETAILS_RESET } from "../constants/clientConstants";
const ClientScreen = ({ location, history, match }) => {
  const clientMongoId = match.params.id;
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [dp, setDp] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const currentClientDetails = useSelector(
    (state) => state.currentClientDetails
  );
  const { loading, error, client } = currentClientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (!client || !client.name || client._id !== clientMongoId) {
        dispatch(getASingleClientDetails(clientMongoId));
      } else {
        setName(client.name);
        setEmail(client.email);
        setAddress(client.address);
        setPhone(client.phone);
        setRegistrationNumber(client.registrationNumber);
        setImages(client.images);
        setCreatedAt(client.createdAt);
        setUpdatedAt(client.updatedAt);
        setClientId(client.clientId);
        setUser(client.user);
        setDp(client.dp);
      }
    }
  }, [dispatch, history, client, clientMongoId, userInfo]);

  return (
    <div className="content-wrapper">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Client Profile</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item active">Client Profile</li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* <!-- /.container-fluid --> */}
            </section>

            {/* <!-- Main content --> */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {/* <!-- Profile Image --> */}
                    <div className="card card-primary card-outline">
                      <div className="card-body box-profile">
                        <div className="text-center">
                          <img
                            className="profile-user-img img-fluid img-circle"
                            src={client.dp}
                            alt="User profile"
                          />
                        </div>

                        <h3 className="profile-username text-center">
                          {client.name}
                        </h3>

                        <p className="text-muted text-center">
                          CLIENT ID #{client.clientId}
                        </p>

                        <ul className="list-group list-group-unbordered mb-3">
                          <li className="list-group-item">
                            <b>Email</b>{" "}
                            <div className="float-right">{client.email}</div>
                          </li>
                          <li className="list-group-item">
                            <b>Phone Number</b>{" "}
                            <div className="float-right">{client.phone}</div>
                          </li>
                          <li className="list-group-item">
                            <b>Registration Number(PAN)</b>{" "}
                            <div className="float-right">
                              {client.registrationNumber}
                            </div>
                          </li>
                          <li className="list-group-item">
                            <b>Subscription Date</b>{" "}
                            <div className="float-right">
                              {client.createdAt &&
                                client.createdAt.substring(0, 10)}
                            </div>
                          </li>
                          <li className="list-group-item">
                            <b>Last Updated</b>{" "}
                            <div className="float-right">
                              {client.updatedAt &&
                                client.updatedAt.substring(0, 10)}
                            </div>
                          </li>
                          {user.name && (
                            <li className="list-group-item">
                              <b>My Auditor</b>{" "}
                              <div className="float-right">
                                {user.name && user.name}
                              </div>
                            </li>
                          )}
                          {user.email && (
                            <li className="list-group-item">
                              <b>My Auditor's Email</b>{" "}
                              <a
                                className="float-right"
                                href={`mailto:${user.email}`}
                              >
                                {user.email && user.email}
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}

                    {/* <!-- About Me Box --> */}
                    <div className="row">
                      <div className="card card-primary col-md-4">
                        <div className="card-header">
                          <h3 className="card-title">About Client</h3>
                        </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body">
                          <strong>
                            <i className="fas fa-book mr-1"></i> Address
                          </strong>

                          <p className="text-muted">{client.address}</p>

                          <hr />

                          <strong>
                            <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                            Location
                          </strong>

                          <p className="text-muted">Nepal</p>

                          <hr />

                          <strong>
                            <i className="far fa-file-alt mr-1"></i> Notes
                          </strong>

                          <p className="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Etiam fermentum enim neque.
                          </p>
                        </div>
                        {/* <!-- /.card-body --> */}
                      </div>
                      <div className="card card-primary col-md-8 ml-6">
                        <div className="card-header">
                          <h3 className="card-title">Messages</h3>
                        </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body">
                          {/* <!-- /.card-header --> */}
                          {/* {client.messageToAuditor
                            .slice(0)
                            .reverse()
                            .map((msg) => {
                              const msgData=msg.split("---_---")[0]
                              const msgDate=msg.split("---_---")[1]
                              return <h4>{msgData}</h4>;
                            })} */}

                          <div style={{ "overflow-x": "auto" }}>
                            <table
                              id="mesesage"
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th>Message</th>
                                  <th>Date Sent</th>
                                </tr>
                              </thead>

                              <tbody>
                                {client &&
                                  client.messageToAuditor &&
                                  client.messageToAuditor.slice(0).reverse()
                                    .map((msg) => {
                                      const msgData = msg.split("---_---")[0];
                                      const msgDate = msg.split("---_---")[1];
                                      var options = {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      };
                                      const date = new Date(
                                        parseInt(msgDate)
                                      ).toLocaleDateString("en-GB", options);
                                      const time = new Date(
                                        parseInt(msgDate)
                                      ).toLocaleTimeString("en-GB", {
                                        hourCycle: "h12",
                                      });
                                      return (
                                        <tr>
                                          <td>{msgData}</td>
                                          <td>{`${date} at ${time}`}</td>
                                        </tr>
                                      );
                                    })}
                                {/* {auditors.map(auditor)=> return(
              {
               
  }
            )} */}
                              </tbody>
                            </table>
                          </div>

                          {/* {console.log(messages)} */}
                          {messages &&
                            messages.map((client) => {
                              return (
                                <>
                                  <h4>{client.messageToAuditor}</h4>
                                </>
                              );
                            })}

                          {/* <!-- /.card-body --> */}
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}

                    {/* Messages */}
                    <div className="card card-primary col-md-12">
                      <div className="card-header">
                        <h3 className="card-title">Audit Reports</h3>
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div className="card-body">
                        <Table
                          striped
                          bordered
                          hover
                          responsive
                          className="table-sm"
                        >
                          <thead>
                            <tr>
                              <th>File Name</th>
                              <th>Uploaded Data</th>
                              <th>Download</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key="key">
                              <td>File Name</td>
                              <td>a</td>
                              <td>
                                <a
                                  href="#filepath"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fas fa-download"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
                    {/* End Messages */}
                  </div>
                </div>
                {/* <!-- /.row --> */}
              </div>
              {/* <!-- /.container-fluid --> */}
            </section>
            {/* <!-- /.content --> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientScreen;
