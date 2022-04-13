import React, { Component } from 'react';
import './question.css'

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
    }
    
    onChangeValue(event) {
        this.props.changeAnswer(this.props.index, event.target.value);
    }
    render() {
        return (
            <form>
                <div className="container mb-5 align-items-center row card pt-4" 
                onChange={this.onChangeValue}>
                    <p className="fw-bold">
                        {this.props.index + 1}. {this.props.questiontext}
                    </p>
                    <table className="table mt-5">
                        <tbody>
                            <tr>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Strongly Disagree"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Disagree"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Slightly Disagree"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Netural"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Slightly Agree"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Agree"/></td>
                                <td><input className="form-check-input-inline" type="radio" name={"Q"+this.props.index}value="Strongly Agree"/></td>
                            </tr>
                            <tr>
                                <td>Strongly Disagree</td>
                                <td>Disagree</td>
                                <td>Slightly Disagree</td>
                                <td>Netural</td>
                                <td>Slightly Agree</td>
                                <td>Agree</td>
                                <td>Strongly Agree</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </form>
        )
    }
}