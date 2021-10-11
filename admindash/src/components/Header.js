import React from 'react'

const Header = () => {
    return (
        <div>
            {/* <!-- Navbar --> */}
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* <!-- Left navbar links --> */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Help
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">FAQ</a>
          <a className="dropdown-item" href="#">Support</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Contact</a>
        </div>
      </li>
    </ul>

    {/* <!-- SEARCH FORM --> */}
    <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    {/* <!-- Right navbar links --> */}
    <ul className="navbar-nav ml-auto">
      
      {/* <!-- Notifications Dropdown Menu --> */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell"></i>
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-header">15 Notifications</span>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2"></i> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2"></i> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button"><i
            className="fas fa-sign-out-alt"></i></a>
      </li>
    </ul>
  </nav>
  {/* <!-- /.navbar --> */}
        </div>
    )
}

export default Header
