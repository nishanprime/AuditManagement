import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClientDetailsAction } from '../../actions/clientAction';
import { createAuditorAction, deleteAuditor } from '../../actions/userActions';
const AuditedFileInfoTable = ({ history }) => {
	const [auditFiles, setAuditFiles] = useState([]);
	const [clientDetail, setClientDetails] = useState([]);
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const clientDetails = useSelector((state) => state.clientDetails);
	const { clients, loading, error } = clientDetails;

	useEffect(() => {
		if (clients.length === 0) {
			history.push('/dashboard');
		}
		if (!clients) {
			dispatch(getClientDetailsAction());
		} else {
			setClientDetails(clients);
		}
	}, [dispatch, clients, history]);
	return (
		<>
			{/* {/* <!-- Main content --> */}
			<div className="card">
				{/* <!-- /.card-header --> */}
				<div className="card-body" style={{ 'overflow-x': 'auto' }}>
					<table id="example1" className="table table-bordered table-striped">
						<thead>
							<tr>
								<th>Client Id</th>
								<th>Profile Picture</th>
								<th>Associated Client Name</th>
								<th>Audit File Name</th>
							</tr>
						</thead>

						<tbody>
							{clientDetail &&
								clientDetail.map((client) => {
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
											<Table
												striped
												bordered
												hover
												responsive
												className="table-sm"
											>
												<thead>
													<tr>
														<th>File Name</th>
														<th>Uploaded Data</th>
														<th>Download</th>
													</tr>
												</thead>
												<tbody>
													{client.images.map((auditFile) => {
														const fileName = auditFile
															.split('/')
															[auditFile.split('/').length - 1].split(
																'---|---'
															)[0];
														const date = auditFile
															.split('/')
															[auditFile.split('/').length - 1].split(
																'---|---'
															)[1];
														return (
															<tr key={auditFile}>
																<td>{fileName}</td>
																<td>
																	{new Date(parseInt(date)).toLocaleString()}
																</td>
																<td>
																	<a
																		href={auditFile}
																		target="_blank"
																		rel="noreferrer"
																	>
																		<i className="fas fa-download"></i>
																	</a>
																</td>
															</tr>
														);
													})}
												</tbody>
											</Table>
										</tr>
									);
								})}
							{/* {auditors.map(auditor)=> return(
              {
               
  }
            )} */}
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

export default AuditedFileInfoTable;
