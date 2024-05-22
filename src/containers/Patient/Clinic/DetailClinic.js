import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';

import { getClinicService } from '../../../services/clinicServices';


import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

import { Buffer } from 'buffer';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail_Clinic: {},
            current_Clinic_Id: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                current_Clinic_Id: this.props.match.params.id
            });

            let res = await getClinicService(this.props.match.params.id);

            if (res && res.errCode === 0) {
                let image = this.handleImage_From_BLOB_to_URL(res.clinics.image);// chueyern đổi từ blob sang url
                let clinicTemporary = res.clinics; // tạo đối tượng nhận data từ api
                clinicTemporary.image = image; // chỉnh sửa state cũ
                this.setState({
                    dataDetail_Clinic: clinicTemporary // chính thức nhận state
                })
            } else {
                this.setState({
                    dataDetail_Clinic: {}
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleImage_From_BLOB_to_URL = (dataImage) => {
        let imageBase64 = '';
        imageBase64 = new Buffer(dataImage, 'base64').toString('binary');
        return imageBase64;
    }

    render() {
        let { dataDetail_Clinic } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='.detai-clinic-container  container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                    <div className='detail-specialty-body'>
                        <div className='background' style={{ backgroundImage: `url(${dataDetail_Clinic.image})` }}>
                            <div className='description-specialty '>
                            {/* thực hiện việc lùi  */}
                            </div>
                        </div>
                    </div>
                    <div className='name-detail-clinic'>
                            <h3>
                            {dataDetail_Clinic && !_.isEmpty(dataDetail_Clinic) && language === LANGUAGES.VI ?
                                <div dangerouslySetInnerHTML={{ __html: dataDetail_Clinic.name }}>
                                </div> : <div dangerouslySetInnerHTML={{ __html: dataDetail_Clinic.nameEnglish }}>
                                </div>
                            }
                            </h3>
                        </div>
                    <div className='detail-clinic'>
                        {language === LANGUAGES.VI ? <div className='introduction-detail-clinic'>
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div> :
                            <div className='introduction-detail-clinic'>
                                BookingCare is Vietnam's leading comprehensive healthcare platform connecting users with over 200 reputable hospitals - clinics, more than 1,500 excellent specialists and thousands of quality medical services and products. High.
                            </div>}
                        <div className='address-detail-clinic'></div>
                        <div className='description-detail-clinic'>
                            {dataDetail_Clinic && !_.isEmpty(dataDetail_Clinic) && language === LANGUAGES.VI ?
                                <div dangerouslySetInnerHTML={{ __html: dataDetail_Clinic.descriptionHTML }}>
                                </div> : <div dangerouslySetInnerHTML={{ __html: dataDetail_Clinic.descriptionHTMLEnglish }}>
                                </div>
                            }
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
