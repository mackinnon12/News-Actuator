// All Code by Mank.club, all RSS feeds are from cbc.ca
$(document).ready(function () {
  newsStories();
});

function newsStoriesAPI(storyGenre) {
  var topStoriesAPI =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cbc.ca%2Fcmlink%2Frss-topstories";
  var canadaAPI =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cbc.ca%2Fcmlink%2Frss-canada";
  var politicsAPI =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cbc.ca%2Fcmlink%2Frss-politics";
  var sportsAPI =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cbc.ca%2Fcmlink%2Frss-sports";
  if (storyGenre == "topStoriesGenre") {
    return topStoriesAPI;
  }
  if (storyGenre == "canadaGenre") {
    return canadaAPI;
  }
  if (storyGenre == "politicsGenre") {
    return politicsAPI;
  }
  if (storyGenre == "sportsGenre") {
    return sportsAPI;
  }
}
function newsStories(button_id) {
  var storyGenre = button_id;
  if (storyGenre == null) {
    storyGenre = "topStoriesGenre";
  }
  $("th").remove();
  $("tr").remove();
  if (storyGenre == "topStoriesGenre") {
    var title = document.getElementById("titleh1");
    title.innerText = "CBC | Top Stories";
  }
  if (storyGenre == "canadaGenre") {
    var title = document.getElementById("titleh1");
    title.innerText = "CBC | Canada";
  }
  if (storyGenre == "politicsGenre") {
    var title = document.getElementById("titleh1");
    title.innerText = "CBC | Politics";
  }
  if (storyGenre == "sportsGenre") {
    var title = document.getElementById("titleh1");
    title.innerText = "CBC | Sports";
  }
  var reqs = new XMLHttpRequest();
  reqs.onreadystatechange = function () {
    if (reqs.readyState == 4 && reqs.status == 200) {
      var stories = JSON.parse(reqs.responseText);
      var newsContent = document.createElement("th");
      for (var i = 0, t = stories.items.length; i < t; i++) {
        var item = stories.items[i];
        var secondContainer = document.createElement("div");
        secondContainer.setAttribute("class", "secondContainer");
        var container = document.createElement("tr");
        var title = document.createElement("h3");
        var link = document.createElement("a");
        link.setAttribute("href", item.link);
        link.setAttribute("target", "_blank");
        link.innerText = item.title;

        var description = document.createElement("p");
        description.innerHTML = item.description;

        title.appendChild(link);
        container.appendChild(title);
        container.appendChild(description);
        secondContainer.appendChild(container);
        newsContent.appendChild(secondContainer);
      }
      topStories.appendChild(newsContent);
    }
  };
  reqs.open("GET", newsStoriesAPI(storyGenre), true);
  reqs.send();
}
