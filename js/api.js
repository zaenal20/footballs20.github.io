let fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "8dbb6d4e81e1443eaeafc1029d854deb",
    },
  });
};

var base_url = "https://api.football-data.org/v2/";
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}
function error(error) {
   console.log("Error : " + error);
}
function getArticles() {
    if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          data.standings[1].table.forEach(function(article) {
            articlesHTML += `
                  <tr>
                      <td>${article.position}</td>
                      <td><img src="${article.team.crestUrl}" style="width:50px;"><br>${article.team.name}</td>
                      <td>${article.points}</td>
                      <td><a href="./article.html?id=${article.team.id}">More</a></td>
                   </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("table").innerHTML = articlesHTML;
        })
      }
    })
  }
  fetchApi(base_url + "competitions/2021/standings")
    .then(status)
    .then(json)
    .then(function(data) {
      var articlesHTML = "";
      data.standings[1].table.forEach(function(article) {
        articlesHTML += `
           

                   <tr>
                      <td>${article.position}</td>
                      <td><img src="${article.team.crestUrl}" style="width:50px;"> <br>${article.team.name}</td>
                      <td>${article.points}</td>
                      <td><a href="./article.html?id=${article.team.id}">More</a></td>
                   </tr>
            `;
      });
      document.getElementById("table").innerHTML = articlesHTML;
    })
    .catch(error);
}




function getArticleById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log(data);
            var articleHTML = `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <a href="${data.website}">${snarkdown(data.website)}</a>
                  </div>
                </div>

                <p>Founded: ${data.founded} </p>
                <p>Phone: ${data.phone}</p>
                <p>Email: ${data.email}</p>
                <p>Address: ${data.address}</p>


              `;
            
            document.getElementById("match").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
      var articleHTML = `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <a href="${data.website}">${snarkdown(data.website)}</a>
                  </div>
                </div>

                <p>Founded: ${data.founded} </p>
                <p>Phone: ${data.phone}</p>
                <p>Email: ${data.email}</p>
                <p>Address: ${data.address}</p>

        `;
        
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}


function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function(article) {
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.name}</span>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}




function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(teams) {
    console.log(teams)
    articleHTML = '';
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${teams.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${teams.name}</span>
        ${snarkdown(teams.website)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}



