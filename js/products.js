var productos = [];
var costMin = undefined;
var costMax = undefined;

function listadoProductos() {

    let listProductos = "";
    for (let i = 0; i < productos.length; i++) {
        let autos = productos[i];

        if (((costMin == undefined) || (costMin != undefined && (autos.cost) >= costMin)) &&
            ((costMax == undefined) || (costMax != undefined && (autos.cost) <= costMax))) {

            listProductos += `
         <div class="col-md-6 col-lg-4">
           <div class="card">
            <img src="${autos.imgSrc}" class="card-img-top" alt="...">
            <div class="card-body">
             <h5 class="card-title">${autos.name}</h5>
             <small class="text-muted">` + autos.currency + ` ` + autos.cost + `</small>
             <p class="card-text">${autos.description}</p>
             <a onclick= informacionProd(${autos.id}) href="product-info.html" class="btn btn-primary">Más Información</a>
            </div>
          </div>
          </div>
            `
        }
        document.getElementById("data").innerHTML = listProductos;
    }
};

function sortlistadoProdu(criterio, array) {
    let result = [];
    if (criterio === 1) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === 2) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === 3) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });

    }
    return result;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            listadoProductos(productos);
        }
    });

    document.getElementById("ordAsc").addEventListener("click", function () {
        productos = sortlistadoProdu(1, productos);

        listadoProductos(productos);
    });
    document.getElementById("ordDesc").addEventListener("click", function () {
        productos = sortlistadoProdu(2, productos);

        listadoProductos(productos);
    });
    document.getElementById("ordVta").addEventListener("click", function () {
        productos = sortlistadoProdu(3, productos);

        listadoProductos(productos);
    });

    document.getElementById("filtrar").addEventListener("click", function () {

        costMin = document.getElementById("valorMin").value;
        costMax = document.getElementById("valorMax").value;

        if ((costMin != undefined) && (costMin != "") && (parseInt(costMin)) >= 0) {
            costMin = parseInt(costMin);
        } else {
            costMin = undefined;
        }

        if ((costMax != undefined) && (costMax != "") && (parseInt(costMax)) >= 0) {
            costMax = parseInt(costMax);

        } else {
            costMax = undefined;
        }
        listadoProductos(productos);
    });

    document.getElementById("quitarFil").addEventListener("click", function () {
        document.getElementById("valorMin").value = "";
        document.getElementById("valorMax").value = "";

        costMax = undefined;
        costMin = undefined;

        listadoProductos(productos);
    });


});

