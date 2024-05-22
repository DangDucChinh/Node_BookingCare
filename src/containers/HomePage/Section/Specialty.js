import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userSevice';
import { withRouter } from 'react-router';
import { Buffer } from 'buffer';


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('res special : ',res);
        if (res && res.errCode === 0) {
            this.setState({ dataSpecialty: res.data ? res.data : [] });
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        let { dataSpecialty } = this.state;
        console.log('check : ', dataSpecialty);



        return (
            <>
                <div className="section-specialty">
                    <div className="specialty-header">
                        <span className="title-section"><FormattedMessage id="home-section-specialities.popular-specialties" /></span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings} className="specialty-body">
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {

                                    let imageDoctorBase64 = ''; // the basic the indepents of the image element 
                                    if (item.image) {
                                        imageDoctorBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    return (
                                        <div className="slick-item" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${imageDoctorBase64})` }}></div>
                                            <p>{item.name}</p>
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
}

const mapDispatchToProps = dispatch => {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));