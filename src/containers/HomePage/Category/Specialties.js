import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialties.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllSpecialty } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../HomeFooter';
import { Buffer } from 'buffer';


class Specialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('res special : ', res);
        if (res && res.errCode === 0) {
            this.setState({ dataSpecialty: res.data ? res.data : [] });
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }
    }


    render() {
        let { dataSpecialty } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='detail-specialty-container container'>
                    <HomeHeader isShowBanner={false}></HomeHeader>

                    <div class="container mt-5">
                        <div class="row">
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {

                                    let imageDoctorBase64 = ''; // the basic the indepents of the image element 
                                    if (item.image) {
                                        imageDoctorBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    return (
                                        <div class="col-lg-3 col-md-4 col-sm-6" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <section class="bg-primary text-white p-4 mb-4 section-content">
                                                <img src={`url(${imageDoctorBase64})`} alt={item.name} class="section-img" />
                                                <p>{item.name}</p>
                                            </section>
                                        </div>
                                    );
                                })}
                            
                            </div>
                        </div>
                    </div>

                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
