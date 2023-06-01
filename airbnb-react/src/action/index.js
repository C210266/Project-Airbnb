export const payment_info = (selectData, dateIn, dateOut, sumPayment, item) => ({
    type: 'PAY_INFO',
    payload: {
        selectData,
        dateIn,
        dateOut,
        sumPayment,
        item
    }
});
export const card_info = (cardName, cardNumber, cardMonth, cardYear, cardCvv) => ({
    type: 'CARD_INFO',
    payload: {
        cardName,
        cardNumber,
        cardMonth,
        cardYear,
        cardCvv
    }
});
export const search = (searchValue) => (
    {
        type: 'SEARCH',
        payload: searchValue
    }
)
