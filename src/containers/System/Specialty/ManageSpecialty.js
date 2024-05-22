import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { creataNewSpecialty } from '../../../services/userSevice';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import Select from 'react-select';


import { getAllDetailSpecialtyById, getAllSpecialty, editSpecialtyById } from '../../../services/userSevice';
import _ from 'lodash';






const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            nameEnglish: '',
            descriptionHTMLEnglish: '',
            descriptionMarkdownEnglish: '',
            // thành phần này cấu trúc nên content có hai ngôn ngữ của ứng dụng 
            // điều này là thành phần khai báo cho thấy việc sử dụng thường xuyên chúng
            // chốc nữa sẽ tiến hành thêm thắt input và đẩy vào trong database bằng cách gọi api và lưu trữ trên cơ sở dữ liệu 
            imageBase64File: '',
            previewImageUrl: '',

            //CHANGE
            listSpecialty: [],
            selectedSpecialty: {}, // thằng này dùng để nhận id và name, dùng id truy vấn
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        let result = [];
        let language = this.props.language;
        if (res.data && res.data.length > 0) {
            res.data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.name : item.nameEnglish;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({ listSpecialty: result });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }

        if (this.state.imageBase64File !== prevState.imageBase64File) { }

        // CHANGE 
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({ descriptionHTML: html, descriptionMarkdown: text });
    }

    handleEditorChangeEnglish = ({ html, text }) => {
        this.setState({ descriptionHTMLEnglish: html, descriptionMarkdownEnglish: text });
    }

    methodReRenderListSpecialties = async () => {
        let res = await getAllSpecialty();
        let result = [];
        let language = this.props.language;
        if (res.data && res.data.length > 0) {
            res.data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.name : item.nameEnglish;
                object.value = item.id;
                result.push(object);
            })
        }

        this.setState({ listSpecialty: result });
    }


    handleSaveNewSpecialty = async () => {
        let res = await creataNewSpecialty(this.state);
        console.log('phản hồi : ', res);

        if (res && res.errCode === 0) {
            toast.success('Thêm thành công specialty!');
            this.setState({
                name: '',
                imageBase64File: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                nameEnglish: '',
                descriptionHTMLEnglish: '',
                descriptionMarkdownEnglish: '',
                previewImageUrl: ''
            });

            this.methodReRenderListSpecialties();
        } else {
            toast.error('Có lỗi khi tiến hành save specialty@');
            console.log('check resposre lỗi : ', res);
        }
    }

    handleEditNewSpecialty = async () => {
        console.log('id res : ', this.state.selectedSpecialty.value);
        let dataFromInputs = { ...this.state };
        let res = await editSpecialtyById(dataFromInputs);


        console.log('phản hồi : ', res);
        if (res && res.errCode === 0) {
            toast.success('Edit thành công specialty!');
            this.setState({
                name: '',
                imageBase64File: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                nameEnglish: '',
                descriptionHTMLEnglish: '',
                descriptionMarkdownEnglish: '',
                previewImageUrl: ''
            }); this.methodReRenderListSpecialties();
        } else {
            toast.error('Có lỗi khi tiến hành Eidt specialty@@@');
            console.log('check resposre lỗi : ', res);
        }
    }

    handleOnchageImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            // console.log('BASE :', base64);
            this.setState({
                previewImageUrl: objectUrl, // đường dẫn, state này dùng cho thư viện để chuyển ảnh 
                imageBase64File: base64 // state này chính là avatar file 
            });
        }
    };
    isOpenPreviewImage = () => {
        if (!this.state.previewImageUrl) { return; }
        // nếu chưa có link ảnh , chưa có ảnh thì ra khỏi hàm , ko làm gì cả . 
        this.setState({
            isImagePreviewOpen: true
        });
    }

    handleSelectSpecialty = async (selectedSpecialty) => {
        this.setState({ selectedSpecialty: selectedSpecialty });

        let res = await getAllDetailSpecialtyById({
            id: selectedSpecialty.value,
            location: 'ALL'
        });

        if (res && res.errCode === 0) {
            let data = res.data;
            console.log(data);
            let { name, nameEnglish, descriptionHTML, descriptionHTMLEnglish, descriptionMarkdown, descriptionMarkdownEnglish, previewImageUrl } = this.state;
            if (data && !_.isEmpty(data)) {
                name = data.name;
                nameEnglish = data.nameEnglish;
                descriptionHTML = data.descriptionHTML;
                descriptionHTMLEnglish = data.descriptionHTMLEnglish;
                descriptionMarkdown = data.descriptionMarkdown;
                descriptionMarkdownEnglish = data.descriptionMarkdownEnglish;
                previewImageUrl = data.image;
            } else {
                name = '';
                nameEnglish = '';
                descriptionHTML = '';
                descriptionHTMLEnglish = '';
                descriptionMarkdown = '';
                descriptionMarkdownEnglish = '';
                previewImageUrl = '';
            }

            this.setState({
                name: name,
                nameEnglish: nameEnglish,
                descriptionHTML: descriptionHTML,
                descriptionMarkdown: descriptionMarkdown,
                descriptionHTMLEnglish: descriptionHTMLEnglish,
                descriptionMarkdownEnglish: descriptionMarkdownEnglish,
                previewImageUrl: previewImageUrl
            });
        }


    }

    render() {
        console.log('iamge : ', this.state);
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lí chuyên khoa</div>
                    <div className='row options-special'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedSpecialty} // 1
                            onChange={this.handleSelectSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage>}
                        />
                    </div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên môn</label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên môn bằng tiếng anh</label>
                            <input className='form-control' type='text' value={this.state.nameEnglish}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameEnglish')} />
                        </div>
                        {/* <div className='col-6 form-group'>
                            <label>Ảnh chuyên khoa</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImage(event)} />
                        </div> */}
                        <div className='col-6 form-group image-container'>
                            {/* <div className='image' style={{backgroundImage=`${}`}}> */}
                            {/* </div> */}
                            <input type='file' class="" id="previewImg"
                                onChange={(event) => this.handleOnchageImage(event)} hidden />
                            <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                            <div
                                onClick={() => this.isOpenPreviewImage()}
                                style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                className='preview-image'></div>
                        </div>
                        <div className='col-12 form-group'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown} />
                        </div>
                        <div className='col-12 form-group'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeEnglish}
                                value={this.state.descriptionMarkdownEnglish} />
                        </div>
                        <div className='col-12 btn-lg'>
                            <button className='btn btn-primary btn-lg' onClick={() => this.handleSaveNewSpecialty()}>
                                Save
                            </button>

                            <button className='btn btn-success btn-lg' onClick={() => this.handleEditNewSpecialty()}>
                                Edit
                            </button>
                        </div>
                        <br></br>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }

};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
