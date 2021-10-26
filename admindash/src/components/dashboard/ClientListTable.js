import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispath, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createClientAction, deleteClient } from '../../actions/clientAction';
import { CLIENT_SINGLE_DETAILS_RESET } from '../../constants/clientConstants';
const Table = ({ clients }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteClient(id));
		}
	};
	useEffect(() => {
		dispatch({ type: CLIENT_SINGLE_DETAILS_RESET });
	}, [dispatch]);

	const addClientHandler = () => {
		dispatch(createClientAction());
	};
	return (
		<>
			{/* {/* <!-- Main content --> */}
			<div className="card">
				<div
					className="card-header"
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Button
						onClick={addClientHandler}
						className="btn btn-dark float-right"
					>
						Add New Client
					</Button>
				</div>
				{/* <!-- /.card-header --> */}
				<div className="card-body" style={{ overflowX: 'auto' }}>
					<table id="example1" className="table table-bordered table-striped">
						<thead>
							<tr>
								<th>Client Id</th>
								<th>Image</th>
								<th>Name</th>
								<th>Email</th>
								<th>Address</th>
								<th>Contact</th>
								<th>Registration Number</th>
								<th>Joined Date</th>
								<th>Updated Date</th>
								<th>Assigned Auditor</th>
								<th>Edit/Delete</th>
							</tr>
						</thead>

						<tbody>
							{clients &&
								clients.map((client) => {
									return (
										<tr key={client._id}>
											<td>
												<Link to={`/admin/clients/${client._id}/info`}>
													{client.clientId}
												</Link>
											</td>
											<td className="text-center">
												<img width="40px" height="auto" src={client.dp} />
											</td>
											<td>{client.name}</td>
											<td>
												<a href={`mailto:${client.email}`}>{client.email}</a>
											</td>
											<td>{client.address}</td>
											<td>{client.phone}</td>
											<td>{client.registrationNumber}</td>
											<td>{client.createdAt.substring(0, 10)}</td>
											<td>{client.updatedAt.substring(0, 10)}</td>
											<td>
												<Link to={`/master/auditors/${client.user._id}/info`}>
													{client.user.name}
												</Link>
											</td>
											<td>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-evenly',
													}}
												>
													<Link to={`/admin/clients/${client._id}/edit`}>
														<i
															style={{ color: 'blue' }}
															className="fas fa-edit"
														></i>
													</Link>

													<Link
														to="#"
														onClick={() => deleteHandler(client._id)}
													>
														<i
															style={{ color: 'red' }}
															className="fas fa-trash"
														></i>
													</Link>
												</div>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				{/* <!-- /.card-body --> */}
			</div>
			{/* <!-- /.card --> */}
			{/* <!-- /.content --> */}
		</>
	);
};

export default Table;
