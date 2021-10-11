import React from "react";
import Table from "./AuditorListTable";
import Breadcrumbs from "./Breadcrumbs";
import CardSection from "./CardSection";

const Dashboard = ({ auditors }) => {
  console.log(auditors);

  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <CardSection />
            {/* Main row */}
            <Table auditors={auditors} />
            <div className="row"></div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>

    // <div>
    //   {[1, 2, 3].map((a) => {
    //     return (

    //     );
    //   })}
    //   )
    // </div>
  );
};

// auditors.map((a) => {
//   return (

//   );
// }

export default Dashboard;
