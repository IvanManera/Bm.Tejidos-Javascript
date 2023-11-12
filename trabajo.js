let products = [];

fetch("./productos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  })
  .then(data => {
    products = data;
    console.log(products);

    let divProducts = document.querySelector("#products");
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      divProducts.innerHTML += `
        <section>
          <div>
            <img src="${element.image}" alt="${element.alt}" class="Imagen__dentro_caja">
            <p id="${element.id}" class="textoimagen">ADQUIRIR $${element.price}</p>
          </div>
        </section>
      `;
    }

    // Llamar a la función para agregar eventos después de cargar los productos
    agregarEventosClick();
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

let parrafo = document.querySelector('.ActivarTienda');
document.getElementById("btncarrito").addEventListener("click", () => {
  parrafo.style.display = parrafo.style.display == "flex" ? "none" : "flex";
});

let total = 0;
let carritoItems = [];

// Recuperar elementos del localStorage al cargar la página
if (localStorage.getItem('carritoItems')) {
  carritoItems = JSON.parse(localStorage.getItem('carritoItems'));
  cargarCarrito(); // Mostrar elementos del carrito al cargar la página
}

function agregarEventosClick() {
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    document.getElementById(element.id).addEventListener('click', () => {
      if (document.getElementById("carrito" + element.id) == null) {
        parrafo.innerHTML +=
          `
        <div id="carrito${element.id}">
            <img src="${element.image}" alt="${element.alt}">
            <h4>${element.name}</h4>
            <p>$${element.price}</p>
            <span id="x${element.id}">&times;</span>
        </div>
        `;
        total += element.price;
        carritoItems.push(element);
        document.querySelector(".cantidad").innerHTML = carritoItems.length;
        document.getElementById("total").innerHTML = "TOTAL: " + total;

        // Guardar en localStorage siempre que haya más de 1 elemento en el carrito
        if (carritoItems.length > 1) {
          localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
          console.log('CarritoItems guardados en localStorage');
        }

        //EL BOTON COMPRAR DENTRO DEL LOOP ATENTO A LOS CAMBIOS DEL ARRAY
        const btn = document.getElementById("btncomprar");
        btn.addEventListener('click', () => {
          if (carritoItems.length > 0) {
            Swal.fire({
              title: "Gracias por comprar!",
              text: "Accediendo al checkout",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Oops!",
              text: "El carrito está vacío!",
              icon: "error"
            });
          }
        });
      }
    });
  }
}

document.body.addEventListener('click', function (event) {
  for (let i = 0; i < carritoItems.length; i++) {
    const element = carritoItems[i];
    if (event.target.id == "x" + element.id) {
      const cartItem = document.getElementById("carrito" + element.id);
      total -= element.price;
      const index = carritoItems.indexOf(element);
      if (index > -1) {
        carritoItems.splice(index, 1);
      }
      document.querySelector(".cantidad").innerHTML = carritoItems.length;
      document.getElementById("total").innerHTML = "TOTAL: " + total;
      elemetoABorrar = document.getElementById("carrito" + element.id);
      elemetoABorrar.remove();
      //actualiza el localstorage
      localStorage.setItem('carritoItems', JSON.stringify(carritoItems)); 
    };
  }
});

const btn = document.getElementById("btncomprar");
btn.addEventListener('click', () => {
  if (carritoItems.length > 0) {
    Swal.fire({
      title: "Gracias por comprar!",
      text: "Accediendo al checkout",
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "Oops!",
      text: "El carrito está vacío!",
      icon: "error"
    });
  }
});

function cargarCarrito() {
  for (let i = 0; i < carritoItems.length; i++) {
    const element = carritoItems[i];
    parrafo.innerHTML +=
      `
    <div id="carrito${element.id}">
        <img src="${element.image}" alt="${element.alt}">
        <h4>${element.name}</h4>
        <p>$${element.price}</p>
        <span id="x${element.id}">&times;</span>
    </div>
    `;
    total += element.price;
    document.querySelector(".cantidad").innerHTML = carritoItems.length;
    document.getElementById("total").innerHTML = "TOTAL: " + total;
  }
}

