export function createViewPost(arg, state, domNode) {
  axios.get(`/posts/${arg}`)
  .then(_post => {
    const post = _post.data.post;
    let viewedPost = '';

    viewedPost = `
    <div class="row">
      <div class="col s12">
        <a href="${domNode}" class="js-push-back"><img class="pull-out-back-icon"
        src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>`;

    //Carousel
    if(post.images.length > 0) {
      viewedPost += `<div class="carousel">`;

      for(let i=0; i < post.images.length; i++) {
        viewedPost += `
        <a class="carousel-item" href="#${i}">
          <img class="materialboxed slider-img" src="${post.images[i].image}" >
        </a>`;
      }

      viewedPost += `</div>`;
    }

    viewedPost += `
    <div class="row">
      <div class="col s12">
        <div class="center dont-break-on-overflow">
          <h4><a href="#view-post-contact" data-href="#view-post-contact" data-id="${post.userId}" class="js-contact-card">${post.firstName} ${post.lastName}</a></h4>
          <h5>${post.subject}</h5>
          <p>${post.body}</p>
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
            type="submit" data-id="${arg}" data-target="${domNode}">Submit</button>
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

    if(post.comments.length > 0) {
      let str = '';

      const deleteComment = (comment) => {
        if(comment.userId === state.user._id){
          return `<a href="${domNode}" data-id="${comment._id}" data-post-id="${arg}" class="red-text right js-delete-comment-btn">Delete</a>`;
        } else {
          return '';
        }
      }

      post.comments.forEach(comment => {
        str += `
        <div class="row">
          <div class="col s12">
            <p><strong>${comment.firstName} ${comment.lastName}<br />
            ${moment(comment.date).fromNow()}</strong></p>
          </div>
          <div class="col s12">
            <p>${comment.body}</p>
            ${deleteComment(comment)}
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="divider"></div>
          </div>
        </div>
        `
      })
      viewedPost += str;
    }

    $(`${domNode}>.js-blur`).html(viewedPost);
    setTimeout(function () {
      $('.carousel').carousel();
      $('.materialboxed').materialbox();
    }, 500)

  })
  .catch(err => {
    console.log(err);
  });
}
