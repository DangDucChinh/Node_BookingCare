import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userSevice';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: ''
        }
    }

    componentDidMount() {
        this.props.getGenders();
    }

    builDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({ genders: this.builDataGender(this.props.genders) })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({ doctorId: doctorId, timeType: timeType })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let statusCopy = { ...this.state };
        statusCopy[id] = valueInput;
        this.setState({
            ...statusCopy
        });
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnchangeSelect = (selectedOption) => {
        // hàm này truyền vào mà ko cần thêm giá trị vào hàm , hàm này chỉ đơn giản là gọi hàm thôi . 
        this.setState({ selectedGender: selectedOption });
    }

    handleConfirmBooking = async () => {
        //validate input 
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.builTimeBooking(this.props.dataTime);
        let doctorName = this.builDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        });


        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully!');
            this.props.methodConfirmBooking();
            this.props.methodCloseModalBooking();
        } else {
            toast.error('Booking a new appointment failed!');
            this.props.methodCloseModalBooking();
        }
    }

    builTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (`<div>${time} - ${date}</div>`)
        }

        return '';
    }

    builDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }

        return '';
    }

    render(){
        let { isOpenModal, methodCloseModalBooking, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        // nếu có dataTime và obj dataTime ko rỗng, thì lấy dataTime.doctorId , nếu rỗng thì đặt ''
        return (
            <>
                <Modal isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className='right' onClick={methodCloseModalBooking}><i className="fas fa-times"></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorIdForChildFromDad={doctorId}
                                    isShowDescriptionDoctor={false}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                    dataTime={dataTime} />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input className='form-control'
                                        // placeholder='Dương A'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        // placeholder='0123456'
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        // placeholder='truongtieupham22082001@gmail.com'
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        // placeholder='Hoang Quoc Viet'
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        // placeholder='Ốm'
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker className='form-control'
                                        value={this.state.birthday}
                                        onChange={this.handleOnchangeDatePicker}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select value={this.state.selectedGender}
                                        onChange={this.handleOnchangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='booking-modal-footer'>
                            <button onClick={() => this.handleConfirmBooking()}
                                className='btn-booking-confirm'>
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button onClick={methodCloseModalBooking} type='' className='btn-booking-cancel'>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    }

};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
