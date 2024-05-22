import actionTypes from "./actionTypes";
import { 
    createNew_Handbook_Service
} from '../../services/handbookService';

import { toast } from "react-toastify";

// CREATE Handbook
export const createNew_Handbook_Action = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNew_Handbook_Service(data);
            console.log('Check at hadnbook : ', response);
            if (response && response.errCode === 0) {
                toast.success("Create a new handbook is  successfully!");
                dispatch(createNew_Handbook_Success_Action());

                // dispatch(getAllClinic_Action());
                // tao dữ liệu cho bảng luôn
            } else {
                dispatch(createNew_Handbook_Failed_Action());
            }
        } catch (error) {
            dispatch(createNew_Handbook_Failed_Action());
            console.log('FAILE CREATE NEW HADNBOOK ', error);
        }
    }
}

export const createNew_Handbook_Success_Action = () => {
    return {
        type: actionTypes.CREATE_NEW_HAND_BOOK_ACTION_SUCCESS , 
    }
}

export const createNew_Handbook_Failed_Action = () => {
    return {
        type: actionTypes.CREATE_NEW_HAND_BOOK_ACTION_FAILED
    }
}


// GET ALL 
// export const getAllClinic_Action = () => {
//     return async (dispatch, getState) => {
//         try {
//             let response = await getClinicService('ALL');

//             if (response && response.errCode === 0) {
//                 dispatch(getAllClinicSuccess_Action(response.clinics.reverse()));
//             } else {
//                 dispatch(getAllClinicFailed_Action());
//             }
//         } catch (error) {
//             dispatch(getAllClinicFailed_Action());
//             console.log('Fail get All', error);
//         }
//     };
// }

// export const getAllClinicSuccess_Action = (dataClinic) => {
//     return {
//         type: actionTypes.GET_ALL_CLINIC_SUCCESS,
//         payload: dataClinic
//     };
// }

// export const getAllClinicFailed_Action = () => {
//     return { type: actionTypes.GET_ALL_CLINIC_FAILED };
// }

// export const updateClinic_Action = (id, clinicDataFromInput) => {
//     return async (dispatch, getState) => {
//         try {
//             let response = await updateClinicByIdService(id, clinicDataFromInput);

//             if (response && response.errCode === 0) {
//                 toast.success("Update the clinic successfully!!!");
//                 dispatch(updateClinicSuccess_Action());
//                 dispatch(getAllClinic_Action());
//             } else {
//                 console.log("responose : \n",response);
//                 toast.success("Update the clinic error !!!");
//                 dispatch(updateClinicFailed_Action());
//             }
//         } catch (error) {
//             toast.error("Update the clinic failed!");
//             dispatch(updateClinicFailed_Action());
//             console.log('Edit clinic failed at adminAction: ', error);
//         }
//     }
// }

// export const updateClinicSuccess_Action = () => {
//     return { type: actionTypes.UPDATE_CLINIC_SUCCESS };
// }

// export const updateClinicFailed_Action = () => {
//     return { type: actionTypes.UPDATE_CLINIC_FAILED };
// }

// export const deleteClinic_Action = (clinicId)=>{
//     return async (dispatch, getState) => {
//         try {

            
//             let response = await updateClinicByIdService(clinicId);

//             if (response && response.errCode === 0) {
//                 toast.success("Delete the clinic successfully!!!");
//                 // dispatch(updateClinicSuccess_Action());
//                 dispatch(getAllClinic_Action());
//             } else {
//                 // console.log("responose : \n",response);
//                 toast.success("Delete the clinic error !!!");
//                 // dispatch(updateClinicFailed_Action());
//             }
//         } catch (error) {
//             toast.error("Update the clinic failed!");
//             // dispatch(updateClinicFailed_Action());
//             console.log('delete clinic failed at adminAction: ', error);
//         }
//     }
// }
