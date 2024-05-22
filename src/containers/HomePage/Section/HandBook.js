import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';

import { getHandbook_Service } from '../../../services/handbookService';

import { withRouter } from 'react-router';
import { Buffer } from 'buffer';


class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: []
        };
    }

    async componentDidMount() {
        let res = await getHandbook_Service('ALL');
        if (res && res.errCode === 0) {
            this.setState({ dataHandbook: res.data ? res.data : [] });
            // this.setState({ dataHandbook: res.data });

        }
    }

    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`);
            
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

        let { dataHandbook } = this.state;

        return (
            <>
                <div className="section-Handbook">
                    <div className="Handbook-header">
                        <span className="title-section"><FormattedMessage id="home-section-specialities.popular-specialties" /></span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="Handbook-body">
                    <Slider {...settings} className="specialty-body">
                            {dataHandbook && dataHandbook.length > 0
                                && dataHandbook.map((item, index) => {

                                    let imageDoctorBase64 = ''; // the basic the indepents of the image element 
                                    if (item.avatar_base64_Save_in_DB) {
                                        imageDoctorBase64 = new Buffer(item.avatar_base64_Save_in_DB, 'base64').toString('binary');
                                    }

                                    return (
                                        <div className="slick-item" key={index} onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${imageDoctorBase64})` }}></div>
                                            <p>{item.nameHandbook}</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));