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

function trocarTenis(index) {
    const tenis = listaTenis[index];
    const tenisImg = document.getElementById("tenis-img");
    const tenisTitle = document.getElementById("tenis-title");
    const tenisDesc = document.getElementById("tenis-desc");
    const container = document.querySelector(".container");
    const tenisInfo = document.querySelector(".tenis-info");

    tenisImg.src = tenis.img;
    tenisTitle.textContent = tenis.title;
    tenisDesc.textContent = tenis.description;
    container.style.background = tenis.background;

    tenisInfo.classList.add("hidden");

    // Aguarda 500ms (tempo da transição) para trocar o conteúdo
    setTimeout(() => {
        tenisImg.src = tenis.img;
        tenisTitle.textContent = tenis.title;
        tenisDesc.textContent = tenis.description;
        container.style.background = tenis.background;

        // Remove a classe para exibir o novo conteúdo suavemente
        tenisInfo.classList.remove("hidden");
    }, 1000);
}



document.addEventListener("DOMContentLoaded", () => trocarTenis(0));

// Event Listeners para os botões
document.getElementById("btn-blue").addEventListener("click", () => trocarTenis(0));
document.getElementById("btn-red").addEventListener("click", () => trocarTenis(1));
document.getElementById("btn-black").addEventListener("click", () => trocarTenis(2));

const cart = [];
const cartMenu = document.getElementById("cart-menu");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartContainer = document.getElementById("cart-container");

// Abrir o carrinho
cartBtn.addEventListener("click", () => {
    cartMenu.classList.add("active");
});

// Fechar o carrinho
closeCartBtn.addEventListener("click", () => {
    cartMenu.classList.remove("active");
});

// Função para adicionar produtos ao carrinho
function addToCart() {
    const shoeName = document.getElementById("tenis-title").textContent;
    const shoePrice = 120; // Valor fixo de exemplo

    // Verifica se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === shoeName);

    if (existingItem) {
        existingItem.quantity++; // Se já existe, aumenta a quantidade
    } else {
        cart.push({ name: shoeName, price: shoePrice, quantity: 1 });
    }

    updateCart();
}

// Atualiza a exibição do carrinho
function updateCart() {
    cartContainer.innerHTML = "";

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
        trashIcon.classList.add("fa-solid", "fa-trash"); // Classes do Font Awesome
        removeAllBtn.appendChild(trashIcon); // Adiciona o ícone ao botão

        listItem.appendChild(removeOneBtn);
        listItem.appendChild(removeAllBtn);
        cartContainer.appendChild(listItem);
    });

    // Abre o carrinho automaticamente ao adicionar
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
}

// Função para remover um item completamente
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Adiciona evento ao botão de compra
document.querySelector(".btn-buy").addEventListener("click", addToCart);