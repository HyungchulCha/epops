function mCollectionSlide() {

  var status = sCheck();
  var mcSlide = undefined;

  if ((status === 't' || status == 'm') && mcSlide === undefined) {
    mcSlide = new Swiper('.m_collection .mc_list', {
        wrapperClass: "s_w",
        slideClass: "sw_l",
        slidesPerView: "auto",
        nested: true,
        freeMode: true
    });
  }

  $(window).on('resize', $.debounce(80, function(){

    var status = sCheck();

    if (status === 't' || status == 'm') {
        if (mcSlide !== undefined) {
            return;
        } else {

          mcSlide = new Swiper('.m_collection .mc_list', {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
          });

        }
    } else {
        if (mcSlide === undefined) {
            return;
        } else {
            mcSlide.destroy(true, true);
            mcSlide = undefined;
        }
    }

}));
  
}

$(function(){
  fnSlide({ dom: '.m_visual_slide', loop: true, auto: true});
  afterHasCheck('.m_visual_slide .sw_l a', domRatio, true, (1/3));
  mCollectionSlide();
});