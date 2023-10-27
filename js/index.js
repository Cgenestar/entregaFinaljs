const productos = [
    { id: 0, marca: "Fender", modelo: "STRATOCASTER", precio: 500, img: "./img/fenderStrato.jpg" },
    { id: 1, marca: "Fender", modelo: "TELECASTER", precio: 600, img: "./img/telecaster.jpg" },
    { id: 2, marca: "Gibson", modelo: "Les Paul", precio: 700, img: "./img/gipson.jpg" }, 
    { id: 3, marca: "Ibanez", modelo: "MAR10", precio: 500, img: "./img/ibañez.jpg" }, 
    { id: 4, marca: "Gibson", modelo: "SG", precio: 700, img: "./img/gibsonSG.jpg" },
    { id: 5, marca: "Epiphone", modelo: "Sheraton-II PRO", precio: 800, img: "./img/epiphone.jpg" }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar;


function agregarAlCarrito(event) {
    const productId = event.target.id;
   
}

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.img}" alt="${producto.modelo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.marca}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
    console.log("botonesAgregar")
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

cargarProductos(productos);


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function () { }
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);

    if (productosEnCarrito.some(producto => producto.id == idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
       
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


