import actionTypes from "../actions/actionTypes";

const initialState = {
    // trạng thái của toàn bộ component trong react 
    chuyenkhoas: [],
    id_name_chuyenkhoas: []
};

const chuyenkhoaReducer = (state = initialState, action) => { // action này lấy từ dạng actionType được sử dụng, trong đó có chứa payload
    switch (action.type) {
        case actionTypes.GET_ALL_CHUYEN_KHOA_SUCCESS:
            let copyInitialState = { ...state }; // copy toàn bộ trạng thái ban đầu
            copyInitialState.chuyenkhoas = action.payload;
            return {
                ...copyInitialState
                // tạo 1 bản sao của trạng thái ban đầu, tuy nhiên đã cập nhật clinics
            };

        case actionTypes.GET_ALL_CLINIC_FAILED:
            return {
                ...state
            };
        case actionTypes.GET_LIST_CHUYEN_KHOA_SUCCESS:
            let copyState = { ...state };
            copyState.id_name_chuyenkhoas = action.payload;
            console.log('CK  : ', action.payload);
            return {
                ...copyState
            }

        case actionTypes.GET_LIST_CHUYEN_KHOA_FAILED:
            return {
                ...state
            };
        default:
            return state;
        // TRẢ VỀ TRẠNG THÁI HIỆN TẠI, KHÔNG CÓ BẤT KÌ THAY ĐỔI NÀO, VÀ KHÔNG PHẢI BẢN SAO
    }
}

export default chuyenkhoaReducer;