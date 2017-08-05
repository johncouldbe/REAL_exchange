export const getContactInfo = (id, domNode, state, resolve) => {
    axios.get(`/users/${id}`)
    .then((user) => {
        createViewContact(user, domNode, state);
        resolve();
    })
}

export const createViewContact = (_user, domNode, state) => {
    const user = _user.data.user;

    const notInUsrContact = !state.user.contacts.map(user => user.userId).includes(user._id);
    const clickHandler = notInUsrContact  ? 'js-add-contact' : 'js-remove-contact';
    const text = notInUsrContact  ? 'Add Contact' : 'Remove Contact';
    const color = notInUsrContact  ? 'light-blue' : 'red';

    const beginning = `
    <div class="row">
      <div class="col s12">
        <a href="${domNode}" class="js-push-back"><img class="pull-out-back-icon"
        src="/assets/images/arrow-right-black.svg" /></a>
      </div>
    </div>`;

    const contactInfo = `
    <div class="row">
        <div class="col s12 dont-break-on-overflow">
            <h4 class="center-align">${user.firstName} ${user.lastName}</h4>
            <h5 class="center-align">${user.company}</h5>
            <div class="col s6 offset-s3">
              <img src="https://lorempixel.com/400/400/" class="circle responsive-img" />
            </div>
            <div class="col s12">
                <p class="flow-text center-align">${user.bio}</p>
            </div>
            <div class="col s12 center">
              <button class="btn waves-effect waves-light ${clickHandler} ${color}" data-id="${user._id}"
              type="submit">${text}</button>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col s12">
            <div class="divider"></div>
        </div>
    </div>

    <div class="row">
        <div class="col s12">
                <p class="flow-text"><strong>Phone: </strong>${user.phoneNumber}</p>
                <p class="flow-text"><strong>Email: </strong>${user.email}</p>
                <p class="flow-text word-break"><strong>Website: </strong>${user.website}</p>
        </div>
    </div>`;

    $(`${domNode}`).html(beginning + contactInfo);
}

export const getContactPosts = (id, domNode) => {
  axios.get(`posts/user/${id}`)
  .then(posts => {
      createContactPosts(posts, domNode);
  })
  .catch(err => { console.log(err) })
}

export const createContactPosts = (_posts,domNode) => {
  const posts = _posts.data.posts;

  if(posts.length) {
    const beginning = `
      <div class="row">
          <div class="col s12">
              <div class="divider"></div>
          </div>
      </div>
      <div class="row">
        <div class="col s12">
          <h5 class="center-align">${posts[0].firstName}'s Posts</h5>
        </div>
      `;

    const end = `</div>`;

    let showPosts = ``;

    posts.forEach(post => {
      showPosts += `
          <div class="col s12">
            <a href="#view-contact-post" class="${post._id} js-contact-post view-post">
              <div class="card-panel grey lighten-5 z-depth-1 hovered hoverable">
                <div class="row valign-wrapper">
                  <div class="col s3">
                    <img src="${post.images.length > 0 ? post.images[0].image : '' }" alt="" class="responsive-img">
                  </div>
                  <div class="col s9">
                    <h5 class="black-text">${post.subject}</h5>
                    <h6 class="black-text">${moment(post.date).format('M/D/Y | h:mm a')}</h6>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
    });

    $(`${domNode}`).append(beginning + showPosts + end);
  }
}
