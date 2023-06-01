const initialState = {
    selectData: '',
    dateIn: '',
    dateOut: '',
    sumPayment: '',
    item: '',
    cardName: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    type: '',
    searchValue: ''

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PAY_INFO':
            return {
                ...state,
                selectData: action.payload.selectData,
                dateIn: action.payload.dateIn,
                dateOut: action.payload.dateOut,
                sumPayment: action.payload.sumPayment,
                item: action.payload.item
            };
        case 'CARD_INFO':
            return {
                ...state,
                cardName: action.payload.cardName,
                cardNumber: action.payload.cardNumber,
                cardMonth: action.payload.cardMonth,
                cardYear: action.payload.cardYear,
                cardCvv: action.payload.cardCvv,
                type: 'Visa'
            }
        case 'SEARCH':
            return {
                ...state,
                searchValue: action.payload,
            }
        default:
            return state;
    }
};

export default reducer;