/*
*   Function : creation of the answer of the order 
*/
export default function createAnswerOrder(){
    if(document.getElementById("orderConfirm")){
//Creation : automatically estimated date
        Date.prototype.addDays = function(days) {
            let today = new Date(this.valueOf());
            today.setDate(today.getDate() + days);
            return today;
        }
        let deliveryDate = new Date().addDays(7);
        let orderDeliveryDate = deliveryDate.toLocaleString('fr-FR',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if(window.localStorage && window.localStorage !== null){
            const answerOrder = JSON.parse(sessionStorage.getItem('resultat'));
//Location : element focus
            const answerOrderLocation = document.getElementById("orderConfirm");
//Creation : blog order answer
            const answerOrderDiv = document.createElement("div");
                answerOrderDiv.className ="bg-white border rounded shadow-lg mx-auto my-4 p-2";
            const answerOrderDivArticle = document.createAttribute("role");
            answerOrderDivArticle.value = "article";
            answerOrderDiv.setAttributeNode(answerOrderDivArticle);
//Creation : paragraph answer
            const answerOrdertext  = document.createElement("p");
                answerOrdertext.innerHTML = " Bonjour  <span class='font-weight-bold'>" + answerOrder.firstName + " " + answerOrder.lastName + ",</span><br/> Nous vous remercions de votre commande. Nous vous tiendrons informé par e-mail lorsque les articles de votre commande auront été expédiés. Votre date de livraison estimée est indiquée ci-dessous.<br/> Montant de la commande : " + answerOrder.sumTotal + " €<br/> Livraison * : " + orderDeliveryDate + "<br/> Numéro de commande : " + answerOrder.id + "<br/> Votre commande sera expédiée à <br/>" + answerOrder.firstName + " " + answerOrder.lastName + "<br/>" + answerOrder.address + "<br/>" + answerOrder.city +"<br/><br/><span class='font-italic'> * Si la date de livraison estimée tombe sur un dimanche ou un jour fériée, la livraison sera repportée au jour ouvrable, ou le samedi, qui suit la date de livraison estimée.*</span>";     
//Add the elements in the DOM
            answerOrderLocation.appendChild(answerOrderDiv);
            answerOrderDiv.appendChild(answerOrdertext);
            sessionStorage.clear();
        }
    }
}
