import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'

import { handleLogout } from '../../services/userSevice';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
            // menu chứa các item là các link của thanh navigation
        };
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageApp(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({ menuApp: menu });
        // console.log('user infofor :',this.props.userInfo);
    }

    handleClickLogout = async()=>{
        this.props.processLogout();
        let res = await handleLogout(); 
        console.log('\n\n:IP',res);
    }

    

    render() {
        const { processLogout, language, userInfo } = this.props;
        // console.log('check user infotooo ', userInfo);
        return (

            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <i class="fas fa-user-cog"></i>
                    <span style={{marginLeft : '8px'}} className='welcome'><FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}!!!</span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={(event) => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                        onClick={(event) => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    {/* <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div> */}
                    <div className="btn btn-logout" onClick={()=>{this.handleClickLogout()}} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => { dispatch(actions.changeLanguageApp(language)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);



