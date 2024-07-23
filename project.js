const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scorecard=document.querySelector('.scorecard');
const alert=document.querySelector('.alert');
const startbtn=document.querySelector('.startbtn');
const timer=document.querySelector('.timer');


//array of objects storing qns&ans
const quiz=[
    {
        question:"Q.which of the following is not a CSS box model property?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
    {
        question:"Q.which of the following is not a valid way to declare a function in javascript?",
        choices:["function myFunction() {}","let myFunction=function() {};","myFunction:function() {}","myFunction:()=>() {}"],
        answer:"myFunction:function() {}"
    },
    {
        question:"which of the following is not a Javascript datatype?",
        choices:["string","boolean","object","float"],
        answer:"float"
    },
    {
        question:"what is the purpose of the this keyword in javascript?",
        choices:["refers to current function","refers to current object","refers to curent class","refers to current scope"],
        answer:"refers to current object"
    },
];
//variables
let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeleft=15;
let timerId=null;
//arrow function to show qns
const showQuestions=()=>{
    const questionDetails=quiz[currentQuestionIndex];
    questionBox.textContent=questionDetails.question;

    choicesBox.textContent=" "
    for(let i=0; i<questionDetails.choices.length; i++)
    {
        const currentChoice=questionDetails.choices[i];
        const choiceDiv=document.createElement('div')
        choiceDiv.textContent=currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected'))
            {
                choiceDiv.classList.remove('selected');
            }
            else
            {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex<quiz.length){
        startTimer();
    }
    
}
//function to check answer
const checkAnswer=()=>{
    const selectedChoice=document.querySelector('.choice.selected')
    if(selectedChoice.textContent===quiz[currentQuestionIndex].answer){
        displayAlert("correct answer!");
        score++;
    }
    else{
        displayAlert(`wrong answer! ${quiz[currentQuestionIndex].answer} is the correct answer`);
    }
    timeleft=15;
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
        showQuestions();
    }   
    else
    {
        showScore();
        stopTimer();
    }
}
//functn to show score
const showScore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scorecard.textContent=`you scored ${score} out of ${quiz.length}!`;
    displayAlert("you have completed this quiz");
    nextBtn.textContent="REPLAY";
    quizOver=true;
    timer.style.display="none";
}
//funcn to show alert
const displayAlert=(msg)=>{
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>{
        alert.style.display="none";   
    },2000);
}
//function to start timer
const startTimer=()=>{
    clearInterval(timerId);
    timer.textContent=timeleft;
    const countdown=()=>{
        timeleft--;
        timer.textContent=timeleft;
        if(timeleft===0){
                const confirmUser=confirm("time up!!!Do you want to play the quiz again");
                if(confirmUser){
                    timeleft=15;
                    startQuiz();
                }
                else{
                    startbtn.style.display="block";
                    container.style.display="none";
                    return;
                }
        }
    }
    timerId=setInterval(countdown,1000);
}
//function to stop timer
const stopTimer=()=>{
    clearInterval(timerId)
}



//function to shuffle qns
const shuffleQuestions=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currentQuestionIndex=0;
    showQuestions();
}
//function to start quiz
const startQuiz=()=>{
    timeleft=15;
    timer.style.display="flex";
    shuffleQuestions();
}
//Adding Event Listener to start button
startbtn.addEventListener('click',()=>{
    startbtn.style.display="none";
    container.style.display="block";
    startQuiz();
})
nextBtn.addEventListener('click',()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(!selectedChoice && (nextBtn.textContent === "Next"))
    {
        displayAlert("select your answer");
        return;
    }
    if(quizOver){
         currentQuestionIndex=0;
         nextBtn.textContent="Next";
         scorecard.textContent="";
         currentQuestionIndex=0;
        quizOver=false;
        score=0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
});


