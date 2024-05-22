import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userSevice';



class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorsForSelect: [],
            selectedDoctor: {},
            
            currentDate: '',
            allScheduleTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllCodeScheduleTimeByRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
            this.setState({
                doctorsForSelect: dataSelectDoctor
            });
        }

        if (prevProps.allScheduleTimeByRedux !== this.props.allScheduleTimeByRedux) {
            let data = this.props.allScheduleTimeByRedux;  // mảng đối tượng redux
            if (data && data.length > 0) {
                // data = data.map((item)=>{
                //     item.selected = false;
                //     return item;
                // });

                data = data.map(item => ({ ...item, isSelected: false }));
            }
            // hứng data từ database , thêm cho từng phần tử của nó một trường mới đó là isSelected = true ,
            // sau đó gán nó cho allScheduleTime , thì như vậy state này sẽ chứa một đối tượng động có thể lựa chọn isSeleted === true hay fasle

            this.setState({
                allScheduleTime: data
            });
        }


        // if (prevProps.language !== this.props.language) {
        //     let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
        //     this.setState({
        //         allDoctorsReact: dataSelectDoctor
        //     });
        // }
    }

    handleChange = async (selectedDoctor) => { // ghi data vào state
        this.setState({ selectedDoctor: selectedDoctor });
    };

    builDataForInputDoctor = (dataInput) => { // so sánh để hiển thị data ra input doctor 
        let result = [];
        let { language } = this.props;

        if (dataInput && dataInput.length > 0) {
            dataInput.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }

        return result;
    }
    handleClickButtonTime = (itemInput) => {
        let allScheduleTime = this.state.allScheduleTime;
        if (allScheduleTime && allScheduleTime.length > 0) {
            allScheduleTime = allScheduleTime.map(item => {  // gán mảng này thành 1 cái mảngB mà mảngB có 1 phần tử đc seleted 
                if (item.id === itemInput.id) item.isSelected = !item.isSelected;
                return item;
            });
        }

        this.setState({
            allScheduleTime: allScheduleTime
        });
    }

    handleClickSaveScheduleTime = async() => {
        let { allScheduleTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('Ngày ko hợp lệ, chọn ngày !');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Bác sĩ ko hợp lệ!');
            return;
        }

        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formattedDate = new Date(currentDate).getTime();

        if (allScheduleTime && allScheduleTime.length > 0) {
            let selectedTime = allScheduleTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time=>{
                    let obj = {};
                    obj.doctorId = selectedDoctor.value; // tạo key cho obj mới này bằng seletedDoctor id
                    obj.date = formattedDate ; 
                    obj.timeType = time.keyMap ; 
                    result.push(obj);
                });


            } else {
                toast.error('Invalid selected time!');
                return;
            }
        }


        
        let res = await saveBulkScheduleDoctor({
            arrSchedule : result , 
            doctorId : selectedDoctor.value , 
            date : formattedDate
        });

        if(res && res.errCode === 0){
            toast.success('Thành công save!');
        }else{
            toast.error('Thất bại save !');
            console.log('errror save : ', res);
        }
    }

    handleChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] });
        <DatePicker
        value={this.state.currentDate}
        minDate={new Date()}
        onChange={this.handleChangeDatePicker}
        className='form-control' />
    }
    

    render() {
        let { allScheduleTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1)) ;

        console.log('render : \n', this.state.doctorsForSelect); 
        console.log('render :\n', this.props.doctors ) ; 
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor} // 1
                                    onChange={this.handleChange}
                                    // onChange={(value,id)=>this.handleChange(value,id)}   2 hàm trên dưới tương tự nhau, 

                                    options={this.state.doctorsForSelect}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                    onChange={this.handleChangeDatePicker}
                                    className='form-control' />
                            </div>
                            {/* CHANGE */}
                            <div className='manage-schedule-actor col-12'>
                                <h1>Thêm hoặc chỉnh sửa ngày đặt lịch</h1>
                                
                            </div>
                            {/* CHANGE */}

                            <div className='col-12 pick-hour-container'>
                                {allScheduleTime && allScheduleTime.length > 0 &&
                                    allScheduleTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                key={index}
                                                onClick={() => this.handleClickButtonTime(item)}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary btn-save' onClick={() => this.handleClickSaveScheduleTime()}>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allScheduleTimeByRedux: state.admin.allScheduleTime,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctorRedux()),
        fetchAllCodeScheduleTimeByRedux: () => dispatch(actions.fetchAllCodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
