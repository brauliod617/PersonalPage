button = document.getElementById("topButton");
navBar = document.getElementById("navBar");
vmwBtn = document.getElementById("vmwBtn");
arrow = document.getElementById("arrow");
console.log("Hello");

vmwBtn.addEventListener("mouseover", function () {
    console.log("We here");
    arrow.classList.add("fas");
    arrow.classList.add("fa-arrow-down");
    arrow.classList.remove("fa-arrow-right");

});

vmwBtn.addEventListener("mouseout", function () {
    console.log("We out");
    arrow.classList.remove("fa-arrow-down");
    arrow.classList.add("fa-arrow-right");

});

vmwBtn.addEventListener("click", function () {
    let item = document.getElementById("aboutMeDiv");
    let wrapper = document.getElementsByTagName("BODY")[0];
    let count = item.offsetTop - wrapper.scrollTop;
    console.log(count);
    wrapper.scrollBy({top: count, left: 0, behavior: "smooth"});
    console.log("We Down");

});

//Used to make nav bar and scroll to top button appear once user scrolls past landing page
window.addEventListener("scroll", function() {
    let elementTarget = document.getElementById("aboutMeDiv");
    if(window.scrollY > (elementTarget.offsetHeight)){
        button.style.visibility = "visible";
        navBar.style.visibility = "visible";
        console.log("VISIBLE");
    }else{
        button.style.visibility = "hidden";
        navBar.style.visibility = "hidden";
    }
});