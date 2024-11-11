// API Key et Channel ID
const apiKey = "AP60E3PC3ULONGWF";  // Remplace par ta clé API de lecture
const fieldID = 1;  // Numéro du champ (Field 1)

async function fetchData() {
    try {
        const response = await fetch(`https://api.thingspeak.com/channels/2739231/fields/${fieldID}.json?api_key=${apiKey}&results=1`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        const lightValue = data.feeds[0].field1;  // Récupère la valeur du champ

        // Sélectionner l'élément d'affichage et mettre à jour la valeur
        const display = document.getElementById("data-display");
        display.textContent = `Données du capteur de lumière : ${lightValue}`;

        // Change la couleur en fonction de la valeur
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

