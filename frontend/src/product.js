/* ****************Cart*****************
*
*    Toggle : product list in the cart
*    ProductList : location products list in the cart
*/
const cart = document.getElementById("cart");
const productList = document.querySelector("div .dropdown-menu");
/*
*    Function : add the element and their children(if present) in the DOM 
*/
function appendDOM(elementParent,element,...moreArguments){
  elementParent.appendChild(element);
  for(let i = 0; i < moreArguments.length; i++) {
    if(moreArguments[i]){
      element.appendChild(moreArguments[i]);
    }
  }
}
/*
*   Function : toggle the visibility of items in the cart list
*/
//The nrbclick control the stages of the cart visibility and the creation of its elements
let nbrclick ="";
export function toggleVisibilityCart(){
  nbrclick = 1;
  if(document.getElementById("cart")){
    cart.addEventListener("click", ()=>{
      if(productList.classList.contains("show")){
        productList.classList.remove("show");
      }else if(localStorage.length > 0){
        productList.classList.add("show");
        if(nbrclick === 1){
          createListCartProduct();
        }else{
          return false;
        }   
      }
    nbrclick = 2;
    }) 
  }
}
/*
*   Function : creation of the cart content 
*/
function createCartProductContent(key){
  const newProduct = JSON.parse(localStorage.getItem(key));
//Creation : blog card
  const cardProduct = document.createElement("div");
    cardProduct.id = newProduct.id;
    cardProduct.className = "dropdown-item pl-1";
//Creation : blog image
  const ProductContainerImg = document.createElement("div");
    ProductContainerImg.className= "col-4 col-lg-12";
//Creation : image
  const imgProduct = document.createElement("img");
    imgProduct.src = newProduct.img;
    imgProduct.alt = "Peluche d'ourson nommée " + newProduct.name + " vendu par l'entreprise Orinoco";
    imgProduct.className = "w-25 h-25 pr-2 d-inline";
//Creation : paragraph
  const textProduct = document.createElement("p");
    textProduct.className = "text-center d-inline";
    textProduct.innerHTML = newProduct.name;
//Creation : delete product in the cart
  const deleteProduct = document.createElement("span");
    deleteProduct.innerHTML = "⊗";
    deleteProduct.className = "ml-4 h4";
    deleteProduct.addEventListener("click", ()=>{
      productList.removeChild(cardProduct);
      productList.removeChild(separatorProduct);
      localStorage.removeItem(key);
      if(window.sessionStorage && window.sessionStorage !== null){
        if(sessionStorage.getItem(newProduct.id)){
          sessionStorage.removeItem(newProduct.id);
        }
      }
    }) 
//Creation : séparator
  const separatorProduct = document.createElement("div");
    separatorProduct.className = "dropdown-divider"; 
//Add the element in the DOM
  if(cart){
      appendDOM(cart,productList,cardProduct);
      appendDOM(cardProduct,ProductContainerImg,imgProduct,textProduct,deleteProduct);
      appendDOM(productList,separatorProduct);
  }
}
/*
*   Function : Creation of the list of cart products 
*/ 
function createListCartProduct(){
  let key = "";
  if(window.localStorage && window.localStorage !== null){
    for(let i = 0;  i <= localStorage.length-1; i++){
      key = localStorage.key(i); 
      chekcStorage(key);
    }
  }
}
/*
*   Function : Check the presence of the element in storage
*/
function chekcStorage(key){
  if(localStorage.getItem(key)){
       return createCartProductContent(key);
      }else {
        return false;
      }
}
/* ****************Product in the DOM***************** 
*
*   Function : Creation of the product selected in the page of product 
*/
export function createOnProduct(data){
//Recovery the hash corresponding to the product ID of the product page
  let idUrl = window.location.hash.substr(1);
//Location : function in the DOM
  const elementOnProduct = document.getElementById("onProductTeddies");
  for(let i = 0; i < data.length; i++){
    if(idUrl == data[i]._id){
//Creation : blog image
      const OnProductContainerImg = document.createElement("div");
        OnProductContainerImg.className= "col-12 col-sm-4 h-75 ";
//Creation : img
      const OnProductImg = document.createElement("img");
      OnProductImg.src = data[i].imageUrl;
      OnProductImg.alt = "Peluche d'ourson nommée " + data[i].name + " vendu par l'entreprise Orinoco";
      OnProductImg.className = "w-100 h-100 shadow-lg mt-1 rounded ";
//Creation : blog content
      const OnProductContent = document.createElement("div");
        OnProductContent.className = "col-12 col-sm-6 mt-2";
//Creation  : content title
      const OnProductContentTitle = document.createElement("h2");
        OnProductContentTitle.innerHTML = data[i].name;
        OnProductContentTitle.className = "text-center font-weight-bold h2";
//Creation : color selection list
      const OnProductContentLabelSelect = document.createElement("label");
        OnProductContentLabelSelect.innerHTML = "Choix de la couleur : ";
        OnProductContentLabelSelect.className = "mt-2 mr-2";
      const OnProductContentLabelSelectFor = document.createAttribute("for");
        OnProductContentLabelSelectFor.value ="colors-select";
        OnProductContentLabelSelect.setAttributeNode(OnProductContentLabelSelectFor);
      const OnProductContentSelect = document.createElement("select");
        OnProductContentSelect.name = "colors";
        OnProductContentSelect.id = "colors-select";
      for(let j = 0; j < data[i].colors.length; j++){
        const OnProductContentSelectOption = document.createElement("option");
          OnProductContentSelectOption.value = data[i].colors[j];
          OnProductContentSelectOption.innerHTML = data[i].colors[j];
          OnProductContentSelect.appendChild(OnProductContentSelectOption);
      }
//Creation : description paragraph   
      const OnProductContentDescription = document.createElement("p");
        OnProductContentDescription.innerHTML = data[i].description;
        OnProductContentDescription.className = "mt-4";
//Creation : sidebar
      const OnProductSidebar = document.createElement("div");
        OnProductSidebar.className = "col-12 col-sm-2 px-0 mt-2";
//Creation : price paragraph
    const OnProductSidebarPrice = document.createElement("p");
      OnProductSidebarPrice.innerHTML = "Prix de : " + (data[i].price/100) + " €";
      OnProductSidebarPrice.className = " text-center border border-dark bg-dark text-white rounded w-75 mt-2 ml-2 py-2";
//Creation : buy btn
    const OnProductSidebarBtn = document.createElement("button");
      OnProductSidebarBtn.id = "command";
      OnProductSidebarBtn.innerHTML = "Ajouter au panier";
      OnProductSidebarBtn.className = " text-center btn btn-dark w-75 mt-2 ml-2";
      OnProductSidebarBtn.addEventListener("click",()=>{
        if(window.localStorage && window.localStorage !== null){
          if(!localStorage.getItem(idUrl)){
            let newProduct ={
              img : data[i].imageUrl,
              id : data[i]._id,
              name : data[i].name,
              price : data[i].price,
              quantity : 1   
          }; 
          newProduct = localStorage.setItem((data[i]._id), JSON.stringify(newProduct));
            checkPresencePostValidation(OnProductSidebar);
            if(nbrclick == 2){
              createCartProductContent(idUrl);
            } 
          }else if(localStorage.getItem(idUrl)){
            return false;
          }}else{
          console.log("localStorage n'est pas supporté");
        }
      })                  
//Add the elements in the DOM
      if(elementOnProduct){
        appendDOM(elementOnProduct,OnProductContainerImg,OnProductImg);
        appendDOM(elementOnProduct,OnProductContent,OnProductContentTitle,OnProductContentLabelSelect,OnProductContentSelect,OnProductContentDescription);
        appendDOM(elementOnProduct,OnProductSidebar,OnProductSidebarPrice,OnProductSidebarBtn);
      }
    }
  }
}
/*
* Function : Check presence of the blog post validation
*/
function checkPresencePostValidation (divlocalisation){
  let confirm = null;
  if(confirm = document.getElementById("confirm")){
    divlocalisation.removeChild(confirm);
    createPostValidation(divlocalisation);
  }else{
    createPostValidation(divlocalisation);
  }
}
/*
*   Function : Creation of the post validation
*/
function createPostValidation(divlocalisation,confirm){
//Creation : blog of the validation post   
  confirm = document.createElement("div");
  confirm.id  = "confirm";
  confirm.className = " text-center border border-dark bg-dark text-white rounded w-100 mt-4 mr-1 p-2";
//Creation : post validation
  const msgValidation = document.createElement("p");
    msgValidation.textContent = "Produit ajouté au panier avec succès";
//Creation : séparator
  const separatorTop = document.createElement("div");
    separatorTop.className = "dropdown-divider";
  const separatorBottom = document.createElement("div");
    separatorBottom.className = "dropdown-divider";
//Creation : product quantity counter in the cart
  const amountProduct = document.createElement("p");
    amountProduct.innerHTML = " Il y a " + localStorage.length + " produit(s) dans votre panier";
//Creation : options
//Creation : btn back to the product list page
  const optionsReturn = document.createElement("div");
    optionsReturn.className = " btn-group";
  const optionsReturnHref = document.createElement("a");
    optionsReturnHref.className = "btn btn-light mb-2 mr-1";
    optionsReturnHref.href = "index.html";
    optionsReturnHref.innerHTML = "Continuer mes achats";
//Creation : btn go to the cart page
  const optionNext = document.createElement("div");
    optionNext.className = " btn-group";
  const optionNextHref = document.createElement("a");
    optionNextHref.className = "btn btn-light mb-2";
    optionNextHref.href = "panier.html";
    optionNextHref.innerHTML = "Commander";
//Add the elements in the DOM
  appendDOM(divlocalisation,confirm,msgValidation,separatorTop,amountProduct,separatorBottom,optionsReturn,optionNext);
  appendDOM(optionsReturn,optionsReturnHref);
  appendDOM(optionNext,optionNextHref); 
}