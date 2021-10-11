import React from "react";
import Table from "../Table";
import Breadcrumbs from "./Breadcrumbs";
import CardSection from "./CardSection";

const Dashboard = ({ auditors }) => {
  console.log(auditors);

  return auditors.map((a) => {
    return (
      <div>
        <div className="content-wrapper">
          <Breadcrumbs/>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <CardSection/>
              {/* Main row */}
              <Table />
              <div className="row"></div>
              {/* /.row (main row) */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </div>
    );
  });
};

export default Dashboard;
