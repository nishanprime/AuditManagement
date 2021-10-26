import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getClientDetailsAction } from '../actions/clientAction';
import Table from '../components/dashboard/AuditorListTable';
import Breadcrumbs from '../components/dashboard/Breadcrumbs';

const Auditors = ({ auditors }) => {
	const dispatch = useDispatch();
	const auditorDelete = useSelector((state) => state.auditorDelete);

	const {
		loading: auditorDeleteLoading,
		error: auditorDeleteError,
		success: auditorDeleteSuccess,
	} = auditorDelete;

	const clientDetails = useSelector((state) => state.clientDetails);
	const { clients } = clientDetails;

	useEffect(() => {
		if (!clients) {
			dispatch(getClientDetailsAction());
		}
	}, [auditorDeleteSuccess, dispatch]);

	return (
		<>
			<div className="content-wrapper">
				<Breadcrumbs page="Auditors" />
				{/* Main content */}
				<section className="content">
					<div className="container-fluid">
						{/* Main row */}
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							auditors && <Table auditors={auditors} />
						)}

						{/* /.row (main row) */}
					</div>
					{/* /.container-fluid */}
				</section>
				{/* /.content */}
			</div>
		</>
	);
};

export default Auditors;
