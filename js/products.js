var productos = [];
var costMin = undefined;
var costMax = undefined;

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

function listadoProductos() {

    let infoProductos = "";
    for (let i = 0; i < productos.length; i++) {
        let autos = productos[i];

        if (((costMin == undefined) || (costMin != undefined && (autos.cost) >= costMin)) &&
            ((costMax == undefined) || (costMax != undefined && (autos.cost) <= costMax))) {

            infoProductos += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + autos.imgSrc + `" alt=" " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ autos.name + `</h4>
                            <small class="text-muted">` + autos.currency + ` ` + autos.cost + `</small>
                        </div>
                        <p class="mb-1">` + autos.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("data").innerHTML = infoProductos;
    }
};

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
        }else {
            costMin= undefined;
        }

        if ((costMax != undefined) && (costMax != "") && (parseInt(costMax)) >= 0) {
            costMax = parseInt(costMax);
        
        }else {
            costMax = undefined;
        }
        listadoProductos(productos);
    });

    document.getElementById("quitarFil").addEventListener("click", function () {
        document.getElementById("valorMin").value ="";
        document.getElementById("valorMax").value ="";

        costMax = undefined;
        costMin = undefined;

        listadoProductos(productos);
    });
    
    
});

