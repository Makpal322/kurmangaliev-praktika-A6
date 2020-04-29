const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let currentValue = 0;

function round() {
   
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  if ($(".game-field").hasClass("miss")){
  $(".game-field").removeClass('miss');}
  currentValue = currentValue + 1;
  $(divSelector).text(currentValue);
  
  $(divSelector).click(function() {
    if (currentValue == 1 ) {firstHitTime = getTimestamp();}
  });

  if (hits === maxHits) {
    endGame();
    $(".game-field").hide();
  }
}

function endGame() {
  

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");

}

function handleClick(event) {
    if ($(event.target).hasClass("target")) {
        hits = hits + 1;
        $(event.target).removeClass('target');
        $(event.target).text('');
        round();
    }   else {
            $(event.target).addClass("miss");
        }
}

function init() {
  $(".game-field").hide();
  $("#button-reload").hide();
  $("#button-start").click(function() {
     $(".game-field").show();
     $("#button-reload").show();
     $("#button-start").hide();
  });
  round();

  $(".game-field").click(handleClick);
   $("#button-reload").click(function() {
     location.reload();
   });
}

$(document).ready(init);
