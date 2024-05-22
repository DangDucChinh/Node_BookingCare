import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from "../../../store/actions";
import { Buffer } from 'buffer';
// import tất cả action từ thư mục actions

//
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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
            listClinics_state: [],
            idDelete: '',
            isAlerVisible: false,
        }
    };

    toggleAlertVisibility = (clinic) => {
        this.setState({ isAlerVisible: !this.state.isAlerVisible, idDelete: clinic.id });
    }

    componentDidMount = () => {
        this.props.getAllClinicForTable();

        // trc khi mount lần đầu tiên 
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.listClinics_state !== this.props.listClinics_state) {
            this.setState({
                listClinics_state: this.props.listClinics_state
            });
        }
    }


    handleClickDelete = (clinic) => {
        this.props.deleteClinicForTable(clinic.id);
    }


    handleClickEdit = (clinic) => {
        this.props.resolve_through_props_of_father(clinic);
    }


    render() {
        let arrClinics = this.state.listClinics_state;
        const { isAlerVisible } = this.state;
        return (
            <>

                {isAlerVisible ? < div style={{ border: '1px solid black', width: '500px', height: '300px' }}>
                    <h2>Bạn có muốn xóa clinic ko ?</h2>
                    <button style={{ width: '30px' }} onClick={()=>this.deleteClinicForTable(this.state.idDelete)}>Yes</button><br></br>
                    <button style={{ width: '30px' }} onClick={() => { console.log('ko xóa') }}>No</button>
                </div >
                    :
                    <table id="TableManageUser">
                        <tr>
                            <th>STT</th>
                            <th>name</th>
                            <th>nameEnglish</th>
                            <th>address</th>
                            <th>addressEnglish</th>
                            <th>ID</th>
                            <th>Ảnh phòng khám</th>
                            <th>Tác vụ</th>
                        </tr>

                        {arrClinics && arrClinics.length > 0 && arrClinics.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.nameEnglish}</td>
                                    <td>{item.address}</td>
                                    <td>{item.addressEnglish}</td>
                                    <td>{item.id}</td>
                                    <td style={{ width: '25px' }}>
                                        <div
                                            style={{
                                                border: '1px solid black', width: '100%', height: '25px',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center', backgroundImage: `url(${imageBase64})`
                                            }} >
                                        </div>
                                    </td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleClickEdit(item)}><i class="fas fa-wrench"></i></button>
                                        <button className='btn-delete' onClick={() => this.toggleAlertVisibility(item)}><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log('clinics : ', state.clinicReducer_manager.clinics);
    return {
        // listClinicRedux: state.admin.clinics, // sai ?

        listClinics_state: state.clinicReducer_manager.clinics
        // hứng kết quả từ hành động fire fetchAllUserByRedux, state là state của redux , admin là từ rootReducer, còn users lấy từ initialState của adminReducer 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinicForTable: () => dispatch(actions.getAllClinic_Action()),
        deleteClinicForTable: (clinicId) => dispatch(actions.deleteClinic_Action(clinicId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
