

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddAccount extends Component {
    constructor(props) {
        super(props); // kế thừa props từ cha xuống
        this.state = {};
    }

    componentDidMount() {

    }
    toggle = () => {
        this.props.toogleFromModalUse();
    }

    render() {
        

        return (<>
            <Button color="danger">
                Click Me
            </Button>
            <Modal isOpen={this.props.isOpenUsed} 
                toggle={()=>this.toggle()}
                size="md"
            >

                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { }}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={() => {  }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </ >
        )
    }
};

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);






