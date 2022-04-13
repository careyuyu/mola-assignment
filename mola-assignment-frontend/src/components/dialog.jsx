import React, { Component } from 'react';
import './questions.css'

export default class Dialog extends Component {
    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog" id="submissionModal">
                <div className="modal-dialog modal-dialog-centered d-flex justify-content-center d-flex align-items-center" role="document">
                    <div className="modal-content">
                        <div className="modal-body my-5" style={ {'text-align': 'center'}}>
                            <h5><b>Your answer has been received!</b></h5>
                        </div>
                        <div className="modal-footer">
                            <a href='/'><button type="button" className="btn btn-dark">Get New Questions</button></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}