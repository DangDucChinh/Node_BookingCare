import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatch } from '../../redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
// import Specialties from './Category/Specialties';

class HomePage extends React.Component {

    render() {
        return (
            <>
                <HomeHeader isShowBanner = {true}/>
                {/* <Specialties /> */}

                <Specialty />
                <MedicalFacility />
                <OutstandingDoctor />
                <HandBook />                
                <About />
                <HomeFooter />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

