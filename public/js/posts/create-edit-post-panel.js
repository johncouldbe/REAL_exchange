const imageDisplay = (post) => {
    let str = '<form action="#" class="col s12">';
    for (let i = 0; i < post.data.post.images.length; i++) {
      str +=`
        <p>
          <input type="checkbox" id="${post.data.post.images[i].signature}" />
          <label for="Image ${i}">${post.data.post.images[i].imageName}</label>
        </p>
      `;
    }
    str += `</form>`

    return str;
}

export const createEditPostPanel = arg => {
  axios.get(`/posts/${arg}`)
  .then( post => {
    let editPost = `
    <div class="row">
      <div class="col s12">
      <a href="#edit-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>

    <div class="row center">
      <h5>Images</h5>
    `;

    if(post.data.post.images.length > 0){
      editPost += imageDisplay(post);
    }

    editPost += `
      <form action="#" class="col s12">
        <div class="file-field input-field">
          <div class="btn light-blue">
            <span>Find</span>
            <input id="upload-photo" name="uploads[]" type="file" multiple>
          </div>
          <div class="file-path-wrapper">
          <input class="file-path validate" type="text" placeholder="Upload one or more files">
          </div>
        </div>
        <div class="progress col s12">
          <div class="determinate progress-bar" ></div>
        </div>
          <button class="btn light-blue upload-btn" type="button" id="${post.data.post._id}">Upload</button>
      </form>
    </div>

    <div class="row center">
      <div class="divider"></div>
      <h5>Post</h5>
      <form class="col-s12 js-edit-form" id="${post.data.post._id}">
        <div class="row">
          <div class="input-field col s12">
            <input id="edit-subject" type="text" value="${post.data.post.subject}">
            <label class="active" for="subject">Subject</label>
          </div>
          <div class="input-field col s12 m6">
            <select id="edit-category">
              <option value="" disabled selected>Choose your category</option>
              <option value="1">Wanted</option>
              <option value="2">Available</option>
              <option value="3">Announcement</option>
            </select>
            <label>Materialize Select</label>
          </div>
          <div class="input-field col s12">
            <textarea id="edit-message" class="materialize-textarea">${post.data.post.body}</textarea>
            <label for="icon_prefix2" class="active">Message</label>
          </div>
        </div>
      </div>
      <div class="col s6">
        <button class="right btn waves-effect waves-light red" type="submit" id="js-delete-post">Delete</button>
      </div>
      <div class="col s6">
        <button class="left btn waves-effect waves-light light-blue" type="submit" id="js-edit-post">Submit</button>
      </div>
      </form>
      <div class="row">
    </div>
    `;
    $('#edit-post').html(editPost);

    $('select').material_select();
  })
  .catch(err => console.log(err));
}
