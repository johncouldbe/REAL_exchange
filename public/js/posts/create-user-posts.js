export function getUserPosts() {
  axios.get('/posts/user')
  .then(function (posts) {
    console.log(posts);
    const myPosts = posts.data.posts;
    let constructPosts ='';

    myPosts.forEach(function(post) {
      constructPosts += `
      <div class="row">
        <div class="col s12">
          <div class="card horizontal hoverable">
            <div class="card-image">
              <img src="http://lorempixel.com/100/190/nature/">
            </div>
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
    $('#js-my-post').append(constructPosts);

    $('#my-posts-tab').click();
  })
  .catch(err => {
    console.log(err);
  });
}
