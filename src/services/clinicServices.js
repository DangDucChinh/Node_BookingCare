import axios from "../axios";

const createNewClinicService = (data) => {
    return axios.post('/api/create-new-clinic', data);
}

const getClinicService = (inputId)=>{
    return axios.get(`/api/get-clinic?id=${inputId}` , {withCredentials: true});

}

// const getAllDetailClinicByIdService = (data)=>{
//     return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`);
// }

const updateClinicByIdService = (id, userDataFromInput) => {
    return axios.put(`/api/update-clinic-by-id/${id}`, userDataFromInput);
}

const deleteClinicByIdService = (id)=>{
    return axios.delete(`/api/delete-clinic-by-id/${id}`);
}



export {
    createNewClinicService, getClinicService, 
    // getAllDetailClinicByIdService ,
    updateClinicByIdService,
    deleteClinicByIdService , 
}

