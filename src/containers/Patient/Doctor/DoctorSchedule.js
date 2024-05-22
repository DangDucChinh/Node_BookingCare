import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import Select from 'react-select';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate, deleteScheduleDoctorByDate } from '../../../services/userSevice';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

var bien = 0;

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    getArrDays = (language) => {
        let allDays = [];
        // tạo 1 dropdown chứa 7 ngày tiếp theo tính từ ngày hôm nay 
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (this.props.language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }

        return allDays;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1); // the messi international formatted believe it the suitcaser
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            });
        }
        console.log('con được mount');

        if (this.props.hasId === true) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data
            });
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({ allDays: allDays });
        }



        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            // console.log('con được update', res);
            this.setState({
                allAvailableTime: res.data
            });
        }


    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {

            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                });
            }
        }
    }

    handleClickScheduleTime = async (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    }

    methodCloseModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        });
    }


    handleconfirmBooking = async () => {
        let res = await deleteScheduleDoctorByDate({
            doctorId: this.state.dataScheduleTimeModal.doctorId,
            date: this.state.dataScheduleTimeModal.date,
            timeType: this.state.dataScheduleTimeModal.timeType
        });

        if (res && res.errCode === 0) {
            let responseAdd = await getScheduleDoctorByDate(this.state.dataScheduleTimeModal.doctorId, this.state.dataScheduleTimeModal.date);
            if (responseAdd && responseAdd.errCode === 0) {
                this.setState({
                    allAvailableTime: responseAdd.data
                });
            }
        }

    }

    // handleH = async () => {
    //     if (this.state.isConfirm === true) {
    //         let res = await deleteScheduleDoctorByDate({
    //             doctorId: time.doctorId,
    //             date: time.date,
    //             timeType: time.timeType
    //         });

    //         if (res && res.errCode === 0) {
    //             let responseAdd = await getScheduleDoctorByDate(time.doctorId, time.date);
    //             if (responseAdd && responseAdd.errCode === 0) {
    //                 this.setState({
    //                     allAvailableTime: responseAdd.data
    //                 });
    //             }
    //         }
    //     }
    // }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        // bien = bien + 1;
        console.log('render doctor schedule và state của nó', this.state);


        return (
            <>

                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select className='select-time' onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index} >{item.label}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    return (<button key={index}
                                        className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                        onClick={() => this.handleClickScheduleTime(item)}>

                                        {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                    </button>)
                                })

                                : <div><FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage></div>
                            }
                        </div>
                    </div>
                    <div className='book-free'>
                        <div><FormattedMessage id="patient.detail-doctor.choose"></FormattedMessage>
                            <i className="fal fa-hand-point-up"></i>
                            <FormattedMessage id="patient.detail-doctor.book-free"></FormattedMessage>
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    methodConfirmBooking={this.handleconfirmBooking}
                    dataTime={dataScheduleTimeModal}
                    methodCloseModalBooking={this.methodCloseModalBooking} />
            </  >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
