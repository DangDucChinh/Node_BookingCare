import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import axios from '../../axios';


import { getAllUsers } from '../../services/userSevice';



class HomeFooter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameUser: ''
        }
    }

    async componentDidMount() {

        let res = await getAllUsers('ALL');
        console.log(res);
        

        // const getAllUsers = (inputId) => {
        //     return axios.get(`/api/get-all-user?id=${inputId}`);
        // }
    }


    render() {
        return (
            <div className='home-footer'>
                <div className='footer-up'>
                    <div className="footer-up_left">
                        <div className="footer-left_logo">
                            <div className="logo">

                            </div>
                        </div>
                        <div className="footer-left_title">Công ty cổ phần Công nghệ BookingCare</div>
                        <br></br>
                        <div className="footer-left_address">
                            <p><span>
                                <i className="fas fa-map-marker-alt"></i>
                            </span>  Số 1 Ngõ 421 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam.</p>
                        </div>
                        <div className="footer-left_register">
                            <p><span>
                                <i className="fas fa-check"></i>
                            </span>  Đăng kí ĐKKD số : <a href="#">0326436724</a>. Sở KHDT Hà Nội cấp ngày 19/4/2022</p>
                        </div>
                    </div>
                    <div className="footer-up_right">
                        <div className="footer-up_list">
                            <ul type="none">
                                <li><a href='#'>Liên hệ hợp tác</a></li>
                                <li><a href='#'>Sức khỏe doanh nghiệp</a></li>
                                <li><a href='#'>Gói chuyển đổi số doanh nghiệp</a></li>
                                <li><a href='#'>Tuyển dụng</a></li>
                                <li><a href='#'>Câu hỏi thường gặp</a></li>
                                <li><a href='#'>Điều khoản sử dụng</a></li>
                                <li><a href='#'>Chính sách Bảo mật</a></li>
                                <li><a href='#'>Hỗ trợ giải quyết khiếu nại</a></li>
                                <li><a href='#'>Quy chế hoạt động</a></li>
                            </ul>
                        </div>
                        <div className='footer-up_decends'>
                            <h5>Trụ sở tại Hà Nội</h5>
                            <p>Số 1 ngõ 421 Hoàng Quốc Việt, phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội</p>
                            <h5>Trụ sở tại Hà Nội</h5>
                            <p>Số 1 ngõ 421 Hoàng Quốc Việt, phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội</p>
                            <h5>Trụ sở tại Hà Nội</h5>
                            <p>Số 1 ngõ 421 Hoàng Quốc Việt, phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội</p>
                        </div>
                    </div>
                </div>
                <div className='footer-down'>
                    <div className="footer-down_content">
                        <div className="footer-down_left">© 2023 - BookingCare.</div>
                        <div className="footer-down_right">
                            <i className="fab fa-facebook-square"
                                style={{ marginRight: "10px" }}></i>
                            <i class="fab fa-youtube-square"></i>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);