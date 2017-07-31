export const getAllContacts = () => {
  axios.get('/users')
  .then((users) => { 
      console.log(users);
      createAllContacts(users)})
  .catch(err => { console.log(err) })
}

export const createAllContacts = (users) => {
    const beginning = '<div class="row">';
    const end = '</div>';
    let contactList = '';
    
    users.data.users.forEach((user) => {
        contactList += `
          <div class="col s12 m6 l4">
            <a href="#view-contact" class="js-contact-card" data-id="${user._id}">
              <div class="card-panel grey lighten-5 z-depth-1 height-115 hovered">
                <i class="small material-icons icon-blue hovered right">add</i>
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
            </a>
          </div>`;
    });
    
    $('#all-contacts').html(beginning + contactList + end);
      
}