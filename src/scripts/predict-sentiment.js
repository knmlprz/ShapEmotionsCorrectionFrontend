"use strict";
import Gradient from "javascript-color-gradient";
import { post } from "./utils.js"

function readSentiment() {
    let text = document.getElementById("data").value;
    console.log(data);
    console.log("heys");
    post('http://localhost:8000/sentiment', data={"value": text})
        .then(data => {
            console.log(data);
            changeTextareaColor(data.label, data.score);
        });
};

function changeTextareaColor(label = '', score = 0.0) {
    console.log(label);

    if(label == "neutral" ) {
      document.getElementById("data").style.color = "black";
    } else if (label == "negative" ) {
      document.getElementById("data").style.color = "red";
    } else {
      document.getElementById("data").style.color = "green";
    }
}

document.querySelector('textarea').addEventListener('input', readSentiment);