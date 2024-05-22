import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';

import { getAllDetailClinicByIdService, getAllCodeService } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinicByIdService({
                id: id,
                location: 'ALL'
            });


            let resProvince = await getAllCodeService('PROVINCE');
            console.log('let res id : ', id, res);

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }


                let dataProvince = resProvince.allcodes;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    });
                }

                console.log('Cha được mount lần đầu tiieen cũng là duy nhất', res, 'mảng : ', arrDoctorId);


                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }
    }

    handleOnChangeSelect = async (event) => {
        // console.log('đây ?');
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailClinicByIdService({
                id: id,
                location: location
            });

            console.log('res special : ', res);

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId
                });
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic, listProvince } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='detail-specialty-container container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                    <div className='detail-specialty-body'>
                        <div className='background' style={{ backgroundImage: `url(${dataDetailClinic.image})` }}>
                            <div className='description-specialty '>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && language === LANGUAGES.VI ?
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    </div> : <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTMLEnglish }}>
                                    </div>
                                }
                            </div>
                        </div>


                        <div className='search-sp-doctor'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>

                        {arrDoctorId
                            && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor doctorIdFromParent={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <h1>{item}</h1>
                                                <DoctorSchedule doctorIdFromParent={item} hasId={true} />
                                            </div>
                                            <div className='doctor-extra-infor'>

                                                <DoctorExtraInfor doctorIdFromParent={item} />
                                            </div>
                                        </div>
                                    </div>

                                );
                            })}
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
