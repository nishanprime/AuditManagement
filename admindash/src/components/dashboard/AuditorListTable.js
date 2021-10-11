import React from 'react'

const Table = () => {
    return (
        <>       
            {/* {/* <!-- Main content --> */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">DataTable with default features</h3>
                </div>
              {/* <!-- /.card-header --> */}
          <div className="card-body" style={{ "overflow-x": "auto"}}>
                <table id="example1" className="responsive table table-bordered table-striped ">
                  <thead>
                  <tr>
                    <th>Auditor ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined Date</th>
                    <th>Updated Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Trident</td>
                    <td  className="text-center"><img src="https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg" width="60" height="auto" alt=""/>
                    </td>
                    <td>Win 95+</td>
                    <td> 4</td>
                    <td>X</td>
                    <td>a</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              {/* <!-- /.card-body --> */}
            </div>
            {/* <!-- /.card --> */}
            {/* <!-- /.content --> */}
            
        </>
    )
}

export default Table
