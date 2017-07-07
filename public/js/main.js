import { getAllPosts } from './posts/create-all-posts';
import { getUserPosts } from './posts/create-user-posts';
import { createViewPost } from './posts/create-view-post-panel';
import { createEditPostPanel } from './posts/create-edit-post-panel';
import { editPost, validateEditPost } from './posts/edit-post';

/* global $ axios*/
$(function() {

  const state = {};

  function uploadPostPhoto(id) {
    $.ajax({
      url: `/posts/upload/${id}`,
      type: 'POST',
      data: state.formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
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
  }

  $('#edit-post').on('click', '.upload-btn', function (e){
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    const id = $(this).attr('id');
    uploadPostPhoto(id);
  });

  $('#edit-post').on('change', '#upload-photo', function(){
  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    state.formData = formData;
  }
});

  function successScreen() {
    let successScreen = `
    <div class="row">
      <div class="col s12">
      <a href="#edit-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>
      <div class="row">
        <div class="col s12 full-height green">
        </div>
      </div>
    `;
    $('#edit-post').html(successScreen);
  }

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
