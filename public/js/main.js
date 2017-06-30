$(function() {
  const state = {};

  // axios.get(`/users/${state.id}`)
  // .then(function(user) {
  //   state.user = user.data[0];
  //   console.log(state.user);
  //   let userPage = `
  //   <div class="col s12 l6">
  //     <h4 class="center-align greeting">Hello, ${state.user.first_name} ${state.user.last_name}</h4>
  //     <div class="col s4 offset-s4 m2 offset-m5 l4 offset-l4">
  //       <img src="https://lorempixel.com/400/400/" class="circle responsive-img" />
  //     </div>
  //     <div class="col s12 center-align">
  //       <h6 class="flow-text hovered"><a>Change Picture</a></h6>
  //     </div>
  //   </div>
  //
  //   <div class="col s12 l6 left-border">
  //     <div class="center-align user-info-displayed">
  //       <p class="flow-text">"${state.user.bio}"</p>
  //       <p class="flow-text">${state.user.phoneNumber}</p>
  //       <p class="flow-text">${state.user.email}</p>
  //       <p class="flow-text word-break">${state.user.website}</p>
  //     </div>
  //   </div>
  //   `;
  //
  //   $('#user-page').html(userPage);
  //
  //   let editedUserInfo = `
  //   <a href="#edit-info" class="js-push-back"><img class="pull-out-back-icon" src="/assets/images/arrow-right.svg" /></a>
  //   <div class="row">
  //     <form class="col s12">
  //     <div class="settings-menu-options dont-break-on-overflow">
  //       <div class="row">
  //         <div class="input-field col s12 m8 offset-m2">
  //           <textarea id="settings-bio" class="materialize-textarea">${state.user.bio}</textarea>
  //           <label for="textarea1">Bio</label>
  //         </div>
  //         <div class="input-field col s12 m8 offset-m2">
  //           <input value="${state.user.phone}" id="settings-phone-number" type="tel" class="validate">
  //           <label for="telephone">Phone Number</label>
  //         </div>
  //         <div class="input-field col s12 m8 offset-m2">
  //           <input value="${state.user.email}" id="settings-email" type="email" class="validate">
  //           <label for="email">Email</label>
  //         </div>
  //         <div class="input-field col s12 m8 offset-m2">
  //           <input value="${state.user.website}" id="settings-website" type="text" class="validate">
  //           <label for="website">Website</label>
  //         </div>
  //       </div>
  //       <div class="col s12 center">
  //         <button class="btn waves-effect waves-light amber" type="submit" name="action">Submit
  //           <i class="material-icons right">send</i>
  //         </button>
  //       </div>
  //     </div>
  //     </form>
  //   </div>
  //
  //   `;
  //   $('#edit-info').html(editedUserInfo);
  //   Materialize.updateTextFields();
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  function getAllPosts() {
    axios.get('/posts')
    .then(function (posts) {
      const allPosts = posts.data;
      console.log(posts);
      let constructPosts = '';

      allPosts.forEach(function(post) {
        constructPosts += `
        <div class="row">
          <div class="col s12">
            <div class="card horizontal">
              <div class="card-image">
                <img src="http://lorempixel.com/100/190/nature/">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <div class="row">
                    <div class="col s6">
                      <p>${post.first_name} ${post.last_name}</p>
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
                  <a class="right view-post" href="#view-post" id="${post.id}">View</a>
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

  function getUserPosts () {
    axios.get(`/posts/user/${state.id}`)
    .then(function(posts) {
      const myPosts = posts.data;
      console.log(posts);
      let constructPosts ='';

      myPosts.forEach(function(post) {
        constructPosts += `
        <div class="row">
          <div class="col s12">
            <div class="card horizontal">
              <div class="card-image">
                <img src="http://lorempixel.com/100/190/nature/">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <div class="row">
                    <div class="col s6">
                      <p>${post.first_name} ${post.last_name}</p>
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
                  <a class="view-post" href="#view-post" id="${post.id}">View</a>
                  <a class="left-border left-padding light-blue-text" href="#"> Edit</a>
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

  function createViewPost(arg) {
    axios.get(`/posts/${arg}`)
    .then(function(post) {
      const postData = post.data[0];
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

            <h4>${postData.first_name} ${postData.last_name}</h4>
            <h5>${postData.subject}</h5>
            <p>${postData.body}</p>
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

  //Event Handlers
  $(".dropdown-button").dropdown();

  $('#js-get-post').click(getUserPosts);

  $('#js-get-all-posts').click(getAllPosts);

  //View Settings and View-Post panels
  $("main").on('click', '.js-settings, .view-post', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');

    if($(this).hasClass('view-post')){
      let postId = $(this).attr('id');
      createViewPost(postId);
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

// function checkCredentials(lNum, pw) {
//   axios.get(`/login`, {
//     params: {
//       licensenumber: lNum,
//       password: pw
//     },
//     auth: {
//     username: lNum,
//     password: pw
//     }
//   })
//   .then(function(returned) {
//     state.user = returned;
//     console.log(returned);
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }
//
//
// $('#js-login').click(function(e) {
//   e.preventDefault();
//   if($('#licenseNumber').val() != '' && $('#password').val() != '') {
//     let licenseNumber = $('#licenseNumber').val();
//     let password = $('#password').val();
//     checkCredentials(licenseNumber, password);
//   }
// })

  //End

  //window.dispatchEvent(new Event('resize'));
});
