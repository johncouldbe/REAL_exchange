import { getAllPosts } from './posts/create-all-posts';
import { getUserPosts } from './posts/create-user-posts';
import { createViewPost } from './posts/create-view-post-panel';
import { createEditPostPanel } from './posts/create-edit-post-panel';
import { editPost, validateEditPost } from './posts/edit-post';
import { uploadPostPhoto, enterPhotos } from './upload-images';

/* global $ axios*/

$(function() {

  const state = {};

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

  let closeSidePullOut = (arg) => {
    $(arg).animate({
      width:"0"
    });
  }

  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    const id = $(this).attr('id');
    uploadPostPhoto(id);
  });

  $('#edit-post').on('change', '#upload-photo', function(){
    const that = $(this);
    enterPhotos(that);
});

  $('#edit-post').on('click', '#js-edit-post', function(e) {
    e.preventDefault();
    const editSubject = $('#edit-subject').val();
    const editMessage = $('textarea#edit-message').val();
    const editCategory = $('#edit-category').find(':selected').text();
    const errorMsg = 'Error:';
    const id = $('.js-edit-form').attr('id');

    if(validateEditPost(editSubject, editMessage, editCategory, errorMsg)) {
      editPost(editSubject, editMessage, editCategory, id);
    }
    closeSidePullOut('#edit-post');
  });

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
  //New Post Button Animation
  $('.new-post-button').hover(function() {
    if($(window).width() > 600){
      $('.new-post-button-container').toggleClass('elongated');
      $('.new-post-button').toggleClass('elongated-borders');
      $('.new-post-button-font').toggleClass('white-out');
    }
  });

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
