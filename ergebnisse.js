document.addEventListener("DOMContentLoaded", () => {
  const ergebnisDiv = document.getElementById("ergebnisse");

  const ergebnisse = JSON.parse(localStorage.getItem("supplementErgebnisse")) || [];

  ergebnisDiv.innerHTML = "<h3>Dein Supplementbedarf:</h3>";

  if (ergebnisse.length === 0) {
    ergebnisDiv.innerHTML += "<p style='text-align:center;'>Keine relevanten Supplements gefunden.</p>";
    return;
  }

  ergebnisse.forEach(supp => {
    let lebensmittelList = "";

    if (supp.lebensmittelAlternativen && supp.lebensmittelAlternativen.length > 0) {
      const firstThree = supp.lebensmittelAlternativen.slice(0, 3);

      firstThree.forEach(alt => {
        const benötigtePortionen = supp.menge / alt.mengeProPortion;
        let anzeigeMenge = "";

        if (alt.portionsGroesse.toLowerCase().includes("stück")) {
          const stueckZahl = Math.ceil(benötigtePortionen);
          anzeigeMenge = `${stueckZahl} ${alt.portionsGroesse}`;
        } else {
          const match = alt.portionsGroesse.match(/([\d,.]+)/);
          if (match) {
            const portionGroesseZahl = parseFloat(match[1].replace(",", "."));
            const gesamtMenge = Math.ceil(benötigtePortionen * portionGroesseZahl);
            const einheit = alt.portionsGroesse.replace(match[0], "").trim();
            anzeigeMenge = `${gesamtMenge} ${einheit}`;
          } else {
            anzeigeMenge = alt.portionsGroesse;
          }
        }

        lebensmittelList += `<li>${anzeigeMenge} ${alt.name}</li>`;
      });
    }

    ergebnisDiv.innerHTML += `
      <div class="supplement-erg" style="margin-bottom: 2rem;">
        <p><strong>${supp.name}:</strong> ${supp.menge} ${supp.einheit}</p>
        ${lebensmittelList ? `<ul>${lebensmittelList}</ul>` : ""}
      </div>
    `;
  });

  document.getElementById("zurueck").addEventListener("click", () => {
    window.location.href = "rechner.html";
  });
});
