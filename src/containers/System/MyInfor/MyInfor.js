import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
// import './MyInfor.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
// import './MyInfor.scss';


class MyInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // attributes: ['email', 'password', 'roleId', 'firstName', 'lastName', 'address', 'phoneNumber', 'image', 'positionId', 'gender'],

            id: '',
            genderArr: [],
            positionArr: [],
            roleArr: [],

            isImagePreviewOpen: false,

            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',

            address: '',
            gender: '',
            position: '',
            role: '',

            avatar: '',
            previewImageUrl: '',
        };
    }

    async componentDidMount() {
        this.props.getPositionStart();
        this.props.getGenderStart();
        let userTam = this.props.userInfo; // thông tin user lưu trên redux
      
        let genders = this.props.genderDataFromRootReducer; // danh sách
        let positions = this.props.positionDataFromRootReducer; // danh sách
        // let genderTemporary = this.genderTemporary(userTam.gender); // giới tính hiển thị
        // let positionTemporary = this.positionTemporary(userTam.positionId); // cấp bậc hiển thị
        // console.log('\nuserTam : ', userTam);
        // console.log('\ngender : ', genderTemporary);

        // let imageBase64 = new Buffer(userTam.image, 'base64').toString('binary');
        console.log('\nid:',userTam);
        this.setState({
            id: userTam.id,
            firstName: userTam.firstName,
            lastName: userTam.lastName,
            email: userTam.email,
            address: userTam.address,
            phoneNumber: userTam.phoneNumber,
            role: userTam.roleId,
            positionArr: positions,
            position: positions && positions.length > 0 ? positions[0].keyMap : '',

            genderArr: genders,
            gender: genders && genders.length > 0 ? genders[0].keyMap : '',

            avatar : '' , 
            // previewImageUrl: imageBase64
        })
    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.genderDataFromRootReducer !== this.props.genderDataFromRootReducer) {
            let genders = this.props.genderDataFromRootReducer;
            // lấy data gender từ redux, sau khi đã đăng kí action để xử lí logic và reducer để chọn case xử lí . 
            // sau đó thực hiện tiêm mapStateToProps ( từ state của redux sang props của react)

            this.setState({
                genderArr: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
                // nếu có genders và genders.length > 0 thì lấy key của phần tử đầu tiên gán vào giá trị mặc định cho state 
                // còn nếu ko thỏa mãn đk thì state mặc định được gán rỗng sau khi đã update . 
            });
        }

        if (preProps.positionDataFromRootReducer !== this.props.positionDataFromRootReducer) {
            let positions = this.props.positionDataFromRootReducer;
            this.setState({
                positionArr: positions,
                position: positions && positions.length > 0 ? positions[0].keyMap : ''
            });
        }

    }

    genderTemporary = (gender) => {
        if (gender === 'F' || gender === 'f') {
            return {
                valueEn: 'Female',
                valueVi: 'Nữ',
                gender: 'F'
            }
        } else if (gender === 'M' || gender === 'm') {
            return {
                valueEn: 'Male',
                valueVi: 'Name',
                gender: 'M'
            }
        } else if (gender === 'O' || gender === 'o') {
            return {
                valueEn: 'Other',
                valueVi: 'Khác',
                gender: 'O'
            }
        }
    }

    positionTemporary = (position) => {
        if (position === 'P0') {
            return {
                valueEn: 'Doctor',
                valueVi: 'Bác sĩ',
                position: 'P0'
            }
        } else if (position === 'P1') {
            return {
                valueEn: 'Master',
                valueVi: 'Thạc sĩ',
                position: 'P1'
            }
        } else if (position === 'P2') {
            return {
                valueEn: 'Doctor of Philosophy',
                valueVi: 'Tiến sĩ',
                position: 'P2'
            }
        } else if (position === 'P3') {
            return {
                valueEn: 'Associate Professor',
                valueVi: 'Phó giáo sư',
                position: 'P3'
            }
        } else if (position === 'P4') {
            return {
                valueEn: 'Professor',
                valueVi: 'Giáo sư',
                position: 'P4'
            }
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
                avatar: base64 // state này chính là avatar file 
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

    handleOnchageInput = (event, id) => {
        let copyState = { ...this.state }; // sao chép hết state hiện tại 
        copyState[id] = event.target.value; // state đó gán giá trị bằng value của event
        this.setState({ // cập nhật toàn bộ state , thì sẽ ko cần tìm cái state lẻ mà nó thay đổi nữa
            ...copyState
        });
    }

    isCheckValidate = () => {
        let arrId = ['email', 'phoneNumber', 'address', 'firstName', 'lastName'];
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

    handleSaveUser = () => {
        let isValid = this.isCheckValidate();
        if (isValid === false) { return; }// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả
        // nếu thoát if thì fire action 
        let { action } = this.state;


        alert('thông báo'); 
        let imageBase64 = new Buffer(this.state.avatar, 'base64').toString('binary');
        this.props.editUser(this.state.userEditId, {
            id: this.state.id,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,

            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,

            // previewImageUrl : imageBase64,
            avatar: this.state.avatar
        });
    }



    render() {



        // let positions = this.state.positionArr; // dùng để xả data vào dropdown 
        // let genders = this.state.genderArr;

        let language = this.props.language; //dùng redux lưu biến toàn cục language
        const imageBase64 = new Buffer(this.props.userInfo.image, 'base64').toString('binary');

        let { email, firstName, lastName, phoneNumber, address, gender, position, role, previewImageUrl } = this.state;

        let genderTemporary = this.genderTemporary(gender); // giới tính hiển thị
        let positionTemporary = this.positionTemporary(position); // cấp bậc hiển thị




        // console.log('\ngender :::', this.state.gender);
        return (


            <div className="container rounded bg-white mb-5">
                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src={`${imageBase64}`}
                                alt="Profile"
                            />
                            <span className="font-weight-bold">
                                {language === LANGUAGES.VI ? (
                                    <>
                                        {position.valueVi} {lastName} {firstName}
                                    </>
                                ) : (
                                    <>
                                        {position.valueEn} {firstName} {lastName}
                                    </>
                                )}
                                {/* {language === LANGUAGES.VI ? item.valueVi : item.valueEn} */}
                                {/* {language === LANGUAGES.VI ? {lastName, firstName} : {firstName, lastName}} */}
                            </span>
                            <span>{phoneNumber}</span>
                            <span className="text-black-50">{email}</span>
                        </div>
                    </div>
                    <div className="col-md-8 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className='labels'><FormattedMessage id="manage-user.first-name" /></label>
                                    <input className='form-control' type='text' name='firstName' placeholder='Enter first name...' value={firstName}
                                        onChange={(event) => { this.handleOnchageInput(event, 'firstName') }} />
                                </div>
                                <div className="col-md-6">
                                    <label className='labels'><FormattedMessage id="manage-user.last-name" /></label>
                                    <input className='form-control' type='text' name='lastName' placeholder='Enter last name...' value={lastName}
                                        onChange={(event) => { this.handleOnchageInput(event, 'lastName') }} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className='labels'><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input className='form-control' type='text' name='lastName' placeholder='Enter last name...' value={phoneNumber}
                                        onChange={(event) => { this.handleOnchageInput(event, 'phoneNumber') }} />
                                </div>
                                <div className="col-md-12">
                                    <label className='labels'><FormattedMessage id="manage-user.email" /></label>
                                    <input className='form-control' type='text' name='lastName' placeholder='Enter last name...' value={email}
                                        onChange={(event) => { this.handleOnchageInput(event, 'email') }} />
                                </div>
                                <div className="col-md-12">
                                    <label className='labels'><FormattedMessage id="manage-user.address" /></label>
                                    <input className='form-control' type='text' name='lastName' placeholder='Enter address...' value={address}
                                        onChange={(event) => { this.handleOnchageInput(event, 'address') }} />
                                </div>
                            </div>
                            <div className="row mt-3">

                                {/* <div className="col-md-6">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className='form-control'
                                        onChange={(event) => { this.handleOnchageInput(event, 'position') }} value={position}>
                                        {/* {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index}
                                                        value={item.keyMap}
                                                    >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                );
                                            })} 
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className='form-control'
                                        onChange={(event) => { this.handleOnchageInput(event, 'gender') }} value={genderTemporary.gender}>
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}
                                                        value={item.keyMap}
                                                    >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                );
                                            })}
                                    </select>
                                </div> */}
                                <div className="row mt-3">
                                    <div className='col-md-12 preview-img-container'>
                                        <input type='file' class="" id="previewImg"
                                            onChange={(event) => this.handleOnchageImage(event)} hidden />
                                        <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                        <div
                                            onClick={() => this.isOpenPreviewImage()}
                                            style={{
                                                backgroundImage: `url(${this.state.previewImageUrl})`,
                                                width: '100px',
                                                height: '100px',
                                            }}
                                            className='preview-image'></div>
                                        {/* {this.state.isImagePreviewOpen === true && <Lightbox
                                            mainSrc={this.state.previewImageUrl}
                                            onCloseRequest={() => this.setState({ isImagePreviewOpen: false })}
                                        />} */}
                                    </div>
                                </div>

                                <div className="mt-5 text-center">
                                    <button style={{ float: 'left' }} className="btn btn-primary profile-button" type="button" onClick={() => this.handleSaveUser()} >
                                        {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> :
                                            <FormattedMessage id="manage-user.save" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        positionDataFromRootReducer: state.admin.positions,
        genderDataFromRootReducer: state.admin.genders,
        roleDataFromRootReducer: state.admin.roles,

        // listUsers: state.admin.users,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => { // hàm này nhận 1 hàm làm tham số
    // hàm dispatch tham số có tác dụng gửi action đến store
    return { // trả về 1 đối tượng A
        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (id, data) => dispatch(actions.editUser(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyInfor);

