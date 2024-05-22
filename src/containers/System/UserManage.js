import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userSevice';
import ModalUser from '../System/ModalUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: [],
            isOpen: false
        }
    };

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrayUser: response.users
            }, () => {

            })

            
        }
    }

    isOpenModalUser = () => {
        this.setState({ isOpen: true });
    }

    isControlModelUser = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        // console.log('checkout user : ', this.state);
        return (
            <>
                <ModalUser isOpen={this.state.isOpen} isControlModelUser={this.isControlModelUser} />
                <div className="user-container">
                    <div className='header-actions'>
                        <div className='add'>
                            <button className='btn-user' onClick={() => this.isOpenModalUser()}>
                                <i class="fas fa-plus"></i>Create a new user
                            </button>
                        </div>
                    </div>
                    <div className='title text-center'>
                        Manage User Dadcy
                    </div>
                    <div className='table-users mt-3 mx-3'>
                        <table id="customers">
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>ID</th>
                                <th>Thao tác</th>
                            </tr>
                            {this.state.arrayUser && this.state.arrayUser.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.id}</td>
                                        <td>
                                            <button className='btn-edit'><i class="fas fa-wrench"></i></button>
                                            <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                );
                            })
                            }
                        </table>
                    </div >
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // 
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
