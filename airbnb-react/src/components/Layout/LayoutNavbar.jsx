import React, { useState } from 'react';
import './LayoutNavbar.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { search } from '../../action';

function LayoutNavbar() {
    // Kiểm tra xem có tài khoản đăng nhập ko?
    const loginUser = [];
    
    if (localStorage.getItem('loginUser')) {
        loginUser.push(JSON.parse(localStorage.getItem('loginUser')));
    }
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem('loginUser'); // Xóa giá trị loginUser trong localStorage
    };
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }
    const handleSearchInput = (e) => {
        dispatch(search(e.target.value))
    }

    return (
        <div>
            <header>
                <Link to="/">
                    <img
                        style={{ width: 100, objectFit: "contain" }}
                        src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/Airbnb-logo.jpg?alt=media&token=c0a8332d-edb1-47a0-8b88-4a06c7b5f36f"
                        alt=""
                    />
                </Link>
                <div className="header-search">
                    <input
                        type="text"
                        placeholder="Địa điểm bất kì | Tuần bất kì | Thêm khách......"
                        onChange={handleSearchInput}
                    />
                    <button style={{ width: 33 }}>
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
                <div className="header-user">
                    <p>Cho thuê chỗ ở qua Airbnb</p>
                    <i className="fa-solid fa-earth-americas" />
                    <div className="user-login" onClick={handleShow}>
                        <div id="userinfo" className="user-info">
                            <i className="fa-solid fa-bars" />
                            {loginUser ? (
                                <img src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/profile.png?alt=media&token=8e9fab74-409c-47e3-908e-774232b7554d" style={{ width: '30px' }} />

                            ) : (
                                <i className="fa-solid fa-user user-img" />
                            )}

                        </div>
                        <div className={show ? "login" : "login-hide"}>

                            {loginUser ? (
                                <span>Bạn đã đăng nhập thành công</span>

                            ) : (
                                <Link to={'/register'}
                                    id="register"
                                    className='user-option-select'
                                    style={{ color: "black", display: 'inline-block', lineHeight: '1.5', width: '100%' }}>
                                    Đăng kí
                                </Link>
                            )}
                            <br />
                            {loginUser ? (
                                <Link to={'/login'}
                                    className='user-option-select'
                                    id="login"
                                    style={{ color: "black", display: 'inline-block', lineHeight: '1.5', width: '100%' }}
                                    onClick={handleLogout}>
                                    Đăng xuất
                                </Link>

                            ) : (
                                <Link to={'/login'} id="login" className='user-option-select' style={{ color: "black", display: 'inline-block', lineHeight: '1.5', width: '100%' }}>
                                    Đăng nhập
                                </Link>
                            )}

                            <br />
                            <Link to={"/usercart"} className='user-option-select' style={{ color: "black", display: 'inline-block', lineHeight: '1.5', width: '100%' }}>
                                Quản lí đặt phòng
                            </Link>
                            <p className='user-option-select'>Trợ giúp</p>
                        </div>
                    </div>
                </div>
            </header >
        </div >
    );
}

export default LayoutNavbar;
