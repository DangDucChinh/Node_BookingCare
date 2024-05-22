import actionTypes from "./actionTypes";
import {
    get_Id_Name_Chuyenkhoa_ById_Service, create_new_chuyenkhoa_service
} from '../../services/chuyenkhoaService';
import { toast } from "react-toastify";

// GET ID + NAME CHUYEN KHOA
export const getListChuyenkhoa_Action = () => {
    return async (dispatch, getState) => {
        try {
            console.log(`lạc 1`);
            let response = await get_Id_Name_Chuyenkhoa_ById_Service('ALL'); // truyền id bên get ?id=ALL ( call api )
            console.log(response);
            if(response && response.errCode === 0){
                let dataChuyenkhoa = response.data;
                dispatch(getListChuyenkhoa_Action_Success(dataChuyenkhoa));
            }else{
                dispatch(getListChuyenkhoa_Action_Failed());
            }
        } catch (error) {
            dispatch(getListChuyenkhoa_Action_Failed());
            console.log('Faild get list chuyen khoa', error);
        }
    };
}

export const getListChuyenkhoa_Action_Success = (dataChuyenkhoa) => {
    return {
        payload: dataChuyenkhoa,
        type: actionTypes.GET_LIST_CHUYEN_KHOA_SUCCESS
    }
};

export const getListChuyenkhoa_Action_Failed = () => {
    return { type: actionTypes.GET_LIST_CHUYEN_KHOA_FAILED };
}

// CREATE CHUYENKHOA
export const createNewChuyenkhoa_Action = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await create_new_chuyenkhoa_service(data); 
            console.log(response);// truyền id bên get ?id=ALL ( call api )
            if (response && response.errCode === 0) {
                toast.success("Create a new clinic successfully!");
                dispatch(createNewChuyenkhoa_Success());
            } else {
                toast.error("Response have a errCode");
                dispatch(createNewChuyenkhoa_Failed());
            }
        } catch (error) {
            dispatch(createNewChuyenkhoa_Failed());
            console.log('Faild create new  chuyen khoa', error);
        }
    };
}

export const createNewChuyenkhoa_Success = () => {
    return {
        type: actionTypes.CREATE_NEW_CHUYEN_KHOA_SUCCESS
    }
};

export const createNewChuyenkhoa_Failed = () => {
    return { type: actionTypes.CREATE_NEW_CHUYEN_KHOA_FAILED };
}




