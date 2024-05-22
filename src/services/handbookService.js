import axios from "../axios";

const createNew_Handbook_Service = (data)=>{
    return axios.post(`/api/create-new-handbook`,data);
}

const getHandbook_Service = (inputId)=>{
    return axios.get(`/api/get-handbook-by-id?id=${inputId}`);
}

export {
    createNew_Handbook_Service, 
    getHandbook_Service
}