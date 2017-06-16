$(function() {
  const state = {
    id: '5b966dcf-dda8-4bdc-8523-bf173dd785be'
  }

  axios.get(`/users/${state.id}`)
  .then(function(user) {
    state.user = user.data[0];
    console.log(state.user);
    let userPage = `
    <div class="col s12 l6">
      <h4 class="center-align greeting">Hello, ${state.user.first_name} ${state.user.last_name}</h4>
      <div class="col s4 offset-s4 m2 offset-m5 l4 offset-l4">
        <img src="https://lorempixel.com/400/400/" class="circle responsive-img" />
      </div>
      <div class="col s12 center-align">
        <h6 class="flow-text hovered"><a>Change Picture</a></h6>
      </div>
    </div>

    <div class="col s12 l6 left-border">
      <div class="center-align user-info-displayed">
        <p class="flow-text">"${state.user.bio}"</p>
        <p class="flow-text">${state.user.phone}</p>
        <p class="flow-text">${state.user.email}</p>
        <p class="flow-text website">${state.user.website}</p>
      </div>
    </div>
    `;

    $('#user-page').html(userPage);

    let insert = `
    <a href="#edit-info" class="js-settings-back"><img class="settings-back" src="/assets/images/arrow-right.svg" /></a>
    <div class="row">
      <form class="col s12">
      <div class="settings-menu-options dont-break-on-overflow">
        <div class="row">
          <div class="input-field col s12 m8 offset-m2">
            <textarea id="settings-bio" class="materialize-textarea">${state.user.bio}</textarea>
            <label for="textarea1">Bio</label>
          </div>
          <div class="input-field col s12 m8 offset-m2">
            <input value="${state.user.phone}" id="settings-phone-number" type="tel" class="validate">
            <label for="telephone">Phone Number</label>
          </div>
          <div class="input-field col s12 m8 offset-m2">
            <input value="${state.user.email}" id="settings-email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12 m8 offset-m2">
            <input value="${state.user.website}" id="settings-website" type="text" class="validate">
            <label for="website">Website</label>
          </div>
        </div>
        <div class="col s12 center">
          <button class="btn waves-effect waves-light amber" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
      </form>
    </div>

    `;
    $('#edit-info').html(insert);
    Materialize.updateTextFields();
  })
  .catch(err => {
    console.log(err);
  });

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
                <div class="card-action right-align">
                  <a href="#">View</a>
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
    axios.get(`/posts/${state.id}`)
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
                  <a href="#">View</a>
                  <a class="left-border left-padding light-blue-text" href="#"> Edit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      console.log(constructPosts);
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

  //Event Handlers
  $(".dropdown-button").dropdown();

  $('#js-get-post').click(getUserPosts);

  $('#js-get-all-posts').click(getAllPosts);

  $(".user-settings-icon").on('click', '.js-settings', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
    openFromSide(reference);
  });

  $(".settings-menu").on('click', '.js-settings-back', function(e) {
    let reference = $(this).attr('href');
    $(reference).animate({
      width:"0"
    });
  });

  $('.setting').click(function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
      openFromSide(reference);
  })
  //End

  //window.dispatchEvent(new Event('resize'));
});
