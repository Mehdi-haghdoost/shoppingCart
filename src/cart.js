let basket = JSON.parse(localStorage.getItem('data'))
const cart = document.getElementById('shopping-cart')
const label = document.getElementById('label')

const generateCartItems = () => {
    if (basket.length !== 0) {
        return (
            cart.innerHTML = basket.map((x) => {
                let { id, item } = x
                let search = shopItemsData.find((x) => x.id === id) || []

                return `
                <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            <div class="details">
    
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
              </div>
    
              <div class="buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
              </div>
    
              <h3 class="amount">$ ${search.price * item}</h3>
            </div>
          </div>
                `
            }).join('')
        )
    } else {
        cart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }

}
generateCartItems()

const increment = (id) => {
    let search = basket.find((x) => x.id === id)
    if (search === undefined) {
        basket.push({
            item: 1,
            id: id
        })
    } else {
        search.item += 1
    }
    generateCartItems()
    update(id)
    localStorage.setItem(('data'), JSON.stringify(basket))

}

const decrement = (id) => {
    let search = basket.find((x) => x.id === id)
    if (search === undefined) {
        return true;
    } else if (search.item === 0) {
        return true;
    } else {
        search.item -= 1
    }
    update(id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
    localStorage.setItem(('data'), JSON.stringify(basket))
}
const update = (id) => {
    let qty = document.getElementById(id)
    let search = basket.find((x) => x.id === id)
    qty.innerHTML = search.item
    calculate()
    totalBil()
}
const calculate = () => {
    const cartAmount = document.getElementById('cartAmount')
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculate()

const totalBil = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((x) => x.id === id) || []
            return (search.price *item)
        }).reduce((x,y) => x+y,0)
       
        label.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`
    } else {
        return true;
    }
}
totalBil()
const clearCart = () => {
    basket = []
    generateCartItems()
    localStorage.setItem('data',JSON.stringify(basket))
}
const removeItem = (id) => {
    basket = basket.filter ((X) => X.id!== id)
    generateCartItems()
    calculate()
    totalBil()
    localStorage.setItem('data',JSON.stringify(basket))
}