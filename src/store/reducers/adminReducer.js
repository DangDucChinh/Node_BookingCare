import actionTypes from "../actions/actionTypes";

const initialState = {
    positions: [],
    roles: [],
    genders: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [], 

    // clinic 
    clinics  : [],
    medical_facilities : []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = { ...state };
            copyStatePosition.positions = action.payload;
            return {
                ...copyStatePosition
            };

        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state
            };

        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyStateGender = { ...state };
            copyStateGender.genders = action.payload;
            return {
                ...copyStateGender
            };

        case action.FETCH_GENDER_FAILED:
            return {
                ...state
            };

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = { ...state };
            copyStateRole.roles = action.payload;
            return {
                ...copyStateRole
            };

        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state
            };

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.payload; // lấy dpayload từ action sau khi thực hiện get dữ liệu tại đó. tại sao chúng ta lại gán vào đây ?? // vì chúng ta cần sử dụng nó cho global, vì vậy nó cần dc lưu trữ sâu sắc vào redux . 
            return { ...state };
        case actionTypes.FETCH_ALL_USER_FAILED:
            return { ...state };

        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            let copyStateTopDoctors = { ...state };
            copyStateTopDoctors.topDoctors = action.payload;
            // payload nhận từ action tại adminAction
            return {
                ...copyStateTopDoctors
            };
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return { ...state };

        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            let copyStateAllDoctors = { ...state };
            copyStateAllDoctors.allDoctors = action.payload;
            console.log('OPPP : ', action.payload);
            return {
                ...copyStateAllDoctors
            };


        case actionTypes.GET_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return { ...state };

        case actionTypes.GET_ALL_CODE_SCHEDULE_TIME_SUCCESS:
            let stateSchedule = { ...state };
            stateSchedule.allScheduleTime = action.payload;
            return {
                ...stateSchedule
            }

        case actionTypes.GET_ALL_CODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return { ...state };

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            let stateRequiredDoctor = { ...state };
            stateRequiredDoctor.allRequiredDoctorInfor = action.payload;
            return {
                ...stateRequiredDoctor
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return { ...state };


        // CLINIC 
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.payload; // lấy dpayload từ action sau khi thực hiện get dữ liệu tại đó. tại sao chúng ta lại gán vào đây ?? // vì chúng ta cần sử dụng nó cho global, vì vậy nó cần dc lưu trữ sâu sắc vào redux . 
            console.log("payloadđ : ", action.payload);
            return { ...state };
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            return { ...state };
        // 

        // new
        case actionTypes.GET_ALL_MEDICAL_FACILITIES : 
        let copyState = {...state};
        copyState.medical_facilities = action.payload;
        return {
            ...copyState
        };
        //

        case actionTypes.GET_ALL_MEDICAL_FACILITIES_FAILED : 
        return {...state};

        default:
            return state;
    }
}

export default adminReducer;