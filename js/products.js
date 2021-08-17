var categoriesArray = [];

function showCategoriesList(array){

    
    for (let i = 0; i < array.length; i++) {
                
        let row = "";
        
        row = ` 
            <tr>
             <td>`  + array[i].name + ` </td>
             <td>`  + array[i].description + ` </td>
             <td>`  + array[i].currency + ` </td>
             <td>`  + array[i].cost + ` </td>
             <td> <img height = "200" src = "https://cristiannavarro21.github.io/Proyecto-JaP/` + array[i].imgSrc + `" alt=""></td>
            </tr>` ;

        document.getElementById("data").innerHTML += row;
    };
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});