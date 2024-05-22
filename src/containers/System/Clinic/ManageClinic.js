import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';

import { CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
import './TableManageClinic.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TableManageClinic from './TableManageClinic';

import { getAllDetailClinicByIdService } from '../../../services/clinicServices';

const mdParser = new MarkdownIt();


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listClinics_state: [],

            previewImageUrl_Clinic: '',

            avatar_Save_in_DB: '',
            name: '', nameEnglish: '', addressEnglish: '', address: '',
            descriptionHTML: '', descriptionHTMLEnglish: '',
            descriptionMarkdown: '', descriptionMarkdownEnglish: '',

            action: CRUD_ACTIONS.CREATE,
            clinicEditId: ''

        };
    }

    async componentDidMount() {
        this.props.getClinicForTable(); // chạy một lần duy nhất trước khi mount component
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.listClinics_state !== this.props.listClinics_state) {
            // this.setState({
            //     name: '', nameEnglish: '',
            //     address: '', addressEnglish: '',
            //     avatar_Save_in_DB: '',
            //     previewImageUrl_Clinic: '',
            //     descriptionHTML: '', descriptionHTMLEnglish: '',
            //     descriptionMarkdown: '', descriptionMarkdownEnglish: '',
            // });
        }
    }

    handleOnchageImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl_Clinic: objectUrl, // đường dẫn, state này dùng cho thư viện để chuyển ảnh 
                avatar_Save_in_DB: base64 // state này chính là avatar_Save_in_DB file 
            });
        }
    };

    handleEditorChangeEnglish = ({ html, text }) => { // hàm này ghi data vào state
        this.setState({
            descriptionHTMLEnglish: html,
            descriptionMarkdownEnglish: text
        })
    }

    handleEditorChange = ({ html, text }) => { // hàm này ghi data vào state
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    isOpenPreviewImage = () => {
        if (!this.state.previewImageUrl_Clinic) { return; }
        // nếu chưa có link ảnh , chưa có ảnh thì ra khỏi hàm , ko làm gì cả . 
        this.setState({
            isImagePreviewOpen_Clinic: true
        });
    }
    handleOnchangeInput = (event, id) => {
        let copyState = this.state;  // sao chép hết state hiện tại 
        copyState[id] = event.target.value; // state đó gán giá trị bằng value của event
        this.setState({ // cập nhật toàn bộ state , thì sẽ ko cần tìm cái state lẻ mà nó thay đổi nữa
            ...copyState
        });
    }
    isCheckValidate = () => {
        let arrId = ['name', 'nameEnglish', 'address', 'addressEnglish', 'descriptionHTML', 'descriptionMarkdown', 'descriptionHTMLEnglish', 'descriptionMarkdownEnglish'];

        let copyState = { ...this.state };
        let isValid = true;
        for (let i = 0; i < arrId.length; i++) {
            if (!copyState[arrId[i]]) {
                alert(`This input string cannot be empty :${arrId[i]}`);
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handle_at_father = (dataFromChild) => {
        let imageBase64 = '';
        if (dataFromChild.image) {
            imageBase64 = new Buffer(dataFromChild.image, 'base64').toString('binary');
        }

        this.setState({
            address: dataFromChild.address,
            addressEnglish: dataFromChild.addressEnglish,
            name: dataFromChild.name,
            nameEnglish: dataFromChild.nameEnglish,
            descriptionHTML: dataFromChild.descriptionHTML,
            descriptionHTMLEnglish: dataFromChild.descriptionHTMLEnglish,
            descriptionMarkdown: dataFromChild.descriptionMarkdown,
            descriptionMarkdownEnglish: dataFromChild.descriptionMarkdownEnglish,

            avatar: '',
            previewImageUrl_Clinic: imageBase64,

            action: CRUD_ACTIONS.EDIT,
            clinicEditId: dataFromChild.id
        });
    }

    handleSaveClinic = () => {
        console.log("action of this: 1");
        let isValid = this.isCheckValidate();
        if (isValid === false) { console.log('chưa valid'); return; }// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả


        // nếu thoát if thì fire action 
        let { action } = this.state;
        // console.log("action of this: 2", action);
        // // 1. nếu action === create thì fire redux create user
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewClinic({
                name: this.state.name,
                nameEnglish: this.state.nameEnglish,

                address: this.state.address,
                addressEnglish: this.state.addressEnglish,

                descriptionHTML: this.state.descriptionHTML,
                descriptionHTMLEnglish: this.state.descriptionHTMLEnglish,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionMarkdownEnglish: this.state.descriptionMarkdownEnglish,

                avatar_Save_in_DB: this.state.avatar_Save_in_DB,
            });
        }

        if (action === CRUD_ACTIONS.EDIT) {
            console.log('vào đây lần 1') ; 
            this.props.updateClinic(this.state.clinicEditId, {
                id : this.state.clinicEditId,
                name: this.state.name,
                nameEnglish: this.state.nameEnglish,
                descriptionHTML: this.state.descriptionHTML,
                address: this.state.address,
                addressEnglish: this.state.addressEnglish,
                descriptionHTMLEnglish: this.state.descriptionHTMLEnglish,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionMarkdownEnglish: this.state.descriptionMarkdownEnglish,
                avatar_Save_in_DB: this.state.avatar_Save_in_DB
            });
        }
    }

    render() {
        let language = this.props.language; //dùng redux lưu biến toàn cục language
        let { name, nameEnglish, descriptionHTML, descriptionHTMLEnglish, descriptionMarkdownEnglish, descriptionMarkdown, address, addressEnglish, isImagePreviewOpen_Clinic } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'>Clinic   </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'><FormattedMessage id="manage-user.add" /></div>
                        </div>
                        {/* CLINIC */}          <div className='row'>  {/* CLINIC */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='name' placeholder='Enter clinic name...' value={name}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'name') }} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='nameEnglish' placeholder='Enter clinic English name...' value={nameEnglish}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'nameEnglish') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />DIA CHI</label>
                                <input className='form-control' type='text' name='address' placeholder='Enter clinic adress...' value={address}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />DIA CHI BANG TIENG ANH</label>
                                <input className='form-control' type='text' name='addressEnglish' placeholder='Enter clinic English address...' value={addressEnglish} onChange={(event) => { this.handleOnchangeInput(event, 'addressEnglish') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' class="" id="previewImg"
                                        onChange={(event) => this.handleOnchageImage(event)} hidden />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div 
                                        onClick={() => this.isOpenPreviewImage()}
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl_Clinic})`,border : '1px solid black' }}
                                        className='preview-image'></div>
                                </div>
                            </div>

                            <div className='col-12 mt-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveClinic()} >CLINIC
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />}
                                </button>

                                <label>Markdown Tiếng việt</label>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.descriptionMarkdown} />

                                <div className='manage-doctor-editor'>
                                    <label>Markdown English </label>

                                    <MdEditor
                                        style={{ height: '400px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEnglish}
                                        value={this.state.descriptionMarkdownEnglish} />
                                </div>
                            </div>

                            <div className='col-12 mt-3'>
                                <TableManageClinic resolve_through_props_of_father={this.handle_at_father}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>


                </div>

                {this.state.isImagePreviewOpen_Clinic === true && <Lightbox
                    mainSrc={this.state.previewImageUrl_Clinic}
                    onCloseRequest={() => this.setState({ isImagePreviewOpen_Clinic: false })}
                />}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listUsers: state.admin.users,

        listClinics_state: state.clinicReducer_manager.clinics
        // state này trong reducers, được used để get data for table

        // khi redux vừa lưu thêm= tạo mới dữ liệu thì biến listUsers được cập nhật . Khi đó DidupDate sẽ hoạt động
        // và tạo nên tình trạng setStae khi có sự khác nhau giữa các giá trị cũ và hiện tại ( được cập nhật) 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getPositionStart: () => dispatch(actions.fetchPositionStart()),
        // getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // getRoleStart: () => dispatch(actions.fetchRoleStart()),

        // createNewUser: (data) => dispatch(actions.createNewUser(data)),
        updateClinic: (id, data) => dispatch(actions.updateClinic_Action(id, data)),
        // editUser: (id, data) => dispatch(actions.editUser(id, data))

        createNewClinic: (data) => dispatch(actions.createNewClinic_Action(data)),
        getClinicForTable: () => dispatch(actions.getAllClinic_Action()),
        // các action được fire trong * actions 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

