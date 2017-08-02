
export const getAllContacts = (state) => {
  axios.get('/users')
  .then((users) => {
      console.log(users);
      createAllContacts(users, '#all-contacts', state)})
  .catch(err => { console.log(err) })
}

export const getUserContacts = (state) => {
  console.log('WORKING');
  axios.get('users/current/contacts')
  .then(contacts => {
    createAllContacts(contacts, '#user-contacts',state)
  })
}

export const createAllContacts = (users, domNode, state) => {
    const beginning = '<div class="row">';
    const end = '</div>';
    let contactList = '';

    console.log("USERS", users);
    console.log("STATE", state);

    users.data.users.forEach((user) => {
        const clickHandler = domNode == '#all-contacts' ? 'js-add-contact' : 'js-minus-contact';
        const notInUsrContact = !state.user.contacts.map(user => user.userId).includes(user._id);
        console.log("USER ID: ",user._id);
        console.log("STATE CONTACTS", state.user.contacts);
        console.log(notInUsrContact);
        const icon = notInUsrContact  ? 'add' : 'remove';

        contactList += `
          <div class="col s12 m6 l4">
            <div data-href="#view-contact" class="js-contact-card" data-id="${user._id}">
              <div class="card-panel grey lighten-5 z-depth-1 height-115 hovered">
                <i class="small material-icons icon-blue hovered right ${clickHandler}" >${icon}</i>
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

    $(domNode).html(beginning + contactList + end);

}
