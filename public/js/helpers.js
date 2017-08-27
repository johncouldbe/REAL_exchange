export const blur = () => {
    $('.js-blur').addClass('blur')
    $('.loader-container').removeClass('hidden');
};

export const commentCount = (post) => {
   if(post.comments.length > 0) {
      const plural = post.comments.length == 1 ? '' : 's';
      return `<span class="left">${post.comments.length} comment${plural}</span>`;
    } else {
      return '';
    }
}

//Close Panel
export const closeSidePullOut = (arg) => {
  $(arg).animate({
    width:"0"
  });
  $('body').removeClass('no-scroll');
}

export const getUser = (state, resolve) => {
  axios.get(`/users/current`)
  .then( user => {
    state.user = user.data.user;

    if(resolve) {
      resolve();
    }
  })
  .catch( err => { console.log(err) })
}

//Open panel
export const openFromSide = (arg) => {

  if($(window).width() < 601 || arg =='#login'){
    $(arg).animate({
      width:"100vw"
    });
  } else {
    $(arg).animate({
      width:"50vw"
    });
  }
  $('body').addClass('no-scroll');
}

export const materializeInitialize = () => {
  //Association Dropdown
  $(".dropdown-button").dropdown();
  //New Post Category Initialized
  $('select').material_select();
}

export const unBlur = () => {
    $('.js-blur').removeClass('blur')
    $('.loader-container').addClass('hidden');
};
