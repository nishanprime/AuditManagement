import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Table = ({ auditors }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // dispatch(deleteClient(id));
    }
  };
  const editHandler = (id) => {};
  return (
    <>
      {/* {/* <!-- Main content --> */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">DataTable with default features</h3>
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body" style={{"overflow-x":"auto"}}>
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Auditor ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Updated Date</th>
                <th>Is Master</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>

            <tbody>
              {auditors.map((audi) => {
                return (
                  <tr>
                    <td>{audi._id}</td>
                    <td className="text-center"><img width="40px" height="auto"  src={audi.dp}/></td>
                    <td>{audi.name}</td>
                    <td>{audi.email}</td>
                    <td>{audi.createdAt.substring(0, 10)}</td>
                    <td>{audi.updatedAt.substring(0, 10)}</td>
                    <td>
                      {audi.isMaster ? (
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times"
                        ></i>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {userInfo._id === audi._id ? (
                          <Link to={`/master/auditor/${audi._id}/edit`}>
                            <i
                              style={{ color: "blue" }}
                              className="fas fa-edit"
                            ></i>
                          </Link>
                        ) : userInfo.isMaster ? (
                          <Link to={`/master/auditor/${audi._id}/edit`}>
                            <i
                              style={{ color: "blue" }}
                              className="fas fa-edit"
                            ></i>
                          </Link>
                        ) : null}
                        {userInfo._id ===
                        audi._id ? null : userInfo.isMaster ? (
                          <Link to="#" onClick={() => deleteHandler(audi._id)}><i
                            style={{ color: "red" }}
                            className="fas fa-trash"
                          ></i></Link>
                        ) : null}
                      </div>
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
