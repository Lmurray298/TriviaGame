$(document).ready(function(){
    // event listeners
    $("#remaining-time").hide();
    $("start").on('click' , '.option' , trivia.guessChecker);
})

var trivia = {
    correct : 0,
    incorrect : 0,
    unanswered : 0, 
    currentSet : 0,
    timer: 20,
    timerOn : "false",
    timeID : '',

    questions: {
// questions and answer data
    q1: 'Which team was not part of the original six',
    q2: 'Who was the first team to win a Stanley cup',
    q3: 'Where did the sport of hockey start',
    q4: 'Who won the Stanley Cup in 2011',
    q5: 'How many championships do the Boston Bruins have',
    q6: 'Who is the tallest player to play in the NHL',
    },

    options: {
     q1: ['Boston Bruins', 'NY Islanders', 'Toronta Maple Leafs', 'Chicago BlackHawks'],
     q2: ['Ottawa Senators', 'NY Rangers', 'Boston Bruins', 'Detriot Red Wings'],
     q3: ['Canada', 'USA', 'Europe', 'Mexico'],
     q4: ['Boston Bruins', 'Chicago Black Hawks', 'Montreal Canadiens', 'Edmonton Oilers'],
     q5: ['10','4','13','6'],
     q6: ['Zdeno Chara','Tim Thomas','Sydney Crosby','PK Subban'],
     
},

    answers: {
        q1: 'NY Islanders',
        q2: 'Ottawa Senators',
        q3: 'Canada',
        q4: 'Boston Bruins',
        q5: '6',
        q6: 'Zdeno Chara'
 },

    startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);


    $('#game').show();

    $('#results').html('');

    $('#timer').text(trivia.timer);

    $('#start').hide();

    $('#remaining-time').show();

    trivia.nextQuestion();
    
    },


nextQuestion : function(){
    
     // set timer to 20 seconds each question
     trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
     $('#timer').text(trivia.timer);
        
     // to prevent timer speed up
     if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
     }


     var questionContent = Object.values(trivia.questions)[trivia.currentSet];
     $('#question').text(questionContent);
     
     // an array of all the user options for the current question
     var questionOptions = Object.values(trivia.options)[trivia.currentSet];
     
     // creates all the trivia guess options in the html
     $.each(questionOptions, function(index, key){
       $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
     })
     
   },
   // method to decrement counter and count unanswered if timer runs out
   timerRunning : function(){
     // if timer still has time left and there are still questions left to ask
     if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
       $('#timer').text(trivia.timer);
       trivia.timer--;
         if(trivia.timer === 4){
           $('#timer').addClass('last-seconds');
         }
     }


     else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }






    












