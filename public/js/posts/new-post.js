    //Create new post
  export const createNewPost = (newPost, state, resolve) => {
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
