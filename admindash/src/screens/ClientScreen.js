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
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="content-wrapper">
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
                          <li className="list-group-item">
                            <b>My Auditor</b>{" "}
                            <div className="float-right">
                              {client.user.name && client.user.name}
                            </div>
                          </li>
                          <li className="list-group-item">
                            <b>My Auditor's Email</b>{" "}
                            <a className="float-right" href={`mailto:${client.user.email}`}>
                              {client.user.email && client.user.email}{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}

                    {/* <!-- About Me Box --> */}
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
                    {/* <!-- /.card --> */}
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
