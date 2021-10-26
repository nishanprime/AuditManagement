import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientDetailsAction } from '../actions/clientAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Breadcrumbs from '../components/dashboard/Breadcrumbs';
const AuditorScreen = ({ history, match }) => {
	const currentAuditId = match.params.id;
	console.log(currentAuditId);
	const dispatch = useDispatch();

	const [myAssignedClients, setMyAssignedClients] = useState([]);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const clientDetails = useSelector((state) => state.clientDetails);
	const { loading, clients, error } = clientDetails;
	clients
		.filter((client) => client.user === currentAuditId)
		.map((a) => console.log(a));
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		} else {
			if (!clients) {
				dispatch(getClientDetailsAction());
			}
		}
	}, [dispatch, history, userInfo, clients]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<div className="content-wrapper">
			<Breadcrumbs page="Assigned Clients" />
			{clients.filter((client) => client.user._id === currentAuditId).length ===
			0 ? (
				<Message variant="info">No Clients</Message>
			) : (
				clients
					.filter((client) => client.user._id === currentAuditId)
					.map((req) => (
						<div>
							<h1>{req.name}</h1>
							<h1>{req.email}</h1>
							<h1>{req.clientId}</h1>
							<h1>---------------</h1>
							<br />
						</div>
					))
			)}
			<h1></h1>
		</div>
	);
};

export default AuditorScreen;
