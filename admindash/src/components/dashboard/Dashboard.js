import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "./AuditorListTable";
import Breadcrumbs from "./Breadcrumbs";
import CardSection from "./CardSection";

const Dashboard = ({ auditors }) => {
  const auditorDelete = useSelector((state) => state.auditorDelete);

  const {
    loading: auditorDeleteLoading,
    error: auditorDeleteError,
    success: auditorDeleteSuccess,
  } = auditorDelete;

  useEffect(() => {}, [auditorDeleteSuccess]);

  return (
    <div>
      <div className="content-wrapper">
        <Breadcrumbs page="Dashboard"/>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <CardSection
                header="150"
                boxProperty={"small-box bg-info"}
                body="Total Clients"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-bag"}
                link="/clients"
              />
              
              <CardSection
                header="150"
                boxProperty={"small-box bg-success"}
                body="Auditors"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-bag"}
                link="/auditors"
              />
              <CardSection
                header="150"
                boxProperty={"small-box bg-warning"}
                body="Audit Uploads"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-bag"}
                link="/auditfiles"
              />
              <CardSection
                header="_"
                boxProperty={"small-box bg-danger"}
                body="Pending Audits"
                footer="More Info"
                footerIcon="fas fa-arrow-circle-right"
                color=""
                bodyIcon={"ion ion-bag"}
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
