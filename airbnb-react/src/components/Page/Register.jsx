import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ipad from '../../video/Ipad.mp4';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Kiem tra validate cua form
import { withFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
    const [registered, setRegistered] = useState({
        name: "",
        email: "",
        password: "",
        message: "",
        errorMessage: "",
        selectedItems: []
    });

    const navigate = useNavigate();
    const { message, errorMessage } = registered;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registered.name !== '' && registered.email !== '' && registered.password !== '') {
            await axios
                .post('http://localhost:8000/user-register', registered)
                .then((res) => {
                    setRegistered({
                        ...registered,
                        message: 'Tài khoản của bạn đã được đăng kí thành công'
                    });
                    toast.success('Vui lòng chờ 1 chút để chuyển trang login', {
                        width: '200px',
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
                        navigate('/login');
                    }, 4000);
                })
                .catch((err) => {
                    setRegistered({
                        ...registered,
                        errorMessage: 'Tài khoản đã tồn tại hoặc có lỗi xảy ra.'
                    });
                    toast.error('Tài khoản đã tồn tại hoặc có lỗi xảy ra.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        } else {

        }


    };

    return (
        <div style={{ height: '100vh' }}>
            <div className="authincation h-100">
                <video src={Ipad} autoPlay loop muted />
                <div
                    className="content-register container-fluid h-100"
                    style={{ marginTop: '54px' }}
                >
                    <div className="row justify-content-center h-100 align-items-center">
                        <div
                            className="col-md-6"
                            style={{ marginBottom: '100px' }}
                        >
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <h4 className="text-center mb-4"
                                                style={{ backgroundColor: '#ff385cc7', color: '#fff', padding: '12px', borderRadius: '14px' }}
                                            >
                                                Đăng kí tài khoản
                                            </h4>
                                            {message && <p className="text-success">{message}</p>}
                                            {errorMessage && <p className="text-error">{errorMessage}</p>}

                                            <form id="form_modal" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>
                                                        <strong>Username</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name='name'
                                                        id="username_signup"
                                                        className="form-control"
                                                        placeholder="username"
                                                        onChange={(e) =>
                                                            setRegistered({
                                                                ...registered,
                                                                name: e.target.value
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>
                                                        <strong>Email</strong>
                                                    </label>
                                                    <input
                                                        name='email'
                                                        type="email"
                                                        id="email_signup"
                                                        className="form-control"
                                                        placeholder="hello@example.com"
                                                        onChange={(e) =>
                                                            setRegistered({
                                                                ...registered,
                                                                email: e.target.value
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>
                                                        <strong>Password</strong>
                                                    </label>
                                                    <input
                                                        name='password'
                                                        type="password"
                                                        id="password_signup"
                                                        className="form-control"
                                                        defaultValue="Password"
                                                        onChange={(e) =>
                                                            setRegistered({
                                                                ...registered,
                                                                password: e.target.value
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <button
                                                        type="submit"
                                                        style={{ backgroundColor: "#FF385C", border: "none" }}
                                                        className="btn btn-modal btn-primary btn-block"

                                                    >
                                                        Đăng kí
                                                    </button>
                                                </div>
                                                <ToastContainer />
                                            </form>
                                            <div className="new-account mt-3">
                                                <p>
                                                    Already have an account?{" "}
                                                    <Link to={"/login"}
                                                        style={{ backgroundColor: "#FF385C", border: "none" }}
                                                        className="btn btn-modal btn-primary btn-block"
                                                    >
                                                        Đăng nhập
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
        </div>
    );
}

export default Register;