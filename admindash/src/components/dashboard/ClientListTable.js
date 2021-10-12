import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispath, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteClient } from "../../actions/clientAction";
const Table = ({ clients }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteClient(id));
    }
  };
  return (
    <>
      {/* {/* <!-- Main content --> */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Clients</h3>
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body" style={{ "overflow-x": "auto" }}>
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
                <th>Edit/Delete</th>
              </tr>
            </thead>

            <tbody>
              {clients &&
                clients.map((client) => {
                  return (
                    <tr key={client._id}>
                      <td>{client.clientId}</td>
                      <td className="text-center">
                        <img width="40px" height="auto" src={client.dp} />
                      </td>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.address}</td>
                      <td>{client.phone}</td>
                      <td>{client.registrationNumber}</td>
                      <td>{client.createdAt.substring(0, 10)}</td>
                      <td>{client.updatedAt.substring(0, 10)}</td>
                      <td>
                        <Link to={`/admin/clients/${client._id}/edit`}>
                          <i
                            style={{ color: "blue" }}
                            className="fas fa-edit"
                          ></i>
                        </Link>

                        <Link to="#" onClick={() => deleteHandler(client._id)}>
                          <i
                            style={{ color: "red" }}
                            className="fas fa-trash"
                          ></i>
                        </Link>
                      </td>
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

export default Table;
