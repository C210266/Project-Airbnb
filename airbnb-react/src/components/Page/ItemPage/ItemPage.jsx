import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ItemPage.css';
import { date } from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { payment_info } from '../../../action';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ItemPage() {
    const [item, setItem] = useState({
        address: '',
        id: '',
        img: '',
        name: '',
        price: '',
        rating: '',
    })
    let dispatch = useDispatch();

    const { id, name, address, price, rating, img } = item;
    const { idItem } = useParams();
    const [dateIn, setDateIn] = useState('');
    const [showSelect, setShowSelect] = useState(false);
    const [dateOut, setDateOut] = useState('');
    const [showBtn, setShowBtn] = useState(false);

    const [sumPayment, setSumPayment] = useState('');
    const navigate = useNavigate();

    // Click show Modal

    const [show, setShow] = useState(false);
    const [complete, setComplete] = useState('');
    console.log(item)
    console.log(complete)
    const handleClose = () => setShow(false);

    // End Show Modal


    const [selectData, setSelectData] = useState([
        {
            id: 1,
            name: 'Người lớn',
            descrip: 'Từ 18 tuổi trở lên',
            quantity: 1
        },
        {
            id: 2,
            name: 'Trẻ em',
            descrip: 'Từ 13 đến 17 tuổi',
            quantity: 1
        },
        {
            id: 3,
            name: 'Em bé',
            descrip: 'Dưới 6 tuổi',
            quantity: 1
        },
    ])


    const handleChangeDateIn = (e) => {
        const value = e.target.value;
        setDateIn(value);

    };
    const handleChangeDateOut = (e) => {
        setDateOut(e.target.value)
    }

    const handleShowBtn = () => {
        setShowSelect(!showSelect);
    }

    // Plus
    const handlePlusBtn = (id) => {
        setSelectData((prevSelectData) => {
            const updatedData = prevSelectData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });

            // Update the result element
            const result = document.getElementById('result');
            if (result) {
                result.innerText = updatedData
                    .map((item) => `${item.name}: ${item.quantity}`)
                    .join(', ');
            }
            return updatedData;
        }
        )

    };

    // Minus
    const handleMinusBtn = (id) => {
        setSelectData((prevSelectData) => {
            const updatedData = prevSelectData.map((item) => {
                if (item.id === id && item.quantity > 0) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });

            // Update the result element
            const result = document.getElementById('result');
            if (result) {
                result.innerText = updatedData
                    .map((item) => `${item.name}: ${item.quantity}`)
                    .join(', ');
            }
            return updatedData;
        }
        )
    };

    // LocalStore loginUserData
    let loginUser = {};
    if (localStorage.getItem('loginUser')) {
        loginUser = JSON.parse(localStorage.getItem('loginUser'));
    }

    // Submit
    const MySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedDateIn = new Date(dateIn);
        const parsedDateOut = new Date(dateOut);

        const timeDiff = parsedDateOut.getTime() - parsedDateIn.getTime();
        const daysCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysCount > 0) {
            const service_money = document.getElementById('service_money');
            service_money.innerText = '40$'

            const clear_money = document.getElementById('clear_money');
            clear_money.innerText = '20$';

            const total = document.getElementById('total');
            const totalPrice = price * daysCount
            total.innerHTML = `${price}$/ 1 tonight * ${daysCount} = ${totalPrice}$`

            const sum_money = document.getElementById('sum_money');
            const sum = totalPrice + 60;
            setSumPayment(sum);
            sum_money.innerText = `${sum}$`;
            MySwal.fire({
                title: <strong>Good job!</strong>,
                html: <i>Chúc mừng bạn đã đăt phòng thành công </i>,
                icon: 'success'
            })
            setShowBtn(true);
            let foundIndex = loginUser.selectedItems.findIndex((item) => item.id === id);
            if (foundIndex !== -1) {
                loginUser.selectedItems[foundIndex] = {
                    ...loginUser.selectedItems[foundIndex],
                    dateIn: dateIn,
                    dateOut: dateOut,
                    complete: 'pending'
                };
                localStorage.setItem('loginUser', JSON.stringify(loginUser));
            }
        }


    };
    const handleClickChangePage = () => {

        MySwal.fire({
            title: 'Bạn chắc chắn muốn thanh toán chứ?',
            text: "No comeback, ok bro?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Okkkkk!'
        }).then((result) => {
            if (result.isConfirmed) {
                setShow(true);
            }
        })
    }
    const handleChangeRoute = () => {
        navigate('/payment');
        dispatch(payment_info(selectData, dateIn, dateOut, sumPayment, item))

    }

    const loadUser = async () => {
        const result1 = await axios.get(`http://localhost:8000/items/${idItem}`)
        setItem(result1.data);
        const result2 = await axios.get(`http://localhost:8000/user-register/${idItem}`)
        setComplete(result2.data);
    }
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="item-user">
                    <h3 id="name">{name}</h3>
                    <div className="user-info">
                        <div className="user-rate">
                            <i className="fa-solid fa-star">
                                <span className="rating" />
                            </i>
                            <a href="">129 đánh giá</a>
                            <a href="" id="address">
                                El Nido,Phillippines
                            </a>
                            <span>-  {address}</span>
                        </div>
                        <div className="user-favor">
                            <i className="fa-solid fa-share" />
                            Share
                            <i className="fa-regular fa-heart" />
                            Heart
                        </div>
                    </div>
                    <div className="item-image">
                        <div className="col-6">
                            <img
                                className="main-img"
                                style={{ width: "100%" }}
                                src={img}
                                alt=""
                            />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }} className="col-6">
                            <img
                                className="col-6"
                                src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/0cbb0adc-0189-4e82-bc33-9b1f5fbebfdb.jpg?alt=media&token=899603a4-9733-49ec-b837-262465ab4fd6"
                                alt=""
                            />
                            <img
                                className="col-6"
                                src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/d682f7bf-caa4-4433-9038-c5f81a01845b.jpg?alt=media&token=dcfc869f-87f4-4565-953d-3d583b38ed0b"
                                alt=""
                            />
                            <img
                                className="col-6"
                                src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/9025e20a-eda6-46e3-a7c4-40dc5d568cb0.jpg?alt=media&token=4d36a578-54d2-4589-861e-ae31260b1850"
                                alt=""
                            />
                            <img
                                className="col-6"
                                src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/b194d187-e28f-4255-9c74-5fb34dfb0e2d.jpg?alt=media&token=dd7973df-3db8-44e3-b04b-ce23ebff94c9"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="item-content d-flex">
                    <div className="content-main col-7">
                        <div className="content-title mg-bor">
                            <h4>Đảo. Chủ nhà Alfred Lee</h4>
                            <p>Trên 16 khách . 7 phòng ngủ . 11 giường . 3 phòng tắm</p>
                            <div className="content-owner">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="content-more mg-bor">
                            <div className="content-more-icon d-flex">
                                <i className="fa-solid fa-location-dot " />
                                <div className="content-more-text">
                                    <h5>Địa điểm tuyệt vời</h5>
                                    <p>100% khach gan day da sap xep 5 sao cho vi tri nay</p>
                                </div>
                            </div>
                            <div className="content-more-icon d-flex">
                                <i className="fa-solid fa-location-dot" />
                                <div className="content-more-text">
                                    <h4>Hoan nghênh thú cưng</h4>
                                    <p>Mang theo thú cưng đến chỗ ở</p>
                                </div>
                            </div>
                        </div>
                        <div className="content-text mg-bor">
                            <img
                                style={{ width: 200, margin: "16px 0", height: 42 }}
                                src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.webp?alt=media&token=97a59b22-4fc9-413f-bb46-f65094126d01"
                                alt=""
                            />
                            <p>
                                Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy,
                                thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như
                                sự cố trong quá trình nhận phòng
                            </p>
                            <a href="">Tìm hiểu thêm</a>
                        </div>
                        <div className="content-auth mg-bor">
                            <p>
                                Một số thông tin đã được dịch tự động.{" "}
                                <a href="">Hiển thị ngôn ngữ gốc</a>
                            </p>
                            <p>Hòn đảo riêng duy nhất và bãi biển trắng nhất ở El Nido</p>
                            <p>Sở Du Kịch(Sở VHTTDL) công nhận</p>
                            <p>Bao gồm Gói không lo lắng:</p>
                            <p>.....</p>
                            <a href="">Hiển thị thêm </a>
                        </div>
                        <div className="content-locate mg-bor pb-5">
                            <h4>Nơi bạn sẽ ngủ nghỉ</h4>
                            <div className="main-locate d-flex mt-4">
                                <div className="content-locate-1">
                                    <i className="fa-solid fa-bed" />
                                    <i className="fa-solid fa-bed" />
                                    <p>Phòng ngủ 1</p>
                                    <p>2 giường đơn</p>
                                </div>
                                <div className="content-locate-1">
                                    <i className="fa-solid fa-bed" />
                                    <p>Phòng ngủ 2</p>
                                    <p>1 giường đơn</p>
                                </div>
                                <div className="content-locate-1">
                                    <i className="fa-solid fa-bed" />
                                    <p>Phòng ngủ 2</p>
                                    <p>1 giường đơn</p>
                                </div>
                            </div>
                        </div>
                        <div className="content-add mg-bor ">
                            <h4 className="mb-4">Nơi này có những gì cho bạn</h4>
                            <div className="add-main d-flex">
                                <div className="content-add-left ">
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-umbrella-beach" />
                                        <span>Lối ra bãi biển</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-wifi" />
                                        <span>Wifi</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-car" />
                                        <span>Chỗ đỗ xe</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-tv" />
                                        <span>TV</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-regular fa-hard-drive" />
                                        <span>Máy phát khí CO</span>
                                    </div>
                                </div>
                                <div className="content-add-right ">
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-kitchen-set" />
                                        <span>Không gian bếp</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-tablet" />
                                        <span>Khu vực rộng rãi</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-paw" />
                                        <span>Thú cưng</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-tv" />
                                        <span>TV</span>
                                    </div>
                                    <div className="add-item mb-2">
                                        <i className="fa-solid fa-hippo" />
                                        <span>Có sân riêng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-date">
                            <h4>Chọn ngày trả phòng</h4>
                            <p>Thời gian ở tối thiểu : 2 đêm</p>
                            <div className="content-calendar" id="calendar"></div>
                        </div>
                    </div>
                    <div className="content-extra col-5" >
                        <del>11.545.123</del>
                        <span>
                            $ <span id="money" />{price}/ đêm
                        </span>
                        <p>
                            <i className="fa-solid fa-star" /> <span className="rating" />.{" "}
                            <a href="">{rating} đánh giá</a>
                        </p>
                        <form
                            id="extra-room"
                            onSubmit={handleSubmit}
                        >
                            <div className="room-btn p-2 ">
                                <div className="room-main">
                                    <div
                                        className="extra-room-input pb-3"
                                        style={{ borderRight: "1px solid #999" }}
                                    >
                                        <p className="mb-0">Nhận phòng</p>
                                        <input
                                            type="date"
                                            className="inputData"
                                            name="themngay"
                                            id="themngay1"

                                            onChange={handleChangeDateIn}
                                        />
                                    </div>
                                    <div className="extra-room-output">
                                        <p className="mb-0">Trả phòng</p>
                                        <input
                                            type="date"
                                            className="inputData"
                                            name="themngay"
                                            id="themngay2"

                                            onChange={handleChangeDateOut}
                                        />
                                    </div>
                                </div>
                                {/* User-select */}
                                <div
                                    style={{
                                        width: "100%",
                                        height: 30,
                                        textAlign: "start",
                                        justifyContent: "space-between"
                                    }}
                                    className="pt-2 user-select"
                                >
                                    <p>Khách</p>
                                    <p id="result" />
                                    <i id="arrow-up"
                                        className={showSelect ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'}
                                        onClick={handleShowBtn}
                                    />
                                    <div className={showSelect ? 'user-option' : 'user-option hidden'}>

                                        {selectData.map((e, i) => (
                                            <div className="user-item">
                                                <div className="user-option-name">
                                                    <p className="user-option-childName">{e.name}</p>
                                                    <p>{e.descrip}</p>
                                                </div>
                                                <div className="user-option-count">
                                                    <i
                                                        id="minus-btn"
                                                        style={{ border: "1px solid #999", borderRadius: "50%" }}
                                                        className="btn-logic fa-solid fa-minus p-2"
                                                        onClick={() => handleMinusBtn(e.id)}
                                                    />
                                                    <span id="quantity">{e.quantity}</span>
                                                    <i
                                                        id="plus-btn"
                                                        style={{ border: "1px solid #999", borderRadius: "50%" }}
                                                        className="btn-logic fa-solid fa-plus p-2"
                                                        onClick={() => handlePlusBtn(e.id)}
                                                    />
                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </div>
                            {!showBtn ? (
                                <button
                                    id="btn-set"
                                    className="btn w-100 p-2 mt-3"
                                    style={{ border: "none", color: "white" }}
                                >
                                    Kiểm tra đặt phòng
                                </button>
                            ) : ''}
                        </form>
                        <p
                            className="result"
                            id="result-tex"
                            style={{ color: "red", display: "none" }}
                        >
                            Bạn vẫn chưa bị trừ tiền
                        </p>
                        <span>Phí dịch vụ :</span> <span id="service_money">0</span>
                        <br />
                        <span>Phí vệ sinh</span> <span id="clear_money">0</span>
                        <br />
                        <span>Tổng trước thuế : </span>
                        <span id="total" />
                        <hr />
                        <span>Số tiền phải trả là : </span> <span id="sum_money" />
                        {!showBtn ? '' : (
                            <button
                                id="btn-set"
                                className="btn w-100 p-2 mt-3"
                                style={{ border: "none", color: "white" }}
                                onClick={handleClickChangePage}
                            >
                                Đặt phòng
                            </button>
                        )}

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Đây là thông tin thanh toán của bạn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Hãy xác nhận trước khi qua trang thanh toán!</Modal.Body>
                            <Modal.Body>
                                Ngày nhận phòng : {dateIn}
                                <br />
                                Ngày trả phòng  : {dateOut}
                                <br />
                                Số lượng khách (ko tính trẻ em ) : {selectData[0].quantity}
                                <br />
                                <b style={{ color: 'red' }}> Số tiền cần thanh toán : {sumPayment}$</b>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={handleChangeRoute}>
                                    Xác nhận
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <h4>4,81.129 đánh giá</h4>
                <div className="item-rate d-flex mg-bor">
                    <div className="rate-info-left m-lg-2 col-6">
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-user">
                            <div className="rate-user-info d-flex">
                                <div className="rate-user-img">
                                    <i className="fa-solid fa-user-nurse" />
                                </div>
                                <div className="rate-user-time pt-2">
                                    <p className="mb-0">Alan</p>
                                    <p>tháng 4 năm 2023</p>
                                </div>
                            </div>
                            <p>
                                Đây là một nơi tuyệt vời, nó rất thư giãn và là một nơi hoàn hảo để
                                yên tâm
                            </p>
                        </div>
                        <div className="rate-user">
                            <div className="rate-user-info d-flex">
                                <div className="rate-user-img">
                                    <i className="fa-solid fa-user-nurse" />
                                </div>
                                <div className="rate-user-time pt-2">
                                    <p className="mb-0">Alan</p>
                                    <p>tháng 4 năm 2023</p>
                                </div>
                            </div>
                            <p>
                                Đây là một nơi tuyệt vời, nó rất thư giãn và là một nơi hoàn hảo để
                                yên tâm
                            </p>
                        </div>
                    </div>
                    <div className="rate-info-right m-lg-2 col-6">
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-info d-flex justify-content-between">
                            <span>Mức độ sạch sẽ</span>
                            <div
                                className="progress w-25"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div className="progress-bar w-75" />
                            </div>
                        </div>
                        <div className="rate-user">
                            <div className="rate-user-info d-flex">
                                <div className="rate-user-img">
                                    <i className="fa-solid fa-user-nurse" />
                                </div>
                                <div className="rate-user-time pt-2">
                                    <p className="mb-0">Alan</p>
                                    <p>tháng 4 năm 2023</p>
                                </div>
                            </div>
                            <p>
                                Đây là một nơi tuyệt vời, nó rất thư giãn và là một nơi hoàn hảo để
                                yên tâm
                            </p>
                        </div>
                        <div className="rate-user">
                            <div className="rate-user-info d-flex">
                                <div className="rate-user-img">
                                    <i className="fa-solid fa-user-nurse" />
                                </div>
                                <div className="rate-user-time pt-2">
                                    <p className="mb-0">Alan</p>
                                    <p>tháng 4 năm 2023</p>
                                </div>
                            </div>
                            <p>
                                Đây là một nơi tuyệt vời, nó rất thư giãn và là một nơi hoàn hảo để
                                yên tâm
                            </p>
                        </div>
                    </div>
                </div>
                <h4 style={{ margin: "20px 0" }} className="">
                    Nơi bạn sẽ đến
                </h4>
                <div className="item-locate mg-bor ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.376014698655!2d105.778415410944!3d21.017635580548113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ab30540137%3A0x35ac90387f094f93!2zVMOyYSBuaMOgIFPDtG5nIMSQw6A!5e0!3m2!1svi!2s!4v1681950406834!5m2!1svi!2s"
                        width="100%"
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="locate-info pb-4">
                        <h4 style={{ margin: "20px 0" }} className="">
                            El Nido,Phillipines
                        </h4>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi odio
                            ut beatae sunt ratione soluta iste perferendis voluptate magni.
                            Architecto consequatur alias quis accusamus eaque voluptatem illo minus
                            cum voluptate!
                        </p>
                    </div>
                </div>
                <div className="item-owner pt-3 mg-bor pb-5">
                    <div className="owner-info d-flex ">
                        <i
                            style={{ lineHeight: '49px', fontSize: 40, marginRight: 15 }}
                            className="fa-solid fa-user-nurse"
                        ></i>
                        <div className="owner-text">
                            <h4>Chủ nhà Alfred Lee</h4>
                            <p>Đã tham gia vào tháng 5 năm 2014</p>
                        </div>
                    </div>
                    <div className="owner-main d-flex">
                        <div className="owner-left col-6">
                            <i className="fa-solid fa-star" /> <span>150 đánh giá</span>
                            <i className="fa-solid fa-shield-halved" style={{ marginLeft: '12px' }} />{" "}
                            <span >Đã xác minh danh tính</span>
                            <p>
                                "Một cuộc hành trình dài hàng ngàn dặm bắt đầu với một bước duy nhất -
                                Laozi"
                            </p>
                            <h4>Trong thời gian ở</h4>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
                                doloremque fuga, iusto veritatis quis eum ducimus suscipit nostrum
                                consequuntur hic? Labore rem dicta nemo cum ullam quas ipsam fugiat
                                harum?
                            </p>
                        </div>
                        <div className="owner-right col-6">
                            <p>Ngôn ngữ : English, VietNamese</p>
                            <p>TỈ lệ phản hồi : 100%</p>
                            <p>Thời gian phản hồi : Trong vài giờ</p>
                        </div>
                    </div>
                </div>
                <h4>Những điều cần biết</h4>
                <div className="item-more d-flex mg-bor pb-5">
                    <div className="more-info col-4">
                        <h5>Nội quy nhà</h5>
                        <p>Nhận phòng sau 10:00</p>
                        <p>Trả phòng trước 08:00</p>
                        <p>Được phép mang theo thú cưng</p>
                        <a href="">Hiển thị thêm</a>
                    </div>
                    <div className="more-info col-4">
                        <h5>An toàn và chỗ ở</h5>
                        <p>Không có máy phát hiện khí CO</p>
                        <p>Không có máy báo khói </p>
                        <p>Một số không gian được sử dụng chung</p>
                        <a href="">Hiển thị thêm</a>
                    </div>
                    <div className="more-info col-4">
                        <h5>Chính sách hủy</h5>
                        <p>Đặt phòng/đặt chỗ này không được hoàn tiền.</p>
                        <p>
                            Hãy đọc toàn bộ chính sách hủy của Chủ nhà/Người tổ chức được áp dụng
                            ngay cả khi bạn hủy vì ốm bệnh hoặc gián đoạn do dịch COVID-19.
                        </p>
                        <a href="">Hiển thị thêm</a>
                    </div>
                </div>
                <div className="item-legal d-flex pb-5">
                    <div className="legal-info col-3">
                        <h5>Hỗ trợ</h5>
                        <p>Trung tâm trợ giúp</p>
                        <p>AirCover</p>
                        <p>Hỗ trợ người khuyết tật</p>
                        <p>Các tùy chọn hủy</p>
                        <p>Biện pháp ứng phps với đại dịch COVID-19 của chúng tôi</p>
                        <p>Báo cáo lo ngại của hàng xóm</p>
                    </div>
                    <div className="legal-info col-3">
                        <h5>Cộng đồng</h5>
                        <p>Airbnb.org : nhà ở cứu trợ</p>
                        <p>Chống phân biệt đối xử </p>
                    </div>
                    <div className="legal-info col-3">
                        <h5>Đón tiếp khách</h5>
                        <p>Cho thuê nhà trên Airbnb</p>
                        <p>AirCover cho Chủ nhà</p>
                        <p>Xem tài nguyên đón tiếp khách</p>
                        <p>Truy cập diễn đàn cộng đồng</p>
                        <p>Đón tiếp khách có trách nhiệm</p>
                    </div>
                    <div className="legal-info col-3">
                        <h5>Airbnb</h5>
                        <p>Trang tin tức</p>
                        <p>Tìm hiểu các tính năng mới</p>
                        <p>Thư ngỏ các nhà sáng lập</p>
                        <p>Cơ hội nghề nghiệp</p>
                        <p>Nhà đầu tư</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ItemPage