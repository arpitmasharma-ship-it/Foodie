

/////////////// FIRSTLY WE NEED TO DO THIS KI WHEN WE CLICK ON CART ICON OUR CART-LIST MUST OPEN FOR THIS WE NEED TO DO THIS///////////////////////




const cartIcon =document.querySelector('.cart-icon');
const cartTab =document.querySelector('.cart-tab');
const closebtn =document.querySelector('.close-btn'); // yeha close-btn ke age dot . lagana bhul gaya tha 

/* jab ham cart pe click kera to uska class .cart-tab se change hoker ye ho jaye .cart-tab-active jisse ham cart ko enable ker saka */
  
/* this is important ki jab ham cartIcon pe click kera to cartTab ki class change ho jaye from .cart-tab to .cart-active-tab */
cartIcon.addEventListener('click', ()=> cartTab.classList.add('cart-tab-active')) ;
closebtn.addEventListener('click',()=>cartTab.classList.remove('cart-tab-active'));

// yeha ham card-list ko leke aayenga jisse ham card-list me items ko daak sakha okey
const cardList =document.querySelector('.card-list');
const cartList= document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total') ;

const cartValue = document.querySelector('.cart-value') ;












/* DATA FATCHING OF PRODUCTS OKEY */


// IT IS AN EMPTY ARRAY    Step(1)
let productList = [];

// create empty array 
let cartProduct =[] ;

// ceating a new function 
const updateTotals =()=>{
    let totalPrice =0 ;
    let totalQuantity = 0 ; 
    document.querySelectorAll('.item').forEach(item=>{
        const price = parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
        totalPrice+=price ;

        const quantity = parseInt(item.querySelector('.quantity-value').textContent) ;
        totalQuantity+= quantity ;

    })

    cartTotal.textContent = `$${totalPrice.toFixed(2)}` ;
    cartValue.textContent = totalQuantity ;
}




// cards ko show kerna ke liya ham yeha ek function create kerange okey    Step(3)
const showcards =()=>{
    // productLIST ME JO BHI CHEJA AAYE HAI USE USSA USE   KERNA KE LIYE WE WILL RUN A FOR EACH LOOP OKEY 
productList.forEach(product=>{
// yeha ham ek element div create ekr raha hai in javascript okey 
const orderCard =document.createElement('div');
// ab es div me ek class chaiye  order-card name se 
orderCard.classList.add('order-card')
// now here we will add innerHTML to orderCard OKEY
orderCard.innerHTML=`

                       <div class="card-image">
                            <img src="${product.image}">
                        </div>
                        <h4>
                           ${product.name}
                        </h4>
                        <h4 class="price">${product.price}</h4>
                        <a href="#" class="btn card-btn">Add To Cart</a>
                        ` ;
                        // yeha ham append kerwaage okey  matlab card list me hamne orderCard ko daal diya hai 
                        cardList.appendChild(orderCard) ;


                        
///// NOW WHAT WE HAVE TO DO IS KI JAB BHI HAM "ADD TO CART" PE CLICK KERE TO VO CART ME SHOW HONE LAGE OKEY
const cardBtn = orderCard.querySelector('.card-btn') ; /// yeha fir se dot lagana bhul gaya tha 
cardBtn.addEventListener('click',(e)=>{
    e.preventDefault(); // YE KIYA BECAUSE JAB ADD TO CART PE CLICK EKR RAH THA TO VO BY DEFAULT RELOAD HO RAHA THA PAGE
   addToCart(product);  // jab bhi ham addtocart wala button ko call kerange tab ye function call hoga okey
   // yeha ham product paas ker raha hai okey important because vaha product ko directly use nai ker sakta okey
   // so passing product as promp
   
})


})
}

// we are creating a function  Step(2)
const initApp =()=>{
 // data fetch kaha se ker raha hai ham okey 
 fetch('products.json').then
 // yeha ham lege response and response lenge ham from json
 (response=>response.json()).then
 // jo bhi kuch aayega na vo sab iss data me store hoga 
 (data=>{
    productList=data ;
    showcards();
 })
}

initApp();


/// CREATING A NEW FUNCTION 

const addToCart =(product)=>{

/////////  yeha pe ham ek variabel bana reha hai existing product ke name se and ye u work keraga ki jo hamne cartproduct wala array banaya hai na  uske ander hame find kerna padega ki id match ker rahi hai ki nai 
// ager existingProduct trye  hota hai to similar item hai 
    const existingProduct =cartProduct.find(item => item.id===product.id);
    if (existingProduct){
        alert('item already exist ') ;
        return ;
    }

    // ager existingProduct true nai hai to product  push kerwa denga okey 
    cartProduct.push(product);

     /// yeha ham ek variable banayge quantaty name se okey; 
     let quantity = 1; 
     /// YEHA HAM PRODUCT KA PRICE LE REHA HAI OKEY 
     let price = parseFloat(product.price.replace('$',''))

// creatinf div 
const cartItem = document.createElement('div') ;
// giveing class to div 
cartItem.classList.add('item');
 cartItem.innerHTML=`
  <div class="item-image">
                                <img src="${product.image}" >
                            </div>
                            <div>
                                <h4>${product.name}</h4>
                                <h4 class="item-total">${product.price}</h4>
                            </div>

                            <div class="flex ">
                                <a href="#" class="quantity-btn minus">
                                    <i class="fa-solid fa-minus"></i>
                                </a>

                                <h4 class="quantity-value">${quantity}</h4>

                                 <a href="#" class="quantity-btn plus">
                                    <i class="fa-solid fa-plus"></i>
                                </a>
                            </div>
 ` ;

 // now ab ham esa append kerwage cart-list me 
 cartList.appendChild(cartItem) ;
 updateTotals(); 
 



 /// HAM YEHA PE INCREAMENT PE KAAM KERANGE OKEY 
 const plusBtn =cartItem.querySelector('.plus'); 
 const quantityvalue = cartItem.querySelector('.quantity-value') ;
 const itemTotal = cartItem.querySelector('.item-total');
 const minusBtn = cartItem.querySelector('.minus');  // yeha fir dot bhul gaya tha
 // my mistake is ki mena cartItem ki jagha cartList le liya upper minusBtn me to pura error cvreate ker diya ye choti se cheez okey ; 

 plusBtn.addEventListener('click' ,(e)=>{
    e.preventDefault(); 
quantity++ ;
quantityvalue.textContent = quantity ;
itemTotal.textContent=`$${(price*quantity).toFixed(2)}` ;
// in up ToFixed is Very Much Important hai okey ; 


    // jab bhi item uodate hoga tab updatetotal ko call lega dega okey 
    updateTotals()
 }) ;


 /// ham yeha ab decreament ko handel kerange okey 
  minusBtn.addEventListener('click' ,(e)=>{
    e.preventDefault() ;
    if (quantity>1){

         quantity--; 
    quantityvalue.textContent = quantity ;
    itemTotal.textContent=`$${(price*quantity).toFixed(2)}` ; // my mistake is ki mena yeha divide / use ker liya tha okey 

    }
    else{
        // cartItem.cartList.add('slide-out')  ;// cartList ke jagha cardclass daal diya galti mere hai yaar ||
cartItem.remove();
/// ye niche wala step is imporatnt hai okey 
cartProduct = cartProduct.filter(item => item.id !== product.id); // this is very important okey 
    }

    updateTotals()
   
 }) 



}







/////// mobile screen hamburger 
const hamburger = document.querySelector('.hamburger') ;
const mobileMenu = document.querySelector('.mobile-menu') ;
hamburger.addEventListener('click' , ()=>mobileMenu.classList.toggle('mobile-menu-active')) ;  // yeha mena isme dot laga diya tha yaar galti ho gai thi 








