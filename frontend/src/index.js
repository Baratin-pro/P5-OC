/* **************** Import *****************
*
*/
import createProductList from './listesproduits.js';
import {toggleVisibilityCart,createOnProduct} from './product.js';
import {evenementFormulaire,createOrderSummary} from './formulaire.js';
import createAnswerOrder from './answerOrder.js';
/* **************** Fetch *****************
*      
*/
const getTeddiesAll = async function(){
    try{
      let response = await fetch('http://localhost:3000/api/teddies');
        if(response.ok){
          let data = await response.json()
          createProductList(data); 
          createOnProduct(data);
          toggleVisibilityCart();
        }else{
            console.error('Retour du serveur : ', response.status);
          }
    }catch(e){
      console.log(e)
    }
}
/* **************** Activation of functions *****************
*      
*/
getTeddiesAll();
createOrderSummary();
evenementFormulaire();
createAnswerOrder();

