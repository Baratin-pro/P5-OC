/*
*    Location : products list in the DOM
*/
const locationProductList = document.getElementById("teddies");
/*
*    Function : add the element and their children(if present) in the DOM 
*/
function appendDOM(elementParent,element,...moreArguments){
  elementParent.appendChild(element);
  for(let i = 0; i < moreArguments.length; i++){
    if(moreArguments[i]){
      element.appendChild(moreArguments[i]);
    }
  }
}
/*
*   Function : creation of the products list in the DOM
*/
export default function createProductList(data){
  for(let i = 0; i < data.length; i++){
//Creation : blog articles
    const listArticle = document.createElement("article");
      listArticle.id = data[i]._id;
      listArticle.className = "col-12 col-sm-5 col-md-3 col-lg-2 m-auto m-sm-3 p-3 border rounded shadow-lg bg-white";
//Creation : H2
    const articleTitle = document.createElement("h2");
      articleTitle.innerHTML = data[i].name;
      articleTitle.className = "text-center h4 text-nowrap";
//Creation : blog images
    const articleContainerImg = document.createElement("div");
      articleContainerImg.className= " col-5 col-sm-8 col-md-10 h-50 mx-auto";
//Creation : image
    const articleImg = document.createElement("img");
      articleImg.src = data[i].imageUrl;
      articleImg.alt = "Peluche d'ourson nommée " + data[i].name + " vendu par l'entreprise Orinoco";
      articleImg.className = "w-100 h-100";
//Creation : paragraph articlePrice
    const articlePrice = document.createElement("p");
      articlePrice.innerHTML = (data[i].price/100) + " €";
      articlePrice.className = "text-right font-weight-bold";
//Creation : button
    const articleFormBtn = document.createElement('form');
      articleFormBtn.method = "GET";
      articleFormBtn.action = "product.html#" + data[i]._id;
    const articleBtn = document.createElement("input");
      articleBtn.type = "submit";
      articleBtn.value = "Description";
      articleBtn.className = "btn btn-dark w-100 mb-4";
//Add the elements in the DOM
    if(locationProductList){
      appendDOM(locationProductList,listArticle,articleTitle,articleContainerImg,articlePrice,articleFormBtn);
      appendDOM(articleContainerImg,articleImg);
      appendDOM(articleFormBtn,articleBtn);
    }
  } 
}