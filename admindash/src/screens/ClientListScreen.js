import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ClientListTable from "../components/dashboard/ClientListTable";
import {
  createClientAction,
  deleteClient,
  getClientDetailsAction,
} from "../actions/clientAction";
import { CLIENT_CREATE_RESET } from "../constants/clientConstants";
import { Link } from "react-router-dom";

const ClientListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const clientDetails = useSelector((state) => state.clientDetails);
  const { loading, error, clients } = clientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clientDelete = useSelector((state) => state.clientDelete);
  const { success: successDelete, loading: loadingDelete } = clientDelete;

  const createClientHandler = () => {
    dispatch(createClientAction());
  };

  const clientCreate = useSelector((state) => state.clientCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
    createdClient,
  } = clientCreate;
  useEffect(() => {
    dispatch({ type: CLIENT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (createSuccess) {
      history.push(`/admin/clients/${createdClient._id}/edit`);
    } else {
      dispatch(getClientDetailsAction());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    createSuccess,
    createdClient,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteClient(id));
    }
  };
  return (
    //  <!-- Content Wrapper. Contains page content -->
    <>
      <div className="content-wrapper">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ClientListTable clients={clients} />
        )}
      </div>
    </>
  );
};

export default ClientListScreen;
