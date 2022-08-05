const leftBtn = $('.slider_box .bxs-chevron-left');
const rightBtn = $('.slider_box .bxs-chevron-right');
const imgs = $('.banner .banner_imgs img');

let imgNum = 0;

const bannerEnterHander = ()=>{
    $('.slider_box').removeClass('show_slider_box');
    clearInterval(autoSliderImg);
};
const bannerLeaveHander = ()=>{
    $('.slider_box').addClass('show_slider_box');
    autoSliderImg = setInterval(() => {
        imgNum =imgNum >= imgs.length-1 ? 0 : imgNum+1;
        sliderImgHandle();
    }, 3000);
};

$('.banner').on('mouseenter', bannerEnterHander);
$('.banner').on('mouseleave', bannerLeaveHander);

// click arrow event
const sliderImgHandle = ()=>{
        let length = imgNum;
        $(imgs).each((i, img)=>{
            $(img).removeClass();
            $(img).addClass(`imgSlider${length+1}`);
            length = length+1 > 6 ? 0 : length+1;
        })
}
const clickLeftHandle = ()=>{
    imgNum = imgNum <= 0 ? 6 : imgNum-1;
    sliderImgHandle();
};
const clickRightHandle = ()=>{
    imgNum =imgNum >= imgs.length-1 ? 0 : imgNum+1;
    sliderImgHandle();
}

leftBtn.on('click', clickLeftHandle);
rightBtn.on('click', clickRightHandle);

let autoSliderImg = setInterval(() => {
    imgNum =imgNum >= imgs.length-1 ? 0 : imgNum+1;
    sliderImgHandle();
}, 4000);



