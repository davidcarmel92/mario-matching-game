let count = 0;
let cardIds = [];
let cardPics = [];
let gameActive = true;
let momentTime ;
let firstClick = true;
let picking = true;

$(function(){
  /*
  Intiates the start of the game on load.
  */
  $('#winModal').hide();
  shuffle();
  makeGrid();
  cardSelection();
});

function shuffle(){
  /*
  This function assigns random numbers to the cardIds array, in order to compare
  ids for matches later on in the program. It also assigns a corresponding name
  to be added to each cell's html to generate the picture for the card.
  */
  const arrayOfNumIds = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  const arrayOfCards = ["mario","mario","koopatroopa","koopatroopa","toad","toad"
  ,"daisy","daisy","wario","wario","luigi","luigi","peach","peach","yoshi","yoshi"]
  for(i=0; i<16; i++){
    let selected = Math.floor(Math.random() * arrayOfNumIds.length);
    let numId = arrayOfNumIds[selected];
    let picId = arrayOfCards[selected];
    cardIds[i] = numId;
    cardPics[i] = picId;
    arrayOfNumIds.splice(selected,1);
    arrayOfCards.splice(selected,1);
  };
};

function makeGrid() {
  /*
  This function  assigns each a data calue and the
  picture.
  */
  $(".card").each(function(index){
    $(this).attr("data-card-value", cardIds[index]).html("<img src='images/"+cardPics[index]+".png'>");
  });
}

function cardSelection(){
  /*
  This function is an event listener for clicks on any card.
  When two cards are clicked the matching function is called,
  the count increases by one, and the starRating function in
  called.
  */
  $('.card').click(function(){
    startTimer();
    if(picking===true){
      $(this).addClass("show");
      if($('.show').length===2){
        picking = false;
        count++;
        starRating();
        matching();
      }
    }
  });
}


function startTimer(){
  /*
  This function starts the timer on the first card clicked.
  */
  if(firstClick===true){
    gameTimer();
  }
}

function gameTimer(){
  /*
  This function creates the timer used for the game.
  */
  let start = new Date;
  firstClick = false;
  setInterval(function(){
      if(gameActive===true){
        momentTime = Math.floor((new Date - start)/1000);
        return $('.timer').html("<h3>"+momentTime+ " Seconds</h3>");
      }
    }, 1000);
}

function matching(){
  /*
  This function checks if the data values for each card selected
  are equal. If they are, the clas matchs is added to the cards,
  and the checkIfWin function is called to see if the game is
  complete. The show and open classes are then removed from the
  cards.
  */
  if($('.show').first().data('card-value')===$('.show').last().data('card-value')){
    $('.show').each(function(){
      $(this).effect("pulsate",{times:2},500).animate({opacity:.6}, 500).removeClass("show").addClass('match');
    });
    checkIfWin();
    picking = true;
  }
  else{
    $('.card').each(function(){
      setTimeout(function(){
          picking = true;
          $('.card').removeClass("show");
        }, 1000);
      });
  }
}

function checkIfWin(){
  /*
  This function checks if all of the cards have recieved the match class.
  If they have, the user has won the game and the end game modal is shown.
  */
  $('.card').each(function(){
    if($('.match').length===16){
      gameOver();
    }
  });
}

function starRating(){
  /*
  This function displays the count on the DOM and changes the starRating
  as the number of moves increases.
  */
  let moves = ""
  if(count ===1){
    moves = "Move";
  }
  else{
    moves = "Moves"
  }
  $(".moves").html(count+" " +moves);
  if(count===13){
    $('.stars li').last().remove();
  }
  if(count===18){
    $('.stars li').last().remove();
  }
}

function gameOver() {
  /*
  Once the player has won the game, the end modal us loaded with all of
  final stats added to the DOM.
  */
  let finalRating = $('.stars li').length;
  gameActive = false;
  $('.end_star_rating').html("<h3>Star rating: "+finalRating+"</h3>")
  $('.end_timer').html("<h4>Your final time: "+momentTime+" Seconds</h4>");
  $('.end_moves').html("<h4>Total number of moves: "+count+"</h4>");
  setTimeout(function() {
    $('#winModal').show();
  }, 1000);
}
