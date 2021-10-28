import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetailsAction } from "../../actions/clientAction";
import Table from "./AuditorListTable";
import Breadcrumbs from "./Breadcrumbs";
import CardSection from "./CardSection";

const Dashboard = ({ auditors }) => {
  const dispatch = useDispatch();
  const auditorDelete = useSelector((state) => state.auditorDelete);

  const {
    loading: auditorDeleteLoading,
    error: auditorDeleteError,
    success: auditorDeleteSuccess,
  } = auditorDelete;

  const clientDetails = useSelector((state) => state.clientDetails);
  const { clients } = clientDetails;

  const totalAudits = clients
    .map((client) => client.images.length)
    .reduce((acc, curVal) => {
      return acc + curVal;
    }, 0);

  useEffect(() => {
    if (!clients) {
      dispatch(getClientDetailsAction());
    }
  }, [auditorDeleteSuccess, dispatch]);

  return (
    <div>
      <div className="content-wrapper">
        <Breadcrumbs page="Dashboard" />
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <CardSection
                header={clients.length}
                boxProperty={"small-box bg-info"}
                body="Total Clients"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-ios-people"}
                link="/admin/clientlist"
              />
              <CardSection
                header={totalAudits}
                boxProperty={"small-box bg-warning"}
                body="Audit Uploads"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-android-clipboard"}
                link="/admin/auditfiles"
              />
              <CardSection
                header="_"
                boxProperty={"small-box bg-danger"}
                body="Client Messages"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-android-document"}
                link="/clients"
              />
            </div>
            {/* Main row */}
            {auditors && <Table auditors={auditors} />}

            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Dashboard;
