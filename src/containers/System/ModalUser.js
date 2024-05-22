import {
    Button, Label, FormGroup, Input, Col, Row, Form, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import React, { Component } from 'react';
import { connect } from 'react-redux';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            address: '',

        };
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.isControlModelUser();
    }
    handleDataFromForm = (event, id) => {
        let dataPresent = { ...this.state }; //copy state
        dataPresent[id] = event.target.value;
        this.setState({
            ...dataPresent
        });
        // this.setState({...dataPresent});
    }

    handleSubmit = () => {
        let isValid =  this.checkValidateInput();
        if(isValid === true){
            //call api creaet modal
            console.log('Modal hello');
        }
    }
    checkValidateInput = () => {
        let isValid = true; 
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                console.log('Pleaser enter infor for : ' + arrInput[i]);
                console.log(this.state);
                break;
            }
        }
        return isValid;
    }

    render() {
        return (
            <div>
                <Modal size='lg' isOpen={this.props.isOpen} toggle={() => { this.toggle() }}>
                    <ModalHeader >Create a new user</ModalHeader>
                    <ModalBody>
                        <Form size='lg'>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">
                                            Email
                                        </Label>
                                        <Input
                                            onChange={(event) => { this.handleDataFromForm(event, "email") }}
                                            id="email"
                                            name="email"
                                            placeholder="Email with placeholder"
                                            type="email"
                                            value={this.state.email}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="password">
                                            Password
                                        </Label>
                                        <Input
                                            onChange={(event) => this.handleDataFromForm(event, "password")}
                                            id="password"
                                            name="password"
                                            placeholder="password placeholder"
                                            type="password"
                                            value={this.state.password}

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName">
                                            First Name :
                                        </Label>
                                        <Input
                                            onChange={(event) => this.handleDataFromForm(event, "firstName")}
                                            id="firstName"
                                            name="firstName"
                                            placeholder="firstName"
                                            type="text"
                                            value={this.state.firstName}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName">
                                            Last Name :
                                        </Label>
                                        <Input
                                            onChange={(event) => this.handleDataFromForm(event, "lastName")}
                                            id="lastName"
                                            name="lastName"
                                            placeholder="lastName placeholder"
                                            type="text"
                                            value={this.state.lastName}

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="address">
                                    Address
                                </Label>
                                <Input
                                    onChange={(event) => this.handleDataFromForm(event, "address")}
                                    id="address"
                                    name="address"
                                    placeholder="12 Tây Hồ"
                                    value={this.state.address}

                                />
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phoneNumber">
                                            PhoneNumber :
                                        </Label>
                                        <Input
                                            onChange={(event) => this.handleDataFromForm(event, "phoneNumber")}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type='text'
                                            value={this.state.phoneNumber}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup tag="fieldset">
                                        <legend>
                                            Gender
                                        </legend>
                                        <FormGroup check>
                                            <Input
                                                name="gender"
                                                type="radio"
                                            />
                                            {' '}
                                            <Label check>
                                                Man
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input
                                                name="gender"
                                                type="radio"
                                            />
                                            {' '}
                                            <Label check>
                                                Woman
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} style={{ marginTop: "12px" }}>
                                    <FormGroup>
                                        <Label for="exampleFile">
                                            Image
                                        </Label>
                                        <Input
                                            id="exampleFile"
                                            name="file"
                                            type="file"
                                            style={{ marginLeft: "12px" }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button type='submit' style={{ marginTop: "10px" }} onClick={()=>{this.handleSubmit()}}>
                                SUBMIT
                            </Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.toggle() }}>
                            Do ST
                        </Button>{' '}
                        <Button color="secondary" onClick={() => { this.toggle() }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


