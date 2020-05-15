var level = 0;
var totalTime = 15 * 60;
var remaining = totalTime;
var maxRest = 10;
var currentRest = 0;
var remaining;
var place;
var correct;
var incorrect;
var text;

var texts = [
  "My Daddy is better than the father in Danny, the champion of the world",
  "The quick brown fox jumped over the lazy yellow dog, Mr. Bobby John Jo",
  "Why does paper beat rock when lava burns paper? It is a total mystery.",
  "The snow blows white on the mount tonight, not a footprint to be seen.",
  "abcdefghijklmnopqrstuvwxyz now I know my ABCs. Next time sing with me.",
  "Cyrus Kuhlmann is my name. That name again is Cyrus Kuhlmann. See roos",
  "Which one is better? Slime or putty? Shirin can't decide between the 2",
  "I like short sleeve shirts, alpacas, Breath of the Wild, and pizza pie",
  "They do lay eggs, Peregrin Falcons. Their wings are made of hand bones",
  "A tornado is epic, but not as epic as Ninjago. I must watch every one.",
  "When my mama cooks, wonderful smells come from the kitchen to my nose.",
  "In Zelda: Twilight Princess, there are four, no 5, no 6, no 9 dungeons",
  "The best way to spend my give money is to buy Switch Online for Varun.",
  "This year I want to do a science project. Not to turn in. Just for fun",
  "Link is a very fast character and when he jumps he shows the triforce.",
]

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(texts);

function setLevel() {
  var h = Math.floor(Math.random() * 360);
  var bgColor = "hsl(" + h + ", 60%, 40%)";
  document.getElementById("backdrop").style.background = bgColor;
  document.getElementById("level").innerText = level+1;
  document.getElementById("rank").innerText = "";
  document.getElementById("nextlevel").className = "hidden";

  place = 0;
  correct = 0;
  incorrect = 0;
  totalTime = remaining;
  text = texts[level]
  setLetters()
}

function setBackground(wallpaper) {
  document.getElementById("bdy").className=wallpaper
}

function setLetters() {
  var row = 0
  var col = 0
  for (var i=0; i<text.length; i++) {
    ltr = document.getElementById(`letter${row}_${col}`);
    ltr.innerText = text[i];
    if (row == 0 && col == 0) {
      ltr.className = "letter outlined"
    } else {
      ltr.className = "letter"
    }
    col = col + 1
    if (col == 35) {
      row = row + 1
      col = 0
    }
  }
}

function onKey(e) {
  if (place == text.length) {
    return
  }
  currentRest = maxRest;
  var chCode = ('charCode' in e) ? e.charCode : e.keyCode;
  var typed = String.fromCharCode(chCode);
  var expected = text[place];
  if (typed==expected) { 
    correct += 1
  } else {
    incorrect += 1 
  }

  var minutes = (totalTime - remaining)/60;
  if (minutes > 0 ) {
    var wpm =(correct/5/minutes).toFixed(2)
    document.getElementById("speed").innerText=`${wpm} wpm`
  }
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
    if (rank < 2) {
      document.getElementById("nextlevel").innerText="Try Again"
      document.getElementById("nextlevel").className=""
    } else {
      level += 1
      if (level == texts.length) {
        document.getElementById("totalTime").innerHTML = "You Finished!";
        clearInterval(tick);
      } else {
        document.getElementById("nextlevel").innerText="Next Level"
        document.getElementById("nextlevel").className=""
      }
    }
    return
  }
  row = Math.floor(place / 35)
  col = place % 35
  document.getElementById(`letter${row}_${col}`).className = "letter outlined"
}

setLevel();
document.addEventListener('keypress', onKey);

var tick = setInterval(function() {
  if (currentRest == 0) {
    return
  } else {
    currentRest -= 1;
  }
  remaining -= 1;
  minutes = Math.floor(remaining / 60);
  seconds = remaining % 60;
  document.getElementById("totalTime").innerHTML = 
  minutes + "m " + seconds + "s ";

  if (remaining < 0) {
    clearInterval(tick);
    document.getElementById("totalTime").innerHTML = "You Finished!";
  }
}, 1000);
