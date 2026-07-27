/* =========================================
   ENHANCE MY RIDE
   MASTER WEBSITE SCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {


    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");


    /*
        MOBILE MENU
    */


    if (menuToggle && navMenu) {


        menuToggle.addEventListener("click", function () {


            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");


            const expanded =
                menuToggle.classList.contains("active");


            menuToggle.setAttribute(
                "aria-expanded",
                expanded
            );


        });



        /*
            CLOSE MENU AFTER CLICK
        */


        const navLinks =
        navMenu.querySelectorAll("a");


        navLinks.forEach(function(link){


            link.addEventListener("click", function(){


                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


            });


        });



        /*
            CLOSE WHEN CLICKING OUTSIDE
        */


        document.addEventListener("click", function(event){


            const clickedMenu =
            navMenu.contains(event.target);


            const clickedButton =
            menuToggle.contains(event.target);



            if(
                !clickedMenu &&
                !clickedButton &&
                navMenu.classList.contains("active")
            ){


                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");


            }


        });



        /*
            RESET MENU ON DESKTOP
        */


        window.addEventListener("resize", function(){


            if(window.innerWidth > 900){


                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");


            }


        });


    }





    /*
        CURRENT YEAR FOOTER
    */


    const year =
    document.getElementById("year");


    if(year){


        year.textContent =
        new Date().getFullYear();


    }



});