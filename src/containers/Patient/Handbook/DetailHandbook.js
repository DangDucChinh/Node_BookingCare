import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';

import { getHandbook_Service } from '../../../services/handbookService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

import { Buffer } from 'buffer';


class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_Handbook_Detail: {},
            current_Handbook_Id: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                current_Handbook_Id: this.props.match.params.id
            });

            let res = await getHandbook_Service(this.props.match.params.id);

            if (res && res.errCode === 0) {
                let image_from_db = this.handleImage_From_BLOB_to_URL(res.data.avatar_base64_Save_in_DB);// chueyern đổi từ blob sang url
                let handbook_temporary = res.data; // tạo đối tượng nhận data từ api
                handbook_temporary.avatar_base64_Save_in_DB = image_from_db; // chỉnh sửa state cũ
                this.setState({
                    data_Handbook_Detail: handbook_temporary // chính thức nhận state
                })
            } else {
                this.setState({
                    data_Handbook_Detail: {}
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
        let { data_Handbook_Detail } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='.detai-clinic-container  container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                    <div className='detail-specialty-body'>
                        <div className='background' style={{ backgroundImage: `url(${data_Handbook_Detail.avatar_base64_Save_in_DB})` }}>
                            <div className='description-specialty '>
                            {/* thực hiện việc lùi  */}
                            </div>
                        </div>
                    </div>
                    <div className='name-detail-clinic'>
                            <h3>
                            {data_Handbook_Detail && !_.isEmpty(data_Handbook_Detail) && language === LANGUAGES.VI ?
                                <div dangerouslySetInnerHTML={{ __html: data_Handbook_Detail.nameHandbook }}>
                                </div> : <div dangerouslySetInnerHTML={{ __html: data_Handbook_Detail.nameHandbookEnglish }}>
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
                            {data_Handbook_Detail && !_.isEmpty(data_Handbook_Detail) && language === LANGUAGES.VI ?
                                <div dangerouslySetInnerHTML={{ __html: data_Handbook_Detail.contentHandbook_HTML }}>
                                </div> : <div dangerouslySetInnerHTML={{ __html: data_Handbook_Detail.contentHandbookEnglish_HTML }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
