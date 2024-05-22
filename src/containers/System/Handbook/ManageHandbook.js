import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
import Select from 'react-select';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import TableManageClinic from './TableManageClinic';

import { getAllDetailClinicByIdService } from '../../../services/clinicServices';

const mdParser = new MarkdownIt();


class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            // action của save
            listChuyenkhoa: [],
            chuyenkhoa_duoc_chon: {},

            allow_ModalPreview_Open: false, url_Preview_Handbook: '', avatar_base64_Save_in_DB: '',
            // cho hép mở đóng modal , url cho modal , data_saved_in_DB
            nameHandbook: '', nameHandbookEnglish: '', contentHandbook_HTML: '', contentHandbookEnglish_HTML: '', contentHandbook_TEXT: '', contentHandbookEnglish_TEXT: '',
            // data chủ yếu của đối tượng 
        };
    }

    async componentDidMount() {
        // this.props.getHandbookForTable(); // chạy một lần duy nhất trước khi mount component
        this.props.getListChuyenkhoa(); // chạy một lần duy nhất trước khi mount component
        this.setState({ listChuyenkhoa: this.props.all_Chuyenkhoa_redux });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { // => hàm này được gọi khi update component , nhưng trước khi render 
        // => Điều đó tức là chúng ta muốn thay đổi gì đó trước khi render thì làm tại đây 

        // Kiểm tra nếu listClinics_state đã thay đổi giữa các props trước và props hiện tại
        if (prevProps.listClinics_state !== this.props.listClinics_state) {
            // Đặt state mới với các giá trị trống hoặc mặc định
            this.setState({
                nameHandbook: '', nameHandbookEnglish: '',
            });
        }

        if (prevProps.all_Chuyenkhoa_Redux !== this.props.all_Chuyenkhoa_Redux) {
            let dataSelectDoctor = this.builDataForInputChuyenkhoa(this.props.all_Chuyenkhoa_Redux);
            this.setState({
                listChuyenkhoa: dataSelectDoctor
            });
        }
    }

    handle_Onchange_Image_Handbook = async (event) => {
        let data = event.target.files;   // 
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                url_Preview_Handbook: objectUrl, // url dùng để hiện ảnh lên trước đã, hiện lên ở div ** A
                avatar_base64_Save_in_DB: base64 // để lưu vào database
            });
        }
    };

    handleEditorChangeEnglish = ({ html, text }) => { // hàm này ghi data vào state ( bằng tiếng anh )
        this.setState({
            contentHandbookEnglish_HTML: html,  // nhận html , ghi vào state để vào database
            contentHandbookEnglish_TEXT: text // nhận text, ghi vào state , để vào database
        })
    }

    handleEditorChange = ({ html, text }) => { // hàm này ghi data vào state
        this.setState({
            contentHandbook_HTML: html,
            contentHandbook_TEXT: text
        })
    }

    open_Modal_PreviewImage = () => {
        // nếu chưa có link ảnh , chưa có ảnh thì ra khỏi hàm , ko làm gì cả . 
        if (!this.state.previewImageUrl_Clinic) { return; }
        this.setState({
            allow_ModalPreview_Open: true
        });
    }


    handleOnchangeInput = (event, id) => {
        let copyState = this.state;  // sao chép hết state hiện tại 
        copyState[id] = event.target.value; // state đó gán giá trị bằng value của event
        // thằng event.target.value ( giá trị được nhập trong input) gán cho state[id]
        this.setState({ // cập nhật toàn bộ state , thì sẽ ko cần tìm cái state lẻ mà nó thay đổi nữa
            ...copyState
        });
    }


    isCheckValidate = () => {

        let arrId = ['nameHandbook', 'nameHandbookEnglish', 'contentHandbook_HTML', 'contentHandbookEnglish_HTML'];

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

    handleSave_Handbook = () => {
        let isValid = this.isCheckValidate();
        if (isValid === false) { console.log('chưa valid'); return; }// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả


        // nếu thoát if thì fire action 
        let { action } = this.state;
        console.log("action of this: ", action);
        // 1. nếu action === create thì fire redux create user
        // if (action === CRUD_ACTIONS.CREATE) {

            console.log('\n',this.state.chuyenkhoa_duoc_chon);
            let value = this.state.chuyenkhoa_duoc_chon.value; 
            this.props.createNew_Handbook({
                nameHandbook: this.state.nameHandbook,
                nameHandbookEnglish: this.state.nameHandbookEnglish,

                contentHandbookEnglish_HTML: this.state.contentHandbookEnglish_HTML,
                contentHandbookEnglish_TEXT: this.state.contentHandbookEnglish_TEXT,

                contentHandbook_TEXT: this.state.contentHandbook_TEXT , 
                contentHandbook_HTML: this.state.contentHandbook_HTML, 
                avatar_base64_Save_in_DB : this.state.avatar_base64_Save_in_DB, 

                keyToFindChuyenkhoa : value
            });

            alert('đã save');
        

        if (action === CRUD_ACTIONS.EDIT) {
            console.log('vào đây lần 1');
            this.props.updateClinic(this.state.clinicEditId, {
                id: this.state.clinicEditId,
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

        this.setState({
            nameHandbook: '', nameHandbookEnglish: '', contentHandbook_HTML: '', contentHandbookEnglish_HTML: '', contentHandbook_TEXT: '', contentHandbookEnglish_TEXT: '', chuyenkhoa_duoc_chon : {}
        })
    }

    builDataForInputChuyenkhoa = (dataInput) => { // so sánh để hiển thị data ra input doctor 
        let result = [];
        let { language } = this.props;

        if (dataInput && dataInput.length > 0) {
            dataInput.map((item, index) => {
                let obj = {};
                let labelVi = `${item.nameChuyenkhoa} ${item.id} + vi`;
                let labelEn = `${item.nameChuyenkhoa} ${item.id} + en`;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }

        return result;
    }

    handleSelectDoctor = (chuyenkhoa_seleted) => {
        this.setState({
            chuyenkhoa_duoc_chon: chuyenkhoa_seleted
        });
    }



    render() {
        let language = this.props.language; //dùng redux lưu biến toàn cục language

        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'> HANDBOOK  </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'><FormattedMessage id="manage-user.add" /></div>
                        </div>
                        <div className='row'>
                            <div className='col-12 mt-3'>
                                <label><FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage> Chuyên khoa</label>
                                <Select
                                    value={this.state.chuyenkhoa_duoc_chon} // 1
                                    onChange={this.handleSelectDoctor}
                                    // onChange={(value,id)=>this.handleChange(value,id)}   2 hàm trên dưới tương tự nhau, 
                                    options={this.state.listChuyenkhoa}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage>}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />Handbook</label>
                                <input className='form-control' type='text' name='nameHandbook' placeholder='Enter hanbook name...' value={this.state.nameHandbook}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'nameHandbook') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />Handbook BANG TIENG ANH</label>
                                <input className='form-control' type='text' name='nameHandbookEnglish' placeholder='Enter nameHandbook english...' value={this.state.nameHandbookEnglish} onChange={(event) => { this.handleOnchangeInput(event, 'nameHandbookEnglish') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' class="" id="previewImg"
                                        onChange={(event) => this.handle_Onchange_Image_Handbook(event)} hidden />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div
                                        onClick={() => this.open_Modal_PreviewImage()}
                                        // A. nếu click, chạy tới hàm openPreviewImage mà ko cần event
                                        // tại đây. nếu có url thì style bên dưới hiển thị ( div sẽ có background ) 
                                        // đồng thời modal preview sẽ thay đổi thành true, cho phép mở
                                        style={{ backgroundImage: `url(${this.state.url_Preview_Handbook})` }}
                                        className='preview-image'></div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSave_Handbook()} >Handbook
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>

                            <div className='row'>
                                <div className='col-12 mt-3'>
                                    <br></br><label>Markdown Tiếng việt</label>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={this.state.contentHandbook_TEXT} />

                                    <div className='manage-doctor-editor'>
                                        <label>Markdown English </label>

                                        <MdEditor
                                            style={{ height: '400px' }}
                                            renderHTML={text => mdParser.render(text)}
                                            onChange={this.handleEditorChangeEnglish}
                                            value={this.state.contentHandbookEnglish_TEXT} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-12 mt-3'>
                                {/* <TableManageClinic resolve_through_props_of_father={this.handle_at_father}
                                    action={this.state.action}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.allow_ModalPreview_Open === true && <Lightbox
                    mainSrc={this.state.url_Preview_Handbook}
                    onCloseRequest={() => this.setState({ allow_ModalPreview_Open: false })}
                />}
                {/* A Nếu state mở cho phép mở, nó sẽ được mở ra và sử dụng */}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listUsers: state.admin.users,

        all_Chuyenkhoa_Redux: state.chuyenkhoaReducer_manager.id_name_chuyenkhoas
        // state này trong reducers, được used để get data for table

        // khi redux vừa lưu thêm= tạo mới dữ liệu thì biến listUsers được cập nhật . Khi đó DidupDate sẽ hoạt động
        // và tạo nên tình trạng setStae khi có sự khác nhau giữa các giá trị cũ và hiện tại ( được cập nhật) 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListChuyenkhoa: () => dispatch(actions.getListChuyenkhoa_Action()),

        // updateClinic: (id, data) => dispatch(actions.updateClinic_Action(id, data)),
        createNew_Handbook: (data) => dispatch(actions.createNew_Handbook_Action(data)),


        // getClinicForTable: () => dispatch(actions.getAllClinic_Action()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);

