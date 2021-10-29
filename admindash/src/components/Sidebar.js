import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const Sidebar = ({ history }) => {


$(".content-wrapper").on('click', function(event) {
	if ($(".sidebar-mini").hasClass("sidebar-open")) {
		$(".sidebar-mini").removeClass("sidebar-open")
	}
});
	


	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;

	useEffect(() => {
		if (!userInfo || !userInfo.name) {
			history.push('/login');
		}
	}, [history, userInfo]);
	return (
		userInfo && (
			<>
				<aside className="main-sidebar pushmenu sidebar-dark-primary elevation-4" id="control-sidebar">
					{/* Brand Logo */}
					<Link to="/dashboard" className="brand-link">
						<img
							src="dist/img/AdminLTELogo.png"
							alt="Master Logo"
							className="brand-image img-circle elevation-3"
							style={{ opacity: '.8' }}
						/>
						<span className="brand-text font-weight-light">
							Saurya Auditors
						</span>
					</Link>
					{/* Sidebar */}
					<div className="sidebar">
						{/* Sidebar user panel (optional) */}
						<div className="user-panel mt-3 pb-3 mb-3 d-flex">
							<div className="image">
								<img
									src={userInfo.dp}
									className="img-circle elevation-2"
									alt="User"
								/>
							</div>
							<div className="info">
								<Link to="#" className="d-block">
									{userInfo.name}
								</Link>
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
								<li className="nav-item has-treeview">
									<Link to="/dashboard" className="nav-link ">
										{/* <Link to="/dashboard" className="nav-link active"> */}
										<i className="nav-icon fas fa-tachometer-alt" />
										<p>Dashboard</p>
									</Link>
								</li>
								<li className="nav-item has-treeview">
									<Link to="/admin/clientlist" className="nav-link">
										<i className="nav-icon fas fa-user" />
										<p>Clients</p>
									</Link>
								</li>
								<li className="nav-item has-treeview">
									<Link to="/admin/auditors" className="nav-link">
										<i className="nav-icon fas fa-users" />
										<p>Auditors</p>
									</Link>
								</li>
								<li className="nav-item has-treeview">
									<Link to="/admin/auditfiles" className="nav-link">
										<i className="nav-icon fas fa-file" />
										<p>Audit Reports</p>
									</Link>
								</li>
								<li className="nav-item has-treeview d-xl-none d-lg-none">
								<Link
						className="nav-link attached-toggler"
						data-widget="pushmenu"
						to="#"
						role="button"
					>
						<i className="nav-icon fas fa-arrow-left" />
						<p>Hide Sidebar</p>
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
