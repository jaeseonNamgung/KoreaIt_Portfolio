const getBooksAPI = async (queryType, MaxResults, start) => {
  const URL = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbsunnamgung1544001&QueryType=${queryType}&MaxResults=${MaxResults}&start=${start}&SearchTarget=book&output=js&Version=20131101`;
  try {
    const bookDatas = await fetch(URL);
    const datas = await bookDatas.json();
    const data = datas.item;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const categorieList = [
  {
    id: "ItemNewAll",
    categorie: "신간 전체 리스트",
  },
  {
    id: "ItemNewSpecial",
    categorie: "주목할 만한 신간 리스트",
  },
  {
    id: "Bestseller",
    categorie: "베스트셀러",
  },
  {
    id: "BlogBest",
    categorie: "블로거 베스트셀러 (국내도서만 조회 가능)",
  },
];
const article1 = $("article:nth-child(1)");
const imgList = $("article:nth-child(1) .categories_box ul");
let categories = $(".categories_box ul");
let categoriesBox = $(".categories_box");
let recommendBooksBox = $(".recommend_books_box");
let recommendBooksImg;
let h2Title;
let img;
let id;
let bookDatas;
let pagiNationBookDatas;
let pagiNationBox = $('article:nth-child(1) .pagiNation_box')
let pagiNationUl = $('article:nth-child(1) .pagiNation_box ul');
let pagiNationLi;

const pagiNationHandle = (pagiNationBookDatas)=>{
  let pagiCount = Math.ceil(pagiNationBookDatas.length/8);

  for(let i = 0; i<pagiCount; i++){
    pagiNationLi = $(`<li>${i+1}</li>`);
    pagiNationUl.append(pagiNationLi);  
  } 
  pagiNationBox.append(pagiNationUl);
  article1.append(pagiNationBox);
}
const imgHandle = async(target,queryType, MaxResults, start)=>{
  console.log("target: ", target)
  try {
    bookDatas = await getBooksAPI(queryType, MaxResults, start);
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
    let title = bookData.title.length < 20 ?bookData.title:(bookData.title.slice(0, 13)+'...');
    h2Title = $(`<h2>${title}</h2>`);
    recommendBooksImg.append(img);
    recommendBooksImg.append(h2Title);
    recommendBooksBox.append(recommendBooksImg);
  });
  article1.append(recommendBooksBox);
}
$(async function () {
  // imgHandle(tempLi,"ItemNewAll", 8, 1);
  categorieList.forEach((categorie) => {
    categories.append($(`<li>${categorie.categorie}</li>`));
    
  });
  categoriesBox.append(categories);
  article1.append(categoriesBox);

  $('article:nth-child(1) .pagiNation_box ul').trigger('cilck');
  
});

const clickImgHandle =  (e) => {
  console.log(e.target)
  categorieList.forEach(async (categorie) => {
    if (categorie.categorie !== e.target.innerHTML) return;
    imgHandle(e.target,categorie.id, 8, 1);
  });
  

};

const clickPagiHandle = (e)=>{
  if(e.target.tagName !== 'LI') return;
}
imgList.on("click", clickImgHandle);
pagiNationUl.on('click', clickPagiHandle);


const menuList = $("article:nth-child(2)>.sub_article>.menu_click_box ul li");
const textBox = $("article:nth-child(2)>.sub_article>.text_container>div");
const clickMenuListHandle = (e) => {
  $(menuList).removeClass("article_click_menu");
  $(e.currentTarget).addClass("article_click_menu");
  let listIndex = $(e.currentTarget).index();
  console.log(textBox[listIndex]);
  textBox.addClass("hideBox");
  textBox.eq(listIndex).removeClass("hideBox");
};
menuList.on("click", clickMenuListHandle);
