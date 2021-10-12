import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getASingleClientDetails } from "../actions/clientAction";
import { Link } from "react-router-dom";
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

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     if (password !== confirmPassword || password.length <= 5) {
  //       setMessage(
  //         "Make sure both password matches and are more than 5 characters long"
  //       );
  //     } else {
  //       dispatch(
  //         updateUserProfileAction({
  //           id: user._id,
  //           name,
  //           email,
  //           password,
  //         })
  //       );
  //     }
  //   };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (!client || !client.name) {
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
                      alt="User profile picture"
                    />
                  </div>

                  <h3 className="profile-username text-center">
                    {client.name}
                  </h3>

                            <p className="text-muted text-center">CLIENT ID #{client.clientId}</p>

                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>Email</b>{" "}
                      <Link to="#" className="float-right">{client.email}</Link>
                    </li>
                    <li className="list-group-item">
                                <b>Phone Number</b> <Link to="#" className="float-right">{client.phone}</Link>
                              </li>
                              <li className="list-group-item">
                      <b>Registration Number(PAN)</b> <Link to="#" className="float-right">{client.registrationNumber}</Link>
                              </li>
                              <li className="list-group-item">
                      <b>Subscription Date</b> <Link to="#" className="float-right">{client.createdAt && client.createdAt.substring(0, 10)}</Link>
                              </li>
                              <li className="list-group-item">
                      <b>Last Updated</b> <Link to="#" className="float-right">{client.updatedAt && client.updatedAt.substring(0, 10)}</Link>
                    </li>
                  </ul>
                </div>
                {/* <!-- /.card-body --> */}
              </div>
              {/* <!-- /.card --> */}

              {/* <!-- About Me Box --> */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">About Me</h3>
                </div>
                {/* <!-- /.card-header --> */}
                <div className="card-body">
                  <strong>
                    <i className="fas fa-book mr-1"></i> Education
                  </strong>

                  <p className="text-muted">
                    B.S. in Computer Science from the University of Tennessee at
                    Knoxville
                  </p>

                  <hr />

                  <strong>
                    <i className="fas fa-map-marker-alt mr-1"></i> Location
                  </strong>

                  <p className="text-muted">Malibu, California</p>

                  <hr />

                  <strong>
                    <i className="fas fa-pencil-alt mr-1"></i> Skills
                  </strong>

                  <p className="text-muted">
                    <span className="tag tag-danger">UI Design</span>
                    <span className="tag tag-success">Coding</span>
                    <span className="tag tag-info">Javascript</span>
                    <span className="tag tag-warning">PHP</span>
                    <span className="tag tag-primary">Node.js</span>
                  </p>

                  <hr />

                  <strong>
                    <i className="far fa-file-alt mr-1"></i> Notes
                  </strong>

                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam fermentum enim neque.
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
