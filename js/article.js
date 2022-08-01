const getBooksAPI = async (queryType, searchTarget, maxResults, start) => {
  const URL = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbsunnamgung1544001&QueryType=${queryType}&MaxResults=${maxResults}&Start=${start}&SearchTarget=${searchTarget}&output=js&Version=20131101`;
  try {
    const bookDatas = await fetch(URL);
    const datas = await bookDatas.json();
    const data = datas;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const categorieList = [
  {
    id: "Book",
    categorie: "도서",
  },
  {
    id: "Foreign",
    categorie: "외국도서",
  },
  {
    id: "Music",
    categorie: "음반",
  },
  {
    id: "DVD",
    categorie: "DVD",
  },
  {
    id: "eBook",
    categorie: "전자책",
  },
];
const article1 = $("article:nth-child(1)");
const imgList = $("article:nth-child(1) .categories_box ul");
let target;
let queryType;
let searchTarget;
let maxResults;
let start;

let categories = $(".categories_box ul");
let categoriesBox = $(".categories_box");
let recommendBooksBox = $(".recommend_books_box");
let recommendBooksImg;
let h2Title;
let img;
let id;
let bookDatas;
let pagiNationBookDatas;
let pagiNationBox = $("article:nth-child(1) .pagiNation_box");
let pagiNationUl = $("article:nth-child(1) .pagiNation_box ul");
let pagiNationLi;
let checkPageLoading = true;

const pagiNationHandle = (pagiNationBookDatas) => {
  let pagiCount = Math.ceil(pagiNationBookDatas.length / 8);
  pagiNationUl.children().remove();
  for (let i = 0; i < pagiCount; i++) {
    pagiNationLi = $(`<li>${i + 1}</li>`);
    pagiNationUl.append(pagiNationLi);
  }
  pagiNationBox.append(pagiNationUl);
  article1.append(pagiNationBox);
};

const imgHandle = async (
  target,
  queryType,
  searchTarget,
  maxResults,
  start
) => {
  try {
    bookDatas = await getBooksAPI(queryType, searchTarget, maxResults, start);
    bookDatas = bookDatas.item;
  } catch (error) {
    console.log(error);
  }

  $(".recommend_books_img").remove();
  $("article:nth-child(1) .categories_box ul li").removeClass();
  $(target).addClass("clickList");
  bookDatas.forEach((bookData) => {
    recommendBooksImg = $("<div></div>").attr("class", "recommend_books_img");
    img = $("<img>").attr({
      src: bookData.cover,
      class: "recomend_img_book",
    });
    let title =
      bookData.title.length < 20
        ? bookData.title
        : bookData.title.slice(0, 13) + "...";
    h2Title = $(`<h2>${title}</h2>`);
    recommendBooksImg.append(img);
    recommendBooksImg.append(h2Title);
    recommendBooksBox.append(recommendBooksImg);
  });
  article1.append(recommendBooksBox);
  if (!checkPageLoading) return;
  try {
    bookDatas = await getBooksAPI(queryType, searchTarget, 100, 1);
    bookDatas = bookDatas.item;
    pagiNationHandle(bookDatas);
  } catch (error) {
    console.log(error);
  }
};
$(async function () {
  categorieList.forEach((categorie) => {
    categories.append($(`<li>${categorie.categorie}</li>`));
  });
  categoriesBox.append(categories);
  article1.append(categoriesBox);
  $(categories).children().first().trigger("click");
});

const clickImgHandle = (e) => {
  categorieList.forEach(async (categorie) => {
    if (categorie.categorie !== e.target.innerHTML) return;
    queryType = "ItemNewAll";
    target = e.target;
    searchTarget = categorie.id;
    maxResults = 8;
    start = 1;
    imgHandle(target, queryType, searchTarget, maxResults, start);
  });
};

const clickPagiHandle = (e) => {
  if (e.target.tagName !== "LI") return;

  $(pagiNationUl).children().removeClass("pagiClick");
  $(e.target).addClass("pagiClick");
  maxResults = 8;
  start = e.target.innerHTML * 8 - 8 + 1;
  checkPageLoading = false;
  imgHandle(target, queryType, searchTarget, maxResults, start);
};
imgList.on("click", clickImgHandle);
pagiNationUl.on("click", clickPagiHandle);

// article2
const bestseller_title = $(".bestseller_title_box");
const bestseller_table = $(".bestseller_table_box table");

$(function () {
  bestsellerHandle();
});
let i = 0;
const bestsellerHandle = async() => {
  console.log(i);
  console.log( bestseller_table.children())
  bestseller_title.children().remove();
  bestseller_table.children().remove();
  let datas;
  queryType = "Bestseller";
  searchTarget = categorieList[i].id;
  start = 1;
  maxResults = 8;

  try {
    datas = await getBooksAPI(queryType, searchTarget, maxResults, start);
  } catch (error) {
    console.log(error);
  }
  bestseller_title.append(`<h1>${datas.title}</h1>`);
  let bookTitle;
  let reviewRank;
  let tableTr;
  datas.item.forEach((data, i) => {
    tableTr = $('<tr></tr>');
    bookTitle = $(`<td>${data.title.length<50?data.title:data.title.slice(0,50)+'...'}</td>`);
    reviewRank = $(`<td>평점: ${data.customerReviewRank}</td>`);
    tableTr.append(bookTitle);
    tableTr.append(reviewRank);
    bestseller_table.append(tableTr);
  });
  i = (i + 1) % categorieList.length;
};

let bestsellerInterval = setInterval(() => {
  bestsellerHandle();
}, 10000);

// article3
const menuList = $("article:nth-child(3)>.sub_article>.menu_click_box ul li");
const textBox = $("article:nth-child(3)>.sub_article>.text_container>div");
const clickMenuListHandle = (e) => {
  $(menuList).removeClass("article_click_menu");
  $(e.currentTarget).addClass("article_click_menu");
  let listIndex = $(e.currentTarget).index();
  textBox.addClass("hideBox");
  textBox.eq(listIndex).removeClass("hideBox");
};
menuList.on("click", clickMenuListHandle);
