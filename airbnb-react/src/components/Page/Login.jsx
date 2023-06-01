import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginData, setLoginData] = useState({});
  const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/user-register");
    setListUser(result.data);
  };
  useEffect(() => {
    loadUser();
  }, []);
  console.log(listUser);
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = listUser.find(
      (user) =>
        user.name === loginData.name &&
        user.password === loginData.password &&
        user.email === loginData.email
    );

    if (foundUser) {
      localStorage.setItem("loginUser", JSON.stringify(foundUser));
      toast.success("Đăng nhập thành công", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } else {
      toast.error("Đăng nhập thất bại, Kiểm tra lại tài khoản hoặc email ");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "14px",
        backgroundImage: `url("https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="authincation h-75">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h4
                        className="text-center mb-4"
                        style={{
                          backgroundColor: "#ff385ce6",
                          color: "#fff",
                          padding: "12px",
                          borderRadius: "14px",
                        }}
                      >
                        Đăng nhập Airbnb
                      </h4>
                      <form
                        id="formModal"
                        action="index.html"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group">
                          <label>
                            <strong>Username</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Duy Khánh"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="hello@example.com"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            <strong>Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <div className="form-group">
                            <div className="form-check ml-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="basic_checkbox_1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <a href="page-forgot-password.html">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "#FF385C",
                              border: "none",
                            }}
                            className="btn btn-primary btn-block"
                          >
                            Đăng nhập
                          </button>
                        </div>
                        <ToastContainer />
                      </form>
                      <div className="new-account mt-3">
                        <p>
                          Don't have an account?{" "}
                          <Link
                            to={"/register"}
                            style={{
                              backgroundColor: "#FF385C",
                              border: "none",
                            }}
                            className="btn btn-modal btn-primary btn-block"
                          >
                            Đăng kí
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/***********************************
  Scripts
    ************************************/}
      {/* Required vendors */}
    </div>
  );
}

export default Login;
