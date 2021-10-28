import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
const Header = ({ history }) => {
	const dispatch = useDispatch();
	const logouthandler = () => {
		try {
			if (window.confirm('Want to logout?')) {
				dispatch(logout());
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			{/* <!-- Navbar --> */}
			<Nav className="main-header navbar navbar-expand navbar-white navbar-light">
				{/* <!-- Left navbar links --> */}

				<Nav.Item>
					<Link
						className="nav-link"
						data-widget="pushmenu"
						to="#"
						role="button"
					>
						<i className="fas fa-bars"></i>
					</Link>
				</Nav.Item>
				<Nav.Item className="nav-item d-none d-sm-inline-block">
					<Link to="/dashboard" className="nav-link">
						Home
					</Link>
				</Nav.Item>
				<NavDropdown title="Help">
					<NavDropdown.Item>Tutorial and Manual</NavDropdown.Item>
					<NavDropdown.Item>Contact Us</NavDropdown.Item>
				</NavDropdown>

				{/* Make a search component and get it here */}

				{/* <!-- Right navbar links --> */}
				<ul className="navbar-nav ml-auto">
					<div className="column">
						<Nav.Item onClick={logouthandler} style={{ cursor: 'pointer' }}>
							<div className="float-left mr-2">Logout</div>
							<i className="fas fa-sign-out-alt"></i>
						</Nav.Item>
					</div>
				</ul>
			</Nav>
			{/* <!-- /.navbar --> */}
		</div>
	);
};

export default Header;
