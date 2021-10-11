import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/dashboard";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
    
    return (
        <div >
            {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
        <div style={{height:"100vh"}} className=" d-flex justify-content-center align-items-center">
            <div className="login-box">
  {/* <!-- /.login-logo --> */}
  <div className="card mt-4">
                        <div className="card-body login-card-body">
                             <div className="login-logo">
    <img src="dist/img/AdminLTELogo.png" alt="Master Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <div className="pt-3" style={{fontFamily: "Arial"}}>
        <a href="/"><strong><h3>Saurya Auditors</h3></strong></a>
    </div>
  </div>
  <hr/>
      <p className="login-box-msg"><strong>Sign in to start your session</strong></p>

      <form onSubmit={submitHandler} method="post">
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember"/>
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          {/* <!-- /.col --> */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
          {/* <!-- /.col --> */}
        </div>
      </form>

      {/* <!-- /.social-auth-links --> */}
    </div>
    {/* <!-- /.login-card-body --> */}
  </div>
</div>
{/* <!-- /.login-box --> */}
            </div>
            </div>
    )
}

export default LoginScreen
