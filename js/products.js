
function listadoProductos(array) {

    let infoProductos = "";
    for (let i = 0; i < array.length; i++) {
        let autos = array[i];


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
    document.getElementById("data").innerHTML += infoProductos;
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
});