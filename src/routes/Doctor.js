import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';


class Doctor extends Component {
    render() {
        const {  isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                {/* the doctor */}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>                       
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn , 
        systemMenuPath : state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
