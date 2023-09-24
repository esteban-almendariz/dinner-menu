import menuArray from '/data'

const listCartItems = document.getElementById('items')
const totalPriceEle = document.getElementById('total-price')
let totalPrice = 0


document.getElementById('menu').innerHTML += menuArray.map(item => {
    const {name, price, ingredients, id, emoji} = item

    return `
    <div class="item-container" id=${id}>
                <img src=${emoji} class="emoji">
                <div>
                    <h2>${name}</h2>
                    <p>${ingredients}</p>
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
                              <span>$${filterItem[0].price}</span>
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
  

document.getElementById('menu').addEventListener('click', handleAddItem)

document.getElementById('items').addEventListener('click', handleRemoveItem)