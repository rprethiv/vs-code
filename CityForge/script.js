let budget = 10;

let houses = 0;
let hospitals = 0;
let parks = 0;
let factories = 0;
let solarPlants = 0;
let roads = 0;

let population = 50000;

let happiness = 65;
let pollution = 35;
let environment = 70;

let year = 2026;


/* ========================= */
/* HOUSE */
/* ========================= */

document.getElementById("houseButton").addEventListener("click", function() {

    if (budget >= 1) {

        budget = budget - 1;

        houses = houses + 1;

        population = population + 1000;

        document.getElementById("houseCount").textContent = houses;

        document.getElementById("population").textContent =
            Math.round(population);

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="building house">' +
            '<div class="windows"></div>' +
            '<div class="door"></div>' +
            '</div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* HOSPITAL */
/* ========================= */

document.getElementById("hospitalButton").addEventListener("click", function() {

    if (budget >= 2) {

        budget = budget - 2;

        hospitals = hospitals + 1;

        happiness = happiness + 5;


        document.getElementById("hospitalCount").textContent =
            hospitals;

        document.getElementById("happiness").textContent =
            happiness + "%";

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="hospital"></div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* PARK */
/* ========================= */

document.getElementById("parkButton").addEventListener("click", function() {

    if (budget >= 1) {

        budget = budget - 1;

        parks = parks + 1;

        happiness = happiness + 3;


        document.getElementById("parkCount").textContent =
            parks;

        document.getElementById("happiness").textContent =
            happiness + "%";

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="park"></div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* FACTORY */
/* ========================= */

document.getElementById("factoryButton").addEventListener("click", function() {

    if (budget >= 3) {

        budget = budget - 3;

        factories = factories + 1;

        pollution = pollution + 10;


        document.getElementById("factoryCount").textContent =
            factories;

        document.getElementById("pollution").textContent =
            pollution + "%";

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="factory"></div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* SOLAR PLANT */
/* ========================= */

document.getElementById("solarButton").addEventListener("click", function() {

    if (budget >= 2) {

        budget = budget - 2;

        solarPlants = solarPlants + 1;

        environment = environment + 5;


        document.getElementById("solarCount").textContent =
            solarPlants;

        document.getElementById("environment").textContent =
            environment + "%";

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="solar"></div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* ROAD */
/* ========================= */

document.getElementById("roadButton").addEventListener("click", function() {

    if (budget >= 1) {

        budget = budget - 1;

        roads = roads + 1;


        document.getElementById("roadCount").textContent =
            roads;

        document.getElementById("budget").textContent =
            "₹" + budget + " Cr";


        document.getElementById("cityObjects").innerHTML +=

            '<div class="roadObject"></div>';

    }

    else {

        alert("Not enough budget!");

    }

});


/* ========================= */
/* RUN SIMULATION */
/* ========================= */

document.getElementById("simulationButton").addEventListener("click", function() {

    year = year + 1;


    /* POPULATION */

    population = population + population * (

        0.02 +

        houses * 0.001 +

        roads * 0.0005

    );


    /* POLLUTION */

    pollution = pollution + factories * 2;


    /* ENVIRONMENT */

    environment = environment + solarPlants;


    /* HAPPINESS */

    happiness = happiness + parks;

    happiness = happiness + hospitals;


    /* ========================= */
    /* RANDOM EVENTS */
    /* ========================= */


    if (Math.random() < 0.3) {

        happiness = happiness - 5;

        environment = environment - 10;

        alert("🌊 Flood occurred!");

    }


    if (Math.random() < 0.2) {

        pollution = pollution + 15;

        happiness = happiness - 5;

        alert("🏭 Pollution crisis occurred!");

    }


    if (Math.random() < 0.2) {

        population = population + 5000;

        happiness = happiness - 3;

        alert("👥 Population surge occurred!");

    }


    if (Math.random() < 0.15) {

        happiness = happiness - 8;

        environment = environment - 5;

        alert("💧 Water shortage occurred!");

    }


    if (Math.random() < 0.15) {

        environment = environment - 8;

        happiness = happiness - 5;

        alert("⚡ Energy shortage occurred!");

    }


    /* ========================= */
    /* UPDATE SCREEN */
    /* ========================= */

    document.getElementById("year").textContent =
        year;


    document.getElementById("population").textContent =
        Math.round(population);


    document.getElementById("pollution").textContent =
        pollution + "%";


    document.getElementById("happiness").textContent =
        happiness + "%";


    document.getElementById("environment").textContent =
        environment + "%";

});
