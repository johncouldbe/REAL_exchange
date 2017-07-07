export function createViewPost(arg) {
  axios.get(`/posts/${arg}`)
  .then(function(post) {
  console.log(post);
    let viewedPost = '';

    viewedPost = `
    <div class="row">
      <div class="col s12">
      <a href="#view-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>

    <div class="carousel">
      <a class="carousel-item" href="#one!"><img class="materialboxed" src="http://lorempixel.com/250/250/nature/1"></a>
      <a class="carousel-item" href="#two!"><img class="materialboxed" src="http://lorempixel.com/250/250/nature/2"></a>
      <a class="carousel-item" href="#three!"><img class="materialboxed" src="http://lorempixel.com/250/250/nature/3"></a>
      <a class="carousel-item" href="#four!"><img class="materialboxed" src="http://lorempixel.com/250/250/nature/4"></a>
      <a class="carousel-item" href="#five!"><img class="materialboxed" src="http://lorempixel.com/250/250/nature/5"></a>
    </div>
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
            <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
            <label for="icon_prefix2">Comment</label>
          </div>
        </div>
      </form>
    </div>
    `;

    $('#view-post').html(viewedPost);
    setTimeout(function () { $('.carousel').carousel(); $('.materialboxed').materialbox(); }, 400)

  })
  .catch(err => {
    console.log(err);
  });
}
