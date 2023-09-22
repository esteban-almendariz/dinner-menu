import menuArray from '/data'

const listCartItems = document.getElementById('items-list-container')
const totalPriceEle = document.getElementById('total-price')

const hanldeButtonClick = (e) => {
    console.log(e.target.id)
    const filterItem = menuArray.filter(item => item.id == e.target.id)
    document.getElementById('items').innerHTML += `
                    <div class="cart-container">
                        <p>${filterItem[0].name}</p>
                        <button class="remove-btn">remove</button>
                        <span>${filterItem[0].price}</span>
                    </div> 
                    
    `
    console.log(filterItem)
    
}


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


document.getElementById('menu').addEventListener('click', hanldeButtonClick)