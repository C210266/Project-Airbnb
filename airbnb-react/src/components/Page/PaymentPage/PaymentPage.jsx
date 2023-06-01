import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./PaymentPage.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function PaymentPage() {
  const paymentInfo = useSelector((state) => state);
  const [btnConfirm, setBtnConfirm] = useState({
    btn1: false,
    btn2: false,
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vcmeaej",
        "template_dl036xt",
        form.current,
        "ikA1cwKTGRyo_z3e0"
      )
      .then(
        (result) => {
          console.log(result.text);
          // e.target.reset();
          // Swal.fire(
          //     'Cảm ơn bạn đã đặt phòng',
          //     'Chúng tôi sẽ liên lạc với bạn sau khi xác nhận!',
          //     'success'
          // )
          navigate("/usercart");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const handleChange = (e) => setEmail(e.target.value);
  const handleChangeSelect = (e) => {
    if (e.target.value === "Visa") {
      navigate("/method");
    }
  };
  const typeCard = useSelector((state) => state.type);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <button className="btn-left">
              <i className="fa-solid fa-chevron-left" />
            </button>
          </div>
          <div className="col-5">
            <h2>Xác nhận thanh toán</h2>
            <h3>Chuyến đi của bạn</h3>
            <div className="order-details">
              <div className="row">
                <div className="col-6">
                  <b>Ngày</b>
                  <div id="order-details-date">
                    {paymentInfo.dateIn} ---- {paymentInfo.dateOut}
                  </div>
                </div>
                <div className="col-3" />
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <b>Khách </b>
                  <div id="order-details-client">
                    Tổng số lượng khách : {paymentInfo.selectData[0].quantity}{" "}
                    (khách){" "}
                  </div>
                </div>
                <div className="col-3" />
              </div>
            </div>
            <div className="purchase order-details">
              <div>
                <h3 style={{ display: "inline-block" }}>
                  Chọn cách thanh toán
                </h3>
                <select
                  className="selectMenu"
                  value={typeCard ? "Visa" : "/"}
                  style={{ float: "right", marginTop: "28px" }}
                  onChange={(e) => handleChangeSelect(e)}
                >
                  <option value="/" key="">
                    Chọn phương thức{" "}
                  </option>
                  <option value="Visa" key="">
                    Visa
                  </option>
                  <option value="Debit" key="">
                    Debit
                  </option>
                  <option value="ghino" key="">
                    Thẻ ghi nợ
                  </option>
                </select>
              </div>

              <ul className="list-group">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-9">
                      <b>Trả toàn bộ</b>
                    </div>
                    <div className="col-3">
                      <span>$</span>
                      <b className="total-sum">{paymentInfo.sumPayment}</b>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text col-10">
                      Thanh toán toàn bộ số tiền (${paymentInfo.sumPayment}
                      <span className="total-sum" />) ngay bây giờ và thế là
                      xong.
                    </div>
                    <div className="col-1" />
                    <div
                      style={{ width: 10, height: 26 }}
                      className={
                        btnConfirm.btn1
                          ? "btn-click btn-round btn-round-full"
                          : "btn-click btn-round"
                      }
                      onClick={() => {
                        setBtnConfirm({
                          ...btnConfirm,
                          btn1: true,
                          btn2: false,
                        });
                      }}
                    ></div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-9">
                      <b>Trả ngay một phần, phần còn lại trả sau</b>
                    </div>
                    <b className="col-2">
                      $<span className="total-sum" />
                      {paymentInfo.sumPayment}
                    </b>
                    <div className="col" />
                  </div>
                  <div className="row">
                    <div className="text col-10">
                      Thanh toán ngay $<span className="sum-2" />
                      {paymentInfo.sumPayment / 2} và phần còn lại ($
                      {paymentInfo.sumPayment / 2}
                      <span className="sum-2" />) sẽ tự động được trừ vào cùng
                      phương thức thanh toán này vào <span id="deadline-date" />
                      . Không phát sinh phụ phí.
                    </div>
                    <div className="col-1" />
                    <div
                      style={{ width: 10, height: 26 }}
                      className={
                        btnConfirm.btn2
                          ? "btn-click btn-round btn-round-full"
                          : "btn-click btn-round"
                      }
                      onClick={() => {
                        setBtnConfirm({
                          ...btnConfirm,
                          btn1: false,
                          btn2: true,
                        });
                      }}
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
            {/* Form */}
            <form
              className="login-logout order-details"
              ref={form}
              onSubmit={sendEmail}
            >
              <h3>Đăng nhập hoặc đăng ký để đặt phòng/đặt chỗ</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="row">
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Tên của bạn"
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                </li>
              </ul>
              <p>
                Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện
                thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn.
                <b>Chính sách về quyền riêng tư</b>
              </p>
              <button className="btn-continue" type="submit" value="Send">
                Tiếp Tục
              </button>
            </form>
            <div className="login-network">
              <div className="row" style={{ margin: "auto" }}>
                <button className="col-3">
                  <i className="fa-brands fa-square-facebook" />
                </button>
                <div className="col" />
                <button className="col-3">
                  <i className="fa-brands fa-square-google-plus" />
                </button>
                <div className="col" />
                <button className="col-3">
                  <i className="fa-brands fa-apple" />
                </button>
              </div>
              <button className="btn-continue-email">
                Tiếp tục bằng Email
              </button>
            </div>
          </div>
          <div className="col-1" />
          <div className="col-4">
            <div className="row">
              <div className="col-5">
                <img
                  src={paymentInfo.item.img}
                  id="main-img"
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-7">
                <h6>{paymentInfo.item.name}</h6>
                <p>{paymentInfo.item.address}</p>
                <p>{paymentInfo.item.price}$ / 1 đêm </p>
                <div className="text">
                  <span>
                    <i className="fa-solid fa-star" />({paymentInfo.item.rating}{" "}
                    đánh giá)
                  </span>
                  <span>
                    <i className="fa-solid fa-medal" />
                    Chủ nhà Híu Máy Dập
                  </span>
                </div>
              </div>
            </div>

            <div className="WillHidden">
              <div className="row">
                <h6>Đặt phòng của bạn được bảo vệ bởi AirCover</h6>
              </div>
              <div className="row">
                <h3>Chi tiết giá</h3>
                <div className="col-9">
                  <div id="count-1dem" />
                  <div>Phí dịch vụ Airbnb</div>
                  <b>Tổng (USD)</b>
                </div>
                <div className="col-3">
                  <div id="money-count1dem" />
                  60$
                  <div id="fee" />
                  <b id="sum_total" />
                  {paymentInfo.sumPayment}$
                </div>
              </div>
              <div className="row">
                <div className=" d-flex justify-content-between">
                  <span>Phải trả bây giờ</span>
                  <b style={{ marginRight: 39 }} className="sum_money" />
                </div>
                <div className="money-date justify-content-between ">
                  <span>Cần thanh toán vào 5 tháng 6, 2023</span>
                  <div className="sum_money_date" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-1" />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
