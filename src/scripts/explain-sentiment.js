"use strict";
import { post } from "./utils.js";

// Create gradient array
const gradientArray = [
  "#5e9dff",
  "#84b3ff",
  "#a1c6ff",
  "#bfd9ff",
  "#e5efff",
  "#ffffff",
  "#ffded7",
  "#ffc0b2",
  "#ff9c86",
  "#ff7d62",
  "#ff603e",
];

console.log(gradientArray);

// Get btn element
let btn = document.querySelector("#explain");

async function explainSentiment() {
  let text = document.getElementById("data").value;
  console.log(text);
  post(
    window.location.protocol + "//" + window.location.host + "/sentiment",
    (data = {
      value: text,
    })
  ).then((data) => {
    console.log("Sentiment: " + data.label);
    writePredictions(text, data.label);
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

async function writePredictions(text = "", label = "") {
  // Get data from server
  const response = await post(
    window.location.protocol +
      "//" +
      window.location.host +
      "/sentiment/explain",
    (data = { value: text })
  );
  console.log(response);

  // Clear any previous predictions
  let container = document.querySelector("#explanation-container");
  container.innerHTML = "";

  // Map values to 0 - 10 (int)
  let shapley_values = response[label].map(map_to_10s);
  console.log(shapley_values);

  // Create span for every prediction
  response.text.forEach(function (item, index, array) {
    let spanobj = document.createElement("span");
    spanobj.innerText = item;
    spanobj.style.backgroundColor = gradientArray[shapley_values[index]];

    container.appendChild(spanobj);
  });

  // Let user click element
  btn.removeAttribute("disabled");
}

btn.addEventListener("click", function (e) {
  btn.setAttribute("disabled", "true");
  // Explain sentiment
  explainSentiment();
});
