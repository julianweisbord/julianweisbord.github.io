window.onload = function () {
  var dateDiv = document.getElementById('date');
  var projectInfoDiv = document.getElementById('projectInfo');

  ajax.requestJSON("/assets/data.json", {}, function (data) {
    console.log(data);
    dateDiv.innerText = data["date"];
  });

  ajax.requestJSON("/assets/repos.json", {}, function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newRepo = document.createElement('div');
      var repoLink = document.createElement('a');
      newRepo.className = "repoGen";
      // style repoGen
      repoLink.innerText = data[i]["name"];
      repoLink.href = data[i]["html_url"];
      newRepo.appendChild(repoLink);
      projectInfoDiv.appendChild(newRepo);
    }
  });
}
