export function getUserPosts(state) {
  axios.get('/posts/user')
  .then(function (posts) {
    state.user = {
      id: posts.data.posts[0].userId,
      firstName: posts.data.posts[0].firstName,
      lastName: posts.data.posts[0].lastName,
    }
    console.log('GETTING ALL USER POSTS', posts);
    const userPosts = posts.data.posts;
    
    let constructPosts ='';

    userPosts.forEach(function(post) {
      constructPosts += `
      <div class="row">
        <div class="col s12">
          <div class="card horizontal grey lighten-5 hoverable">
      `;
        if(post.images.length > 0) {
          constructPosts += `
          <div class="card-image grey lighten-5">
          <img src="${post.images[0].image}">
          </div>
          `;
        }

      constructPosts += `
            <div class="card-stacked">
              <div class="card-content grey lighten-5">
                <div class="row">
                  <div class="col s6">
                    <p>${post.firstName} ${post.lastName}</p>
                  </div>
                  <div class="col s6 right-align">
                    <p>${moment(post.date).format('M/D/Y | h:mm a')}</p>
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
                `;
                if(post.comments.length > 0) {
                  constructPosts += `
                  <span class="left">${post.comments.length} comments</span>`; 
                }
      constructPosts += `
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
