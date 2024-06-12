import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import {Buffer} from 'buffer';
// import tất cả action từ thư mục actions

//
import MarkdownIt from 'markdown-it'; 
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersComponent: [],
            idDelete: ''
        }
    };

    componentDidMount = () => {
        this.props.fetchAllUserByRedux();
        console.log('Sau khi render ra lần 1 thì tại đây các tác vụ gọi api đc sử dụng để trả ra dữ liệu điền !');
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.lisUserRedux !== this.props.lisUserRedux) {
            console.log('didmount, render , rồi didupdate');
            // nếu listUser trước đó khác với listUser hiện tại, thì gán giá trị vào redux : 
            this.setState({ // việc dùng setState sẽ bắt component render lại , khi đó sẽ lấy được giá trị 
                usersComponent: this.props.lisUserRedux
            });
        }
    }
    handleClickDelete = (user) => {
        this.props.deleteUserByRedux(user.id);
    }
    handleClickEdit = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    render() {
        let arrUsers = this.state.usersComponent;
        return (
            <>
                <table id="TableManageUser">
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>ID</th>
                        <th>Ảnh đại diện</th>
                        <th>Thao tác</th>
                       
                    </tr>
                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            
                        }
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.address}</td>
                                <td>{item.id}</td>
                                <td style={{width : '25px'}}>
                                    <div
                                        style={{ border : '1px solid black', width : '100%' , height:'25px', 
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center', backgroundImage: `url(${imageBase64})`
                                        }} >
                                    </div>
                                </td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleClickEdit(item)}><i class="fas fa-wrench"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleClickDelete(item)}><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        );
                    })}

                </table>

                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        lisUserRedux: state.admin.users,
        // hứng kết quả từ hành động fire fetchAllUserByRedux, state là state của redux , admin là từ rootReducer, còn users lấy từ initialState của adminReducer 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserByRedux: () => dispatch(actions.fetchAllUserByRedux()),
        deleteUserByRedux: (user) => dispatch(actions.deleteUserByRedux(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
