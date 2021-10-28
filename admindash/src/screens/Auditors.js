import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetailsAction } from "../actions/clientAction";
import Table from "../components/dashboard/AuditorListTable";
import Breadcrumbs from "../components/dashboard/Breadcrumbs";
import Message from "../components/Message";

const Auditors = () => {
  const dispatch = useDispatch();
  const auditorDelete = useSelector((state) => state.auditorDelete);

  const {
    loading: auditorDeleteLoading,
    error: auditorDeleteError,
    success: auditorDeleteSuccess,
  } = auditorDelete;

  const clientDetails = useSelector((state) => state.clientDetails);
  const { clients } = clientDetails;

  const auditorsDetails = useSelector((state) => state.auditorsDetails);
  const { loading, error, auditors } = auditorsDetails;

  useEffect(() => {
    if (!clients) {
      dispatch(getClientDetailsAction());
    }
  }, [auditorDeleteSuccess, dispatch]);

  return (
    <>
      <div className="content-wrapper">
        <Breadcrumbs page="Auditors" />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          auditors && <Table auditors={auditors} />
        )}
      </div>
    </>
  );
};

export default Auditors;
