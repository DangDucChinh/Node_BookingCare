import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialties.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../../Patient/Doctor/DoctorSchedule';
import ProfileDoctor from '../../Patient/Doctor/ProfileDoctor';

import { getAllSpecialty } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../HomeFooter';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        const dataDetailSpecialty_fromDB = await getAllSpecialty();
        // kq là đối tượng js , property is data

        this.setState({
            dataDetailSpecialty: dataDetailSpecialty_fromDB
        });




    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }
    }

    handleOnChangeSelect = async (event) => {
    }

    render() {
        let { dataDetailSpecialty } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='detail-specialty-container container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                    {/* <div className='detail-specialty-body'>
                        <div className='specialties-header'>Chuyên khoa</div>
                        <div className='specialties-body'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty.data) && language === LANGUAGES.VI ?
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.data. }}>
                                    </div> : <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTMLEnglish }}>
                                    </div>
                                }v
                        </div>

                    </div> */}

                    {/* <form id="join_form" method="POST"><div class="dauvao-nhom"><label>Người liên hệ</label>
                        <input class="dauvao-nhap dauvao-nhap-ngan" name="name" required="required" type="text" placeholder="(bắt buộc)" autocomplete="name" /></div><div class="dauvao-nhom"><label>Số điện thoại</label><input class="dauvao-nhap dauvao-nhap-ngan" name="phone" required="required" type="text" placeholder="(bắt buộc)" autocomplete="phone" /></div><div class="dauvao-nhom"><label>Địa chỉ email</label><input class="dauvao-nhap dauvao-nhap-ngan" name="email" type="text" autocomplete="email" /></div><div class="dauvao-nhom"><label>Tên cơ sở y tế</label><input class="dauvao-nhap" name="org" type="text" placeholder="Bệnh viện, phòng khám, tổ chức, công ty" /></div><div class="dauvao-nhom"><label>Địa chỉ</label><input class="dauvao-nhap" name="address" type="text" /></div><div class="dauvao-nhom" ><label>Nội dung</label><textarea class="dauvao-nhap" rows="4" name="content"></textarea></div><div><div><div class="grecaptcha-badge" data-style="bottomright" style="width: 256px; height: 60px; display: block; transition: right 0.3s ease 0s; position: fixed; bottom: 14px; right: -186px; box-shadow: gray 0px 0px 5px; border-radius: 2px; overflow: hidden;"><div class="grecaptcha-logo"><iframe title="reCAPTCHA" width="256" height="60" role="presentation" name="a-3gs2w0irdwq5" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Ld4EaQiAAAAANqQcwhPKOV_rjB8bcNPViS1Ocp4&amp;co=aHR0cHM6Ly9ib29raW5nY2FyZS52bjo0NDM.&amp;hl=vi&amp;v=9pvHvq7kSOTqqZusUzJ6ewaF&amp;size=invisible&amp;cb=ks589qforx7u"></iframe></div><div class="grecaptcha-error"></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div></div><button class="g-recaptcha btn btn-default btn-blue btn-lg nut nut-ngang nut-xanh" data-sitekey="6Ld4EaQiAAAAANqQcwhPKOV_rjB8bcNPViS1Ocp4" data-callback="submit"> Gửi thông tin
                        </button></div></form> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
