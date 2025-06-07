document.addEventListener("DOMContentLoaded", () => {
  const ergebnisDiv = document.getElementById("ergebnisse");

  // Lade die gespeicherten Ergebnisse aus localStorage
  const ergebnisse = JSON.parse(localStorage.getItem("supplementErgebnisse")) || [];

  ergebnisDiv.innerHTML = "<h3>Dein Supplementbedarf:</h3>";

  if (ergebnisse.length === 0) {
    ergebnisDiv.innerHTML += "<p>Keine relevanten Supplements gefunden.</p>";
    return;
  }

  ergebnisse.forEach(supp => {
    let options = "";

    if (supp.lebensmittelAlternativen.length > 0) {
      supp.lebensmittelAlternativen.forEach(alt => {
        // Berechne benötigte Portionen und Menge (hier vereinfacht, falls im Ergebnis nicht schon berechnet)
        const benötigtePortionen = supp.menge / alt.mengeProPortion;
        let anzeigeMenge = "";

        if (alt.portionsGroesse.toLowerCase().includes("stück")) {
          const stueckZahl = Math.ceil(benötigtePortionen);
          anzeigeMenge = `${stueckZahl} ${alt.portionsGroesse}`;
        } else {
          const match = alt.portionsGroesse.match(/([\d,.]+)/);
          if (match) {
            const portionGroesseZahl = parseFloat(match[1].replace(",", "."));
            const gesamtMenge = Math.round(benötigtePortionen * portionGroesseZahl);
            const einheit = alt.portionsGroesse.replace(match[0], "").trim();
            anzeigeMenge = `${gesamtMenge} ${einheit}`;
          } else {
            anzeigeMenge = alt.portionsGroesse;
          }
        }

        options += `<option value="${alt.name}">${anzeigeMenge} ${alt.name}</option>`;
      });
    }

    ergebnisDiv.innerHTML += `
      <div class="supplement-erg" style="margin-bottom: 1em;">
        <p><strong>${supp.name}:</strong> ${supp.menge} ${supp.einheit}</p>
        ${options ? `
          <label for="alt-${supp.name}">Alternative Lebensmittel:</label>
          <select id="alt-${supp.name}">
            ${options}
          </select>
        ` : ""}
      </div>
    `;
  });

  // Optional: Event-Listener für die Dropdowns, wenn du z.B. bei Auswahl etwas ändern willst
  ergebnisDiv.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (event) => {
      console.log("Gewählte Alternative:", event.target.value);
      // Hier kannst du z.B. eine Anzeige aktualisieren oder andere Logik ausführen
    });
  });
});
