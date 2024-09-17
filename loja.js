if (document.readyState == "loading") {
  document.addEventListener('DOMContentLoaded', ready)
}
else {
  ready()
}

var totalAmount = '0,00'

function ready() {
  const removeProductButtons = document.getElementsByClassName('remove-product-button')
  for (var i = 0; i < removeProductButtons.length; i++) {
    removeProductButtons[i].addEventListener('click', removeProduct)
  }

  const quantilyInputs = document.getElementsByClassName('product-qtd-input')
  for (var i = 0; i < quantilyInputs.length; i++) {
    quantilyInputs[i].addEventListener('change', updateTotal)

  }

  const addToCartButtons = document.getElementsByClassName('button-hover-background')
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addProductToCart)
  }

  const purchaseButton = document.getElementsByClassName("purchase-button")[0]
  purchaseButton.addEventListener("click", makePurchase)
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove()
  updateTotal()
}

function checkIfInputIsNull(event) {
  if (event.target.value === "0") {
    event.target.parentElement.parentElement.remove()
  }

  updateTotal()
}

function addProductToCart(event) {
  const button = event.target
  const productInfos = button.parentElement.parentElement
  const productImage = productInfos.getElementsByClassName('product-image')[0].src
  const productTitle = productInfos.getElementsByClassName('product-title')[0].innerText
  const productPrice = productInfos.getElementsByClassName('product-price')[0].innerText

  const productCarName = document.getElementsByClassName('cart-product-title')
  for (var i = 0; i < productCarName.length; i++) {
    if (productCarName[i].innerText === productTitle) {
      productCarName[i].parentElement.parentElement.getElementsByClassName('product-qtd-input')[0].value++
      updateTotal()
      return
    }

  }

  let newCartProduct = document.createElement("tr")
  newCartProduct.classList.add("cart-product")

  newCartProduct.innerHTML =
    `
    
      <td class="product-identification">
        <img src="${productImage}" alt="${productTitle}" class="cart-product-image" width="150px" height="150px">
        <strong class="cart-product-title">${productTitle}</strong>
      </td>
      <td>
        <span class="cart-product-price">${productPrice}</span>
      </td>
      <td class='borda'>
        <input type="number" value="1" min="0" class="product-qtd-input">
        <button type="button" class="remove-product-button">Remover</button>
      </td >
    `

  const tableBody = document.querySelector('.cart-table tbody')
  tableBody.append(newCartProduct)

  updateTotal()
  newCartProduct.getElementsByClassName('remove-product-button')[0].addEventListener('click', removeProduct)
  newCartProduct.getElementsByClassName('product-qtd-input')[0].addEventListener('change', checkIfInputIsNull)
}

function makePurchase() {
  if (totalAmount === '0,00') {
    alert('Seu carrinho está vazio!')
  } else {
    alert(
      `
        Obrigado pela sua compra!
        Valor do pedido: R$${totalAmount}\n
        Volte sempre :)
      `
    )

    document.querySelector('.cart-table tbody').innerHTML = ''
    updateTotal()
  }
}

function updateTotal() {
  totalAmount = 0
  const cartProducts = document.getElementsByClassName('cart-product')
  for (var i = 0; i < cartProducts.length; i++) {
    //console.log(cartProducts[i])
    const productPrice = cartProducts[i].getElementsByClassName('cart-product-price')[0].innerText.replace('R$', '').replace(',', '.')
    const productQuantity = cartProducts[i].getElementsByClassName('product-qtd-input')[0].value
    //console.log(productPrice)

    totalAmount += (productPrice * productQuantity)
  }
  totalAmount = totalAmount.toFixed(2)
  totalAmount = totalAmount.replace('.', ',')
  document.querySelector('.cart-total-container span').innerText = 'R$' + totalAmount

}

// Função para abrir o pop-up
function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

// Função para fechar o pop-up
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

