
export const getAllContacts = (state) => {
  axios.get('/users/')
  .then((users) => {
      createAllContacts(users, '#all-contacts', state)})
  .catch(err => { console.log(err) })
}

export const getUserContacts = (state) => {
  axios.get('/users/current/contacts')
  .then(contacts => {
    createAllContacts(contacts, '#user-contacts', state);
  })
}

//

export const createAllContacts = (users, domNode, state) => {
    const beginning = '<div class="row">';
    const end = '</div>';
    let contactList = '';

    if(!users.data.users.length > 0) {
      contactList += `
      <div class="col s12">
        <h2 class="grey-text">You don't have any contacts yet...</h2>
      </div`
    }
    else {
      users.data.users.forEach((user) => {
        const notInUsrContact = !state.user.contacts.map(user => user.userId).includes(user._id);
        const clickHandler = notInUsrContact  ? 'js-add-contact' : 'js-remove-contact';
        const icon = notInUsrContact  ? 'add' : 'check';
        const iconColor = notInUsrContact  ? 'icon-blue' : 'icon-green';
        const toolTip = notInUsrContact  ? 'Click to add to your contacts' : 'Click to remove from your contacts'

        contactList += `
          <div class="col s12 m6 l4">
            <div data-href="#view-contact" class="js-contact-card" data-id="${user._id}">
              <div class="card-panel grey lighten-5 z-depth-1 height-115 hovered hoverable">
                <i class="small material-icons ${iconColor} hovered right ${clickHandler} tooltipped" data-position="top" data-delay="50" data-tooltip="${toolTip}">${icon}</i>
                <div class="row valign-wrapper">
                  <div class="col s3">
                    <img src="${user.profilePic}" alt="" class="circle responsive-img">
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
    }

    $(domNode).html(beginning + contactList + end);
    $('.tooltipped').tooltip({delay: 50});

}
