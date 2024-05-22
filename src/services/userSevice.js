import axios from "../axios";
const handleLogin = (userEmail, userPassword) => {
    // gọi đến server node js 
    // dùng 1 package phía client gửi 1 request đến server gọi là axios
    // thế nên import axios

    return axios.post('/api/login', { // đặt tên trùng với tên của đối tượng post (url , {}) trên server
        email: userEmail,
        password: userPassword
    });
};

const handleLogout = ()=>{
    return axios.post('/api/logout');
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const getAllCodeService = (typeInput) => {
    return axios.get(`/api/get-all-codes?type=${typeInput}`);
}

const getAllSpecialty = ()=>{
    return axios.get(`/api/get-specialty`);
}

const createNewUserService = (data) => {
    // console.log('Check data from service : ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userIdWillDelete) => {
    return axios.delete(`/api/delete-user/${userIdWillDelete}`);

}

const editUserService = (id, userDataFromInput) => {
    return axios.put(`/api/update-user/${id}`, userDataFromInput);
    // return axios.delete(`/api/delete-user/${userIdWillDelete}`);
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getTopMedicalFacility_Service = (limit) => {  // new service
    return axios.get(`/api/top-medical-facility-home?limit=${limit}`);
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
}

const getDetailDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}


const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}


const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const creataNewSpecialty = (data)=>{
    return axios.post(`/api/create-new-specialty`, data);
}


const getAllDetailSpecialtyById = (data)=>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}


const deleteScheduleDoctorByDate = (data)=>{
    // console.log('data :',data);
    return axios.get(`/api/delete-schedule-doctor-by-date?doctorId=${data.doctorId}&date=${data.date}&timeType=${data.timeType}`);
}

const editSpecialtyById = (dataFromInputs)=>{
    return axios.post(`/api/edit-specialty-by-id`, dataFromInputs);
}


// Clinic 
const createNewClinicService = (data)=>{
    return axios.post(`/api/create-new-clinic`, data);
}
const getAllDetailClinicByIdService = (data)=>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`);
}

const editClinicByIdService = (dataFromInputs)=>{
    return axios.post(`/api/edit-clinic-by-id`, dataFromInputs);
}

const getClinicService = (inputId)=>{
    return axios.get(`/api/get-clinic?id=${inputId}`);
}





export {
    handleLogin, getAllUsers, getAllCodeService, createNewUserService, deleteUserService, editUserService, getScheduleDoctorByDate,
    getAllDoctor, getTopDoctorService, saveDetailDoctor, getDetailDoctor, saveBulkScheduleDoctor, postPatientBookAppointment,
    getExtraInforDoctorById, getProfileDoctorById, postVerifyBookAppointment , creataNewSpecialty, getAllSpecialty ,editSpecialtyById, getAllDetailSpecialtyById , deleteScheduleDoctorByDate, 
    getAllDetailClinicByIdService , createNewClinicService , getClinicService , editClinicByIdService , getTopMedicalFacility_Service , 

    handleLogout
};

// 