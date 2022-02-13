"use strict";
import colorGradient from "javascript-color-gradient";
import { post } from "./utils.js"

// Create gradient array
const gradientArray = colorGradient.setGradient("#4F94FF","#ffffff", "FF512C").setMidpoint(11).getArray();
console.log(gradientArray);

// Get input element
let input = document.querySelector('#explain');

async function explainSentiment() {
    let text = document.getElementById("data").value;
    console.log(text)
    post('http://localhost:8000/sentiment', data={"value": text})
        .then(data => {
            console.log("Sentiment: " + data.label);
            writePredictions(text, data.label)
        });
}

function map_to_10s(number = 0.0) {
    const lim = 10;
    const mult = 100;
    let res = number * mult + lim / 2;
    if (res > lim) return lim;
    if (res < 0) return 0;
    return Math.round(res);
}


async function writePredictions(text = '', label = '') {
    // Get data from server
    const response = await post('http://localhost:8000/sentiment/explain', data = {"value": text});
    console.log(response)
    
    // Clear any previous predictions
    let container = document.querySelector('#explanation-container')
    container.innerHTML = '';

    // Map values to 0 - 10 (int)
    let shapley_values = response[label].map(map_to_10s)
    console.log(shapley_values);

    // Create span for every prediction
    response.text.forEach(function(item, index, array) {
        let spanobj = document.createElement("span");
        spanobj.innerText = item;
        spanobj.style.backgroundColor = gradientArray[shapley_values[index]];


        container.appendChild(spanobj);
    });

    // Let user click element
    input.removeAttribute('disabled')
}

input.addEventListener('click', function (e) {
    input.setAttribute('disabled', 'true');
    // Explain sentiment
    explainSentiment();
  });