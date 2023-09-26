import Toastify from 'toastify-js'
import menuArray from '/data'

const listCartItems = document.getElementById('items')
const totalPriceEle = document.getElementById('total-price')
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const completeOrderBtn = document.getElementById("complete-order-btn")
const closeModalBtn = document.querySelector(".btn-close")
const inputName = document.getElementById('input-name')
const formSubmitBtn = document.getElementById('form-submit')
const formTitle = document.getElementById('form-title')
const inputContainer = document.getElementById('input-container')
let totalPrice = 0


document.getElementById('menu').innerHTML += menuArray.map(item => {
    const {name, price, ingredients, id, emoji} = item

    return `
    <div class="item-container" id=${id}>
                <p class="emoji">${emoji}</p>
                <div class='detail-container'>
                    <h2>${name}</h2>
                    <p class='ingredients'>${ingredients}</p>
                    <p>$${price}</p>
                </div>
                <button class="increment-btn" id='${id}'>+</button>
            </div>`
}).join('')


const handleAddItem = (e) => {
    
      console.log(e.target.id)
      if(e.target.tagName === 'BUTTON') {
        const filterItem = menuArray.filter(item => item.id == e.target.id)
          listCartItems.innerHTML += `
                          <div class="cart-container">
                              <p>${filterItem[0].name}</p>
                              <button class="remove-btn" id='${filterItem[0].id}'>remove</button>
                              <p class='order-price'>$${filterItem[0].price}</p>
                          </div> 
          `
          menuArray.map(item => {
            if(item.id == e.target.id) {
              totalPrice += item.price
              totalPriceEle.textContent = `$${totalPrice}` 
            }
          })
    }

  }

  const handleRemoveItem = (e) => {

    if(e.target.tagName === 'BUTTON') {

      const elements = Array.from(document.querySelectorAll(`.${e.target.className}`))

      const filterElement = elements.filter(item => {
        return item.id == e.target.id
      })

      menuArray.map(item => {
        if(item.id == e.target.id) {
          totalPrice -= item.price
          totalPriceEle.textContent = `$${totalPrice}` 
        }
      })

      filterElement[0].parentElement.remove()
    }
  }
  

document.getElementById('menu').addEventListener('click', handleAddItem)

document.getElementById('items').addEventListener('click', handleRemoveItem)

// Modal 

const openModal = function () {
  if(totalPrice === 0) {
    Toastify({
    text: "Please Add an Item to Your Order.",
    duration: 3000,
    newWindow: true,
    stopOnFocus: true, // Prevents dismissing of toast on hover
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    style: {
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
      background: "linear-gradient(to right, #f86368, #b32d2e)",
       },
      }).showToast();
    } else {
      document.getElementById('modal').style.display = 'flex'
      overlay.classList.remove("hidden")
      formTitle.textContent = `Please enter your name. `
      inputContainer.style.display = 'block'
    }
  }
  
  

const closeModal = function () {
  document.getElementById('modal').style.display = 'none'
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
  totalPrice = 0
  totalPriceEle.textContent = `$${totalPrice}`
  listCartItems.innerHTML = ''
}

const handleSubmitForm = () => {
  formTitle.textContent = `${inputName.value}, your order will be delivered. `
  inputContainer.style.display = 'none'
  
}

completeOrderBtn.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal);
formSubmitBtn.addEventListener('click', handleSubmitForm)