var compra = {};

function subTotalGen() {
    let total = 0;
    let subge = document.getElementsByClassName("subtotalg");
    for (let i = 0; i < subge.length; i++) {
        total += parseInt(subge[i].innerHTML);
    }
    document.getElementById("subTotalGeneral").innerHTML = total;
    document.getElementById("totalGeneral").innerHTML = total;
};


function subTotalArt(a, i) {
    let cantidad = parseInt(document.getElementById(`cant${i}`).value);
    let moneda = compra[i].currency;

    if (moneda == "USD") {
        subtotal = a * 40 * cantidad
    }
    else {
        subtotal = a * cantidad
    }

    document.getElementById(`artSub${i}`).innerHTML = subtotal;
    subTotalGen()
}


function carrito(array) {
    let row = "";

    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        if (articles.currency === "USD") {
            sub = (articles.unitCost * 40) * articles.count;
        } else {
            sub = articles.unitCost * articles.count;
        }

        row = `
                    <tr>
                        <td> <img src="${articles.src}" width=100></img></td>
                        <td>${articles.name}</td>
                        <td>${articles.currency}</td>
                        <td>${articles.unitCost}</td>
                        <td>
                        <input style="width:3em;background: #7dbff5;" onchange="subTotalArt(${articles.unitCost},${i})" 
                        type="number" id="cant${i}" value="${articles.count}" min="1">
                        </td>
                        <td class="subtotalg" id="artSub${i}">${sub}</td>
                    </tr>
                    ` ;
        document.getElementById("artCarrito").innerHTML += row;

    }
    subTotalGen()
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            compra = resultObj.data.articles;

            carrito(compra);
        }
    })
});