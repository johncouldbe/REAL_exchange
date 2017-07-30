import { getAllPosts } from './posts/create-all-posts';
import { getUserPosts } from './posts/create-user-posts';
import { createViewPost } from './posts/create-view-post-panel';
import { getPost, createEditPostPanel, imageDisplay } from './posts/create-edit-post-panel';
import { createNewPost } from './posts/new-post';
import { editPost, validateEditPost } from './posts/edit-post';
import { uploadPostPhoto, enterPostImages, deletePostImages } from './posts/images';
import { postComment, deleteComment } from './posts/comments';
import { blur, unBlur } from './helpers';
import { getAllContacts } from './contacts/create-all-contacts';

/* global $ axios*/

$(function() {

  const state = {
    formData: ''
  };

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
  const updatePostsFromComment = (state) => {
    if($('#user-posts-tab').hasClass('active')){
      getUserPosts(state);
    } else {
        getAllPosts();
      }
  }
  
  //Store photos to upload
  $('#edit-post, #new-post').on('change', '#upload-photo', function(){
    const that = $(this);
    enterPostImages(that, state);
  });
  
  /* ========= Click Event Handlers ========= */
  
  // //remove invalid
  // $('#edit-post, #new-post').on('click', 'new-category', e => {
  //   console.log(e.currentTarget);
  //   $(e.currentTarget).removeClass('invalid');
  // });
  
  //Get all Contacts
  $('#all-contacts-tab').click(() => {
    getAllContacts();
  })
  
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
      blur();
      const newPost = { 
        subject: $('#new-subject').val(),
        body: $('textarea#new-message').val(),
        type: $('#new-category').find(':selected').text()
      }
      new Promise((resolve, reject) => {
        createNewPost(newPost, state, resolve)
      }).then(() => {
        closeSidePullOut('#new-post');
        //reset form
        form[0].reset();
        getUserPosts(state);
        unBlur();
      })
    }
  });
  
  //Delete post
  $('#edit-post').on('click', '#js-delete-post', (e) => {
    e.preventDefault();
    const id = $('.js-edit-form').attr('id');
    if (confirm("Are you sure you want to delete this post?") == true) {
      blur();
      axios.delete(`/posts/${id}`)
      .then(() => {
        getUserPosts(state);
        closeSidePullOut('#edit-post');
        unBlur();
      })
      .catch(err => console.log(err));
    } 
  })
  
  
  //Comment on post
  $('#view-post').on('click', '.js-comment-post-btn', (e) => {
    e.preventDefault();
    blur();
    const postId = $(e.currentTarget).data('id');
    const comment = $('.js-comment-field').val();
    
    new Promise((resolve, reject) => {
      postComment(postId, state, comment, resolve);
    })
    .then(() => {
      createViewPost(postId, state);
      updatePostsFromComment(state);
      unBlur();
    });
  });
  
  //Delete post Comment
  $('#view-post').on('click', '.js-delete-comment-btn', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('postId');
    const commentId = $(e.currentTarget).data('id');
    
    if (confirm("Are you sure you want to delete this comment?") == true) {
      blur();
      new Promise((resolve, reject) => {
        deleteComment(postId, commentId, resolve);
      })
      .then(() => {
        createViewPost(postId, state);
        updatePostsFromComment(state);
        unBlur();
      });
    }
  });
  
  //Delete Images
  $('#edit-post').on('click', '.delete-images', (e) => {
    e.preventDefault();
    blur();
    const postId = $(e.currentTarget).data('id');

    
    const checkedImages = $('.image-checkbox:checked').map(function() {
    return $(this).attr('id');
    }).get();
    
    new Promise( (resolve,reject) => {
      deletePostImages(postId, checkedImages, resolve)
    }).then(() => {
      getPost(postId, state, post => { createEditPostPanel(post)});
      getUserPosts(state);
      unBlur();
    });
  });
  
  //Upload Photos
  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    blur();
    const id = $(this).attr('id');
    
    uploadPostPhoto(id, state).then(() => {
      getPost(id, state, post => { createEditPostPanel(post)});
      getUserPosts(state);
      unBlur();
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

    if(validateEditPost(editSubject, editMessage, editCategory, errorMsg)) {
      editPost(editSubject, editMessage, editCategory, id, state, getUserPosts)
      closeSidePullOut('#edit-post');
    }
  });

  //Get all Users Posts
  $('#js-get-post').click(() => { getUserPosts(state) });
  //Get all posts
  $('#js-get-all-posts').click(getAllPosts);

  //Close Panel
  $(".side-pull-out").on('click', '.js-push-back', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');
    closeSidePullOut(reference);
  });

  //Open View Settings, View-Post, and Edit-Post panels
  $("main").on('click', '.js-settings, .view-post, .edit-post, .js-new-post, .js-contact-card', function(e) {
    e.preventDefault();
    let reference = $(this).attr('href');

    if($(this).hasClass('view-post')){
      let postId = $(this).attr('class').split(' ')[0];
      createViewPost(postId, state);
    }

    if($(this).hasClass('edit-post')){
      let postId = $(this).attr('class').split(' ')[0];
      getPost(postId, state, post => { createEditPostPanel(post)});
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
