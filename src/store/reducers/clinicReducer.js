import actionTypes from "../actions/actionTypes";

const initialState = {
    clinics: [],
};

const clinicReducer = (state = initialState, action) => { // action này lấy từ dạng actionType được sử dụng, trong đó có chứa payload
    switch (action.type) {
        case actionTypes.CREATE_NEW_CLINIC_ACTION_START:
            return {
                ...state
                // TRẢ VỀ 1 BẢN SAO CỦA STATE HIỆN TẠI, SỬ DỤNG TOÁN TỬ SPREAD
            };

        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            let copyInitialState = { ...state }; // copy toàn bộ trạng thái ban đầu
            copyInitialState.clinics = action.payload;
            return {
                ...copyInitialState
                // tạo 1 bản sao của trạng thái ban đầu, tuy nhiên đã cập nhật clinics
            };

        case actionTypes.GET_ALL_CLINIC_FAILED:
            return {
                ...state
            };




        default:
            return state;
        // TRẢ VỀ TRẠNG THÁI HIỆN TẠI, KHÔNG CÓ BẤT KÌ THAY ĐỔI NÀO, VÀ KHÔNG PHẢI BẢN SAO
    }
}

export default clinicReducer;