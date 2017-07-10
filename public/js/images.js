const state = {};

export const uploadPostPhoto = id => {
  $.ajax({
    url: `/posts/image/upload/${id}`,
    type: 'POST',
    data: state.formData,
    processData: false,
    contentType: false,
    success: function(data){
        console.log('upload successful!\n' + data);
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
}

export const enterPostPhotos = arg => {
  var files = arg.get(0).files;
  console.log(`Files: ${files}`);
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(`File loop: ${file}`);
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    state.formData = formData;
  }
}

export const deletePostImages = (post, image) => {
  axios.put(`/posts/image/delete/${post}`, {
    data: {
      'signature': image
    }
  })
  .then( () => {
    console.log('Deleted Image(s)');
  })
  .catch( err => {
    console.log(err);
  });
};
