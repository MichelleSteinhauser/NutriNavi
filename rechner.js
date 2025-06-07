import { supplements } from "./supplements.js";

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let zielgruppen = Array.from(form.querySelectorAll("input[name='zielgruppen']:checked"))
                            .map(el => el.value);

    const geschlecht = formData.get("geschlecht");
    if (geschlecht === "m") zielgruppen.push("maenner");
    if (geschlecht === "w") zielgruppen.push("frauen");

    if (zielgruppen.length === 0) {
      zielgruppen = [...new Set(Object.values(supplements).flatMap(s => s.zielgruppen))];
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
    window.location.href = "ergebnisse.html";
  });
});
