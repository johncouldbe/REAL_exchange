import { getAllPosts } from './posts/create-all-posts';
import { getUserPosts } from './posts/create-user-posts';
import { createViewPost } from './posts/create-view-post-panel';
import { getPost, createEditPostPanel, imageDisplay } from './posts/create-edit-post-panel';
import { editPost, validateEditPost } from './posts/edit-post';
import { uploadPostPhoto, enterPostImages, deletePostImages } from './posts/images';
import { postComment, deleteComment } from './posts/comments';

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
      createViewPost(postId, state);
      if($('#user-posts-tab').hasClass('active')){
        getUserPosts(state);
      } else {
        getAllPosts();
      }
    });
  });
  
  //Delete post Comment
  $('#view-post').on('click', '.js-delete-comment-btn', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('postId');
    const commentId = $(e.currentTarget).data('id');
    
    new Promise((resolve, reject) => {
      deleteComment(postId, commentId, resolve);
    })
    .then(() => {
      createViewPost(postId, state);
      if($('#user-posts-tab').hasClass('active')){
        getUserPosts(state);
      } else {
        getAllPosts();
      }
    });
  });
  
  //Delete Images
  $('#edit-post').on('click', '.delete-images', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('id');
    const checkedImages = $('.image-checkbox:checked').map(function() {
    return $(this).attr('id');
    }).get();
    
    new Promise( (resolve,reject) => {
      deletePostImages(postId, checkedImages, resolve)
    }).then(() => {
      getPost(postId, state, post => { createEditPostPanel(post)});
      getUserPosts(state);
    });
  });
  
  //Upload Photos
  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    const id = $(this).attr('id');
    uploadPostPhoto(id).then(() => {
      getPost(id, state, post => { createEditPostPanel(post)});
      getUserPosts(state);
    })
  });

  //Store photos to upload
  $('#edit-post').on('change', '#upload-photo', function(){
    const that = $(this);
    enterPostImages(that);
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
  $("main").on('click', '.js-settings, .view-post, .edit-post', function(e) {
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

  //Close Panel
  let closeSidePullOut = (arg) => {
    $(arg).animate({
      width:"0"
    });
  }

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
