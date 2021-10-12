import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import { getAuditorsAction, logout } from "../actions/userActions";
import { getClientDetailsAction } from "../actions/clientAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, React } from "react";
import { USER_CREATE_RESET } from "../constants/userConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { Route } from "react-router-dom";

const AdminPanel = ({ location, history }) => {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/login";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error, logoutSuccess } = userLogin;

  const clientDetails = useSelector((state) => state.clientDetails);
  const { loading: clientLoading, clients, error: clientError } = clientDetails;

  const auditorDelete = useSelector((state) => state.auditorDelete);
  const {
    loading: deleteLoading,
    success: successDelete,
    error: deleteError,
  } = auditorDelete;

  const auditorsDetails = useSelector((state) => state.auditorsDetails);
  const {
    loading: auditorLoading,
    auditors,
    error: auditorError,
  } = auditorsDetails;

  const auditorCreate = useSelector((state) => state.auditorCreate);
  const {
    loading: createdAuditorLoading,
    success: createdAuditorSuccess,
    error: createdAuditorError,
    createdAuditor,
  } = auditorCreate;

  useEffect(() => {
    dispatch({ type: USER_CREATE_RESET });
    if (logoutSuccess) {
      history.push("/login");
    }
    if (!userInfo || !userInfo.isAdmin) {
      history.push(redirect);
    }
    if (createdAuditorSuccess) {
      history.push(`/master/auditor/${createdAuditor._id}/edit?redirect=create`);
    } else {
      if (userInfo && userInfo.isAdmin) {
        dispatch(getAuditorsAction());
      }
    }
  }, [
    logoutSuccess,
    userInfo,
    history,
    redirect,
    dispatch,
    successDelete,
    createdAuditor,
    createdAuditorSuccess,
    auditorDelete,
  ]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">error</Message>
      ) : (
        <div>{auditors && <Dashboard auditors={auditors} />}</div>
      )}
    </div>
  );
};

export default AdminPanel;
