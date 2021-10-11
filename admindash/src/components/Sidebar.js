import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

//   $(document).ready(funtion() {
//     $('body').Layout();
// })

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    userInfo && (
      <>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img
              src="dist/img/AdminLTELogo.png"
              alt="Master Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">
              Saurya Auditors
            </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={userInfo.dp}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  {userInfo.name}
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                <li className="nav-item has-treeview menu-open">
                  <Link to="/dashboard" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/clientlist" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>Clients</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/auditors" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>Auditors</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/auditreports" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>Audit Reports</p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </>
    )
  );
};

export default Sidebar;
