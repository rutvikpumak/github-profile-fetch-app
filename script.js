  const searchBtn = document.getElementById("search-button");
  const userName = document.getElementById('search-name');

  userName.addEventListener("input", () => {
      if (userName.value.length < 5) {
          document.getElementById('error-msg').innerHTML = "";
          document.getElementById('output').style.display = "none";
      } else {
          document.getElementById('error-msg').innerHTML = "Loading...";
      }
  })
  
  searchBtn.addEventListener("click", () => {

      fetch(`https://api.github.com/users/${userName.value}`)
          .then(response => response.json().then(data => {
              console.log(data.message)
              if (data.message === "Not Found") {
                  document.getElementById('error-msg').innerHTML = "User Not Found";
                  document.getElementById('output').style.display = "none";
              } else {
                  document.getElementById('output').style.display = "flex";
                  document.getElementById('twitter').style.color = "white"
                  document.getElementById('error-msg').innerHTML = "";

                  document.getElementById('name').innerHTML = !data.name ? 'Unavailable' : data.name;
                  document.getElementById('joinDate').innerHTML = `Joined on ${data.created_at.split("T")[0]}`;


                  document.getElementById('location').innerHTML = !data.location ? 'Unavailable' : data.location;
                  document.getElementById('twitter').innerHTML = !data.twitter_username ? 'Unavailable' : `<a href="https://twitter.com/${data.twitter_username}">@${data.twitter_username}</a>`;



                  document.getElementById('company').innerHTML = !data.company ? 'Unavailable' : data.company;
                  data.company;
                  document.getElementById('bio-link').innerHTML = !data.blog ? 'Unavailable' : `<a href="https://${data.blog}">${data.blog}</a>`;



                  document.getElementById('reposCount').innerHTML = data.public_repos;
                  document.getElementById('bio').innerHTML = data.bio;
                  document.getElementById('followersCount').innerHTML = data.followers + " Followers";
                  document.getElementById('followCount').innerHTML = data.following + " Following";

                  document.getElementById('profile').innerHTML = `
        <img src="${data.avatar_url}" />
        `
              }
              //rutvikpumak
          }))
  })