import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';


class About extends Component {


    render() {
        return (
            <div className="about">
                <div className="about-video">
                    <div className="about-video_title">
                        <h3>Truyền thông nói về Booking Care</h3>
                    </div>
                    <div className="about-video_video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/watch?v=u_bAWzXkBMo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div className="about-video"></div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(About);