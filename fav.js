const public_key = "4e74508f9a9e8e271448dbe85444426d";
const private_key = "3e8d81efab4a98ee2890fba6d45c6d0280e78564";
const ts = Date.now();
const st = ts + private_key + public_key;
var hash = CryptoJS.MD5(st).toString();
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var arr = getCookie("favHero").split(",");
console.log(arr);
// accessing all the ids and using async await for api calls
const func = async function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("this is :" + arr);
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&id=${arr[i]}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    const result = jsonData.data["results"];
    // creating divs according to the users favourites
    for (let element of result) {
      var a = document.createElement("a");
      var div = document.createElement("div");
      var img = document.createElement("img");
      var p = document.createElement("p");
      p.innerText = element.name;
      img.src =
        element.thumbnail["path"] + "." + element.thumbnail["extension"];
      div.appendChild(img);
      div.appendChild(p);
      a.appendChild(div);
      //   a.href = "/SuperHeroAPI/superhero.html?id=" + arr[i];
      a.href = `superhero.html?id=${arr[i]}`;
      document.getElementById("body").appendChild(a);
    }
  }
  request.send();
};

func(arr);
