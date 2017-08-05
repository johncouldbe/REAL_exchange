export const postComment = (arg, state, comment, resolve) => {
    axios.put(`/posts/comment/${arg}`, {
      data: {
        "firstName": state.user.firstName,
        "lastName": state.user.lastName,
        "userId": state.user._id,
        "body": comment,
        "date": new Date()
      } 
    }).then(() => {
      resolve();
    })
    .catch(err => console.log(err));
  }
  
  export const deleteComment = (postId, commentId, resolve) => {
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
  
  