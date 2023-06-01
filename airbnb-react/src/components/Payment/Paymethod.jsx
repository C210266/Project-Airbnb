import React, { useState, useEffect, useRef } from 'react';
import './Paymethod.css'
import { useNavigate } from 'react-router-dom';
import { card_info } from '../../action';
import { useDispatch } from 'react-redux';

const Paymethod = () => {
  const [typeCard, setTypeCard] = useState('');
  const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const minCardYear = new Date().getFullYear();
  const amexCardMask = "#### ###### #####";
  const otherCardMask = "#### #### #### ####";
  const [cardNumberTemp, setCardNumberTemp] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusElementStyle, setFocusElementStyle] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const cardNumberRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCardNumberTemp(otherCardMask);
    cardNumberRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(card_info(cardName, cardNumber, cardMonth, cardYear, cardCvv));
    navigate('/payment')
  }
  const getCardType = () => {
    const number = cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) !== null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) !== null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) !== null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) !== null) return "discover";

    re = new RegExp('^9792');
    if (number.match(re) !== null) return 'troy';

    return "visa"; // default type
  };

  const generateCardNumberMask = () => {
    return getCardType() === "amex" ? amexCardMask : otherCardMask;
  };

  const minCardMonth = () => {
    if (cardYear === minCardYear.toString()) return new Date().getMonth() + 1;
    return 1;
  };

  useEffect(() => {
    if (cardMonth < minCardMonth()) {
      setCardMonth("");
    }
  }, [cardYear]);

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  const focusInput = (e) => {

    setIsInputFocused(true);
    const targetRef = e.target.dataset.ref;
    const target = document.querySelector(`[data-ref="${targetRef}"]`);
    setFocusElementStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    });
  };
  const focusInput1 = (e) => {
    setIsCardFlipped(!isCardFlipped);
  }

  const blurInput = () => {
    setTimeout(() => {
      if (!isInputFocused) {
        setFocusElementStyle(null);
      }
    }, 300);
    setIsInputFocused(false);
  };




  return (
    <div className="wrapper" id="app">
      <div className="card-form">
        <div className="card-list">
          <div className={`card-item ${isCardFlipped ? "-active" : ""}`}>
            <div className="card-item__side -front">
              <div className={`card-item__focus ${focusElementStyle ? "-active" : ""}`} style={focusElementStyle} ref={cardNumberRef}></div>
              <div className="card-item__cover">
                <img
                  alt=""
                  className="card-item__bg"
                  src={`https://picsum.photos/id/${currentCardBackground}/500/300`}
                />
              </div>
              <div className="card-item__wrapper">
                <div className="card-item__top">
                  <img
                    alt=""
                    className="card-item__chip"
                    src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_card_chip-128.png"
                  />
                  <div className="card-item__type">
                    <img
                      alt=""
                      className="card-item__typeImg"
                      src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_card_visa-128.png"
                    />
                  </div>
                </div>
                <label
                  className="card-item__number"
                  data-ref="cardNumber"
                  onFocus={focusInput}
                  onClick={focusInput}
                >
                  <div className="card-item__numberContainer">
                    {cardNumber.split("").map((char, index) => (
                      <div
                        className={`card-item__numberItem ${char === " " ? "-empty" : ""
                          }`}
                        key={index}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </label>
                <div className="card-item__content">
                  <label
                    className="card-item__info"
                    data-ref="cardName"
                    onFocus={focusInput}
                    onClick={focusInput}
                  >
                    <div className="card-item__holder">Card Holder</div>
                    <div className="card-item__name">{cardName}</div>
                  </label>
                  <div className="card-item__date" onFocus={focusInput} onClick={focusInput}>
                    <label className="card-item__dateTitle">Expires</label>
                    <label className="card-item__dateItem">
                      <div className="card-item__dateItemText">{cardMonth}</div>
                    </label>
                    /
                    <label className="card-item__dateItem">
                      <div className="card-item__dateItemText">{cardYear.slice(-2)}</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-item__side -back">
              <div className="card-item__cover">
                <img
                  alt=""
                  className="card-item__bg"
                  src={`https://picsum.photos/id/${currentCardBackground}/500/300`}
                />
              </div>
              <div className="card-item__band"></div>
              <div className="card-item__cvv">
                <div className="card-item__cvvTitle">CVV</div>
                <div className="card-item__cvvBand">{cardCvv}</div>
                <div className="card-item__type">
                  <img
                    alt=""
                    className="card-item__typeImg"
                    src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_card_visa-128.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-form__inner">
          <div className="card-input">
            <label htmlFor="cardNumber" className="card-input__label">
              Card Number
            </label>
            <input
              type="tel"
              className="card-input__input"
              id="cardNumber"
              name="cardNumber"
              maxLength="19"
              autoComplete="off"
              onChange={(e) => setCardNumber(e.target.value)}
              value={cardNumber}
              data-ref="cardNumber"
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <div className="card-input">
            <label htmlFor="cardName" className="card-input__label">
              Card Holder
            </label>
            <input
              type="text"
              className="card-input__input"
              id="cardName"
              name="cardName"
              maxLength="30"
              autoComplete="off"
              onChange={(e) => setCardName(e.target.value)}
              value={cardName}
              data-ref="cardName"
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <div className="card-form__row">
            <div className="card-form__col">
              <div className="card-form__group">
                <label htmlFor="cardMonth" className="card-input__label">
                  Expiration Date
                </label>
                <select
                  className="card-input__input -select"
                  id="cardMonth"
                  name="cardMonth"
                  onChange={(e) => setCardMonth(e.target.value)}
                  value={cardMonth}
                  data-ref="cardMonth"
                  onFocus={focusInput}

                  onBlur={blurInput}
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {Array.from(Array(12).keys()).map((index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="card-input__input -select"
                  id="cardYear"
                  name="cardYear"
                  onChange={(e) => setCardYear(e.target.value)}
                  value={cardYear}
                  data-ref="cardYear"
                  onFocus={focusInput}

                  onBlur={blurInput}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from(Array(10).keys()).map((index) => (
                    <option key={index} value={minCardYear + index}>
                      {minCardYear + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-form__col -cvv">
              <div className="card-input">
                <label htmlFor="cardCvv" className="card-input__label">
                  CVV
                </label>
                <input
                  type="tel"
                  className="card-input__input"
                  id="cardCvv"
                  name="cardCvv"
                  maxLength="3"
                  autoComplete="off"
                  onChange={(e) => setCardCvv(e.target.value)}
                  value={cardCvv}
                  data-ref="cardCvv"

                  onFocus={focusInput1}
                  onBlur={blurInput}
                />
              </div>
            </div>
          </div>
          <div className="button_parent">
            <button
              style={{ backgroundColor: '#f44336b8  !important' }}
              className="card-form__button warning"
              onClick={() => flipCard(!isCardFlipped)}>
              Flip Card
            </button>

            <button
              className="card-form__button success"
              onClick={handleBack} >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymethod;
