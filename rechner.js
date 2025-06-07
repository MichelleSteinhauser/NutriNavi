import { supplements } from "./supplements.js"; // relativer Pfad anpassen falls nötig

function berechneBedarf(user) {
  return Object.values(supplements)
    .filter(supp => supp.zielgruppen.some(zg => user.zielgruppen.includes(zg)))
    .map(supp => {
      const menge = typeof supp.faktor === "function" ? supp.faktor(user) : supp.faktor;
      return {
        name: supp.name,
        menge: Number(menge.toFixed(1)),
        einheit: supp.einheit,
        lebensmittelAlternativen: supp.lebensmittelAlternativen || []
      };
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rechnerForm");
  const ergebnisDiv = document.getElementById("ergebnisse");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    let zielgruppen = [];
    form.querySelectorAll("input[name='zielgruppen']:checked").forEach(el => {
      zielgruppen.push(el.value);
    });

    const geschlecht = formData.get("geschlecht");
    if (geschlecht === "m") zielgruppen.push("maenner");
    if (geschlecht === "w") zielgruppen.push("frauen");

    if (zielgruppen.length === 0) {
      zielgruppen = [...new Set(Object.values(supplements).flatMap(supp => supp.zielgruppen))];
    }

    const user = {
      geschlecht,
      alter: parseInt(formData.get("alter")),
      gewicht: parseFloat(formData.get("gewicht")),
      ernaehrung: formData.get("ernaehrung"),
      aktivitaet: formData.get("aktivitaet"),
      stress: formData.get("stress") === "true",
      schlaf: formData.get("schlaf"),
      bewegung: formData.get("bewegung"),
      zielgruppen
    };

    const ergebnisse = berechneBedarf(user);

    localStorage.setItem("supplementErgebnisse", JSON.stringify(ergebnisse));

    ergebnisDiv.innerHTML = "<h3>Dein Supplementbedarf:</h3>";

    if (ergebnisse.length === 0) {
      ergebnisDiv.innerHTML += "<p>Keine relevanten Supplements gefunden.</p>";
    } else {
      ergebnisse.forEach(supp => {
        let options = "";

        if (supp.lebensmittelAlternativen.length > 0) {
          supp.lebensmittelAlternativen.forEach(alt => {
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
              <select id="alt-${supp.name}">${options}</select>
            ` : ""}
          </div>
        `;
      });
    }
  });
});
