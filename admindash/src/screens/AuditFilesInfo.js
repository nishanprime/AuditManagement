import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClientDetailsAction } from '../actions/clientAction';
import AuditedFileInfoTable from '../components/dashboard/AuditedFilesInfo';
import Breadcrumbs from '../components/dashboard/Breadcrumbs';
import Loader from '../components/Loader';
import Message from '../components/Message';
const AuditFilesInfo = ({ history }) => {
	const dispatch = useDispatch();
	const clientDetails = useSelector((state) => state.clientDetails);
	const { clients, loading, error } = clientDetails;

	useEffect(() => {
		if (!clients) {
			dispatch(getClientDetailsAction());
		}
	}, [dispatch, clients]);

	return (
		<div className="content-wrapper">
			{loading ? (
				<Loader />
			) : error ? (
				<Message></Message>
			) : (
				<div>
					<Breadcrumbs page="Audited Files" />
					<AuditedFileInfoTable history={history} />
				</div>
			)}
		</div>
	);
};

export default AuditFilesInfo;
