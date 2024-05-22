import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // đây là baseUrl của serve backend cần lấy dữ liệu 
    // withCredentials: true
});



instance.interceptors.response.use( 

    // đăng kí intercepter cho phản hồi của thư viện axios , công cụ cho phép tạo các yêu cầu http 
    (response) => { 
        const { data } = response; // tạo phần data của response .
        return response.data; 
        // trả về mỗi data của respone
    }
);

export default instance;
