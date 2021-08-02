/*
*   Object : inputs of the form
*/
const form = {
    formValid : document.getElementById("submit-validation"),
    formulaire : document.querySelector("#formulaire"),
    inputsForm :{
        //Input element
        firstName : document.getElementById("firstName"), //Firstname
        lastName : document.getElementById("lastName"), //Lastname
        address : document.getElementById("adress"), //Adress 
        city : document.getElementById("city"), //Name of the city
        email : document.getElementById("email"), // Email
        codePostal : document.getElementById("cp"), // Postal code
        //ValueInput
        inputFirstName : function(){ return this.firstName.value},
        inputLastName : function(){ return this.lastName.value},
        inputAddress : function(){ return this.address.value},
        inputCity : function(){ return this.city.value},
        inputCodePostal : function(){ return this.codePostal.value}, 
        inputCodePostalCity : function (){ return this.codePostal.value + " " + this.city.value},
        inputEmail : function(){ return this.email.value}
    },
    //The regular expression
    regExpAll :{ 
        regExpName : /^[A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/, //regExp Firstname, Lastname, City
        regExpAdresse : /([0-9][ ])?[A-Za-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/, //reg Adress
        regExpEmail : /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/ //regExp email
    }, 
}  
/* ****************Function : parameter construction*****************
*
*   Function : add parameter correct
*/
function correct(input){
    input.nextSibling.nextSibling.className = "";
    input.nextSibling.nextSibling.textContent = "";
}
/*
*   Function : add parameter change the class of the select element
*/
function changeClass(element,classToDelete1,classToAdd1,classToAdd2,classToDelete2){
    if(classToDelete1 && element.classList.contains(classToDelete1)){
        element.classList.remove(classToDelete1);
    }else if(classToDelete2 && element.classList.contains(classToDelete2)){
        element.classList.remove(classToDelete2);
    }else if(classToAdd2){
        element.classList.add(classToAdd2);
    }  
    element.classList.add(classToAdd1);
}
/*
*   Function : add content during the verification the value test
*/  
function contentCheckValue(input,borderBgToDelete,textToDelete,borderBgToAdd,textToAdd,infoMsg){
    const span = input.nextSibling.nextSibling;
        changeClass(input,("border-" + borderBgToDelete),("border-" + borderBgToAdd));
        span.className = "px-3";
        changeClass(span,("bg-" + borderBgToDelete),("bg-" + borderBgToAdd ),("text-"+ textToAdd),("text-" + textToDelete));
        span.textContent = input.parentNode.firstElementChild.innerHTML + infoMsg;
}
/*
*   Function : verification of the inputs's value except the last input
*/
function checkValue(form){   
    for(let i = 0; i < form.elements.length-1; i++){
        const inputs = form.elements[i];
        inputs.addEventListener("blur", ()=>{
            if(inputs.validity.valueMissing){
                contentCheckValue(inputs,"warning","dark","danger","white","manquant");
            }
        })
    }
}
/*
*   Function : add content during the verification regExp  
*/
function contentChekRegExp (input,expression){
    if(!expression.test(input.value)){
        contentCheckValue(input,"danger","white","warning","dark","incorrect");
    }else if(expression.test(input.value)){
        changeClass(input,"border-warning", "border-success",false,"border-danger") + correct(input);
    }  
}
/*
*   Function : verification of the input's regExp
*/ 
function checkRegExp(element,expression){
    if(element.length > 1){
        for(let i = 0; i < element[0].length; i++){
            const input = element[0][i];
            input.addEventListener("blur", ()=>{
                contentChekRegExp(input,expression);
            })
        }  
    }else{
        element.addEventListener("blur", ()=>{
            contentChekRegExp(element,expression);
        })
    }
}
/*
*   Function : recovery product ID
*/
function idproduct(){ 
    let onProduct= [];
    for(let i = 0;  i< localStorage.length; i++){
        let key = localStorage.key(i);
        let newProduct = JSON.parse(localStorage.getItem(key));
        onProduct.push(newProduct.id);
    }
    return onProduct;
}
/*
*   Function : recovery of inputs value and products table
*/   
 function buildDataOrder (){
    let products = idproduct();
        let contact = {
        firstName : form.inputsForm.inputFirstName(),
        lastName : form.inputsForm.inputLastName(),
        address : form.inputsForm.inputAddress(),
        city: form.inputsForm.inputCodePostalCity(),
        email : form.inputsForm.inputEmail()
        }
    return ({contact ,  products}) ;
}
/* ****************Function : storaged related function*****************
*
*   Function : recovery quantity of sessionStorage  
*/
function recoveryStorage(){
    if(sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")){
        sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");   
    }
    let recoveryStorageQuantity =[];
    let orderSumTotalHS = 0;
    for(let i = 0;  i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        let storage = JSON.parse(sessionStorage.getItem(key));
        recoveryStorageQuantity.push(storage.quantity);  
    }
    if(recoveryStorageQuantity){
        for(let k= 0; k < recoveryStorageQuantity.length; k++){
            orderSumTotalHS += recoveryStorageQuantity[k];
        }
    }
    return orderSumTotalHS;
}
/* ****************Function : creation order summary *****************
*
*/
export function createOrderSummary(){
    if(document.getElementById("orderLocation")){
        let recoveryQuantity = "";
//Location : element sibling
        const orderParentInputSibling = document.getElementById("submit-validation").parentElement;
        if(localStorage.length <1){
            orderParentInputSibling.classList.add("d-none");
        }else if(localStorage.length >= 1){
            orderParentInputSibling.classList.remove("d-none");
        }
//Location : element focus
        const orderDivLocation = document.getElementById("orderLocation");
//Creation : blog order summary
        const orderContainer = document.createElement("div");
        let key = "";
        for(let i = 0; i < localStorage.length; i++){
            key = localStorage.key(i); 
            const newProduct = JSON.parse(localStorage.getItem(key));
//Creation : blog of the products of the order summary
            const orderRow = document.createElement("div");
                orderRow.className = "border rounded border-dark mb-2 position-relative";
            const orderRowArticle = document.createAttribute("role");
                orderRowArticle.value = "article";
                orderRow.setAttributeNode(orderRowArticle);
//Creation : img
            const orderImg = document.createElement("img");
                orderImg.src = newProduct.img;
                orderImg.alt = "Peluche d'ourson nommée " + newProduct.name + " vendu par l'entreprise Orinoco";
                orderImg.className = "w-25 h-25 pr-2 d-inline";
//Creation : blog order description
            const orderDescription = document.createElement("div");
                orderDescription.className = " d-inline-block";
//Creation : paragraph description
            const orderDescriptionParagraph = document.createElement("p");
//Creation : select label
            const orderLabel = document.createElement("label");
                orderLabel.className = "col-3 d-block position-absolute fixed-top mr-0 ml-auto p-0";
                orderLabel.innerHTML= "Choix du nombre d'articles :";
            const orderLabelFor = document.createAttribute("for");
                orderLabelFor.value = (newProduct.id+10);
                orderLabel.setAttributeNode(orderLabelFor);
//Creation : select
            const orderQuantity = document.createElement("select");
                orderQuantity.name = "productQuantity";
                orderQuantity.id = (newProduct.id+10);
                orderQuantity.className = "d-block position-absolute fixed-top mr-2 ml-auto mt-4 p-0";
//Creation : select options
                for (let j = 0; j <  20; j++){
                    const orderOption = document.createElement("option");
                        orderOption.value = j;
                        orderOption.innerHTML = j+1;
                        orderQuantity.appendChild(orderOption);  
                }
                recoveryQuantity = parseInt(orderQuantity.value) + parseInt(newProduct.quantity);
                orderDescriptionParagraph.innerHTML = newProduct.name + " : " + (newProduct.price/100) + " €/U <br/> Nombre d'articles : " + recoveryQuantity;
//Save object in the sessionStorage
                if(sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")){
                    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer")}
                if(window.sessionStorage && window.sessionStorage !== null){
                    let rememberQuantity = {
                        id : orderQuantity.id,
                        quantity : parseInt(recoveryQuantity) * parseInt((newProduct.price/100)),
                        valueInitial : parseInt(recoveryQuantity)
                    };sessionStorage.setItem((orderQuantity.id), JSON.stringify(rememberQuantity));
                }
//Creation : Function 
orderQuantity.addEventListener('change', ()=>{
                recoveryQuantity = parseInt(orderQuantity.value) + parseInt(newProduct.quantity);
    //Save value selected
                orderDescriptionParagraph.innerHTML = newProduct.name + " : " + (newProduct.price/100) + " €/U <br/> Nombre d'articles : " + recoveryQuantity;
    //Save object in the sessionStorage
                if(sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")){
                sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer")}
                 if(window.sessionStorage && window.sessionStorage !== null){
                    let rememberQuantity = {
                        id : orderQuantity.id,
                        quantity : parseInt(recoveryQuantity) * parseInt((newProduct.price/100)),
                        valueInitial : parseInt(recoveryQuantity)
                    };sessionStorage.setItem((orderQuantity.id), JSON.stringify(rememberQuantity));
                }
    //Changes the value according to the quantity selected
                orderSumPriceHT.innerHTML = "Prix hors taxe : " + recoveryStorage() + "€<br/> Taux de TVA (20%) : " + (Math.round((20/100) *recoveryStorage())) + "€<br/>  Prix TTC : " + ((recoveryStorage()) + (Math.round((20/100) *recoveryStorage()))) + "€";
                }) 
//Creation : blog btn delete
            const orderContainerBtnDelete = document.createElement("div");
                orderContainerBtnDelete.className = "m-1 p-0";
//Creation: btn delete
            const orderBtnDelete = document.createElement("div");
                orderBtnDelete.className = "btn btn-dark text-white w-100 h-50";
                orderBtnDelete.innerHTML ="Supprimer l'article";
//Creation : Function delete selected element
            orderBtnDelete.addEventListener('click', ()=>{ 
//detele : product in the cart
                if(document.getElementById("cart")){
                    if(document.getElementById(newProduct.id)){
                        let parentdiv = document.getElementById(newProduct.id).parentElement;
                        parentdiv.removeChild(document.getElementById(newProduct.id).nextElementSibling);
                        parentdiv.removeChild(document.getElementById(newProduct.id));
                    }
                }
//delete : product in the sessionStorage and the value in the sum total
                if(sessionStorage.getItem(newProduct.id+10)){
                    sessionStorage.removeItem(orderQuantity.id);
                    orderSumPriceHT.innerHTML = "Prix hors taxe : " + recoveryStorage() + "€<br/> Taux de TVA (20%) : " + (Math.round((20/100) *recoveryStorage())) + "€<br/>  Prix TTC : " + ((recoveryStorage()) + (Math.round((20/100) *recoveryStorage()))) + "€";
                }
                orderContainer.removeChild(orderRow);
                localStorage.removeItem(newProduct.id);
                if(localStorage.length === 0){
                    cartEmpty(orderDivLocation,orderParentInputSibling);
                    orderParentInputSibling.classList.add("d-none");
                    orderDivLocation.removeChild(orderSumPrice);
                    document.querySelector(".dropdown-menu").classList.remove("show");  
                }
            })
//Add the elements in the DOM
            if(localStorage.length >= 1){
                orderContainer.appendChild(orderRow);
                orderRow.appendChild(orderImg);
                orderRow.appendChild(orderDescription);
                orderDescription.appendChild(orderDescriptionParagraph);
                orderRow.appendChild(orderContainerBtnDelete);   
                orderContainerBtnDelete.append(orderBtnDelete);
                orderRow.appendChild(orderLabel);
                orderRow.appendChild(orderQuantity);
            }         
        }

//Creation : blog of the bill to pay 
        const orderSumPrice = document.createElement("div");
        const orderSumPriceHT = document.createElement("p");
        orderSumPriceHT.className ="text-right h4";
        orderSumPriceHT.innerHTML = "Prix hors taxe : " + recoveryStorage() + "€<br/> Taux de TVA (20%) : " + (Math.round((20/100) *recoveryStorage())) + "€<br/>  Prix TTC : " + ((recoveryStorage()) + (Math.round((20/100) *recoveryStorage()))) + "€";
//Add the elements in the DOM 
        if(localStorage.length >= 1){
            orderDivLocation.insertBefore(orderSumPrice,orderParentInputSibling);
            orderDivLocation.insertBefore(orderContainer,orderSumPrice);
            orderSumPrice.appendChild(orderSumPriceHT);
        }else if(localStorage.length < 1){
                cartEmpty(orderDivLocation,orderParentInputSibling);
        }
    }
}
/*
*   Function : cart empty
*/
function cartEmpty(orderDivLocation,orderParentInputSibling){
    const cartEmptyContainer = document.createElement("div");
    const cartEmptyContainerText = document.createElement("p");
        cartEmptyContainerText.className = "text-center h4 my-4";
        cartEmptyContainerText.innerHTML = "Votre panier est vide <br/> <span class='far fa-sad-cry h1 mt-4'></span>"; 
    orderDivLocation.insertBefore(cartEmptyContainer,orderParentInputSibling);
    cartEmptyContainer.appendChild(cartEmptyContainerText);
}
/* ****************Systeme start-up*****************
*
*   Function : Send the form by the POST method
*/
export  function evenementFormulaire(){
    if(form.formulaire = document.querySelector('#formulaire')){
//Check user inputs
        checkRegExp(form.inputsForm.firstName,form.regExpAll.regExpName);
        checkRegExp(form.inputsForm.lastName,form.regExpAll.regExpName);
        checkRegExp(form.inputsForm.city,form.regExpAll.regExpName);
        checkRegExp(form.inputsForm.address,form.regExpAll.regExpAdresse);
        checkRegExp(form.inputsForm.email, form.regExpAll.regExpEmail);
            form.inputsForm.codePostal.addEventListener('blur', ()=>{
                if(form.inputsForm.inputCodePostal().length != 5 && form.inputsForm.inputCodePostal().length >= 1){
                    contentCheckValue(form.inputsForm.codePostal,'danger','white','warning','dark','incorrect');
                }else if(form.inputsForm.inputCodePostal().length == 5){
                    changeClass(form.inputsForm.codePostal,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.codePostal);
                }
            })  
        checkValue(form.formulaire);
    }
    if(form.formValid = document.getElementById("submit-validation")){
//Check of the form during validation for each inputs
        form.formValid.addEventListener('click', (e)=>{
            if(form.inputsForm.firstName){
                if(!form.inputsForm.firstName.validity.valueMissing){
                    if(!form.regExpAll.regExpName.test(form.inputsForm.inputFirstName())){
                        contentCheckValue(form.inputsForm.firstName,'danger','white','warning','dark','incorrect');
                        e.preventDefault()
                    }else if(form.regExpAll.regExpName.test(form.inputsForm.inputFirstName())){
                        changeClass(form.inputsForm.firstName,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.firstName);
                    }
                }else if(form.inputsForm.firstName.validity.valueMissing){
                    contentCheckValue(form.inputsForm.firstName,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }
            if(form.inputsForm.lastName){
                if(!form.inputsForm.lastName.validity.valueMissing){
                    if(!form.regExpAll.regExpName.test(form.inputsForm.inputLastName())){
                        contentCheckValue(form.inputsForm.lastName,'danger','white','warning','dark','incorrect');
                        e.preventDefault()
                    }else if(form.regExpAll.regExpName.test(form.inputsForm.inputLastName())){
                        changeClass(form.inputsForm.lastName,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.lastName);
                    }
                }else if(form.inputsForm.lastName.validity.valueMissing){
                    contentCheckValue(form.inputsForm.lastName,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }
            if(form.inputsForm.address){
                if(!form.inputsForm.address.validity.valueMissing){
                    if(!form.regExpAll.regExpAdresse.test(form.inputsForm.inputAddress())){
                        contentCheckValue(form.inputsForm.address,'danger','white','warning','dark','incorrect');
                        e.preventDefault()
                    }else if(form.regExpAll.regExpAdresse.test(form.inputsForm.inputAddress())){
                        changeClass(form.inputsForm.address,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.address);
                    }
                }else if(form.inputsForm.address.validity.valueMissing){
                    contentCheckValue(form.inputsForm.address,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }
            if(form.inputsForm.codePostal){
                if(!form.inputsForm.codePostal.validity.valueMissing){
                    if(form.inputsForm.inputCodePostal().length != 5 && form.inputsForm.inputCodePostal().length >= 1){
                        contentCheckValue(form.inputsForm.codePostal,'danger','white','warning','dark','incorrect');
                    }else if(form.inputsForm.inputCodePostal().length == 5){
                        changeClass(form.inputsForm.codePostal,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.codePostal);
                    }
                }else if(form.inputsForm.codePostal.validity.valueMissing){
                    contentCheckValue(form.inputsForm.codePostal,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }
            if(form.inputsForm.city){
                if(!form.inputsForm.city.validity.valueMissing){
                    if(!form.regExpAll.regExpName.test(form.inputsForm.inputCity())){
                        contentCheckValue(form.inputsForm.city,'danger','white','warning','dark','incorrect');
                        e.preventDefault()
                    }else if(form.regExpAll.regExpName.test(form.inputsForm.inputCity())){
                        changeClass(form.inputsForm.city,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.city);
                    }
                }else if(form.inputsForm.city.validity.valueMissing){
                    contentCheckValue(form.inputsForm.city,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }
            if(form.inputsForm.email){
                if(!form.inputsForm.email.validity.valueMissing){
                    if(!form.regExpAll.regExpEmail.test(form.inputsForm.inputEmail())){
                        contentCheckValue(form.inputsForm.email,'danger','white','warning','dark','incorrect');
                        e.preventDefault()
                    }else if(form.regExpAll.regExpEmail.test(form.inputsForm.inputEmail())){
                        changeClass(form.inputsForm.email,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.email);
                    }
                }else if(form.inputsForm.email.validity.valueMissing){
                    contentCheckValue(form.inputsForm.email,'warning','dark','danger','white',"manquant");
                    e.preventDefault()
                }   
            }  
        })
//Send the form
        form.formulaire.addEventListener('submit', async (e)=>{
        e.preventDefault()
//Recovery user data, product ID and total sum of the products
        let dataOrder = buildDataOrder();
        let orderSum = ((recoveryStorage()) + (Math.round((20/100) *recoveryStorage())));
//Send to API
        try{
            let response = await fetch(form.formulaire.getAttribute('action'),{
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }), 
                body: JSON.stringify(dataOrder) 
            }); 
//Recovery the answer of the API in the SessionStorage
            let promise = response.json();
                    promise.then(result =>{
                        window.location.href="confirmation.html?orderId=" + result.orderId; 
                        if(window.sessionStorage && window.sessionStorage !== null){
                            localStorage.clear()
                            sessionStorage.clear()
                            let resultConfirm = {
                                firstName : result.contact.firstName,
                                lastName : result.contact.lastName,
                                address : result.contact.address,
                                city: result.contact.city,
                                email : result.contact.email,
                                id : result.orderId,
                                sumTotal : orderSum
                            }; 
                            sessionStorage.setItem('resultat', JSON.stringify(resultConfirm));
                        }else{
                            console.log("localStorage n'est pas supporté");
                        }  
                    })
        }catch(e){
                console.log(e)
            } 
        })       
    }
}