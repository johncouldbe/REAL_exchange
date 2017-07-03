// const { myFunc } = require('./helpers');
$(function() {
  const state = {};

  function getAllPosts() {
    axios.get('/posts')
    .then(function (post) {
      const allPosts = post.data.posts;
      let constructPosts = '';

      allPosts.forEach(function(post) {
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
                <div class="card-action">
                  <a class="right view-post" href="#view-post" id="${post._id}">View</a>
                  <span>5 comments</span>
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

  function getUserPosts() {
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

  function createEditPostPanel(arg) {
    axios.get(`/posts/${arg}`)
    .then(function(post) {
      let editPost = `
      <div class="row">
        <div class="col s12">
        <a href="#edit-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
        </div>
      </div>
      <div class="row">
        <form class="col-s12 js-edit-form"  id="${post.data.post._id}">
          <div class="row">
            <div class="input-field col s12">
              <input id="edit-subject" type="text" value="${post.data.post.subject}">
              <label class="active" for="subject">Subject</label>
            </div>
            <div class="input-field col s12 m6">
              <select id="edit-category">
                <option value="" disabled selected>Choose your category</option>
                <option value="1">Wanted</option>
                <option value="2">Available</option>
                <option value="3">Announcement</option>
              </select>
              <label>Materialize Select</label>
            </div>
            <div class="input-field col s12">
              <textarea id="edit-message" class="materialize-textarea">${post.data.post.body}</textarea>
              <label for="icon_prefix2" class="active">Message</label>
            </div>
          </div>
        </div>
        </form>
        <div class="row">
          <div class="col s6">
            <button class="right btn waves-effect waves-light red" type="submit" id="js-delete-post">Delete</button>
          </div>
          <div class="col s6">
            <button class="left btn waves-effect waves-light green" type="submit" id="js-edit-post">Submit</button>
          </div>
      </div>
      `;
      $('#edit-post').html(editPost);

      $('select').material_select();
    })
    .catch(err => console.log(err));
  }

  function validateEditPost(subject, message, category, err) {
    if(subject == '') {
      err += '\nMissing subject';
    }
    if(message == '') {
      err += '\nMissing message';
    }
    if(category == 'Choose your category') {
      err += '\nMissing Category';
    }
    if(err != 'Error:') {
      alert(err);
      return false;
    } else {
      return true;
    }
  }

  function editPost(subject, message, category, id) {
    axios.put(`/posts/${id}`, {
      data: {
        "subject": subject,
        "body": message,
        "type": category
      }
    })
    .then(function (returned) {
      console.log('yay!');
    })
    .catch(err => console.log(err))
  }

  $('#edit-post').on('click', '#js-edit-post', function(e) {
    e.preventDefault();
    let editSubject = $('#edit-subject').val();
    let editMessage = $('textarea#edit-message').val();
    let editCategory = $('#edit-category').find(':selected').text();
    let errorMsg = 'Error:';
    let id = $('.js-edit-form').attr('id');

    if(validateEditPost(editSubject, editMessage, editCategory, errorMsg)) {
      editPost(editSubject, editMessage, editCategory, id);
    }


  });

  function createViewPost(arg) {
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

  function openFromSide(arg) {
    if($(window).width() < 601){
      $(arg).animate({
        width:"100vw"
      });
    } else {
      $(arg).animate({
        width:"50vw"
      });
    }
  }

  function closeSidePullOut(arg) {
    $(arg).animate({
      width:"0"
    });
  }

  //Event Handlers
  $(".dropdown-button").dropdown();

  $('#js-get-post').click(getUserPosts);

  $('#js-get-all-posts').click(getAllPosts);

  //View Settings, View-Post, and Edit-Post panels
  $("main").on('click', '.js-settings, .view-post, .edit-post', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');

    if($(this).hasClass('view-post')){
      let postId = $(this).attr('class').split(' ')[0];
      createViewPost(postId);
    }

    if($(this).hasClass('edit-post')){
      let postId = $(this).attr('class').split(' ')[0];
      createEditPostPanel(postId);
    }

    openFromSide(reference);
  });

  //Close Panel
  $(".side-pull-out").on('click', '.js-push-back', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
    closeSidePullOut(reference);
  });

  $('.new-post-button').hover(function() {
    if($(window).width() > 600){
      $('.new-post-button-container').toggleClass('elongated');
      $('.new-post-button').toggleClass('elongated-borders');
      $('.new-post-button-font').toggleClass('white-out');
    }
  });

  if($('img .materialboxed .initialized').hasClass('active')){
    $('.navbar-fixed').hide();
  }

// $('.side-pull-out').on('click', 'img', function() {
//     $('.navbar-fixed').toggleClass('hidden');
// })

// $('body').click(function() {
//   let count = 1;
//   $('body').click(function() {
//     if($('.navbar-fixed').css('display') == 'none'){
//     $('.navbar-fixed').show();
//     }
//   });
// });

  //End

  //window.dispatchEvent(new Event('resize'));
});
