import axios from "axios";
import React, { useEffect, useState } from "react";

function UserCart() {
  const loginUserData = JSON.parse(localStorage.getItem("loginUser"));
  console.log(loginUserData.id);
  const [dataCompleteOrNot, setDataCompleteOrNot] = useState({});
  const [active, setActive] = useState("");
  const [valueChanged, setValueChanged] = useState("");

  console.log(dataCompleteOrNot);
  const handleEdit = (id) => {
    setActive(id);
  };
  const handleConfirm = (id) => {
    setActive(false);
  };
  const handleChange = (e, id) => {
    const updatedItems = loginUserData.selectedItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          dateIn: e.target.value,
        };
      } else {
        return item;
      }
    });
    const updatedUserData = { ...loginUserData, selectedItems: updatedItems };
    localStorage.setItem("loginUser", JSON.stringify(updatedUserData));
    setValueChanged(e.target.value);
  };
  const handleDelete = async (id) => {
    const updatedItems = loginUserData.selectedItems.filter(
      (item) => item.id !== id
    );

    const updatedUserData = { ...loginUserData, selectedItems: updatedItems };
    localStorage.setItem("loginUser", JSON.stringify(updatedUserData));
    await axios.put(
      `http://localhost:8000/user-register/${loginUserData.id}`,
      updatedUserData
    );
    setDataCompleteOrNot(updatedUserData);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/user-register/${loginUserData.id}`
        );
        setDataCompleteOrNot(result.data);
        await axios.put(
          `http://localhost:8000/user-register/${loginUserData.id}`,
          loginUserData
        );
      } catch (error) {
        // Handle error
      }
    };

    loadUser();
  }, [loginUserData.id, dataCompleteOrNot]);
  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Hi, welcome back!</h4>
                <p className="mb-0">
                  Đây là trang quản lí đơn đã đặt phòng của bạn
                </p>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="./index.html">Airbnb</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0)">Profile</a>
                </li>
              </ol>
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="profile">
                <div className="profile-head">
                  <div className="photo-content">
                    <div className="cover-photo" />
                    <div className="profile-photo">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/airbnb-react-a465e.appspot.com/o/profile.png?alt=media&token=8e9fab74-409c-47e3-908e-774232b7554d"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div className="row info">
                          <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                            <div className="profile-name">
                              <h4 className="text-primary username">
                                {loginUserData.name}
                              </h4>
                              <p>Đây là tên đăng nhập của bạn</p>
                            </div>
                          </div>
                          <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                            <div className="profile-email">
                              <h4 className="text-muted email">
                                {loginUserData.email}
                              </h4>
                              <p>Đây là email của bạn</p>
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
          <div className="row">
            <table className="col">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Thành phố </th>
                  <th>Mặt tiền</th>
                  <th>Ngày nhận phòng</th>
                  <th>Ngày trả phòng</th>
                  <th>Giá 1 đêm</th>
                  <th>Đánh giá</th>
                  <th>Complete</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="tbody" style={{ textAlign: "center" }}>
                {loginUserData.selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td class="col-1">{item.id}</td>
                    <td class="col-1">
                      <img
                        style={{ width: "114px", height: "100px" }}
                        src={item.img}
                        alt="Item"
                      />
                    </td>
                    <td class="col-2">{item.name}</td>
                    <td class="col-1">{item.address}</td>
                    {active === item.id ? (
                      <td class="col-2">
                        <input
                          value={valueChanged}
                          type="date"
                          onChange={(e) => handleChange(e, item.id)}
                        />
                      </td>
                    ) : (
                      <td class="col-2">{item.dateIn}</td>
                    )}
                    <td class="col-2">{item.dateOut}</td>
                    <td class="col-1">{item.price}</td>
                    <td class="col-1">{item.rating}</td>
                    <td class="col-2" style={{ color: "#b7b72c" }}>
                      {dataCompleteOrNot.selectedItems &&
                      dataCompleteOrNot.selectedItems.length > 0
                        ? dataCompleteOrNot.selectedItems[index].complete
                        : "loading"}
                    </td>
                    <td class="col-2">
                      <div
                        style={{
                          padding: 4,
                          backgroundColor: "red",
                          width: 60,
                        }}
                        className="btn delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </div>
                    </td>

                    <hr />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCart;
