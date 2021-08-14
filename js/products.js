//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL)
        .then(result => {

            for (let i = 0; i < result.length; i++) {
                
                let row = "";
                
                row = ` 
                    <tr>
                     <td>`  + result[i].name + ` </td>
                     <td>`  + result[i].description + ` </td>
                     <td>`  + result[i].currency + ` </td>
                     <td>`  + result[i].cost + ` </td>
                     <td> <img height = "70" src = "https://github.com/cristiannavarro21/Proyecto-JaP/img/` + result[i].imgSrc + `.jpg" alt="">  </td>
                    </tr>` ;

                document.getElementById("data").innerHTML += row;
            };
        });

});