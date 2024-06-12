import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Contact.scss';
import HomeHeader from '../../HomePage/HomeHeader';

import { getAllSpecialty } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../../HomePage/HomeHeader';



class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }
    }

    handleOnChangeSelect = async (event) => {
    }

    render() {

        let { language } = this.props;
        return (
            <>
                <div className='detail-specialty-container container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                  
                    <div id="join_container">
                        <h1>Hợp tác cùng BookingCare</h1>
                        <div className="join-info">
                            BookingCare rất hân hạnh được hợp tác với bác sĩ và cơ sở y tế. Vui lòng
                            gửi thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
                        </div>
                        <form id="join_form" method="POST">
                            <div className="dauvao-nhom">
                                <label>Người liên hệ</label>
                                <input
                                    className="dauvao-nhap dauvao-nhap-ngan"
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="(bắt buộc)"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="dauvao-nhom">
                                <label>Số điện thoại</label>
                                <input
                                    className="dauvao-nhap dauvao-nhap-ngan"
                                    name="phone"
                                    required
                                    type="text"
                                    placeholder="(bắt buộc)"
                                    autoComplete="phone"
                                />
                            </div>
                            <div className="dauvao-nhom">
                                <label>Địa chỉ email</label>
                                <input
                                    className="dauvao-nhap dauvao-nhap-ngan"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    placeholder="(bắt buộc)"
                                />
                            </div>
                            <div className="dauvao-nhom">
                                <label>Tên cơ sở y tế</label>
                                <input
                                    className="dauvao-nhap"
                                    name="org"
                                    type="text"
                                    placeholder="Bệnh viện, phòng khám, tổ chức, công ty"
                                />
                            </div>
                            <div className="dauvao-nhom">
                                <label>Địa chỉ</label>
                                <input
                                    className="dauvao-nhap"
                                    name="address"
                                    type="text"
                                />
                            </div>
                            <div className="dauvao-nhom">
                                <label>Nội dung</label>
                                <textarea
                                    className="dauvao-nhap"
                                    rows="4"
                                    name="content"
                                ></textarea>
                            </div>
                            <div>
                                <div className="grecaptcha-badge" data-style="bottomright" style={{
                                    width: '256px',
                                    height: '60px',
                                    display: 'block',
                                    transition: 'right 0.3s ease 0s',
                                    position: 'fixed',
                                    bottom: '14px',
                                    right: '-186px',
                                    boxShadow: 'gray 0px 0px 5px',
                                    borderRadius: '2px',
                                    overflow: 'hidden'
                                }}>

                                </div>
                                <button
                                    className="g-recaptcha btn btn-default btn-blue btn-lg nut nut-ngang nut-xanh"
                                >
                                    Gửi thông tin
                                </button>
                            </div>
                        </form>
                    </div>



                    <HomeFooter />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }

};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
