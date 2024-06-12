import axios from "../axios";

// Cấu hình Axios toàn cục
// axios.defaults.withCredentials = true;

const getChuyenkhoa_ById_Service = (inputId)=>{
    return axios.get(`/api/get-chuyen-khoa?id=${inputId}`);
}

const get_Id_Name_Chuyenkhoa_ById_Service = (inputId)=>{
    return axios.get(`/api/get-name-id-chuyen-khoa-by-id?id=${inputId}`);
    // return axios.get(`api/get-name-id-chuyen-khoa-by-id?id=ALL`);
}

// const getAllDetailClinicByIdService = (data)=>{
//     return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`);
// }

// const updateClinicByIdService = (id, userDataFromInput) => {
//     return axios.put(`/api/update-clinic-by-id/${id}`, userDataFromInput);
// }

// const deleteClinicByIdService = (id)=>{
//     return axios.delete(`/api/delete-clinic-by-id/${id}`);
// }

const create_new_chuyenkhoa_service = (data)=>{
    return axios.post(`/api/create-new-chuyen-khoa`,data);
}


export {
    getChuyenkhoa_ById_Service, get_Id_Name_Chuyenkhoa_ById_Service, create_new_chuyenkhoa_service
}

