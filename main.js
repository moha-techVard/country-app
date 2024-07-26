document.addEventListener("DOMContentLoaded", () => {
  const country = document.getElementById("country");
  const submit = document.getElementById("submit");
  const results = document.getElementById("results");

  submit.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le rafraîchissement de la page
    const name = country.value.trim(); // Récupère le nom du pays
    if (name) {
      await app(name); // Appelle la fonction app avec le nom du pays
    } else {
      results.innerHTML = "<p>Please enter a country name.</p>"; // Affiche un message si le champ est vide
    }
  });

  async function app(name) {
    const url = `https://restcountries.com/v3.1/translation/${name}`;
    try {
      const response = await fetch(url); // Attend la réponse de fetch
      if (!response.ok) {
        // Vérifie si la réponse est correcte
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Attend que les données soient transformées en JSON
      console.log(data);
      result(data); // Appelle la fonction result avec les données récupérées
    } catch (error) {
      console.error("Error fetching data:", error); // Gère les erreurs
      results.innerHTML = "<p>Error fetching data. Please try again.</p>"; // Affiche un message d'erreur
    }
  }

  function result(data) {
    if (data && data[0]) {
      const countryData = data[0]; // Récupère les données du premier pays
      results.innerHTML = `
        <h1><strong>Country Name:</strong> ${countryData.name.common}</h1>
        <h2><strong>Capital:</strong> ${
          countryData.capital ? countryData.capital[0] : "N/A"
        }</h2>
        <h3><strong>Population:</strong> ${countryData.population}</h3>
        <h4><strong>Area:</strong> ${countryData.area} km²</h4>
        <h5><strong>Currency:</strong> ${
          countryData.currencies
            ? Object.values(countryData.currencies)[0].name
            : "N/A"
        }</h5>
        <img src="${countryData.flags.png}" />
      `;
    } else {
      results.innerHTML = "<p>Country not found. Please try again.</p>"; // Affiche un message si le pays n'est pas trouvé
    }
  }
});
