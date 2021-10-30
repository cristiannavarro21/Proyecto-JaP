
function submitProfile() {
    var name = document.getElementById("name").value;
    localStorage.setItem('name',name);
    var lastname = document.getElementById("lastname").value;
    localStorage.setItem('lastname',lastname);
    var birthdate = document.getElementById("start").value;
    localStorage.setItem('birthdate',birthdate);
    var email = document.getElementById("email").value;
    localStorage.setItem('email',email);
    var city = document.getElementById("ciudad").value;
    localStorage.setItem('city',city)
    var town = document.getElementById("direccion").value;
    localStorage.setItem('town',town)
    var number = document.getElementById("numberhouse").value;
    localStorage.setItem('number',number)
    var contact = document.getElementById("contact").value;
    localStorage.setItem('contact',contact)
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

        
    document.getElementById("name").value = localStorage.getItem('name')
    document.getElementById("lastname").value = localStorage.getItem('lastname')
    document.getElementById("start").value= localStorage.getItem('birthdate')
    document.getElementById("email").value= localStorage.getItem('email')
    document.getElementById("ciudad").value= localStorage.getItem('city')
    document.getElementById("direccion").value= localStorage.getItem('town')
    document.getElementById("numberhouse").value= localStorage.getItem('number')
    document.getElementById("contact").value= localStorage.getItem('contact')
});