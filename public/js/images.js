let formData = '';

export const uploadPostPhoto = id => {
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

export const enterPostImages = arg => {
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

export const deletePostImages = (postId, images, resolve) => {
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
