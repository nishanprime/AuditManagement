import React from "react";
import Table from "./AuditorListTable";
import Breadcrumbs from "./Breadcrumbs";
import CardSection from "./CardSection";

const Dashboard = ({ auditors }) => {
  console.log(auditors);

  return (
    <div>
      <div className="content-wrapper">
        <Breadcrumbs />
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <CardSection
              header="150"
              boxProperty={"small-box bg-info"}
              body="Clients"
              footer="More Info"
              footerIcon="fas fa-arrow-circle-right"
              color=""
              bodyIcon={"ion ion-bag"}
              link="/clients"
              />
              <CardSection
              header="150"
              boxProperty={"small-box bg-info"}
              body="Clients"
              footer="More Info"
              footerIcon="fas fa-arrow-circle-right"
              color=""
              bodyIcon={"ion ion-bag"}
              link="/clients"
              />
              <CardSection
              header="150"
              boxProperty={"small-box bg-info"}
              body="Clients"
              footer="More Info"
              footerIcon="fas fa-arrow-circle-right"
              color=""
              bodyIcon={"ion ion-bag"}
              link="/clients"
              />
              <CardSection
              header="150"
              boxProperty={"small-box bg-info"}
              body="Clients"
              footer="More Info"
              footerIcon="fas fa-arrow-circle-right"
              color=""
              bodyIcon={"ion ion-bag"}
              link="/clients"
            />
            </div>
            {/* Main row */}
           {auditors &&  <Table auditors={auditors} />}
            
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
