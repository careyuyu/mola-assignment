import React, { Component } from 'react';
import './questions.css'
import Question from './question'
import Dialog from './dialog'

export default class Questions extends Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            questions: [], //hold data of 10 random questions
            answers: [], //hold data to be submitted
            DataisLoaded: false,
            timeStart: new Date().getMinutes()
        }
    }

    //load the questions data when component mount
    componentDidMount() {
        fetch("http://localhost:8080/questions")
            .then((res) => res.json())
            .then((resJson) => {
                let answersInit = [];
                for (let i = 0; i < resJson.length; i++) {
                    answersInit.push({ "varname": resJson[i].varname, "answered": "" })
                }
                this.setState({
                    questions: resJson,
                    answers: answersInit,
                    DataisLoaded: true
                })
            })
    }

    //handle submission of the form
    handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                answers: this.state.answers, 
                submission_date: new Date().toLocaleString() + "",
                duration: new Date().getMinutes() - this.state.timeStart})
        };
        fetch('http://localhost:8080/submissions/submit', requestOptions)
        .then(document.querySelector('#submissionModal').style.display="block");
    }


    changeAnswer = (index, answer) => {
        const answers = [...this.state.answers];
        answers[index].answered = answer
        this.setState({ answers })
    }


    //small components
    // submission button
    getSubmissionButton = () => {
        const [disable, setDisable] = React.useState(false);
        return (
            <button disabled={disable} onClick={() => {this.handleSubmit(); setDisable(true)}}
                data-toggle="modal" data-target="#exampleModal"
                className='btn btn-dark'>
                Submit
            </button>
        );
    }


    

    //render the component
    render() {
        //waiting for questions to be loaded
        const { questions, DataisLoaded } = this.state;
        if (!DataisLoaded) return (
            <div className="container"><p>Loading Questions...</p></div>
        )

        //show the questions
        return (
            //the questions
            <div className="container questions_form mb-5">
                {questions.map((question, index) => (
                    <Question key={index} index={index} questiontext={question.questiontext}
                        changeAnswer={this.changeAnswer}
                    />
                ))

                }
                {//the submit button 
                }
                <div className="col text-center">
                    {<this.getSubmissionButton />}
                </div>
                {<Dialog />}
                
            </div>
        )
    }
}