var infoProd = [];
var infoComent = [];

function prodInfo() {

    let informaProd = "";
    for (let i = 0; i < infoProd.length; i++) {
        let info = infoProd[i];


        informaProd += `
                    <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ info.name + `</h4>
                            <small class="text-muted">` + info.currency + ` ` + info.cost + `</small>
                        </div>
                        <p class="mb-1">` + info.description + `</p>
                        <p class="mb-1">` + info.soldCount + `</p>
                    </div>
                    <div class="col-3">
                        <img src="` + info.images + `" alt=" " class="img-thumbnail">
                    </div>
                </div>
                `
    }
    document.getElementById("listInfoProd").innerHTML = informaProd;
};

function listComentarios() {

    let comentarios = "";
    for (let i = 0; i < infoComent.length; i++) {
        let coment = infoComent[i];

        comentarios += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
    </a>
    `

    }
    document.getElementById("listComProd").innerHTML = comentarios;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
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
    })

});