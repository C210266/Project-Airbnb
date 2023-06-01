import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Page/HomePage/HomePage";
import NotFound from "./components/Page/NotFound";
import Login from "./components/Page/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemPage from "./components/Page/ItemPage/ItemPage";
import Register from "./components/Page/Register";
import UserCart from "./components/Page/UserCart";
import PaymentPage from "./components/Page/PaymentPage/PaymentPage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import MyComponent from "./components/Payment/Paymethod";
import SendEmail from "./components/Page/SendEmail";
import LayoutNavbar from "./components/Layout/LayoutNavbar";



const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <LayoutNavbar />
                <HomePage />
              </div>
            }
          />
          <Route
            path="/item/:idItem"
            element={
              <div>
                <LayoutNavbar />
                <ItemPage />
              </div>
            }
          />
          <Route
            path="/usercart"
            element={
              <div>
                <LayoutNavbar />
                <UserCart />
              </div>
            }
          />
          <Route
            path="/payment"
            element={
              <div>
                <LayoutNavbar />
                <PaymentPage />
              </div>
            }
          />
          <Route
            path="/method"
            element={
              <div>
                <LayoutNavbar />
                <MyComponent />
              </div>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sendemail" element={<SendEmail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
