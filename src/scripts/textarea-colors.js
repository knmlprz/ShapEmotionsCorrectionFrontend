"use strict";
import Gradient from "javascript-color-gradient";

function readData() {
    let text = document.getElementById("data").value;
    console.log(data);
    console.log("heys");
    postData('http://localhost:8000/sentiment', data={"value": text})
        .then(data => {
            console.log(data);
            changeColor(data.label, data.score);
        });
};

function changeColor(label = '', score = 0.0) {
    console.log(label);

    if(label == "neutral" ) {
      document.getElementById("data").style.color = "black";
    } else if (label == "negative" ) {
      document.getElementById("data").style.color = "red";
    } else {
      document.getElementById("data").style.color = "green";
    }
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

document.querySelector('textarea').addEventListener('input', readData);