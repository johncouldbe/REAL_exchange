export const imageDisplay = post => {
    console.log(post);
    let str = '<form action="#" class="col s12 light-blue lighten-5 images-form" style="position:relative;">';
    for (let i = 0; i < post.data.post.images.length; i++) {
      str +=`
        <p class="checkbox-container">
          <input type="checkbox" class="image-checkbox" id="${post.data.post.images[i].publicId}" />
          <label class="black-text" for="${post.data.post.images[i].publicId}">
          ${post.data.post.images[i].imageName}</label>
        </p>
      `;
    }

    str += `
      <p><a class="red-text delete-images hovered" data-id="${post.data.post._id}" >Delete selected</a></p>
    </form>`;
    return str;
}

export const getPost = (arg, state, cb) => {
  axios.get(`/posts/${arg}`)
  .then(post => {
    state.post = post;
    cb(post);
    })
  .catch(err => console.log(err));
}

export const createEditPostPanel = post => {
    let editPost = `
    <div class="row">
      <div class="col s12">
      <a href="#edit-post" class="js-push-back"><img class="pull-out-back-icon"  src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>

    <div class="row center">
      <h5>Images</h5>
      <div class="image-list">
    `;

    if(post.data.post.images.length > 0){
      editPost += imageDisplay(post);
    }

    editPost += `
      </div>
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
      <h5>Post</h5>
      <form class="col-s12 js-edit-form" id="${post.data.post._id}">
        <div class="row">
          <div class="input-field col s12">
            <input id="edit-subject" type="text" value="${post.data.post.subject}" data-error="wrong" class="validate" required aria-required="true">
            <label class="active" for="edit-subject">Subject</label>
          </div>
          <div class="input-field col s12 m6">
            <select id="edit-category" class="validate" required>
              <option value="" disabled selected>Choose your category</option>
              <option value="1">Wanted</option>
              <option value="2">Available</option>
              <option value="3">Announcement</option>
            </select>
            <label>Materialize Select</label>
          </div>
          <div class="input-field col s12">
            <textarea id="edit-message" class="materialize-textarea" class="validate">${post.data.post.body}</textarea>
            <label for="icon_prefix2" class="active">Message</label>
          </div>
        </div>
        <div class="col s6">
         <button class="right btn waves-effect waves-light red" type="submit" id="js-delete-post">Delete</button>
        </div>
        <div class="col s6">
          <button class="left btn waves-effect waves-light light-blue" type="submit" id="js-edit-post">Submit</button>
        </div>
      </form>
      <div class="row"></div>
    </div>
    `;
    $('#edit-post>.js-blur').html(editPost);

    $('select').material_select();
  }