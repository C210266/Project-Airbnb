import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function HomePage() {
  const responsiveOptions = {
    0: {
      items: 4, // Display 1 item on screens smaller than 0px
    },
    480: {
      items: 5, // Display 2 items on screens between 480px and 767px
    },
    768: {
      items: 6, // Display 3 items on screens between 768px and 991px
    },
    992: {
      items: 8, // Display 4 items on screens between 992px and 1199px
    },
    1200: {
      items: 10, // Display 5 items on screens larger than 1200px
    },
  };
  // state dùng để lưu trữ dữ liệu từ api
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState("");
  const searchInfo = useSelector((state) => state.searchValue);

  let loginUser = {};
  if (localStorage.getItem("loginUser")) {
    loginUser = JSON.parse(localStorage.getItem("loginUser"));
  }

  const handlePushItemIntoLoginUser = (element) => {
    const isDuplicate = loginUser.selectedItems.some(
      (item) => item.id === element.id
    );
    if (!isDuplicate) {
      loginUser.selectedItems.push(element);
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    }
  };
  const handleValueSearch = (e) => {
    setSliderValue(e.currentTarget.getAttribute("data-value"));
  };
  const loadUser = async () => {
    let url = "http://localhost:8000/items";

    // if (searchInfo) {
    //   url += `?q=${searchInfo}`;
    // }
    if (sliderValue) {
      const encodedValue = encodeURIComponent(sliderValue);
      url += `?address=${encodedValue}`;
    }

    const result = await axios.get(url);
    setData(result.data);
  };
  useEffect(() => {
    loadUser();
  }, [searchInfo, sliderValue]);

  return (
    <div>
      {/* Slider */}

      <OwlCarousel
        className="owl-theme"
        id="slider"
        // items={10}
        loop
        margin={10}
        nav
        autoplay
        responsive={responsiveOptions}
      >
        <div className="item" onClick={handleValueSearch} data-value="Xa lộ">
          <i className="fa-solid fa-road" />
          <p>Xa lộ</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Hướng rừng"
        >
          <i className="fa-solid fa-money-bill-trend-up" />
          <p>Hướng rừng</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Hướng núi"
        >
          <i className="fa-solid fa-mountain-sun" />
          <p>Hướng núi</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Hướng biển"
        >
          <i className="fa-solid fa-umbrella-beach" />
          <p>Hướng biển</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Sóng biển"
        >
          <i className="fa-solid fa-house-tsunami" />
          <p>Sóng biển</p>
        </div>
        <div className="item" onClick={handleValueSearch} data-value="Xa bờ">
          <i className="fa-solid fa-ship" />
          <p>Xa bờ</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Nhiệt đới"
        >
          <i className="fa-solid fa-fire" />
          <p>Nhiệt đới</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Hướng sông"
        >
          <i className="fa-regular fa-tree-city" />
          <p>Hướng sông</p>
        </div>
        <div
          className="item"
          onClick={handleValueSearch}
          data-value="Hướng rừng"
        >
          <i className="fa-sharp fa-solid fa-handshake-simple" />
          <p>Hướng rừng</p>
        </div>
        <div className="item" onClick={handleValueSearch} data-value="Phù sa">
          <i className="fa-solid fa-wind" />
          <p>Phù sa</p>
        </div>
        <div onClick={handleValueSearch} data-value="Đất cát">
          <i className="fa-solid fa-tree-city" />
          <p>Đất cát</p>
        </div>
      </OwlCarousel>

      {/* <div className="slider" id="slider">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <ul>
                <li>
                  <i className="fa-solid fa-road" />
                  <p>Xa lộ</p>
                </li>
                <li>
                  <i className="fa-solid fa-money-bill-trend-up" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-mountain-sun" />
                  <p>Hướng núi</p>
                </li>
                <li>
                  <i className="fa-solid fa-umbrella-beach" />
                  <p>Hướng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-house-tsunami" />
                  <p>Sóng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-ship" />
                  <p>Xa bờ</p>
                </li>
                <li>
                  <i className="fa-solid fa-fire" />
                  <p>Nhiệt đới</p>
                </li>
                <li>
                  <i className="fa-regular fa-tree-city" />
                  <p>Hướng sông</p>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-handshake-simple" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-wind" />
                  <p>Phù sa</p>
                </li>
                <li>
                  <i className="fa-solid fa-tree-city" />
                  <p>Đất cát</p>
                </li>
              </ul>
            </div>
            <div className="carousel-item">
              <ul>
                <li>
                  <i className="fa-solid fa-road" />
                  <p>Xa lộ</p>
                </li>
                <li>
                  <i className="fa-solid fa-money-bill-trend-up" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-mountain-sun" />
                  <p>Hướng núi</p>
                </li>
                <li>
                  <i className="fa-solid fa-umbrella-beach" />
                  <p>Hướng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-house-tsunami" />
                  <p>Sóng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-ship" />
                  <p>Xa bờ</p>
                </li>
                <li>
                  <i className="fa-solid fa-fire" />
                  <p>Nhiệt đới</p>
                </li>
                <li>
                  <i className="fa-regular fa-tree-city" />
                  <p>Hướng sông</p>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-handshake-simple" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-wind" />
                  <p>Phù sa</p>
                </li>
                <li>
                  <i className="fa-solid fa-tree-city" />
                  <p>Đất cát</p>
                </li>
              </ul>
            </div>
            <div className="carousel-item">
              <ul>
                <li>
                  <i className="fa-solid fa-road" />
                  <p>Xa lộ</p>
                </li>
                <li>
                  <i className="fa-solid fa-money-bill-trend-up" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-mountain-sun" />
                  <p>Hướng núi</p>
                </li>
                <li>
                  <i className="fa-solid fa-umbrella-beach" />
                  <p>Hướng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-house-tsunami" />
                  <p>Sóng biển</p>
                </li>
                <li>
                  <i className="fa-solid fa-ship" />
                  <p>Xa bờ</p>
                </li>
                <li>
                  <i className="fa-solid fa-fire" />
                  <p>Nhiệt đới</p>
                </li>
                <li>
                  <i className="fa-regular fa-tree-city" />
                  <p>Hướng sông</p>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-handshake-simple" />
                  <p>Hướng rừng</p>
                </li>
                <li>
                  <i className="fa-solid fa-wind" />
                  <p>Phù sa</p>
                </li>
                <li>
                  <i className="fa-solid fa-tree-city" />
                  <p>Đất cát</p>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="btn carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="btn carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}

      <div className="container">
        {/* Content */}

        <div className="view_result">
          <p>Hiển thị tổng giá</p>
          <span>Bao gồm mọi khoản phí, trước thuế</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider1 round" />
          </label>
        </div>
        <div className="content">
          {data.map((e, i) => (
            <div className="container1">
              <div className="card">
                <div
                  key={i + 1}
                  className="item col-3 image"
                  data-id={e.id}
                  data-name={e.name}
                  data-address={e.address}
                  data-price={e.price}
                  data-rating={e.rating}
                >
                  <i className="far fa-heart" onclick="toggleHeart(this)" />
                  <Link
                    to={`/item/${e.id}`}
                    onClick={() => handlePushItemIntoLoginUser(e)}
                  >
                    <img src={e.img} alt="" />
                  </Link>
                  <h6 id="title">{e.name}</h6>
                  <p id="address">{e.address}</p>
                  <div className="d-flex justify-content-between">
                    <p>Ngày 04 - Ngày 07 tháng 5</p>
                    <span>
                      ⭐<span id="rating">{e.rating}</span>
                    </span>
                  </div>
                  <p>
                    $ <span id="price">{e.price}</span> / đêm
                  </p>
                </div>
                {/* Content */}
                <div className="content">
                  <h5>{e.name} là thành phố : </h5>
                  <p>{e.descrip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
