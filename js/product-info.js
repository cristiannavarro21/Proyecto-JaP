var infoProd = [];
var infoComent = [];
var idprod = localStorage.getItem("json");
var detalle = {};
const ratingStars = [...document.getElementsByClassName("rating__star")];


function showImagesGallery(array) {

    let galleriaImag = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        galleriaImag += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        
        `

        document.getElementById("imagesProd").innerHTML = galleriaImag;
    }
}

function listComentarios() {

    let comentarios = "";
    for (let i = 0; i < infoComent.length; i++) {
        let coment = infoComent[i];

        comentarios += `
        
        <div class="row">
            <div class="col-2 container">
                <img src="` + coment.img + `"alt=" " class="img-coment img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ coment.user + `</h4>
                    <p class="text-muted">` + coment.score + `
                    <span class="fa fa-star checked"></span></p>
                </div>
                <p class="mb-1">` + coment.description + `</p>
                <p class="mb-1">` + coment.dateTime + `</p>
            </div>
        </div>
    `
    }
    document.getElementById("listComProd").innerHTML = comentarios;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + idprod + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {

            detalle = resultObj.data;

            let categoryNameHTML = document.getElementById("nameProd");
            let categoryDescriptionHTML = document.getElementById("descriptionProd");
            let productCostHTML = document.getElementById("costProd");
            let productCountHTML = document.getElementById("counProd");
            let productCriteriaHTML = document.getElementById("criterioProd");


            categoryNameHTML.innerHTML = detalle.name;
            categoryDescriptionHTML.innerHTML = detalle.description;
            productCostHTML.innerHTML = (detalle.currency + " " + detalle.cost);
            productCountHTML.innerHTML = detalle.soldCount;
            productCriteriaHTML.innerHTML = detalle.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(detalle.images);

        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL + idprod + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoComent = resultObj.data;

            listComentarios(infoComent);
        }
    });

});

 

