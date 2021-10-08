import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getASingleClientDetails } from "../actions/clientAction";
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
          
        </div>
      )}
    </div>
  );
};

export default ClientScreen;
