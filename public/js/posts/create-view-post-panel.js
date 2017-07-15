export function createViewPost(arg, state) {
  axios.get(`/posts/${arg}`)
  .then(function(post) {
    console.log(post);
    let viewedPost = '';

    viewedPost = `
    <div class="row">
      <div class="col s12">
      <a href="#view-post" class="js-push-back"><img class="pull-out-back-icon"
      src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>`;

    //Carousel
    if(post.data.post.images.length > 0) {
      viewedPost += `<div class="carousel">`;

      for(let i=0; i < post.data.post.images.length; i++) {
        viewedPost += `
        <a class="carousel-item" href="#${i}">
          <img class="materialboxed slider-img" src="${post.data.post.images[i].image}" >
        </a>`;
      }

      viewedPost += `</div>`;
    }

    viewedPost += `
    <div class="row">
      <div class="col s12">
        <div class="center dont-break-on-overflow">

          <h4>${post.data.post.firstName} ${post.data.post.lastName}</h4>
          <h5>${post.data.post.subject}</h5>
          <p>${post.data.post.body}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="divider"></div>
        <h5>Comments</h5>
      </div>
    </div>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <textarea id="icon_prefix2" class="materialize-textarea js-comment-field"></textarea>
            <label for="icon_prefix2">Comment</label>
          </div>
          
          <div class="col s12">
            <button class="left btn waves-effect waves-light light-blue js-comment-post-btn"
            type="submit" data-id="${arg}">Submit</button>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="divider"></div>
          </div>
        </div>
      </form>
    </div>
    `;
    
    if(post.data.post.comments.length > 0) {
      let str = '';
      
      const date = (comment) => {
        let date =  new Date(comment.date);
        return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
      } 
      
      const deleteComment = (comment) => {
        if(comment.userId === state.user.id){
          return `<a href="#" data-id="${comment._id}" class="red-text right js-delete-comment">Delete</a>`;
        } else {
          return '';
        }
      }
      
      post.data.post.comments.forEach(comment => {
        console.log(comment);
        str += `
        <div class="row">
          <div class="col s12">
            <p><strong>${comment.firstName} ${comment.lastName}<br />
            ${date(comment)}</strong></p>
          </div>
          <div class="col s12">
            <p>${comment.body}</p>
            ${deleteComment(comment)}
          </div>
          
          <div class="row">
            <div class="col s12">
            <div class="divider"></div>
            </div>
          </div>
        </div>
        `
      })
      viewedPost += str;
    }

    $('#view-post').html(viewedPost);
    setTimeout(function () {
      $('.carousel').carousel();
      $('.materialboxed').materialbox();
    }, 500)

  })
  .catch(err => {
    console.log(err);
  });
}
