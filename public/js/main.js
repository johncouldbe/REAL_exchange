import { getAllPosts } from './posts/create-all-posts';
import { getUserPosts } from './posts/create-user-posts';
import { createViewPost } from './posts/create-view-post-panel';
import { getPost, createEditPostPanel, imageDisplay } from './posts/create-edit-post-panel';
import { createNewPost } from './posts/new-post';
import { editPost, validateEditPost } from './posts/edit-post';
import { uploadPostPhoto, enterPostImages, deletePostImages } from './posts/images';
import { postComment, deleteComment } from './posts/comments';
import { blur, closeSidePullOut, getUser, materializeInitialize, openFromSide, unBlur } from './helpers';
import { getAllContacts, getUserContacts } from './contacts/create-all-contacts';
import { getContactInfo, createViewContact, getContactPosts, createContactPosts } from './contacts/create-view-contacts';

/* global $ axios*/

$(function() {

  const state = {
    formData: '',
    user: {}
  };

  getUser(state);

  materializeInitialize();

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
      getUserPosts();
    } else {
        getAllPosts();
      }
  }

  //Store photos to upload
  $('#edit-post, #new-post').on('change', '#upload-photo', function(){
    const that = $(this);
    enterPostImages(that, state);
  });

  const addContact = (id, resolve) => {
    console.log('ID IS',id);
    axios.put(`/users/add/${id}`)
    .then(() => {
      new Promise((resolve, reject) => {
        getUser(state, resolve);
      })
      .then(() => {
        getAllContacts(state);
        resolve();
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  const removeContact = (id, e, resolve) => {
    axios.put(`/users/remove/${id}`)
    .then(() => {
      new Promise((resolve, reject) => {
        getUser(state, resolve);
      })
      .then(() => {
        if($(e).closest('#user-contacts').length) {
          getUserContacts(state);
          console.log('YES!');
        } else {
          getAllContacts(state);
          console.log('NO!');
        }
        resolve();
      })
      .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
  }

  /* ========= Click Event Handlers ========= */

  // //remove invalid
  // $('#edit-post, #new-post').on('click', 'new-category', e => {
  //   console.log(e.currentTarget);
  //   $(e.currentTarget).removeClass('invalid');
  // });

  //Change users credentials
  $('#submit-credentials').click((e) => {
    e.preventDefault();
    blur();

    const credentials = {
        "bio": $('#settings-bio').val(),
        "phoneNumber": $('#settings-phone-number').val(),
        "email": $('#settings-email').val(),
        "website": $('#settings-website').val(),
    }

    axios.put(`users/current/update`, {
      data: {
        credentials
      }
    })
    .then((user) => {
      getUser(state);
      refreshUserScreen(credentials);
      closeSidePullOut('#edit-info');
      unBlur();
    })
    .catch(err => console.log(err))

    const refreshUserScreen = (credentials) => {
      $('#greeting-bio').text(`${credentials.bio}`);
      $('#greeting-phone-number').text(`${credentials.phoneNumber}`);
      $('#greeting-email').text(`${credentials.email}`);
      $('#greeting-email').attr('href', `mailto:${credentials.email}`);
      $('#greeting-website').text(`${credentials.website}`);
      $('#greeting-website').attr('href', `${credentials.website}`);
    }
  });

  //logout
  $('#logout').click((e) => {
    e.preventDefault();
    axios.get('/users/logout')
    .then(() => {
      console.log('LOGOUT');
      window.location.replace('/login');
    })
  });

  //Get all Contacts
  $('#all-contacts-tab').click(() => {
    getAllContacts(state);
  });

  //Add contact
  $('body').on('click', '.js-add-contact', (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    let id = $(target).closest('.js-contact-card').data('id');
    if(!id) {
      id = $(target).data('id');
    }
    new Promise((resolve, reject) => {
      addContact(id, resolve);
    })
    .then(() => {
      if ( $(target).is( ":button" ) ) {
        $(target).addClass('js-remove-contact red').removeClass('js-add-contact light-blue');
        $(target).text('Remove Contact');
      }
    });

  });

  //Remove contact
  $('body').on('click', '.js-remove-contact', (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    let id = $(target).closest('.js-contact-card').data('id');
    if(!id) {
      id = $(target).data('id');
    }

    new Promise((resolve, reject) => {
      removeContact(id, target, resolve);
    })
    .then(() => {
      if ( $(target).is( ":button" ) ) {
        $(target).addClass('js-add-contact light-blue').removeClass('js-remove-contact red');
        $(target).text('Add Contact');
      }
    });

  });

  //View Contact Details
  $('body').on('click', '.js-contact-card, .js-add-contact', (e) => {
    e.preventDefault();
    const id = $(e.currentTarget).data('id');
    const domNode = $(e.currentTarget).data('href');

    if(!id) return

    new Promise((resolve, reject) => {
      getContactInfo(id, domNode, state, resolve);
    })
    .then(() => {
      getContactPosts(id, domNode);
    })
    .catch(err => console.log(err))
  });

  $('body').on('click', '.js-get-user-contacts', e => {
    getUserContacts(state);

    if(!$(e.currentTarget).is('#user-contacts-tab')) {
      $('#user-contacts-tab').click();
    }
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
      blur();
      const newPost = {
        subject: $('#new-subject').val(),
        body: $('textarea#new-message').val(),
        type: $('#new-category').find(':selected').text()
      }
      new Promise((resolve, reject) => {
        createNewPost(newPost, state, resolve);
      }).then(() => {
        closeSidePullOut('#new-post');
        //reset form
        form[0].reset();
        getUserPosts();
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
        getUserPosts();
        closeSidePullOut('#edit-post');
        unBlur();
      })
      .catch(err => console.log(err));
    }
  })


  //Comment on post
  $('#view-post, #view-contact-post').on('click', '.js-comment-post-btn', (e) => {
    e.preventDefault();
    blur();
    const postId = $(e.currentTarget).data('id');
    const comment = $('.js-comment-field').val();
    const domNode = $(e.currentTarget).data('target');

    new Promise((resolve, reject) => {
      postComment(postId, state, comment, resolve);
    })
    .then(() => {
      createViewPost(postId, state, domNode);
      updatePostsFromComment(state);
      unBlur();
    });
  });

  //Delete post Comment
  $('#view-post, #view-contact-post').on('click', '.js-delete-comment-btn', (e) => {
    e.preventDefault();
    const postId = $(e.currentTarget).data('postId');
    const commentId = $(e.currentTarget).data('id');
    const domNode = $(e.currentTarget).attr('href');

    if (confirm("Are you sure you want to delete this comment?") == true) {
      blur();
      new Promise((resolve, reject) => {
        deleteComment(postId, commentId, resolve);
      })
      .then(() => {
        createViewPost(postId, state, domNode);
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
      getUserPosts();
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
      getUserPosts();
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
  $("body").on('click', '.login, .js-settings, .view-post, .edit-post, .js-new-post, .js-contact-card', function(e) {
    e.preventDefault();

    let reference = $(this).attr('href') || $(this).data('href');
    let target = $(e.target);

    if (target.hasClass('js-add-contact') || target.hasClass('js-remove-contact') ) {
        return;
    }

    if($(this).hasClass('view-post')){
      const domNode = $(this).attr('href');
      const postId = $(this).attr('class').split(' ')[0];
      createViewPost(postId, state, domNode);
    }

    if($(this).hasClass('edit-post')){
      let postId = $(this).attr('class').split(' ')[0];
      getPost(postId, state, post => { createEditPostPanel(post)});
    }



    openFromSide(reference);

  });
   $('.parallax').parallax();
});
