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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__posts_create_all_posts__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__posts_edit_post__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images__ = __webpack_require__(6);







/* global $ axios*/

$(function() {

  const state = {};

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
  }

  //Association Dropdown
  $(".dropdown-button").dropdown();

  //New Post Button Animation
  $('.new-post-button').hover(function() {
    if($(window).width() > 600){
      $('.new-post-button-container').toggleClass('elongated');
      $('.new-post-button').toggleClass('elongated-borders');
      $('.new-post-button-font').toggleClass('white-out');
    }
  });
  
  const postComment = (arg, state, comment, resolve) => {
    axios.put(`/posts/comment/${arg}`, {
      data: {
        "firstName": state.user.firstName,
        "lastName": state.user.lastName,
        "userId": state.user.id,
        "body": comment,
        "date": new Date()
      } 
    }).then((post) => {
      console.log('Posted Comment to Post', post);
      resolve();
    })
    .catch(err => console.log(err));
  }

  /* ========= Click Event Handlers ========= */
  
  //Comment on Post
  $('#view-post').on('click', '.js-comment-post-btn', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('id');
    const comment = $('.js-comment-field').val();
    
    new Promise((resolve, reject) => {
    postComment(postId, state, comment, resolve);
    })
    .then(() => {
      console.log('CREATED SOMEMENENE');
      __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__["a" /* createViewPost */](postId, state);
    });
  })
  
  //Delete Images
  $('#edit-post').on('click', '.delete-images', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('id');
    const checkedImages = $('.image-checkbox:checked').map(function() {
    return $(this).attr('id');
    }).get();
    
    new Promise( (resolve,reject) => {
      __WEBPACK_IMPORTED_MODULE_5__images__["a" /* deletePostImages */](postId, checkedImages, resolve)
    }).then(() => {
      __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](postId, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
      __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
    });
  });
  //Upload Photos
  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    const id = $(this).attr('id');
    __WEBPACK_IMPORTED_MODULE_5__images__["c" /* uploadPostPhoto */](id).then(() => {
      __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](id, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
      __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */]();
    })
  });

  //Store photos to upload
  $('#edit-post').on('change', '#upload-photo', function(){
    const that = $(this);
    __WEBPACK_IMPORTED_MODULE_5__images__["b" /* enterPostImages */](that);
  });

  //Edit post
  $('#edit-post').on('click', '#js-edit-post', function(e) {
    e.preventDefault();
    const editSubject = $('#edit-subject').val();
    const editMessage = $('textarea#edit-message').val();
    const editCategory = $('#edit-category').find(':selected').text();
    const errorMsg = 'Error:';
    const id = $('.js-edit-form').attr('id');

    if(__WEBPACK_IMPORTED_MODULE_4__posts_edit_post__["b" /* validateEditPost */](editSubject, editMessage, editCategory, errorMsg)) {
      __WEBPACK_IMPORTED_MODULE_4__posts_edit_post__["a" /* editPost */](editSubject, editMessage, editCategory, id, __WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */])
      closeSidePullOut('#edit-post');
    }
    
  });

  //Get all Users Posts
  $('#js-get-post').click(__WEBPACK_IMPORTED_MODULE_1__posts_create_user_posts__["a" /* getUserPosts */](state));
  //Get all posts
  $('#js-get-all-posts').click(__WEBPACK_IMPORTED_MODULE_0__posts_create_all_posts__["a" /* getAllPosts */]);

  //Close Panel
  $(".side-pull-out").on('click', '.js-push-back', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
    closeSidePullOut(reference);
  });

  //Open View Settings, View-Post, and Edit-Post panels
  $("main").on('click', '.js-settings, .view-post, .edit-post', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');

    if($(this).hasClass('view-post')){
      let postId = $(this).attr('class').split(' ')[0];
      __WEBPACK_IMPORTED_MODULE_2__posts_create_view_post_panel__["a" /* createViewPost */](postId, state);
    }

    if($(this).hasClass('edit-post')){
      let postId = $(this).attr('class').split(' ')[0];
    __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["b" /* getPost */](postId, state, post => { __WEBPACK_IMPORTED_MODULE_3__posts_create_edit_post_panel__["a" /* createEditPostPanel */](post)});
    }
    openFromSide(reference);
  });

  //Close Panel
  let closeSidePullOut = (arg) => {
    $(arg).animate({
      width:"0"
    });
  }

  // KINDA WORKS
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAllPosts;
function getAllPosts() {
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
          <img src="${post.images[0]}">
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
                <a class="${post._id} right view-post" href="#view-post" >View</a>
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserPosts;
function getUserPosts(state) {
  axios.get('/posts/user')
  .then(function (posts) {
    state.user = {
      id: posts.data.posts[0].userId,
      firstName: posts.data.posts[0].firstName,
      lastName: posts.data.posts[0].lastName,
    }
    console.log('GETTING ALL POSTS', posts);
    const userPosts = posts.data.posts;
    
    const date = (post) => {
      let date =  new Date(post.date);
      return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    }
    
    let constructPosts ='';

    userPosts.forEach(function(post) {
      constructPosts += `
      <div class="row post-card">
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
/* 3 */
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const imageDisplay = post => {
    console.log(post);
    let str = '<form action="#" class="col s12 light-blue lighten-5">';
    for (let i = 0; i < post.data.post.images.length; i++) {
      str +=`
        <p>
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
      <div class="col s6">
        <button class="right btn waves-effect waves-light red" type="submit" id="js-delete-post">Delete</button>
      </div>
      <div class="col s6">
        <button class="left btn waves-effect waves-light light-blue" type="submit" id="js-edit-post">Submit</button>
      </div>
      </form>
      <div class="row">
    </div>
    `;
    $('#edit-post').html(editPost);

    $('select').material_select();
  }
/* harmony export (immutable) */ __webpack_exports__["a"] = createEditPostPanel;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = editPost;
/* harmony export (immutable) */ __webpack_exports__["b"] = validateEditPost;
function editPost(subject, message, category, id, cb) {
  axios.put(`/posts/${id}`, {
    data: {
      "subject": subject,
      "body": message,
      "type": category
    }
  })
  .then(() => {
    cb();
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let formData = '';

const uploadPostPhoto = id => {
  return new Promise(resolve => {
  
    $.ajax({
      url: `/posts/image/upload/${id}`,
      type: 'POST',
      data: formData,
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


const enterPostImages = arg => {
  var files = arg.get(0).files;
  console.log(`Files: ${files}`);
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(`File loop: ${file}`);
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
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



/***/ })
/******/ ]);