import { commentCount } from '../helpers';

export function getAllPosts() {
  axios.get('/posts')
  .then(function (post) {
    const allPosts = post.data.posts;
    let constructPosts = '';

    allPosts.forEach(function(post) {
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
              <div class="card-action">
                <a class="${post._id} right view-post" href="#view-post" >View</a>
                ${commentCount(post)}`;
               
      constructPosts += `
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    $('#js-all-posts').html(constructPosts);
  })
  .catch(err => console.log(err));
}
