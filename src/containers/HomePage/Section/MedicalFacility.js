import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import {Buffer} from 'buffer';

import { Redirect, withRouter } from 'react-router';


class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinics: [],
        };
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.clinicsForHome !== this.props.clinicsForHome) {
            this.setState({
                arrClinics: this.props.clinicsForHome
            });
        }
    }

    componentDidMount() {
        this.props.load_Clinics_Action_At_Component();
    }


    // xử lí tác vụ click
    handleViewDetailFacility = (clinic)=>{
        this.props.history.push(`/detail-clinic/${clinic.id}`);    
    }


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        let arrClinics = this.state.arrClinics;
        let { language} = this.props;

        return (
            <>
                <div className="section-MedicalFacility">
                    <div className="MedicalFacility-header">
                       
                        <span><FormattedMessage id='homepage.out-standing-doctor' /></span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="MedicalFacility-body">
                        <Slider {...settings} className="MedicalFacility-body">

                            {arrClinics && arrClinics.length > 0 && arrClinics.map((item, index) => {
                                let imageDoctorBase64 = ''; // the basic the indepents of the image element 
                                if(item.image){
                                    imageDoctorBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                // let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                // let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName} `;
                                return (
                                    <div className="slick-item" key={index} onClick={()=>this.handleViewDetailFacility(item)}> 
                                        <div className="bg-image" style={{backgroundImage : `url(${imageDoctorBase64})`}}></div>
                                        {/* <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p> */}
                                        <p>Clinic</p>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </>
        );
    };
};


const mapStateToProps = state => {
    return {
        clinicsForHome: state.admin.medical_facilities,
        language : state.app.language,
        isLoggedIn : state.user.isLoggedIn
        // the this following is the default value for 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load_Clinics_Action_At_Component: () => dispatch(actions.getTopMedicalFacility_Actions())
    }
}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));