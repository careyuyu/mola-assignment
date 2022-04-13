const router = require('express').Router()
let Submission = require('../models/submission.model');
var {stringify} = require('csv-stringify');

//router for submitting response record to the DB
router.route('/submit').post((req, res)=>{
    const answers = req.body.answers;
    const submission_date = Date.parse(req.body.submission_date);
    const duration = req.body.duration;

    const newSubmission = new Submission({
        answers, submission_date, duration
    });
    newSubmission.save().then(()=>res.json("New Submission added")).catch(err => res.status(400).json(err));
});

//used to load all the responses and convert to csv format 
async function getResponsesCSV() {
    return new Promise(resolve=>{
        //query all responses from DB
        Submission.find().then((submissions)=>{
            //csv file header
            let submissionsData = [["Response #", "Q1", "A1", "Q2", "A2", "Q3", "A3", "Q4", "A4", "Q5", "A5", "Q6", "A6","Q7", "A7", "Q8", "A8", "Q9", "A9", "Q10", "A10", "Duration(in minutes)" ,"Submission Date"]];
            //append each response into a row in csv file
            for (let i = 0; i< submissions.length; i++) {
                let oneSubmissionData = [];
                oneSubmissionData.push(i+1);
                submissions[i].answers.forEach(answer=>{
                    oneSubmissionData.push(answer.varname, answer.answered)
                });
                let submissionDate = submissions[i].submission_date
                let date = submissionDate.toLocaleDateString('en-us',{day: 'numeric'})
                let month = submissionDate.toLocaleDateString('en-us',{month: 'long'})
                const FormattedDate = `${month}-${date}`
                
                oneSubmissionData.push(submissions[i].duration + " min", FormattedDate+"")
                submissionsData.push(oneSubmissionData);
            }
            
            // resolve the promise by sending the result csv format output
            stringify(submissionsData,function (err, output){
                resolve(output);
            });
        })
    });
}

//router for downloading the responses as a csv file.
router.route('/download').get(async (req, res)=>{
    var downloadCSV = await getResponsesCSV();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=mfq_responses.csv");
    res.status(200).send(downloadCSV);
})

module.exports = router;