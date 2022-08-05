const menuEnter = $("header .header_menu_box ul li a");
menuEnterHandle = (e) => {
  const target = e.currentTarget;
    $(target).addClass("mouseMove");

};
menuLeaveHandle = (e) => {
    $(e.currentTarget).removeClass("mouseMove");
};

menuEnter.on("mouseleave", menuLeaveHandle);


// input click event
// const searchCancelHandle = () => {
//   $(".header .header_search_box input").val("");
// };
// const bodyClickHandle = (e) => {
//   if ($(e.target).attr("name") !== "search") {
//     $(".bx-search").css("display", "block");
//     $(".header .header_search_box input").removeClass("showInput");
//     $(".header .header_search_box .bx-x").css("display", "none");
//     return;
//   } else {
//     $(".bx-search").css({ display: "none" });
//     $(".header .header_search_box input").addClass("showInput");
//     $(".header .header_search_box .bx-x").css("display", "block");
//   }
// };
// $(".bx-x").on("click", searchCancelHandle);
// $("body").on("click", bodyClickHandle);

// subMenu
const menu = $(".header_menu_box ul li");
const subMenuBox = $('.header_subMenu_box');
const subMenuUl = $(".header_subMenu_box ul");
let subMenuKey;
const subMenuHandle = (subMenuKey) => {
  subMenuUl.children().remove();
  subMenus[subMenuKey].forEach((bookItem) => {
    let li = $(`<li>${bookItem}</li>`);
    subMenuUl.append(li);
  });
};


const menuMouseenterHandle = (e) => {
  subMenuKey = $(e.currentTarget).children().attr("name");
  if(subMenuKey === undefined) return;
  subMenuBox.addClass('mouseEnter');
  subMenuBox.on('mouseenter', ()=>subMenuBox.addClass('mouseEnter'));
  subMenuHandle(subMenuKey);
  menuEnter.on("mouseenter", menuEnterHandle);
};
const menuMouseLeaveHandle = ()=>{
  subMenuBox.removeClass('mouseEnter');
  subMenuBox.on('mouseleave', ()=> subMenuBox.removeClass('mouseEnter'));
 
}



menu.on("mouseenter", menuMouseenterHandle);
menu.on('mouseleave',menuMouseLeaveHandle );

// subLogin
const hoverUser = $('.header_searchAndMenu_box .bx-user');
const loginBox = $('.header .header_login_box');
const hoverUserHandle = (e)=>{
  console.log(e.currentTarget)
  hoverUser.css('height', '0');
  loginBox.css({'height': '100%','paddingTop':'10px'});
}
const loginBoxLeaveHandle = ()=>{
  hoverUser.css({'height': '40px', 'transitionDuration': '1.1s'});
  loginBox.css({'height': '0%', 'padding':'0'});
}
loginBox.on('mouseleave', loginBoxLeaveHandle);

hoverUser.on('mouseenter', hoverUserHandle);

const arodianMenu = $('.header_arcodian_menu_box');
const headerCenterBox = $('.header_center_box');
const headerMenuBox = $('.header .header_menu_box')
const arodianMenuMouseEnter =(e)=>{
  if($(e.currentTarget).css('display') !== 'block') return;

  headerMenuBox.css({'height': '180px', 'padding':'5px'})
}
const allMenuLeaveHandle = (e)=>{
  console.log($(e.currentTarget).children())
  headerMenuBox.css({'height': '0', 'padding':'0','boxShadow':'none'})
}
headerCenterBox.on('mouseleave', allMenuLeaveHandle)
arodianMenu.on('mouseenter', arodianMenuMouseEnter)
