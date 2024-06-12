import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getAllUsers } from '../../services/userSevice';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // arrayUser: [],
            isOpen: false , 

            gender: '',
            roleId: '',  
            positionId: '',  

            firstName: '',  
            lastName: '',  
            email: '',  
            password: '',  

            address: '',  
            phoneNumber: '',  
            image: '',  
        }
    };

    async componentDidMount() {

        // this.setState({ 
        //     gender: '',
        //     roleId: '',
        //     positionId: '',

        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     password: '',

        //     address: '',
        //     phoneNumber: '',
        //     image: '',  
        // });
    }

    isOpenModalUser = () => {
        this.setState({ isOpen: true });
    }

    isControlModelUser = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { userInfo } = this.props;
        console.log('\ncheckout user : ', userInfo);
        return (

            <>
                {/* <ModalUser isOpen={this.state.isOpen} isControlModelUser={this.isControlModelUser} /> */}
                <div className="user-container">
                    <div className='header-actions'>
                        <div className='add'>
                            <button className='btn-user' onClick={() => this.isOpenModalUser()}>
                                <i class="fas fa-plus"></i>Create a new user
                            </button>
                        </div>
                    </div>
                    <div className='title text-center'>
                       My Information
                    </div>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                            <button
                                id="dropdownButton"
                                data-dropdown-toggle="dropdown"
                                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                type="button"
                            >
                                <span className="sr-only">Open dropdown</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                           
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src="/docs/images/people/profile-picture-3.jpg"
                                alt="Bonnie image"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                Bonnie Green
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Designer
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Designer
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Designer
                            </span><span className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Designer
                            </span><span className="text-sm text-gray-500 dark:text-gray-400">
                                Visual Designer
                            </span>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // 
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
