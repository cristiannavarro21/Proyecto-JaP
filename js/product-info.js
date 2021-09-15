var infoProd = [];
var infoComent = [];
var detalle = localStorage.getItem("json");

function prodInfo(info) {

    let informaProd = "";


    informaProd += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + info.images + `" alt=" " class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ info.name + `</h4>
                    <small class="text-muted">` + info.currency + ` ` + info.cost + `</small>
                </div>
                <p class="mb-1">` + info.description + `</p>
            </div>
        </div>
    </a>
    `
    document.getElementById("listInfoProd").innerHTML = informaProd;
}



function listComentarios() {

    let comentarios = "";
    for (let i = 0; i < infoComent.length; i++) {
        let coment = infoComent[i];

        comentarios += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + coment.img + `" alt=" " class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ coment.user + `</h4>
                    <small class="text-muted">` + coment.score + `</small>
                </div>
                <p class="mb-1">` + coment.description + `</p>
                <p class="mb-1">` + coment.dateTime + `</p>
            </div>
        </div>
    </div>
    `

    }
    document.getElementById("listComProd").innerHTML = comentarios + `<br> <p> Comentarios:</p><textarea rows="5" cols="50" id="texto"></textarea> <br> <select name="select">
    <option value="value1">Value 1</option>
   <option value="value2" selected>Value 2</option>
    <option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option>
   </select><br><br> <button>Enviar</button>`;;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + detalle + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProd = resultObj.data;

            prodInfo(infoProd);
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoComent = resultObj.data;

            listComentarios(infoComent);
        }
    });

});
