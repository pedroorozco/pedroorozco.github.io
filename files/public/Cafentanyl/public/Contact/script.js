// Javascript for navbar toggle and becoming fixed onscroll

// Setting width of side navigation to 250px
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("footer").style.marginLeft = "250px";
    document.getElementById("main").style.background = "rgba(0, 0, 0, 0.2)";
   // document.querySelector(".contact-container").style.opacity = "0.6";
    
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.clientWidth;

    if (screenWidth < 450) {
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("footer").style.marginLeft = "0";
    } 
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("footer").style.marginLeft = "0";
    document.getElementById("main").style.background = "white";
    document.querySelector(".contact-container").style.opacity = "1";

}

// Adding event listener for making nav fixed when scrolling down
window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".nav-container");
    var header = document.querySelector(".contact-header");

    // Add / remove sticky class based on scroll position
    navbar.classList.toggle("sticky", window.scrollY > 0);

    // Add / remove padding to the top of .contact-header to prevent h1 from going behind navbar when sticky
    header.style.paddingTop = navbar.classList.contains("sticky") ? "170px" : "0";

})
