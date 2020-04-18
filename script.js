function setBackground(wallpaper) {
  document.getElementById("bdy").className=wallpaper;
  console.log(wallpaper);
}

var text = "The quick brown fox jumped over the lazy yellow dog. Hello, I am Bobby John Jr. from Azkaban. What up?"
var text = "ff jj fff jjj ddd kkk dkdk fjfj ssll slsl sdf jkl lkj fds sldkfj ffjj"

var row = 0
var col = 0
for (var i=0; i<text.length; i++) {
  document.getElementById(`letter${row}_${col}`).innerText = text[i]
  col = col + 1
  if (col == 35) {
    row = row + 1
    col = 0
  }
}

document.addEventListener('keypress', onKey);

var place = 0
var correct = 0
var incorrect = 0

function onKey(e) {
  if (place == text.length) {
    return
  }
  var chCode = ('charCode' in e) ? e.charCode : e.keyCode;
  var typed = String.fromCharCode(chCode);
  var expected = text[place];
  if (typed==expected) { 
    correct += 1
    
  } else {
    incorrect += 1 
  }

  var now = new Date().getTime();
  var distance = countDownDate - now;
  var minutes = 15-((distance % (1000 * 60 * 60)) / (1000 * 60));
  var wpm =(correct/5/minutes).toFixed(2)
  document.getElementById("speed").innerText=`${wpm} wpm`

  var accuracy = (correct / (correct + incorrect) * 100).toFixed(2)
  document.getElementById("accuracy").innerText = `${accuracy}%`
  var row = Math.floor(place / 35)
  var col = place % 35
  if (typed==expected) {
    document.getElementById(`letter${row}_${col}`).className = "letter correct"
  } else {
    document.getElementById(`letter${row}_${col}`).className = "letter incorrect"
  }
  place=place+1
  if (place == text.length) {
    clearInterval(x);
    document.getElementById("totalTime").innerHTML = "You Finished!";

    var ranks = ["C", "B", "A", "⭐️", "️️️⭐️⭐️"]
    var rank = 4
    if (accuracy < 80) {
      rank = rank - 1
    }
    if (accuracy < 60) {
      rank = rank - 1
    }
    if (accuracy < 40) {
      rank = rank - 1
    }
    if (accuracy < 20) {
      rank = rank - 1
    }
    if (wpm < 15) {
      rank = rank - 1
    }
    if (wpm < 10) {
      rank = rank - 1
    }
    if (wpm < 5) {
      rank = rank - 1
    }
    if (rank < 0) {
      rank = 0
    }
    document.getElementById("rank").innerText=ranks[rank]   
    return
  }
  row = Math.floor(place / 35)
  col = place % 35
  document.getElementById(`letter${row}_${col}`).className = "letter outlined"
}

// Set the date we're counting down to
var now = new Date().getTime();
//var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
var countDownDate = now + (15*60*1000)

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("totalTime").innerHTML = //days + "d " + hours + "h "
  minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("totalTime").innerHTML = "You Finished!";
  }
}, 1000);
