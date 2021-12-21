  const searchBtn = document.getElementById('search-button');
  const userName = document.getElementById('search-name');

  const profileImg = document.getElementById('profile');
  const nameOfUser = document.getElementById('name');
  const joinDate = document.getElementById('joinDate')
  const bio = document.getElementById('bio');

  const repoCount = document.getElementById('reposCount')
  const followCount = document.getElementById('followCount');
  const followersCount = document.getElementById('followersCount');

  const twitterId = document.getElementById('twitter');
  const locationName = document.getElementById('location');
  const company = document.getElementById('company');
  const blog = document.getElementById('bio-link');

  const errorMsg = document.getElementById('error-msg');
  const output = document.getElementById('output');

  userName.addEventListener('input', () => {
      if (userName.value.length < 5) {
          errorMsg.innerHTML = '';
          output.style.display = 'none';
      } else {
          errorMsg.innerHTML = 'Loading...';
          output.style.display = 'none';
      }
  })

  searchBtn.addEventListener('click', () => {

      fetch(`https://api.github.com/users/${userName.value}`)
          .then(response => response.json().then(data => {

              if (data.message === 'Not Found') {
                  errorMsg.innerHTML = 'User Not Found';
                  output.style.display = 'none';
              } else {
                  output.style.display = 'flex';
                  twitterId.style.color = 'white';
                  errorMsg.innerHTML = '';

                  profileImg.innerHTML = `<a href=${data.html_url}><img src='${data.avatar_url}' /></a>`;

                  nameOfUser.innerHTML = !data.name ? 'Unavailable' : `<a href=${data.html_url}>${data.name}</a>`;
                  joinDate.innerHTML = `Joined on ${data.created_at.split('T')[0]}`;
                  bio.innerHTML = data.bio;

                  locationName.innerHTML = !data.location ? 'Unavailable' : data.location;
                  twitterId.innerHTML = !data.twitter_username ? 'Unavailable' : `<a href='https://twitter.com/${data.twitter_username}'>@${data.twitter_username}</a>`;
                  company.innerHTML = !data.company ? 'Unavailable' : data.company;
                  blog.innerHTML = !data.blog ? 'Unavailable' : `<a href='${data.blog.includes('https')?data.blog:`https://${data.blog}`}'>${data.blog}</a>`;

                  repoCount.innerHTML = data.public_repos;
                  bio.innerHTML = data.bio;
                  followersCount.innerHTML = data.followers;
                  followCount.innerHTML = data.following;
              }
          }))
  })