import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialtyList.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userSevice';
import { withRouter } from 'react-router';
import { Buffer } from 'buffer';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';


class SpecialtyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialtyList: []
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({ dataSpecialtyList: res.data ? res.data : [] });
        }
    }

    // handleViewDetailSpecialtyList = (item) => {
    //     if (this.props.history) {
    //         this.props.history.push(`/detail-SpecialtyList/${item.id}`);
    //     }
    // }


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        let { dataSpecialtyList } = this.state;

        return (
            <>
                {/* <div className="section-SpecialtyList">
                    <div className="SpecialtyList-header">
                        <span className="title-section"><FormattedMessage id="home-section-specialities.popular-specialties" /></span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="SpecialtyList-body">
                        <Slider {...settings} className="SpecialtyList-body">
                            {dataSpecialtyList && dataSpecialtyList.length > 0
                                && dataSpecialtyList.map((item, index) => {

                                    let imageDoctorBase64 = ''; // the basic the indepents of the image element 
                                    if (item.image) {
                                        imageDoctorBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    return (
                                        <div className="slick-item" key={index} onClick={() => this.handleViewDetailSpecialtyList(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${imageDoctorBase64})` }}></div>
                                            <p>{item.name}</p>
                                        </div>
                                    );
                                })}
                        </Slider>
                        </div>
                    </div> */}
                    <HomeHeader />
                    <HomeFooter />
            </>
        );
    };
};


const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtyListList));