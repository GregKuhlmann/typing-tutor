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
var stars = 0;
var wpms = 0;
var accuracies = 0;
var maxLevel = 2;

var texts = [
  "My daddy is better than the father in Danny The Champion of the World.",
  "If I do not get out of bed on time, Uncle Jake will scream until I do.",
  "I miss training jiu jitsu with Andrew and Cody. Bear crawls are so fun",
  "Netflix has some good shows that I wish I could watch but that is okay",
  "Do you think that breath of the wild part two will come out next year?",
  "The staar test is more fun than I expected because I know a lot of it.",
  "The alpaca place was better when there was water in the stream to swim",
  "So many things taste better with pickles. They should be on everything",
  "Asphalt is the most recycled material there is. I find that surprising",
  "Bike rides are pretty fun, but they are best when we do the ninja line",
  "Mama gets sad when the squirrels and armadillos eat her garden plants.",
  "There is a Korean sport called jokgu that is volleyball with your feet",
  "A space elevator is possible, but it would be very expensive to create",
  "How much wood would a woodchuck chuck if a woodchuck would chuck wood?",
  "One time, Mark Rober set the world record for largest super soaker gun",
  "Sorry, Varun for hurting your back. I did not know your foot was hurt.",
  "My favorite food is spring rolls. I love dipping them in peanut sauce.",
  "Have you ever heard the song Thunderstruck from Planes Fire and Rescue",
  "There is no denying that practice helps your typing speed and accuracy",
  "Billy Mitchell is a cheater. Steve Wiebe got to the Donkey Kong glitch",
  "Spending my allowance money on expansion packs is definitely worth it.",
  "Remember when Harry, Ron and Hermione roasted marshmallows? Me neither",
  "The SR71 is the fastest plane ever. Just wait until the SR72 comes out",
  "Telescopes help people see things that are too far away for your eyes.",
  "On a clear night without light pollution, the sky has about 3000 stars",
  "The sun is a mass of incandescent gas, a gigantic nuclear furnace. Wow",
  "Mercury is the closest planet to the sun and the smallest of 8 planets",
  "The Guiness world record for longest fingernails is kind of disgusting",
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
  if ( level == maxLevel ) {
    var wpm = (wpms / maxLevel).toFixed(2);
    var accuracy = (accuracies / maxLevel).toFixed(2);

    document.getElementById("nextlevel").className = "hidden";

    document.getElementById("totalStars").innerText = `${stars} ⭐️`;
    document.getElementById("avgSpeed").innerText = `${wpm} wpm`;
    document.getElementById("avgAccuracy").innerText = `${accuracy}%`;
    document.getElementById("summary-section").className = "summary";

    return
  }

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
    var wpm =(correct/5/minutes)
    document.getElementById("speed").innerText=`${wpm.toFixed(2)} wpm`
  }
  var accuracy = (correct / (correct + incorrect) * 100)
  document.getElementById("accuracy").innerText = `${accuracy.toFixed(2)}%`
  var row = Math.floor(place / 35)
  var col = place % 35
  if (typed==expected) {
    document.getElementById(`letter${row}_${col}`).className = "letter correct"
  } else {
    document.getElementById(`letter${row}_${col}`).className = "letter incorrect"
    // To help Cyrus learn uppercase, pause and make him get it right
    if (expected!=expected.toLowerCase()) {
      return
    }
  }
  place=place+1
  if (place == text.length) {
    var ranks = ["C", "B", "A", "⭐️", "️️️⭐️⭐️","⭐️⭐️⭐️"]
    var rank = 5
    if (accuracy < 90) {
      rank = rank - 1
    }
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
    } else { /* rank >= 2 */
      level += 1;
      stars += rank-2;
      accuracies += accuracy;
      wpms += wpm;

      if (level == maxLevel) {
        document.getElementById("totalTime").innerHTML = "You Finished!";
        clearInterval(tick);
        document.getElementById("nextlevel").innerText="View Scoreboard";
        document.getElementById("nextlevel").className=""
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
