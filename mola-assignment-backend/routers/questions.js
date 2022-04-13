/**
 * this router is used to send the random 10 questions to the client side.
 */
const router = require('express').Router()
const csv = require('csv-parser');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');


//read questions from the csv file.
const questions = [];
fs.createReadStream('./data/mfq_question - mfq_question.csv').pipe(csv())
    .on('data', (data)=> questions.push(data))
    .on('error', (err)=>{console.log(`error ${err}`)});


/**
 * functions to generate 10 different question numbers to the client
 */
 function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};
function getTenRandomNumber(list) {
    const max = list.length;
    let numbers = [];
    while(numbers.length < 10) {
        let randomInt = getRandomInt(max);
        if (!numbers.includes(randomInt)) {
            numbers.push(randomInt);
        }
    }
    return numbers;
}

//generate 10 random questions
function getQuestions(indexs, list) {
    let ret = [];
    for (let index of indexs) {
        ret.push(list[index]);
    }
    return ret;
}

//API: return 10 random questions as json to the client
router.route('/').get((req, res)=>{
    res.json(getQuestions(getTenRandomNumber(questions), questions));
})

module.exports = router;