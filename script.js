async function fetchData() {
    try {
        const response = await fetch("http://172.20.10.8");
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const lightValue = await response.text();
        
        // Sélectionne l'élément d'affichage et met à jour la valeur
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
