var request = new XMLHttpRequest();
const public_key = "4e74508f9a9e8e271448dbe85444426d";
const private_key = "3e8d81efab4a98ee2890fba6d45c6d0280e78564";
const ts = Date.now();

var arr = new Set([]);

const st = ts + private_key + public_key;
var curr_Comic_Char_ToShow = null;
var hash = CryptoJS.MD5(st).toString();
console.log("hash : ", hash);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

window.onload = async () => {
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}&id=${params.id}`;

  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);

  const result = jsonData.data["results"];
  console.log(result);

  for (let element of result) {
    document.getElementById("imagehero").src =
      element.thumbnail["path"] + "." + element.thumbnail["extension"];

    document.getElementById("name").innerText = element.name;
    document.getElementById("description").innerText = element.description;

    let comics = element.comics["items"];
    let events = element.events["items"];
    let stories = element.stories["items"];
    let series = element.series["items"];

    for (let i = 0; i < comics.length && i < 5; i++) {
      document.getElementById("comics").innerText += " " + comics[i].name;
    }

    for (let i = 0; i < events.length && i < 5; i++) {
      document.getElementById("events").innerText += " , " + events[i].name;
    }

    for (let i = 0; i < stories.length && i < 5; i++) {
      document.getElementById("stories").innerText += " , " + stories[i].name;
    }

    for (let i = 0; i < series.length && i < 5; i++) {
      document.getElementById("series").innerText += " , " + series[i].name;
    }
  }

  document.getElementById("atag").onclick = function () {
    // adding superhero to the created set at the beginning
    // this set will get id from the url parameters
    document.getElementById("atag").innerHTML =
      '<i class="fas fa-check-circle"></i> Added Successfully!';
    arr.add(params.id);

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

    var existingCookie = getCookie("favHero");
    console.log(existingCookie);
    arr.add(existingCookie);
    document.cookie = "favHero=" + Array.from(arr).join(",");
    console.log(document.cookie);
  };
};
