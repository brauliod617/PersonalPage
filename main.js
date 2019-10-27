button = document.getElementById("topButton");
navBar = document.getElementById("navBar");
vmwBtn = document.getElementById("vmwBtn");
arrow = document.getElementById("arrow");
sideBar = document.getElementById("sideBar");



// Change the arrow of view my work button from right arrow to down arrow on mouse over
vmwBtn.addEventListener("mouseover", function () {
    arrow.classList.add("fa-arrow-down");
    arrow.classList.remove("fa-arrow-right");

});

// Change the arrow of view my work button from down arrow to right arrow on mouse out
vmwBtn.addEventListener("mouseout", function () {
    arrow.classList.remove("fa-arrow-down");
    arrow.classList.add("fa-arrow-right");

});


//Used to make nav bar, side bar and scroll to top button appear once user scrolls past landing page
window.addEventListener("scroll", function() {
    let elementTarget = document.getElementById("aboutMeDiv");
    if(window.scrollY > (elementTarget.offsetHeight)){
        button.style.visibility = "visible";
        // navBar.style.visibility = "visible";
        sideBar.style.visibility = "visible";
    }else{
        button.style.visibility = "hidden";
        // navBar.style.visibility = "hidden";
        sideBar.style.visibility = "hidden";
    }
});