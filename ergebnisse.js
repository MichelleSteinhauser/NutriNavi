document.addEventListener("DOMContentLoaded", () => {
  const ergebnisDiv = document.getElementById("ergebnisse");

  // Ergebnisse aus localStorage laden
  const ergebnisse = JSON.parse(localStorage.getItem("supplementErgebnisse")) || [];

  if (ergebnisse.length === 0) {
    ergebnisDiv.innerHTML = "<p style='text-align:center;'>Keine relevanten Supplements gefunden.</p>";
    return;
  }

  ergebnisse.forEach(supp => {
    let options = "";

    if (supp.lebensmittelAlternativen && supp.lebensmittelAlternativen.length > 0) {
      // Nur die ersten 3 Lebensmittel anzeigen
      supp.lebensmittelAlternativen.slice(0, 3).forEach(alt => {
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

        options += `<option>${anzeigeMenge} ${alt.name}</option>`;
      });
    }

    ergebnisDiv.innerHTML += `
      <div class="supplement-erg">
        <p><strong>${supp.name}:</strong> ${supp.menge} ${supp.einheit}</p>
        ${options ? `
          <label>Alternative Lebensmittel:</label>
          <select disabled>
            ${options}
          </select>
        ` : ""}
      </div>
    `;
  });
});
