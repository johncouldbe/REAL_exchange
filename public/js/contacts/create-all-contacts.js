
export const getAllContacts = (state) => {
  axios.get('/users')
  .then((users) => {
      console.log("USERS",users);
      createAllContacts(users, '#all-contacts', state)})
  .catch(err => { console.log(err) })
}

export const getUserContacts = (state) => {
  axios.get('users/current/contacts')
  .then(contacts => {
    createAllContacts(contacts, '#user-contacts',state);
  })
}

//

export const createAllContacts = (users, domNode, state) => {
    const beginning = '<div class="row">';
    const end = '</div>';
    let contactList = '';

    users.data.users.forEach((user) => {
        const notInUsrContact = !state.user.contacts.map(user => user.userId).includes(user._id);
        const clickHandler = notInUsrContact  ? 'js-add-contact' : 'js-remove-contact';
        const icon = notInUsrContact  ? 'add' : 'remove';
        const iconColor = notInUsrContact  ? 'icon-blue' : 'icon-red';

        contactList += `
          <div class="col s12 m6 l4">
            <div data-href="#view-contact" class="js-contact-card" data-id="${user._id}">
              <div class="card-panel grey lighten-5 z-depth-1 height-115 hovered">
                <i class="small material-icons ${iconColor} hovered right ${clickHandler}" >${icon}</i>
                <div class="row valign-wrapper">
                  <div class="col s3">
                    <img src="https://lorempixel.com/400/400/" alt="" class="circle responsive-img">
                  </div>
                  <div class="col s9">
                    <h5 class="black-text">${user.firstName} ${user.lastName}</h5>
                    <h6 class="black-text truncate">${user.company}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    });

    if(!users.data.users.length > 0) {
      contactList += `<h2 class="grey-text">You don't have any contacts yet...</h2>`
    }

    $(domNode).html(beginning + contactList + end);


    // //
    // if(domNode == '#user-contacts') {
    //   $('#user-contacts-tab').click();
    // }

}
