button = document.getElementById("topButton");

window.addEventListener("scroll", function() {
    let elementTarget = document.getElementById("aboutMeDiv");
    if(window.scrollY > (elementTarget.offsetHeight)){
        button.style.visibility = "visible";
        console.log("VISIBLE");
    }else{
        button.style.visibility = "hidden";
    }


});