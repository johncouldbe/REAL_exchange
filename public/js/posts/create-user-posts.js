export function getUserPosts() {
  axios.get('/posts/user')
  .then(function (posts) {
    console.log('GETTING ALL POSTS', posts);
    const userPosts = posts.data.posts;
    let constructPosts ='';

    userPosts.forEach(function(post) {
      constructPosts += `
      <div class="row post-card">
        <div class="col s12">
          <div class="card horizontal hoverable">
      `;
        if(post.images.length > 0) {
          constructPosts += `
          <div class="card-image">
          <img src="${post.images[0].image}">
          </div>
          `;
        }

      constructPosts += `
            <div class="card-stacked">
              <div class="card-content">
                <div class="row">
                  <div class="col s6">
                    <p>${post.firstName} ${post.lastName}</p>
                  </div>
                  <div class="col s6 right-align">
                    <p>${post.date}</p>
                  </div>
                  <div class="col s12">
                    <p><strong>${post.type}</strong></p>
                  </div>
                </div>
                <div class="col s12">
                  <p><strong>${post.subject}</strong></h5>
                </div>
              </div>
              <div class="card-action right-align">
                <a class="${post._id} view-post" href="#view-post">View</a>
                <a class="${post._id} left-border left-padding light-blue-text edit-post" href="#edit-post"> Edit</a>
                <span class="left">5 comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    $('#js-user-posts').html(constructPosts);

    $('#user-posts-tab').click();
  })
  .catch(err => {
    console.log(err);
  });
}
