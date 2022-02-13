"use strict";
import { post } from "./utils.js"

function readSentiment() {
    let text = document.getElementById("data").value;
    console.log("Predicting sentiment");
    post('http://localhost:8000/sentiment', data={"value": text})
        .then(data => {
            console.log(data);
            changeTextareaColor(data.label, data.score);
        });
};

function changeTextareaColor(label = '', score = 0.0) {
    if(label == "neutral" ) {
      document.getElementById("data").style.color = "black";
    } else if (label == "negative" ) {
      document.getElementById("data").style.color = "red";
    } else {
      document.getElementById("data").style.color = "green";
    }
}

let input = document.querySelector('textarea');

// Init a timeout variable to be used below
let timeout = null;

// Listen for keystroke events
input.addEventListener('keyup', function (e) {
  // Clear the timeout if it has already been set.
  // This will prevent the previous task from executing
  // if it has been less than <MILLISECONDS>
  clearTimeout(timeout);

  // Make a new timeout set to go off in 1000ms (1 second)
  timeout = setTimeout(function () {
    readSentiment()
  }, 300);
});