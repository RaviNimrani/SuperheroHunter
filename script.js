// const req = new XMLHttpRequest();
const public_key = "4e74508f9a9e8e271448dbe85444426d";
const private_key = "3e8d81efab4a98ee2890fba6d45c6d0280e78564";

const button = document.getElementById("button");
let input = document.getElementById("input");
let showContainer = document.getElementById("suggestions");

const ts = Date.now();

const st = ts + private_key + public_key;
var curr_Comic_Char_ToShow = null;
var hash = CryptoJS.MD5(st).toString();
console.log("hash : ", hash);

// console.log(url);

// req.open("GET", url);
// req.send();

var data = "";

// req.onload = () => {};

// window.onload = myFunction();

// function myFunction() {
//   if (input.value == "") {
//     document.getElementById("suggestions").style.visibility = "hidden";
//   }
// }
window.onload = document.getElementById("suggestions").style.visibility =
  "hidden";

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  showContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 2) {
    return false;
  }
  if (input.value.length >= 2) {
    document.getElementById("suggestions").style.visibility = "visible";
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    var a = document.createElement("a");
    a.href = `superhero.html?id=${result.id}`;
    div.classList.add("auto-complete");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class = "item">${word}</p>`;
    a.appendChild(div);
    showContainer.appendChild(a);
  });
});

button.addEventListener(
  "click",
  (getResult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input Cannot Be Blank");
    }
    showContainer.innerHTML = "";

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    jsonData.data["results"].forEach((element) => {
      // window.location.href = "superhero.html";
      // showContainer.innerHTML = `<div id
      // <img src=${
      //   element.thumbnail["path"] + "." + element.thumbnail["extension"]
      // }>
      // `;
    });
  })
);
