export function getAllPosts() {
  axios.get('/posts')
  .then(function (post) {
    const allPosts = post.data.posts;
    let constructPosts = '';
    
    const date = (post) => {
      let date =  new Date(post.date);
      return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    }

    allPosts.forEach(function(post) {
      constructPosts += `
      <div class="row">
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
                    <p>${date(post)}</p>
                  </div>
                  <div class="col s12">
                    <p><strong>${post.type}</strong></p>
                  </div>
                </div>
                <div class="col s12">
                  <p><strong>${post.subject}</strong></h5>
                </div>
              </div>
              <div class="card-action">
                <a class="${post._id} right view-post" href="#view-post" >View</a>`;
                if(post.comments.length > 0) {
                  if(post.comments.length == 1){
                    constructPosts += `
                    <span class="left">${post.comments.length} comment</span>`; 
                  } else {
                    constructPosts += `
                    <span class="left">${post.comments.length} comments</span>`; 
                  }
                }
      constructPosts += `
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    $('#js-all-posts').html(constructPosts);

  });
}
