const menuEnter = $("header ul li a");
menuEnterHandle = (e) => {
  const target = e.currentTarget;
  if (target.innerHTML === "로그인" || target.innerHTML === "회원가입") {
    $(target).parent().addClass("mouseMove");
    $(target).css({ color: "#fff" });
  } else {
    $(target).addClass("mouseMove");
  }
};
menuLeaveHandle = (e) => {
  const target = e.currentTarget;
  if (target.innerHTML === "로그인" || target.innerHTML === "회원가입") {
    $(target).parent().removeClass("mouseMove");
    $(target).css({ color: "#000" });
  } else {
    $(e.currentTarget).removeClass("mouseMove");
  }
};

menuClickHandle = (e) => {
  const target = e.currentTarget;
  if (target.innerHTML === "로그인" || target.innerHTML === "회원가입") {
    $(target).css({ color: "#fff", transitionDuration: "0.3s" });
  } else {
    $("header ul li a").removeClass("clickMenu");
    $(target).addClass("clickMenu");
  }
};

menuEnter.on("mouseenter", menuEnterHandle);
menuEnter.on("mouseleave", menuLeaveHandle);
menuEnter.on("click", menuClickHandle);

// input click event
const searchCancelHandle = () => {
  $(".header .header_search_box input").val("");
};
const bodyClickHandle = (e) => {
  if ($(e.target).attr("name") !== "search") {
    $(".bx-search").css("display", "block");
    $(".header .header_search_box input").removeClass("showInput");
    $(".header .header_search_box .bx-x").css("display", "none");
    return;
  } else {
    $(".bx-search").css({ display: "none" });
    $(".header .header_search_box input").addClass("showInput");
    $(".header .header_search_box .bx-x").css("display", "block");
  }
};
$(".bx-x").on("click", searchCancelHandle);
$("body").on("click", bodyClickHandle);


// subMenu
const subMenuUl = $('.header_subMenu_box ul');
const menu = $('.header_menu_box ul li');
$(function(){
  cate.book.forEach(bookItem=>{
    let li = $(`<li>${bookItem}</li>`);
    subMenuUl.append(li);
  })
})

const menuMouseenterHandle = (e)=>{
console.log($(e.currentTarget).children().attr('name'))
}
menu.on('mouseenter', menuMouseenterHandle)