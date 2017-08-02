/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const commentCount = (post) => {
   if(post.comments.length > 0) {
        const plural = post.comments.length == 1 ? '' : 's';
        return `<span class="left">${post.comments.length} comment${plural}</span>`; 
    } else {
        return '';
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = commentCount;


const loader = `
    <div class="loader" id="loader-4">
      <span></span>
      <span></span>
      <span></span>
    </div>`;
/* unused harmony export loader */

 
const blur = () => {
    $('.js-blur').addClass('blur') 
    $('.loader-container').removeClass('hidden');
};
/* harmony export (immutable) */ __webpack_exports__["a"] = blur;

 
const unBlur = () => {
    $('.js-blur').removeClass('blur') 
    $('.loader-container').addClass('hidden');
};
/* harmony export (immutable) */ __webpack_exports__["c"] = unBlur;

 

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__posts_create_all_posts__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__posts_new_post__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__posts_edit_post__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__posts_images__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__posts_comments__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__contacts_create_all_contacts__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__contacts_create_view_contacts__ = __webpack_require__(11);












/* global $ axios*/

$(function() {

  const state = {
    formData: '',
    user: {}
  };

  axios.get(`/users/current`)
  .then( user => {
    console.log(user);
    state.user = user.data.user;
  })
  .catch( err => { console.log(err) })

  //Open panel
  let openFromSide = (arg) => {
    if($(window).width() < 601){
      $(arg).animate({
        width:"100vw"
      });
    } else {
      $(arg).animate({
        width:"50vw"
      });
    }
    $('body').addClass('no-scroll');
  }

  //Close Panel
  let closeSidePullOut = (arg) => {
    $(arg).animate({
      width:"0"
    });
    $('body').removeClass('no-scroll');
  }

  //Association Dropdown
  $(".dropdown-button").dropdown();

  //New Post Category Initialized
  $('select').material_select();

  //New Post Button Animation
  $('.new-post-button').hover(() => {
    if($(window).width() > 600){
      $('.new-post-button-container').toggleClass('elongated');
      $('.new-post-button').toggleClass('elongated-borders');
      $('.new-post-button-font').toggleClass('white-out');
    }
  });

  //After a comment reload posts
  const updatePostsFromComment = () => {
    if($('#user-posts-tab').hasClass('active')){
      __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
    } else {
        __WEBPACK_IMPORTED_MODULE_0__posts_create_all_posts__["a" /* getAllPosts */]();
      }
  }

  //Store photos to upload
  $('#edit-post, #new-post').on('change', '#upload-photo', function(){
    const that = $(this);
    __WEBPACK_IMPORTED_MODULE_6__posts_images__["b" /* enterPostImages */](that, state);
  });

  /* ========= Click Event Handlers ========= */

  // //remove invalid
  // $('#edit-post, #new-post').on('click', 'new-category', e => {
  //   console.log(e.currentTarget);
  //   $(e.currentTarget).removeClass('invalid');
  // });

  const addContact = (id) => {
    axios.put(`/users/add/${id}`)
    .then(user => { console.log(user) })
    .catch(err => console.log(err));
  }

  //Get all Contacts
  $('#all-contacts-tab').click(() => {
    __WEBPACK_IMPORTED_MODULE_9__contacts_create_all_contacts__["a" /* getAllContacts */](state);
  });

  //Add contact
  $('body').on('click', '.js-add-contact', (e) => {
    e.stopPropagation();
    const id = $(e.currentTarget).closest('.js-contact-card').data('id');
    addContact(id);
  });

  //View Contact Details
  $('body').on('click', '.js-contact-card', (e) => {
    e.preventDefault();
    const id = $(e.currentTarget).data('id');
    new Promise((resolve, reject) => {
      __WEBPACK_IMPORTED_MODULE_10__contacts_create_view_contacts__["a" /* getContactInfo */](id, resolve);
    })
    .then(() => {
      __WEBPACK_IMPORTED_MODULE_10__contacts_create_view_contacts__["b" /* getContactPosts */](id);
    })
    .catch(err => console.log(err))
  });

  $('#js-get-user-contacts').click(() => {
    __WEBPACK_IMPORTED_MODULE_9__contacts_create_all_contacts__["b" /* getUserContacts */](state);
  });

  // //View contact post
  // $('#view-contact').on('click', '.js-contact-post', (e) => {
  //   e.preventDefault();
  //   const id = $(e.currentTarget).data('id');
  //   console.log('good');
  //   $('nav-content>ul.tabs').tabs('select_tab', 'random-id');
  // });

  //Submit new post
  $('#new-post').on('click', '#submit-post', e => {
    e.preventDefault();
    const form = $('.js-new-form');

    if(! form[0].checkValidity()) {
      const fields = ['#new-subject', 'textarea#new-message', '#new-category'];

      fields.forEach( field => {
        if(! $(field)[0].checkValidity()) {
          if(field == '#new-category'){
            $(field).closest('.select-wrapper').find('input[type=text]').addClass('invalid');
          } else {
            $(field).addClass('invalid');
          }
        }
      });

     // If the form is invalid, submit it. The form won't actually submit;
     // this will just cause the browser to display the native HTML5 error messages.
      form.querySelector('input[type="submit"]').click();
    } else {
      __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
      const newPost = {
        subject: $('#new-subject').val(),
        body: $('textarea#new-message').val(),
        type: $('#new-category').find(':selected').text()
      }
      new Promise((resolve, reject) => {
        __WEBPACK_IMPORTED_MODULE_4__posts_new_post__["a" /* createNewPost */](newPost, state, resolve);
      }).then(() => {
        closeSidePullOut('#new-post');
        //reset form
        form[0].reset();
        __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
        __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
      })
    }
  });

  //Delete post
  $('#edit-post').on('click', '#js-delete-post', (e) => {
    e.preventDefault();
    const id = $('.js-edit-form').attr('id');
    if (confirm("Are you sure you want to delete this post?") == true) {
      __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
      axios.delete(`/posts/${id}`)
      .then(() => {
        __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
        closeSidePullOut('#edit-post');
        __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
      })
      .catch(err => console.log(err));
    }
  })


  //Comment on post
  $('#view-post').on('click', '.js-comment-post-btn', (e) => {
    e.preventDefault();
    __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
    const postId = $(e.currentTarget).data('id');
    const comment = $('.js-comment-field').val();

    new Promise((resolve, reject) => {
      __WEBPACK_IMPORTED_MODULE_7__posts_comments__["b" /* postComment */](postId, state, comment, resolve);
    })
    .then(() => {
      __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__["a" /* createViewPost */](postId, state);
      updatePostsFromComment(state);
      __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
    });
  });

  //Delete post Comment
  $('#view-post').on('click', '.js-delete-comment-btn', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('postId');
    const commentId = $(e.currentTarget).data('id');

    if (confirm("Are you sure you want to delete this comment?") == true) {
      __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
      new Promise((resolve, reject) => {
        __WEBPACK_IMPORTED_MODULE_7__posts_comments__["a" /* deleteComment */](postId, commentId, resolve);
      })
      .then(() => {
        __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__["a" /* createViewPost */](postId, state);
        updatePostsFromComment(state);
        __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
      });
    }
  });

  //Delete Images
  $('#edit-post').on('click', '.delete-images', (e) => {
    e.preventDefault();
    __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
    const postId = $(e.currentTarget).data('id');


    const checkedImages = $('.image-checkbox:checked').map(function() {
    return $(this).attr('id');
    }).get();

    new Promise( (resolve,reject) => {
      __WEBPACK_IMPORTED_MODULE_6__posts_images__["a" /* deletePostImages */](postId, checkedImages, resolve)
    }).then(() => {
      __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](postId, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
      __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
      __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
    });
  });

  //Upload Photos
  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    __WEBPACK_IMPORTED_MODULE_8__helpers__["a" /* blur */]();
    const id = $(this).attr('id');

    __WEBPACK_IMPORTED_MODULE_6__posts_images__["c" /* uploadPostPhoto */](id, state).then(() => {
      __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](id, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
      __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
      __WEBPACK_IMPORTED_MODULE_8__helpers__["c" /* unBlur */]();
    })
  });

  //Edit post
  $('#edit-post').on('click', '#js-edit-post', function(e) {
    e.preventDefault();
    const editSubject = $('#edit-subject').val();
    const editMessage = $('textarea#edit-message').val();
    const editCategory = $('#edit-category').find(':selected').text();
    const errorMsg = 'Error:';
    const id = $('.js-edit-form').attr('id');

    if(__WEBPACK_IMPORTED_MODULE_5__posts_edit_post__["b" /* validateEditPost */](editSubject, editMessage, editCategory, errorMsg)) {
      __WEBPACK_IMPORTED_MODULE_5__posts_edit_post__["a" /* editPost */](editSubject, editMessage, editCategory, id, state, __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */])
      closeSidePullOut('#edit-post');
    }
  });

  //Get all Users Posts
  $('#js-get-post').click(() => { __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */](state) });
  //Get all posts
  $('#js-get-all-posts').click(__WEBPACK_IMPORTED_MODULE_0__posts_create_all_posts__["a" /* getAllPosts */]);

  //Close Panel
  $(".side-pull-out").on('click', '.js-push-back', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
    closeSidePullOut(reference);
  });

  //Open View Settings, View-Post, and Edit-Post panels
  $("main").on('click', '.js-settings, .view-post, .edit-post, .js-new-post, .js-contact-card', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href') || $(this).data('href');

    if($(this).hasClass('view-post')){
      let postId = $(this).attr('class').split(' ')[0];
      __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__["a" /* createViewPost */](postId, state);
    }

    if($(this).hasClass('edit-post')){
      let postId = $(this).attr('class').split(' ')[0];
      __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](postId, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
    }

    if ($(e.target).hasClass('js-add-contact')) {
        return;
    }

    openFromSide(reference);

  });

  // KINDA WORKS for Navbar in the way
  // $('#view-post').on('click', 'img.materialboxed', (e) => {
  //   e.stopPropagation();
  //   console.log(e.currentTarget);
  //   console.log($(this));
  //   setTimeout( () => {
  //     if($(e.currentTarget).hasClass('initialized')){
  //       $('.navbar-fixed').height('0px');
  //     }
  //   }, 100);
  // });

  //End
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAllPosts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);


function getAllPosts() {
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
                ${__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* commentCount */](post)}`;
               
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserPosts;
function getUserPosts() {
  axios.get('/posts/user')
  .then(function (posts) {
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createViewPost;
function createViewPost(arg, state) {
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
      
      const deleteComment = (comment) => {
        if(comment.userId === state.user.id){
          return `<a href="#" data-id="${comment._id}" data-post-id="${arg}" class="red-text right js-delete-comment-btn">Delete</a>`;
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

    $('#view-post>.js-blur').html(viewedPost);
    setTimeout(function () {
      $('.carousel').carousel();
      $('.materialboxed').materialbox();
    }, 500)

  })
  .catch(err => {
    console.log(err);
  });
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const imageDisplay = post => {
    console.log(post);
    let str = '<form action="#" class="col s12 light-blue lighten-5 images-form" style="position:relative;">';
    for (let i = 0; i < post.data.post.images.length; i++) {
      str +=`
        <p class="checkbox-container">
          <input type="checkbox" class="image-checkbox" id="${post.data.post.images[i].publicId}" />
          <label class="black-text" for="${post.data.post.images[i].publicId}">
          ${post.data.post.images[i].imageName}</label>
        </p>
      `;
    }

    str += `
      <p><a class="red-text delete-images hovered" data-id="${post.data.post._id}" >Delete selected</a></p>
    </form>`;
    return str;
}
/* unused harmony export imageDisplay */


const getPost = (arg, state, cb) => {
  axios.get(`/posts/${arg}`)
  .then(post => {
    state.post = post;
    cb(post);
    })
  .catch(err => console.log(err));
}
/* harmony export (immutable) */ __webpack_exports__["b"] = getPost;


const createEditPostPanel = post => {
    let editPost = `
    <div class="row">
      <div class="col s12">
      <a href="#edit-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>

    <div class="row center">
      <h5>Images</h5>
      <div class="image-list">
    `;

    if(post.data.post.images.length > 0){
      editPost += imageDisplay(post);
    }

    editPost += `
      </div>
      <form action="#" class="col s12">
        <div class="file-field input-field">
          <div class="btn light-blue">
            <span>Find</span>
            <input id="upload-photo" name="uploads[]" type="file" multiple>
          </div>
          <div class="file-path-wrapper">
          <input class="file-path validate" type="text" placeholder="Upload one or more files">
          </div>
        </div>
        <div class="progress col s12">
          <div class="determinate progress-bar" ></div>
        </div>
          <button class="btn light-blue upload-btn" type="button" id="${post.data.post._id}">Upload</button>
      </form>
    </div>

    <div class="row center">
      <h5>Post</h5>
      <form class="col-s12 js-edit-form" id="${post.data.post._id}">
        <div class="row">
          <div class="input-field col s12">
            <input id="edit-subject" type="text" value="${post.data.post.subject}" data-error="wrong" class="validate" required aria-required="true">
            <label class="active" for="edit-subject">Subject</label>
          </div>
          <div class="input-field col s12 m6">
            <select id="edit-category" class="validate" required>
              <option value="" disabled selected>Choose your category</option>
              <option value="1">Wanted</option>
              <option value="2">Available</option>
              <option value="3">Announcement</option>
            </select>
            <label>Materialize Select</label>
          </div>
          <div class="input-field col s12">
            <textarea id="edit-message" class="materialize-textarea" class="validate">${post.data.post.body}</textarea>
            <label for="icon_prefix2" class="active">Message</label>
          </div>
        </div>
        <div class="col s6">
         <button class="right btn waves-effect waves-light red" type="submit" id="js-delete-post">Delete</button>
        </div>
        <div class="col s6">
          <button class="left btn waves-effect waves-light light-blue" type="submit" id="js-edit-post">Submit</button>
        </div>
      </form>
      <div class="row"></div>
    </div>
    `;
    $('#edit-post>.js-blur').html(editPost);

    $('select').material_select();
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = createEditPostPanel;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
    //Create new post
  const createNewPost = (newPost, state, resolve) => {
    axios.post('/posts/new', {
      data: {
        "body": newPost.body,
        "subject": newPost.subject,
        "type": newPost.type
      }
    }).then((postId) => {
      console.log(postId);
      state.postId = postId;
      $.ajax({
      url: `/posts/image/upload/${postId.data}`,
      type: 'POST',
      data: state.formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log('upload successful!\n' + data);
        resolve();
      },
      error: err => {
        console.log(`--- ${JSON.stringify(err)}`);
      }
      })
    })
    .catch(err => console.log(err));
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = createNewPost;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = editPost;
/* harmony export (immutable) */ __webpack_exports__["b"] = validateEditPost;
function editPost(subject, message, category, id, state, cb) {
  axios.put(`/posts/${id}`, {
    data: {
      "subject": subject,
      "body": message,
      "type": category
    }
  })
  .then(() => {
    cb(state);
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const uploadPostPhoto = (id, state) => {
  return new Promise(resolve => {
  
    $.ajax({
      url: `/posts/image/upload/${id}`,
      type: 'POST',
      data: state.formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log('upload successful!\n' + data);
        resolve();
      },
      error: err => {
        console.log(`--- ${JSON.stringify(err)}`);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');
            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }
          }
        }, false);
  
        return xhr;
      }
    });
  });
}
/* harmony export (immutable) */ __webpack_exports__["c"] = uploadPostPhoto;


const enterPostImages = (arg, state) => {
  var files = arg.get(0).files;
  console.log(`Files: ${files}`);
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    state.formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(`File loop: ${file}`);
      // add the files to formData object for the data payload
      state.formData.append('uploads[]', file, file.name);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = enterPostImages;


const deletePostImages = (postId, images, resolve) => {
  axios.put(`/posts/image/delete/${postId}`, {
    data: {
      "publicIds": images
    }
  })
  .then( (res) => {
    console.log('Deleted Image(s)');
    console.log(res);
    resolve();
  })
  .catch( err => {
    console.log(err);
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = deletePostImages;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const postComment = (arg, state, comment, resolve) => {
    axios.put(`/posts/comment/${arg}`, {
      data: {
        "firstName": state.user.firstName,
        "lastName": state.user.lastName,
        "userId": state.user.id,
        "body": comment,
        "date": new Date()
      } 
    }).then(() => {
      resolve();
    })
    .catch(err => console.log(err));
  }
/* harmony export (immutable) */ __webpack_exports__["b"] = postComment;

  
  const deleteComment = (postId, commentId, resolve) => {
    axios.put(`/posts/comment/delete/${postId}`, {
      data: {
        "commentId": commentId
      }
    })
    .then(() => {
      resolve();
    })
    .catch(err => console.log(err));
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = deleteComment;

  
  

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const getAllContacts = (state) => {
  axios.get('/users')
  .then((users) => {
      console.log(users);
      createAllContacts(users, '#all-contacts', state)})
  .catch(err => { console.log(err) })
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getAllContacts;


const getUserContacts = (state) => {
  console.log('WORKING');
  axios.get('users/current/contacts')
  .then(contacts => {
    createAllContacts(contacts, '#user-contacts',state)
  })
}
/* harmony export (immutable) */ __webpack_exports__["b"] = getUserContacts;


const createAllContacts = (users, domNode, state) => {
    const beginning = '<div class="row">';
    const end = '</div>';
    let contactList = '';

    console.log("USERS", users);
    console.log("STATE", state);

    users.data.users.forEach((user) => {
        const clickHandler = domNode == '#all-contacts' ? 'js-add-contact' : 'js-minus-contact';
        const notInUsrContact = !state.user.contacts.map(user => user.userId).includes(user._id);
        console.log("USER ID: ",user._id);
        console.log("STATE CONTACTS", state.user.contacts);
        console.log(notInUsrContact);
        const icon = notInUsrContact  ? 'add' : 'remove';

        contactList += `
          <div class="col s12 m6 l4">
            <div data-href="#view-contact" class="js-contact-card" data-id="${user._id}">
              <div class="card-panel grey lighten-5 z-depth-1 height-115 hovered">
                <i class="small material-icons icon-blue hovered right ${clickHandler}" >${icon}</i>
                <div class="row valign-wrapper">
                  <div class="col s3">
                    <img src="https://lorempixel.com/400/400/" alt="" class="circle responsive-img">
                  </div>
                  <div class="col s9">
                    <h5 class="black-text">${user.firstName} ${user.lastName}</h5>
                    <h6 class="black-text truncate">${user.company}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    });

    $(domNode).html(beginning + contactList + end);

}
/* unused harmony export createAllContacts */



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const getContactInfo = (id, resolve) => {
    axios.get(`/users/${id}`)
    .then((user) => {
        console.log(user);
        createViewContact(user);
        resolve();
    })
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getContactInfo;


const createViewContact = (_user) => {
    const user = _user.data.user;
    
    const beginning = `
    <div class="row">
      <div class="col s12">
        <a href="#view-contact" class="js-push-back"><img class="pull-out-back-icon"
        src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>`;
    
    const contactInfo = `
    <div class="row">
        <div class="col s12 dont-break-on-overflow">
            <h4 class="center-align">${user.firstName} ${user.lastName}</h4>
            <h5 class="center-align">${user.company}</h5>
            <div class="col s6 offset-s3">
              <img src="https://lorempixel.com/400/400/" class="circle responsive-img" />
            </div>
            <div class="col s12">
                <p class="flow-text center-align">${user.bio}</p>
            </div>
        </div>
    </div>
        
    <div class="row">
        <div class="col s12">
            <div class="divider"></div>
        </div>
    </div>
    
    <div class="row">
        <div class="col s12">
                <p class="flow-text"><strong>Phone: </strong>${user.phoneNumber}</p>
                <p class="flow-text"><strong>Email: </strong>${user.email}</p>
                <p class="flow-text word-break"><strong>Website: </strong>${user.website}</p>
        </div>
    </div>`;
    
    $('#view-contact').html(beginning + contactInfo);
}
/* unused harmony export createViewContact */


const getContactPosts = (user) => {
    axios.get('posts/user')
    .then(posts => {
        console.log(posts);
        createContactPosts(posts);
    })
    .catch(err => { console.log(err) })
}
/* harmony export (immutable) */ __webpack_exports__["b"] = getContactPosts;


const createContactPosts = (_posts) => {
    const posts = _posts.data.posts;
    
    const beginning = `
        <div class="row">
            <div class="col s12">
                <div class="divider"></div>
            </div>
        </div>
        <div class="row">
          <div class="col s12">
            <h5 class="center-align">${posts[0].firstName}'s Posts</h5>
          </div>
        `;
    
    const end = `</div>`;
    
    let showPosts = ``;
    
    posts.forEach(post => {
      showPosts += `
          <div class="col s12">
            <a href="#view-contact" class="js-contact-post" data-id="${post._id}">
              <div class="card-panel grey lighten-5 z-depth-1 hovered hoverable">
                <div class="row valign-wrapper">
                  <div class="col s3">
                    <img src="${post.images.length > 0 ? post.images[0].image : '' }" alt="" class="responsive-img">
                  </div>
                  <div class="col s9">
                    <h5 class="black-text">${post.subject}</h5>
                    <h6 class="black-text">${moment(post.date).format('M/D/Y | h:mm a')}</h6>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
    });
    
    $('#view-contact').append(beginning + showPosts + end);
    
}
/* unused harmony export createContactPosts */


    

/***/ })
/******/ ]);