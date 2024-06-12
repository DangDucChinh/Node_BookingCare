import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLogin } from '../../services/userSevice';
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        // khai báo các state dọn dẹp thư mục và có thể đẩy lùi các thành phần props
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            errMess: ''
        };
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        }); // truyền vào đối tượng mới để cập nhật state cũ
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleClickBtn = async () => {
        this.setState({
            errMess: '' // mỗi lần click thì lỗi hiển thị trước đó là rỗng , sau khi click thì lỗi phải biến mất , hoặc sinh lỗi mới
        });

        try {
            let data = await handleLogin(this.state.username, this.state.password);


            if (data && data.errCode !== 0) {
                this.setState({
                    errMess: data.message
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user); // truyền tham số user vào sau khi lấy được user
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMess: error.response.data.message
                    });
                };
            };
        }
    }

    handleHideShowPass = (event) => {
        this.setState({
            isShowPass: !this.state.isShowPass
        });
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            this.handleClickBtn();
        };
    }


    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username : </label>
                            <input type='text'
                                onChange={(event) => { this.handleUsernameChange(event) }}
                                value={this.state.username}
                                className='form-control'
                                name='username'
                                placeholder='Enter your username' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='control'>
                                <input type={this.state.isShowPass ? 'password' : 'text'}
                                    onChange={(event) => { this.handlePasswordChange(event) }}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                    value={this.state.password}
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter your password' />
                                <span className='show-hide-pass' onClick={(event) => { this.handleHideShowPass(event) }}>
                                    <i class={this.state.isShowPass ? 'fas fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 login-input' style={{ color: 'red' }}>
                            {this.state.errMess}
                        </div>
                        <div className='col-12 login-input'>
                            <button
                                onClick={() => this.handleClickBtn()}
                                className='col-12 btn-login' type='submit' >LOGIN
                            </button>
                        </div>
                        <div className='col-12 login-input'>
                            <span className='forgot-password'>Forgot your password ? </span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className=''>Or Login with : </span>
                        </div>
                        <div className='col-12 social-login text-center'>
                            <i class="fab fa-google-plus icon" style={{ color: '#c80909' }}></i>
                            <i class="fab fa-facebook icon" style={{ color: '#045bf1' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/*
 hàm connect của Redux để kết nối component Login với Redux store. Đ
 truyền vào connect hai hàm mapStateToProps và mapDispatchToProps.

Hàm mapStateToProps: map state của Redux vào props của component Login. Trong ví dụ này, chúng ta chỉ lấy một phần của state, đó là state.app.language, và map nó vào một prop tên là lang. Khi state của Redux thay đổi, connect sẽ tự động cập nhật prop lang và re-render component.

Hàm mapDispatchToProps được sử dụng để map các actions của Redux vào props của component Login. Trong ví dụ này, chúng ta định nghĩa các props là navigate, adminLoginSuccess, adminLoginFail, và userLoginSuccess, mỗi prop đều là một hàm dispatch một action tương ứng đến Redux store thông qua hàm dispatch.

Sau khi định nghĩa mapStateToProps và mapDispatchToProps, chúng ta gọi hàm connect(mapStateToProps, mapDispatchToProps)(Login) để kết nối component Login với Redux store và trả về một component mới với các props được map từ state và actions của Redux. Khi các props này thay đổi, connect sẽ tự động re-render component Login.





Regenerate response

*/
