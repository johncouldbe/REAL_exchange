export function editPost(subject, message, category, id, cb) {
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

export function validateEditPost(subject, message, category, err) {
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
