const listaTenis = [
    { 
        img: "assets/tenis1.svg", 
        title: "AIR MAX 270", 
        description: "Descubra o equilíbrio perfeito entre estilo e desempenho com o NIKÉ AIR MAX 270. Este tênis esportivo é projetado para oferecer máximo conforto e suporte, ideal para corridas e atividades do dia a dia. Com a tecnologia Air Max, você experimenta uma amortecimento excepcional a cada passo.",
        background: "linear-gradient(135deg, #5EB8FF 0%, #FFC689 100%)"
    },
    { 
        img: "assets/tenis2.svg", 
        title: "AIR ZOOM RED", 
        description: "O NIKÉ AIR ZOOM RED combina um design arrojado com a tecnologia Zoom Air para proporcionar uma experiência de corrida responsiva e confortável. Seu estilo vibrante e cor vermelha intensa fazem deste tênis uma escolha perfeita para quem quer se destacar.",
        background: "linear-gradient(135deg, #FF5E5E 0%, #FFA07A 100%)"
    },
    { 
        img: "assets/tenis3.svg", 
        title: "AIR FORCE 1", 
        description: "O NIKÉ AIR FORCE 1 é um ícone atemporal que oferece um visual clássico e versátil. Com sua cor preta elegante, este tênis é ideal para qualquer ocasião, proporcionando conforto e durabilidade com sua construção robusta e tecnologia Air.",
        background: "linear-gradient(135deg, #222 0%, #555 100%)"
    }
];

// Função para trocar o tênis exibido
function trocarTenis(index) {
    const tenis = listaTenis[index];
    const tenisImg = document.getElementById("tenis-img");
    const tenisTitle = document.getElementById("tenis-title");
    const tenisDesc = document.getElementById("tenis-desc");
    const container = document.querySelector(".container");

    // Adiciona animação de fade-out
    tenisImg.style.opacity = 0;
    tenisTitle.style.opacity = 0;
    tenisDesc.style.opacity = 0;

    setTimeout(() => {
        tenisImg.src = tenis.img;
        tenisTitle.textContent = tenis.title;
        tenisDesc.textContent = tenis.description;
        container.style.background = tenis.background;

        // Adiciona animação de fade-in
        tenisImg.style.opacity = 1;
        tenisTitle.style.opacity = 1;
        tenisDesc.style.opacity = 1;
    }, 300); // Tempo da transição (300ms)
}

// Inicializa o primeiro tênis ao carregar a página
document.addEventListener("DOMContentLoaded", () => trocarTenis(0));

// Event Listeners para os botões de cor
document.getElementById("btn-blue").addEventListener("click", () => trocarTenis(0));
document.getElementById("btn-red").addEventListener("click", () => trocarTenis(1));
document.getElementById("btn-black").addEventListener("click", () => trocarTenis(2));

// Carrinho de compras
const cart = JSON.parse(localStorage.getItem("cart")) || []; // Recupera o carrinho do localStorage
const cartMenu = document.getElementById("cart-menu");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartContainer = document.getElementById("cart-container");

// Abrir o carrinho
cartBtn.addEventListener("click", () => {
    cartMenu.classList.add("active");
    cartMenu.focus(); // Foca no carrinho ao abrir
});

// Fechar o carrinho
closeCartBtn.addEventListener("click", () => {
    cartMenu.classList.remove("active");
});

// Função para adicionar produtos ao carrinho
function addToCart(productName, productPrice = 120) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage();
    showNotification(`${productName} adicionado ao carrinho!`);
}

// Atualiza a exibição do carrinho
function updateCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - R$${item.price} x ${item.quantity}`;

        // Botão de remover UM item
        const removeOneBtn = document.createElement("button");
        removeOneBtn.textContent = "-";
        removeOneBtn.style.marginLeft = "10px";
        removeOneBtn.style.borderRadius = "10px";
        removeOneBtn.style.border = "1px";
        removeOneBtn.style.padding = "2px";
        removeOneBtn.style.width = "24px";
        removeOneBtn.onclick = () => decreaseQuantity(index);

        // Botão de remover item completamente
        const removeAllBtn = document.createElement("button");
        removeAllBtn.style.marginLeft = "10px";
        removeAllBtn.style.borderRadius = "10px";
        removeAllBtn.style.border = "1px";
        removeAllBtn.style.padding = "2px";
        removeAllBtn.style.width = "72px";
        removeAllBtn.onclick = () => removeFromCart(index);

        // Adiciona o ícone de lixeira ao botão
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash");
        removeAllBtn.appendChild(trashIcon);

        listItem.appendChild(removeOneBtn);
        listItem.appendChild(removeAllBtn);
        cartContainer.appendChild(listItem);

        total += item.price * item.quantity;
    });

    // Exibe o total do carrinho
    const totalElement = document.createElement("li");
    totalElement.textContent = `Total: R$${total.toFixed(2)}`;
    totalElement.style.fontWeight = "bold";
    cartContainer.appendChild(totalElement);

    // Botão de finalizar compra
    const checkoutBtn = document.createElement("button");
    checkoutBtn.textContent = "Finalizar Compra";
    checkoutBtn.style.marginTop = "10px";
    checkoutBtn.style.width = "100%";
    checkoutBtn.style.padding = "10px";
    checkoutBtn.style.backgroundColor = "#000";
    checkoutBtn.style.color = "#fff";
    checkoutBtn.style.border = "none";
    checkoutBtn.style.borderRadius = "5px";
    checkoutBtn.onclick = () => alert("Compra finalizada! Obrigado!");
    cartContainer.appendChild(checkoutBtn);

    cartMenu.classList.add("active");
}

// Função para diminuir a quantidade de um item
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
    saveCartToLocalStorage();
}

// Função para remover um item completamente
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
}

// Função para exibir notificações
function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "#000";
    notification.style.color = "#fff";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Salva o carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Adiciona evento ao botão de compra do tênis principal
document.querySelector(".btn-buy").addEventListener("click", () => {
    const shoeName = document.getElementById("tenis-title").textContent;
    addToCart(shoeName);
});

// Adiciona evento aos botões "adicionar ao carrinho" dos produtos
document.querySelectorAll(".produtos-btn").forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product"); // Nome do produto
        addToCart(productName);
    });
});