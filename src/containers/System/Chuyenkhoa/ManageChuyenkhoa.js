import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
// import * as actions from "../../../utils/index";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
// import './TableManageChuyenkhoa.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import TableManageChuyenkhoa from './TableManageChuyenkhoa';
import create_new_chuyenkhoa_service from '../../../services/chuyenkhoaService';


const mdParser = new MarkdownIt();


class ManageChuyenkhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameChuyenkhoa: '',
            contentChuyenkhoa: '',
            imageChuyenkhoa_save_in_db: '',

            preview_image_url: '',
            allow_open_preview_image: false
        };
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOnchageImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                preview_image_url: objectUrl, // đường dẫn, state này dùng cho thư viện để chuyển ảnh 
                imageChuyenkhoa_save_in_db: base64 // state này chính là avatar_Save_in_DB file 
            });
        }
    };

    isOpenPreviewImage = () => {
        if (!this.state.preview_image_url) { return; }
        this.setState({
            allow_open_preview_image: true
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
        let arrId = ['nameChuyenkhoa', 'contentChuyenkhoa'];

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
        let isValid = this.isCheckValidate();
        if (isValid === false) { console.log('chưa valid'); return; } else {// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả
            this.props.createNewChuyenkhoa({
                nameChuyenkhoa: this.state.nameChuyenkhoa,
                contentChuyenkhoa: this.state.contentChuyenkhoa,
                imageChuyenkhoa_save_in_db: this.state.imageChuyenkhoa_save_in_db,
            });
        }
    }

    render() {
        let language = this.props.language; //dùng redux lưu biến toàn cục language

        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'>Chuyen khoa   </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'><FormattedMessage id="manage-user.add" /></div>
                        </div>
                        {/* CLINIC */}          <div className='row'>  {/* CLINIC */}



                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />Name</label>
                                <input className='form-control' type='text' name='nameChuyenkhoa' placeholder='Enter clinic adress...' value={this.state.nameChuyenkhoa}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'nameChuyenkhoa') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />Content</label>
                                <input className='form-control' type='text' name='contentChuyenkhoa' placeholder='Enter content CHuyenkhoa..' value={this.state.contentChuyenkhoa} onChange={(event) => { this.handleOnchangeInput(event, 'contentChuyenkhoa') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' class="" id="previewImg"
                                        onChange={(event) => this.handleOnchageImage(event)} hidden />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div
                                        onClick={() => this.isOpenPreviewImage()}
                                        style={{ backgroundImage: `url(${this.state.preview_image_url})`, border: '1px solid black' }}
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

                                <div className='col-12 mt-3'>
                                    {/* <TableManageChuyenkhoa resolve_through_props_of_father={this.handle_at_father}
                                    action={this.state.action}
                                /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.allow_open_preview_image === true && <Lightbox
                        mainSrc={this.state.preview_image_url}
                        onCloseRequest={() => this.setState({ allow_open_preview_image: false })}
                    />}
                </div >
            </div>
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
        updateClinic: (id, data) => dispatch(actions.updateClinic_Action(id, data)),
        // editUser: (id, data) => dispatch(actions.editUser(id, data))

        createNewChuyenkhoa: (data) => dispatch(actions.createNewChuyenkhoa_Action(data)),
        getClinicForTable: () => dispatch(actions.getAllClinic_Action()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChuyenkhoa);

