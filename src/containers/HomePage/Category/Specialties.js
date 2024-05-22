import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialties.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../../../containers/Patient/Doctor/DoctorSchedule';
import ProfileDoctor from '../../../containers/Patient/Doctor/ProfileDoctor';

import {  getAllSpecialty } from '../../../services/userSevice';
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
            dataDetailSpecialty : dataDetailSpecialty_fromDB
        });




    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }
    }

    handleOnChangeSelect = async (event) => {
    }

    render() {
        let { dataDetailSpecialty  } = this.state;
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
