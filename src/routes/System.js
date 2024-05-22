import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageChuyenkhoa from '../containers/System/Chuyenkhoa/ManageChuyenkhoa';

import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import './System.scss';
import { Link } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';




class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        // {this.props.isLoggedIn && <Header />} 
        {/* nếu loggin thì render header */ }
        return (
            <>
                <div className='sidebar'>
                    <div className='sidebar-menu'>
                        <h2>Bookingcare</h2>
                    </div>
                    <div className='sidebar-links'>
                        <Link to="/system/user-redux" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-user-circle"></i>Quản lí tài khoản</div></Link>
                        <Link to="/system/manage-doctor" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-user-md"></i>Quản lí bác sĩ</div></Link>
                        <Link to="/system/manage-specialty" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-stethoscope"></i>Quản lí chuyên khoa</div></Link>
                        {/* <Link to="/system/manage-doctor" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-clinic-medical"></i>Quản lí cơ sở y tế</div></Link> */}
                        <Link to="/system/manage-handbook" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-book"></i>Quản lí cẩm nang</div></Link>
                        <Link to="/system/manage-clinic" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-book"></i>Quản lí phòng khám</div></Link>
                        <Link to="/system/manage-chuyen-khoa" style={{ textDecoration: 'none' }}>
                            <div className='link'><i className="fas fa-book"></i>Quản lí CHUYÊN KHOA</div></Link>
                    </div>
                </div>
                <div className='main'>
                    {isLoggedIn && <Header />}
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                {/* manage trong navbar */}
                                <Route path="/system/user-manage" component={UserManage} />
                                <Route path="/system/user-redux" component={UserRedux} />

                                <Route path="/system/manage-doctor" component={ManageDoctor} />
                                <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                <Route path="/system/manage-handbook" component={ManageHandbook} />
                                <Route path="/system/manage-clinic" component={ManageClinic} />
                                <Route path="/system/manage-chuyen-khoa" component={ManageChuyenkhoa} />


                                {/* manage không trong navbar */}
                                <Route path="/system/manage-schedule" component={ManageSchedule} />
                                <Route component={() => {
                                    return (<Redirect to={systemMenuPath} />)
                                }} />

                                {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}

                            </Switch>
                        </div>
                    </div>
                </div>
            </ >
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
