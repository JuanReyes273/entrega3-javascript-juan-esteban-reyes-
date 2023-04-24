let carrito = [];

const añadiraCarrito = document.querySelector('.agregar');
const serviciosContenedor = document.getElementById("servicios-contenedor");

serviciosContenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar")) {
        validarServicioEnCarrito(e.target.id)
    };
})

const validarServicioEnCarrito = (servicioId) => {
    const estaRepetido = carrito.some(servicio => servicio.id == servicioId)

    if (!estaRepetido) {
        const servicio = serviciosLocalizacion.find(servicio => servicio.id == servicioId)
        carrito.push(servicio)
        pintarServicioCarrito(servicio)
    } else {
        const servicioRepetido = carrito.find(servicio => servicio.id == servicioId)
        const horas = document.getElementById(`horas${servicioRepetido.id}`)
        servicioRepetido.horas++
        horas.innerText = `horas: ${servicioRepetido.horas}`
        actualizarTotalesCarrito(carrito)
    }
} 

const pintarServicioCarrito = (servicio) => {
    const contenedor = document.getElementById("carrito-contenedor")
    const div = document.createElement("div")
    div.classList.add("productoEnCarrito")
    div.innerHTML = `
        <p>${servicio.nombre}</p>
        <p>Precio: $${servicio.precio}</p>
        <p id=horas${servicio.id}>Horas: ${servicio.horas}</p>
        <a href="#" class="eliminar-servicio-carrito" value="${servicio.id}">X</a>
    `
    contenedor.appendChild(div)
    actualizarTotalesCarrito(carrito)
}

const actualizarTotalesCarrito = (carrito) => {
    const totalHoras = carrito.reduce((acc,item) => acc + item.horas, 0)
    const totalCompra = carrito.reduce((acc,item) => acc + (item.precio * item.horas), 0)

    pintarTotalesCarrito(totalCompra)
    guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCompra) => {
    const precioTotal = document.getElementById("precio-total")

    precioTotal.innerText = totalCompra
}

const eliminarServicioCarrito = (servicioId) => {
    const servicioIndex = carrito.findIndex(servicio => servicio.id == servicioId)
    carrito.splice(servicioIndex, 1)
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
}

const pintarCarrito = (carrito) =>{
    const contenedor = document.getElementById("carrito-contenedor")

    contenedor.innerHTML = ""

    carrito.forEach(servicio => {
        const div = document.createElement("div")
        div.classList.add("productoEnCarrito")
        div.innerHTML = `
            <p>${servicio.nombre}</p>
            <p>Precio: $${servicio.precio}</p>
            <p id=horas${servicio.id}>Horas: ${servicio.horas}</p>
            <a href="#" class="eliminar-servicio-carrito" value="${servicio.id}">X</a>
        `
        contenedor.appendChild(div)
    });
}

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage
}

if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage()
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
}