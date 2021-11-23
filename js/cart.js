var compra = {};
var costoenv = 0;

document.getElementById("pagos").addEventListener("click", modal);

function modal() {
    let numtarj = document.getElementById("numbercard");
    let codigo = document.getElementById("CVV");
    let fecha = document.getElementById("fechaven");
    let transf = document.getElementById("numbertrans");

    if (document.getElementById("formPagTarj").checked) {
        transf.disabled = true;
        numtarj.disabled = false;
        codigo.disabled = false;
        fecha.disabled = false;
        transf.value = "";
    }

    if (document.getElementById("formPagTranf").checked) {
        numtarj.disabled = true;
        codigo.disabled = true;
        fecha.disabled = true;
        transf.disabled = false;
        numtarj.value = "";
        codigo.value = "";
        fecha.value = "";
    }
}

function validation() {
    let flag = true;
    let valdentro = document.getElementsByClassName("formuIn");
    let valfuera = document.getElementsByClassName("formuOut");
    let transf = document.getElementById("numbertrans").value;

    //Ningun campo vacío dentro:
    let cuentoDentro = 0;
    for (let i = 0; i < valdentro.length; i++) {
        const element = valdentro[i];
        if (element.value == "" || element.value == "0") {
            cuentoDentro += 1;
        }
        console.log(cuentoDentro);
    }

    if (cuentoDentro > 0) {
        flag = false;
        alert("Debe completar todo los datos del envio")
    }


    //Ningun campo vacío fuera:

    let cuentaFuera = 0;
    if (document.getElementById("formPagTarj").checked) {
        for (let i = 0; i < valfuera.length; i++) {
            const element = valfuera[i];
            if (element.value == "") {
                cuentaFuera += 1;
            }
            console.log(cuentaFuera);
        }
        if (cuentaFuera > 0) {
            flag = false;
            alert("Hay campos incompletos en su tarjeta de credito")
        }
    } else if (document.getElementById("formPagTranf").checked) {
        if (transf == "") {
            flag = false;
            alert("Hay campos incompletos en su transferencias bancaria")
        }
    }
    return flag;
}
let form = document.getElementById("myForm");
form.addEventListener('submit', function (event) {
    if (!validation()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        alert("Su compra fue realizada con exito")
    }
})


function envio() {
    let tipoenvio = document.getElementById("metodoEnv").value;
    let subtotal = parseInt(document.getElementById("subTotalGeneral").innerHTML);

    if (tipoenvio == 1) {
        costoenv = (subtotal * 15) / 100;

    } else if (tipoenvio == 2) {
        costoenv = (subtotal * 7) / 100;
    }
    if (tipoenvio == 3) {
        costoenv = (subtotal * 5) / 100;
    }
    document.getElementById("costoEnvio").innerHTML = costoenv;
    document.getElementById("totalGeneral").innerHTML = subtotal + costoenv;
}


function subTotalGen() {
    let subtotalgen = 0;
    subge = document.getElementsByClassName("subtotalg");
    for (let i = 0; i < subge.length; i++) {
        subtotalgen += parseInt(subge[i].innerHTML);
    }
    document.getElementById("subTotalGeneral").innerHTML = subtotalgen;
    document.getElementById("totalGeneral").innerHTML = subtotalgen;

};


function subTotalArt(a, i) {
    let subTotalA = 0;
    let cantidad = parseInt(document.getElementById(`cant${i}`).value);
    let moneda = compra[i].currency;

    if (moneda == "USD") {
        subTotalA = a * 40 * cantidad
    }
    else {
        subTotalA = a * cantidad
    }

    document.getElementById(`artSub${i}`).innerHTML = subTotalA;
    subTotalGen();
    envio();
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