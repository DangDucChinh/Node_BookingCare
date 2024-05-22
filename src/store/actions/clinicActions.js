import actionTypes from "./actionTypes";
import { 
    createNewClinicService, getClinicService, updateClinicByIdService, 
} from '../../services/clinicServices';
import { toast } from "react-toastify";

// CREATE CLINIC
export const createNewClinic_Action = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('ở đây lần thứ 2'); 
            let response = await createNewClinicService(data);
            console.log('check at createNewClinicAction ', response);
            if (response && response.errCode === 0) {
                toast.success("Create a new clinic successfully!");
                dispatch(createNewclinicSuccess_Action());

                dispatch(getAllClinic_Action());
                // tao dữ liệu cho bảng luôn
            } else {
                dispatch(createNewclinicFailed_Action());
            }
        } catch (error) {
            dispatch(createNewclinicFailed_Action());
            console.log('FAIL ', error);
        }
    }
}

export const createNewclinicSuccess_Action = () => {
    return {
        type: actionTypes.CREATE_NEW_CLINIC_ACTION_SUCCESS , 
    }
}

export const createNewclinicFailed_Action = () => {
    return {
        type: actionTypes.CREATE_NEW_CLINIC_ACTION_FAILED
    }
}


// GET ALL 
export const getAllClinic_Action = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getClinicService('ALL');

            if (response && response.errCode === 0) {
                dispatch(getAllClinicSuccess_Action(response.clinics.reverse()));
            } else {
                dispatch(getAllClinicFailed_Action());
            }
        } catch (error) {
            dispatch(getAllClinicFailed_Action());
            console.log('Fail get All', error);
        }
    };
}

export const getAllClinicSuccess_Action = (dataClinic) => {
    return {
        type: actionTypes.GET_ALL_CLINIC_SUCCESS,
        payload: dataClinic
    };
}

export const getAllClinicFailed_Action = () => {
    return { type: actionTypes.GET_ALL_CLINIC_FAILED };
}

export const updateClinic_Action = (id, clinicDataFromInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await updateClinicByIdService(id, clinicDataFromInput);

            if (response && response.errCode === 0) {
                toast.success("Update the clinic successfully!!!");
                dispatch(updateClinicSuccess_Action());
                dispatch(getAllClinic_Action());
            } else {
                console.log("responose : \n",response);
                toast.success("Update the clinic error !!!");
                dispatch(updateClinicFailed_Action());
            }
        } catch (error) {
            toast.error("Update the clinic failed!");
            dispatch(updateClinicFailed_Action());
            console.log('Edit clinic failed at adminAction: ', error);
        }
    }
}

export const updateClinicSuccess_Action = () => {
    return { type: actionTypes.UPDATE_CLINIC_SUCCESS };
}

export const updateClinicFailed_Action = () => {
    return { type: actionTypes.UPDATE_CLINIC_FAILED };
}

export const deleteClinic_Action = (clinicId)=>{
    return async (dispatch, getState) => {
        try {

            
            let response = await updateClinicByIdService(clinicId);

            if (response && response.errCode === 0) {
                toast.success("Delete the clinic successfully!!!");
                // dispatch(updateClinicSuccess_Action());
                dispatch(getAllClinic_Action());
            } else {
                // console.log("responose : \n",response);
                toast.success("Delete the clinic error !!!");
                // dispatch(updateClinicFailed_Action());
            }
        } catch (error) {
            toast.error("Update the clinic failed!");
            // dispatch(updateClinicFailed_Action());
            console.log('delete clinic failed at adminAction: ', error);
        }
    }
}

