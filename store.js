//saber en que pagina estoy
var path = window.location.pathname;
var page = path.split("/").pop();

if (page != "storeAcercade.html") {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function cogerRespuesta(respuesta) {
            return respuesta.json();
        })
        .then(function cogerDatos(data) {

            for (let i = 0; i < data.length; i++) {

                if (page == "storePrincipal.html") {
                    document.getElementById("contenedorCategorias").innerHTML +=
                        `
                        <a href="storeBusqueda.html">
                        <div>
                        <img class="productoImg" src="Imagenes/${i}.jpg">
                        <h5>${data[i]}</h5>
                        </div>
                        </a>
                        `;
                } else if (page == "storeBusqueda.html") {
                    document.getElementById("seleccionCategoria").innerHTML +=
                        `
                        <option value=${data[i]}>${data[i]}</option>
                        `;
                }

            }
        })
        .catch(function (error) {
            console.log('Datos temporalmente no disponibles');
        });
}


if (page == "storeBusqueda.html") {

    fetch("https://fakestoreapi.com/products?limit=6")
        .then(function cogerRespuesta(respuesta) {
            return respuesta.json();
        })
        .then(function cogerDatos(data) {

            document.getElementById("titulo").innerHTML =
                `
        <h1>Últimas ventas</h1>
        `;

            for (let i = 0; i < data.length; i++) {

                document.getElementById("listadoProductos").innerHTML +=
                    `
                <div class= "producto">
                <img class="productoImg" src="${data[i].image}" alt="${data[i].description}">
                <h5>${data[i].title}</h5>
                <h5 style="color:grey">${data[i].price}€</h5>
                </div>
                `;
            }
        })
        .catch(function (error) {
            console.log('Datos temporalmente no disponibles');
        });

}


function buscarCategoria() {
    let seleccion = document.getElementById("seleccionCategoria").value;

    if (seleccion == "men's") {
        seleccion = "men's clothing";
    } else if (seleccion == "women's") {
        seleccion = "women's clothing";
    }


    fetch("https://fakestoreapi.com/products/category/" + seleccion)
        .then(function cogerRespuesta(respuesta) {
            return respuesta.json();
        })
        .then(function cogerDatos(data) {

            document.getElementById("titulo").innerHTML =
                `
        <h1>${seleccion}</h1>
        `;

            document.getElementById("listadoProductos").innerHTML = '';

            for (let i = 0; i < data.length; i++) {

                document.getElementById("listadoProductos").innerHTML +=
                    `
                <div class= "producto">
                <img class="productoImg" src="${data[i].image}" alt="${data[i].description}">
                <h5>${data[i].title}</h5>
                <h5 style="color:grey">${data[i].price}€</h5>
                </div>            
                `;
            }
        })
        .catch(function (error) {
            console.log('Datos temporalmente no disponibles');
        });
}
