import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createClientAction,
  deleteClient,
  getClientDetailsAction,
} from "../actions/clientAction";
import { CLIENT_CREATE_RESET } from "../constants/clientConstants";
import { Link } from "react-router-dom";

const ClientListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const clientDetails = useSelector((state) => state.clientDetails);
  const { loading, error, clients } = clientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clientDelete = useSelector((state) => state.clientDelete);
  const { success: successDelete, loading: loadingDelete } = clientDelete;

  const createClientHandler = () => {
    dispatch(createClientAction());
  };

  const clientCreate = useSelector((state) => state.clientCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
    createdClient,
  } = clientCreate;
  useEffect(() => {
    dispatch({ type: CLIENT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (createSuccess) {
      history.push(`/admin/clients/${createdClient._id}/edit`);
    } else {
      dispatch(getClientDetailsAction());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    createSuccess,
    createdClient,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteClient(id));
    }
  };
  return (
    //  <!-- Content Wrapper. Contains page content -->
  <div className="content-wrapper">
    {/* <!-- Content Header (Page header) --> */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="#">Home</Link></li>
              <li className="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
        </div>
        {/* <!-- /.container-fluid --> */}
    </section>

    {/* <!-- Main content --> */}
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">

            {/* <!-- Profile Image --> */}
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle"
                       src="../../dist/img/user4-128x128.jpg"
                       alt="User profile picture"/>
                </div>

                <h3 className="profile-username text-center">Nina Mcintire</h3>

                <p className="text-muted text-center">Software Engineer</p>

                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Followers</b> <Link className="float-right">1,322</Link>
                  </li>
                  <li className="list-group-item">
                    <b>Following</b> <Link className="float-right">543</Link>
                  </li>
                  <li className="list-group-item">
                    <b>Friends</b> <Link className="float-right">13,287</Link>
                  </li>
                </ul>

                <Link to="#" className="btn btn-primary btn-block"><b>Follow</b></Link>
              </div>
              {/* <!-- /.card-body --> */}
            </div>
            {/* <!-- /.card --> */}

            {/* <!-- About Me Box --> */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">About Me</h3>
              </div>
              {/* <!-- /.card-header --> */}
              <div className="card-body">
                <strong><i className="fas fa-book mr-1"></i> Education</strong>

                <p className="text-muted">
                  B.S. in Computer Science from the University of Tennessee at Knoxville
                </p>

                <hr/>

                <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>

                <p className="text-muted">Malibu, California</p>

                <hr/>

                <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>

                <p className="text-muted">
                  <span className="tag tag-danger">UI Design</span>
                  <span className="tag tag-success">Coding</span>
                  <span className="tag tag-info">Javascript</span>
                  <span className="tag tag-warning">PHP</span>
                  <span className="tag tag-primary">Node.js</span>
                </p>

                <hr/>

                <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>

                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
              </div>
              {/* <!-- /.card-body --> */}
            </div>
            {/* <!-- /.card --> */}
          </div>
          {/* <!-- /.col --> */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item"><Link className="nav-link active" to="#activity" data-toggle="tab">Activity</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="#timeline" data-toggle="tab">Timeline</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="#settings" data-toggle="tab">Settings</Link></li>
                </ul>
                </div>
                {/* <!-- /.card-header --> */}
              <div className="card-body">
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                    {/* <!-- Post --> */}
                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image"/>
                        <span className="username">
                          <Link to="#">Jonathan Burke Jr.</Link>
                          <Link to="#" className="float-right btn-tool"><i className="fas fa-times"></i></Link>
                        </span>
                        <span className="description">Shared publicly - 7:30 PM today</span>
                      </div>
                      {/* <!-- /.user-block --> */}
                      <p>
                        Lorem ipsum represents Link long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <p>
                        <Link to="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</Link>
                        <Link to="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</Link>
                        <span className="float-right">
                          <Link to="#" className="link-black text-sm">
                            <i className="far fa-comments mr-1"></i> Comments (5)
                          </Link>
                        </span>
                      </p>

                      <input className="form-control form-control-sm" type="text" placeholder="Type Link comment"/>
                    </div>
                    {/* <!-- /.post --> */}

                    {/* <!-- Post --> */}
                    <div className="post clearfix">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image"/>
                        <span className="username">
                          <Link to="#">Sarah Ross</Link>
                          <Link to="#" className="float-right btn-tool"><i className="fas fa-times"></i></Link>
                        </span>
                        <span className="description">Sent you Link message - 3 days ago</span>
                      </div>
                      {/* <!-- /.user-block --> */}
                      <p>
                        Lorem ipsum represents Link long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <form className="form-horizontal">
                        <div className="input-group input-group-sm mb-0">
                          <input className="form-control form-control-sm" placeholder="Response"/>
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-danger">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!-- /.post --> */}

                    {/* <!-- Post --> */}
                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image"/>
                        <span className="username">
                          <Link to="#">Adam Jones</Link>
                          <Link to="#" className="float-right btn-tool"><i className="fas fa-times"></i></Link>
                        </span>
                        <span className="description">Posted 5 photos - 5 days ago</span>
                      </div>
                      {/* <!-- /.user-block --> */}
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo"/>
                        </div>
                        {/* <!-- /.col --> */}
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-6">
                              <img className="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo"/>
                              <img className="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo"/>
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-6">
                              <img className="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo"/>
                              <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo"/>
                            </div>
                            {/* <!-- /.col --> */}
                          </div>
                          {/* <!-- /.row --> */}
                        </div>
                        {/* <!-- /.col --> */}
                      </div>
                      {/* <!-- /.row --> */}

                      <p>
                        <Link to="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</Link>
                        <Link to="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</Link>
                        <span className="float-right">
                          <Link to="#" className="link-black text-sm">
                            <i className="far fa-comments mr-1"></i> Comments (5)
                          </Link>
                        </span>
                      </p>

                      <input className="form-control form-control-sm" type="text" placeholder="Type Link comment"/>
                    </div>
                    {/* <!-- /.post --> */}
                  </div>
                  {/* <!-- /.tab-pane --> */}
                  <div className="tab-pane" id="timeline">
                    {/* <!-- The timeline --> */}
                    <div className="timeline timeline-inverse">
                      {/* <!-- timeline time label --> */}
                      <div className="time-label">
                        <span className="bg-danger">
                          10 Feb. 2014
                        </span>
                      </div>
                      {/* <!-- /.timeline-label --> */}
                      {/* <!-- timeline item --> */}
                      <div>
                        <i className="fas fa-envelope bg-primary"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 12:05</span>

                          <h3 className="timeline-header"><Link to="#">Support Team</Link> sent you an email</h3>

                          <div className="timeline-body">
                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                            weebly ning heekya handango imeem plugg dopplr jibjab, movity
                            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                            quora plaxo ideeli hulu weebly balihoo...
                          </div>
                          <div className="timeline-footer">
                            <Link to="#" className="btn btn-primary btn-sm">Read more</Link>
                            <Link to="#" className="btn btn-danger btn-sm">Delete</Link>
                          </div>
                        </div>
                      </div>
                      {/* <!-- END timeline item --> */}
                      {/* <!-- timeline item --> */}
                      <div>
                        <i className="fas fa-user bg-info"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 5 mins ago</span>

                          <h3 className="timeline-header border-0"><Link to="#">Sarah Young</Link> accepted your friend request
                          </h3>
                        </div>
                      </div>
                      {/* <!-- END timeline item --> */}
                      {/* <!-- timeline item --> */}
                      <div>
                        <i className="fas fa-comments bg-warning"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 27 mins ago</span>

                          <h3 className="timeline-header"><Link to="#">Jay White</Link> commented on your post</h3>

                          <div className="timeline-body">
                            Take me to your leader!
                            Switzerland is small and neutral!
                            We are more like Germany, ambitious and misunderstood!
                          </div>
                          <div className="timeline-footer">
                            <Link to="#" className="btn btn-warning btn-flat btn-sm">View comment</Link>
                          </div>
                        </div>
                      </div>
                      {/* <!-- END timeline item --> */}
                      {/* <!-- timeline time label --> */}
                      <div className="time-label">
                        <span className="bg-success">
                          3 Jan. 2014
                        </span>
                      </div>
                      {/* <!-- /.timeline-label --> */}
                      {/* <!-- timeline item --> */}
                      <div>
                        <i className="fas fa-camera bg-purple"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 2 days ago</span>

                          <h3 className="timeline-header"><Link to="#">Mina Lee</Link> uploaded new photos</h3>

                          <div className="timeline-body">
                            <img src="https://placehold.it/150x100" alt="..."/>
                            <img src="https://placehold.it/150x100" alt="..."/>
                            <img src="https://placehold.it/150x100" alt="..."/>
                            <img src="https://placehold.it/150x100" alt="..."/>
                          </div>
                        </div>
                      </div>
                      {/* <!-- END timeline item --> */}
                      <div>
                        <i className="far fa-clock bg-gray"></i>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /.tab-pane --> */}

                  <div className="tab-pane" id="settings">
                    <form className="form-horizontal">
                      <div className="form-group row">
                        <label for="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                          <input type="email" className="form-control" id="inputName" placeholder="Name"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName2" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputName2" placeholder="Name"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                        <div className="col-sm-10">
                          <textarea className="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputSkills" placeholder="Skills"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox"/> I agree to the <Link to="#">terms and conditions</Link>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.tab-pane --> */}
                </div>
                {/* <!-- /.tab-content --> */}
                </div>
                {/* <!-- /.card-body --> */}
            </div>
            {/* <!-- /.card --> */}
          </div>
          {/* <!-- /.col --> */}
        </div>
        {/* <!-- /.row --> */}
        </div>
        {/* <!-- /.container-fluid --> */}
    </section>
    {/* <!-- /.content --> */}
  </div>
  );
};

export default ClientListScreen;
