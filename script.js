async function fetchData() {
    try {
        console.log("Fetching data...");

        // Utilisation de CORS Anywhere pour contourner le problème CORS
        const response = await fetch('https://cors-anywhere.herokuapp.com/http://172.20.10.8'); // L'URL de votre Arduino

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const lightValue = await response.text();
        console.log("Données récupérées :", lightValue);

        // Mettre à jour l'affichage
        const display = document.getElementById("data-display");
        display.textContent = `Données du capteur de lumière : ${lightValue}`;

        // Changer la couleur en fonction de la valeur
        if (parseInt(lightValue) < 200) {
            display.classList.add("red");
            display.classList.remove("green");
        } else {
            display.classList.add("green");
            display.classList.remove("red");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        document.getElementById("data-display").textContent = `Erreur : ${error.message}`;
    }
}

// Récupère les données toutes les 5 secondes automatiquement
setInterval(fetchData, 5000);

// Charger les données au démarrage
fetchData();


