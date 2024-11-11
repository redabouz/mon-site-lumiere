// Remplace par ta Read API Key
var apiKey = "AP60E3PC3ULONGWF"; // Clé Read API
var fieldID = "1";  // Numéro de champ (Field 1)

// Fonction pour récupérer les données
function fetchData() {
    var url = "https://api.thingspeak.com/channels/2739231/fields/" + fieldID + ".json?api_key=" + apiKey;

    // Requête AJAX pour récupérer les données
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extraction de la dernière valeur
            var lastEntry = data.feeds[data.feeds.length - 1];
            var lightValue = lastEntry.field1;
            document.getElementById('data-display').textContent = "Données du capteur de lumière : " + lightValue;

            // Mise à jour de la couleur du texte en fonction de la valeur
            var color = (lightValue < 200) ? 'red' : 'green';
            document.getElementById('data-display').style.color = color;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données : ", error);
            document.getElementById('data-display').textContent = "Erreur lors de la récupération des données.";
        });
}

// Récupérer les données toutes les 30 secondes
setInterval(fetchData, 30000);

// Charger les données au démarrage
fetchData();

// Capture de la sélection de l'utilisateur
document.getElementById('user-type').addEventListener('change', function() {
    var selectedValue = this.value;
    alert("Vous avez choisi : " + selectedValue);
});

