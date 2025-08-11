

class dessert {
   constructor(name, price, number) {
      this.name = name;
      this.price = price;
      this.number = number;
      this.total = number * price
   }

}


class App {
   #images = document.querySelectorAll('.food');
   #mobileMedia = window.matchMedia("(max-width:655px)");
   #products = document.querySelector(".products");
   #cartHidden = false;
   #desserts = [];
   #EmptyImage = document.querySelector(".container .cart .imgContainer");
   #cartHeader = document.querySelector(".container .cart h1")
   #cartContainer = document.querySelector(".container .cart .cart-content")
   #CartElements = this.#EmptyImage.closest(".cart").querySelector(".elements");
   #totalPrice = 0;
   #totalElement = this.#EmptyImage.closest(".cart").querySelector(".totalPrice h2");
   #cartNum = 0;


   // .item .image-container .buy'

   constructor() {
      this.#changeMedia();
      this.#mobileMedia.addEventListener('change', this.#changeMedia.bind(this));
      this.#products.addEventListener('click', this.#changeState.bind(this));
      this.#CartElements.addEventListener('mouseover', this.#changeX)
      this.#CartElements.addEventListener('mouseout', this.#changeX)
      this.#CartElements.addEventListener('click', this.#deleteX.bind(this))
   }
   #changeX(e) {
      if (!e.target.classList.contains("delete")) return;
      e.target.classList.toggle("selected")
   }



   #deleteX(e) {
      if (!e.target.classList.contains("delete")) return;
      const name = e.target.closest(".element").querySelector("h3").textContent;
      this.#deleteEl(name)

   }

   #changeState(e) {
      // console.log(e.target);
      const Btn = e.target.closest(".item .image-container .add");
      if (Btn) {
         const info = Btn.closest(".item").querySelector('.info')
         const name = info.querySelector('.name').textContent;
         const price = +info.querySelector('.price').textContent.slice(1);
         const number = +Btn.closest(".item").querySelector('.quantity .number').textContent;
         // console.log(Btn,name ,price ,number)
         //` Add to Cart
         if (Btn?.classList.contains("buy")) {
            const buyBtn = Btn
            buyBtn.classList.add("hidden")
            buyBtn.closest('.image-container').querySelector(".food").classList.add('selected')
            const quaBtn = buyBtn.closest('.image-container').querySelector('.quantity')
            quaBtn.classList.remove("hidden");

            if (!this.#cartHidden)
               this.#addFirstElement(number * price)

            this.#addtoCart(name, price);
         }
         //` Increaes / Decrease
         else if (e.target.classList.contains("increase")) {

            // edit number of elements in UI
            Btn.querySelector('.number').textContent = number + 1;
            // edit the number in the array
            const index = this.#desserts.findIndex(des => des.name == name)
            this.#desserts[index].number = number + 1;
            this.#desserts[index].total += price;
            //edit the info in the cart
            const elementInfo = this.#CartElements.querySelector(`.element.${name.split(" ").join('-')} .info`);

            elementInfo.querySelector('.number').textContent = `${number + 1}×`
            elementInfo.querySelector('.total').textContent = `$${(number + 1) * price}`
            this.#editCart(price);
         }
         else if (e.target.classList.contains("decrease")) {
            //If the number of elements became 0 then it is a must to change the of the Btn and to delete the element from the cart 
            if (number == 1) {
               this.#deleteEl(name);
               Btn.classList.add("hidden");
               Btn.closest(".image-container").querySelector(".buy").classList.remove("hidden")
               return;
            }
            // edit number of elements in UI
            Btn.querySelector('.number').textContent = number - 1;
            // edit the number in the array
            const index = this.#desserts.findIndex(des => des.name == name)
            this.#desserts[index].number = number - 1;
            this.#desserts[index].total -= price;
            //edit the info in the cart
            const elementInfo = this.#CartElements.querySelector(`.element.${name.split(" ").join('-')} .info`);

            elementInfo.querySelector('.number').textContent = `${number - 1}×`
            elementInfo.querySelector('.total').textContent = `$${(number - 1) * price}`
            this.#editCart(-price);


         }
      }
   }

   #deleteEl(name) {
      const element = this.#CartElements.querySelector(`.element.${name.split(" ").join('-')}`);
      this.#totalPrice -= element.querySelector('.info .total').textContent.slice(1);
      this.#totalElement.textContent = `$${this.#totalPrice}`
      const index = this.#desserts.findIndex(des => des.name == name);
      this.#desserts.splice(index, 1);
      element.remove();
      this.#cartNum -= 1;
      this.#cartHeader.textContent = `Your Cart (${this.#cartNum})`

      this.#switchBtns(name);

      if (this.#cartNum == 0) {
         this.#cartContainer.classList.add("hidden");
         this.#EmptyImage.classList.remove("hidden");
         this.#cartHidden = false;
      }
   }
   #switchBtns(name) { //` This funtion switch the Btns .buy and .quantity and makes quantity=1
      const item = document.querySelector(`.image-container img[alt="${name}"]`).closest(".item")
      item.querySelector(".food").classList.remove("selected")
      item.querySelector(".buy").classList.toggle("hidden")
      item.querySelector(".quantity").classList.toggle("hidden")
      item.querySelector(".quantity .number").textContent = 1;
   }

   #addFirstElement() {
      this.#EmptyImage.classList.add("hidden")
      this.#cartContainer.classList.remove("hidden")
      this.#cartHidden = true;
   }

   #addtoCart(name, price) {

      this.#desserts.push(new dessert(name, price, 1));
      const html = `
            <div class="element ${name.split(" ").join('-')}">
              <h3>${name}</h3>
              <div class="info">
                <span class="number">${1}×</span>
                <span class="price">@$${price.toFixed(2)}</span>
                <span class="total">$${(1 * price).toFixed(2)}</span>
              </div>
              <img class="delete" src="assets/images/icon-remove-item.svg" alt="remove Item" />
            </div>
          `
      this.#CartElements.insertAdjacentHTML('beforeend', html);
      this.#editCart(price, true);
   }

   #editCart(price, New = false) {
      this.#totalPrice += price;
      this.#totalElement.textContent = `$${this.#totalPrice.toFixed(2)}`;
      if (!New) return;
      this.#cartNum += 1;
      this.#cartHeader.textContent = `Your Cart (${this.#cartNum})`
   }

   #changeMedia() {
      console.log("The Media chagned");
      if (this.#mobileMedia.matches)
         this.#images.forEach(img => img.src = this.#flipMediaToMobile(img.src))
      else this.#images.forEach(img => img.src = this.#flipMobileToDesktop(img.src))
   }

   #flipMediaToMobile = function (name) {
      return name.replace("-desktop", "-mobile");
   }

   #flipMobileToDesktop = function (name) {
      return name.replace("-mobile", "-desktop");
   }

}

const app = new App();