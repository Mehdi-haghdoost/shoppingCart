const shop = document.querySelector('.shop')


let basket = JSON.parse(localStorage.getItem('data')) || []

const generateShop = () => {
    return (
        shop.innerHTML = shopItemsData.map((x) => {
            let { id, name, price, desc, img } = x
            let search = basket.find((x) => x.id === id) || []

            return `
            <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
              <h3> ${name} </h3>
              <p>${desc}</p>
              <div class="price-quantity">
                <h2>$ ${price} </h2>
                <div class="buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                  <div  id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item
                }
                  </div>
                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>
            `
        }).join('')
    )
}
generateShop()

const increment = (id) => {
    // console.log(id);
    let search = basket.find((x) => x.id === id)
    if (search === undefined) {
        basket.push({
            item: 1,
            id: id
        })
    } else {
        search.item += 1
    }

    update(id)
    localStorage.setItem(('data') , JSON.stringify(basket))
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
    localStorage.setItem(('data') , JSON.stringify(basket))
}
const update = (id) => {
    let qty = document.getElementById(id)
    let search = basket.find((x) => x.id === id)
    qty.innerHTML = search.item
    calculate ()
}
const calculate = () => {
    const cartAmount = document.getElementById('cartAmount')
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y , 0)
}
calculate()
