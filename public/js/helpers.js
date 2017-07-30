export const commentCount = (post) => {
   if(post.comments.length > 0) {
        const plural = post.comments.length == 1 ? '' : 's';
        return `<span class="left">${post.comments.length} comment${plural}</span>`; 
    } else {
        return '';
    }
}

export const loader = `
    <div class="loader" id="loader-4">
      <span></span>
      <span></span>
      <span></span>
    </div>`;
 
export const blur = () => {
    $('.js-blur').addClass('blur') 
    $('.loader-container').removeClass('hidden');
};
 
export const unBlur = () => {
    $('.js-blur').removeClass('blur') 
    $('.loader-container').addClass('hidden');
};
 