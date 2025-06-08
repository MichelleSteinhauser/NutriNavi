export const supplements = {
  creatin: {
    name: "Creatin",
    zielgruppen: ["sportler", "maenner", "schueler_studenten"],
    einheit: "g",
    faktor: (user) => {
      let dose = 5;
      if (user.gewicht > 80) dose += 1;
      return dose;
    },
    lebensmittelAlternativen: [
      { name: "Rindfleisch", mengeProPortion: 0.5, portionsGroesse: "100 g" }, // ca. 0,5g Creatin / 100g
      { name: "Lachs", mengeProPortion: 0.45, portionsGroesse: "100 g" },
      { name: "Hühnchen", mengeProPortion: 0.4, portionsGroesse: "100 g" }
    ]
  },

  kalium: {
    name: "Kalium",
    zielgruppen: ["sportler", "gesundheitsbewusst", "bueromensch"],
    einheit: "mg",
    faktor: (user) => {
      if (user.aktivitaet === "hoch") return 4000;
      if (user.aktivitaet === "mittel") return 3500;
      return 3000;
    },
    lebensmittelAlternativen: [
      { name: "Banane", mengeProPortion: 360, portionsGroesse: "100 g" },
      { name: "Kartoffel", mengeProPortion: 420, portionsGroesse: "100 g" },
      { name: "Spinat", mengeProPortion: 560, portionsGroesse: "100 g" }
    ]
  },

  calcium: {
    name: "Calcium",
    zielgruppen: ["senioren", "frauen", "gesundheitsbewusst"],
    einheit: "mg",
    faktor: (user) => {
      if (user.geschlecht === "w" || user.alter > 60) return 1200;
      return 1000;
    },
    lebensmittelAlternativen: [
      { name: "Käse", mengeProPortion: 720, portionsGroesse: "100 g" },
      { name: "Joghurt", mengeProPortion: 150, portionsGroesse: "100 g" },
      { name: "Brokkoli", mengeProPortion: 47, portionsGroesse: "100 g" }
    ]
  },

  protein: {
    name: "Protein",
    zielgruppen: ["sportler", "vegetarier", "veganer"],
    einheit: "g",
    faktor: (user) => {
      let faktor = 1.8;
      if (user.aktivitaet === "hoch") faktor = 2.2;
      if (user.ernaehrung === "vegan") faktor *= 1.1;
      return Math.round(faktor * user.gewicht);
    },
    lebensmittelAlternativen: [
      { name: "Ei", mengeProPortion: 6, portionsGroesse: "Stück" }, // ca. 6g Protein pro Ei
      { name: "Hähnchenbrust", mengeProPortion: 31, portionsGroesse: "100 g" },
      { name: "Tofu", mengeProPortion: 17, portionsGroesse: "100 g" }
    ]
  },

  bcaa: {
    name: "BCAA/EAA",
    zielgruppen: ["sportler"],
    einheit: "g",
    faktor: (user) => {
      return user.aktivitaet === "hoch" ? 10 : 5;
    },
    lebensmittelAlternativen: [
      { name: "Molkeprotein", mengeProPortion: 5, portionsGroesse: "30 g" },
      { name: "Hühnchenbrust", mengeProPortion: 31, portionsGroesse: "100 g" },
      { name: "Quark", mengeProPortion: 12, portionsGroesse: "100 g" }
    ]
  },

  betaAlanine: {
    name: "Beta-Alanin",
    zielgruppen: ["sportler"],
    einheit: "g",
    faktor: () => 3.2,
    lebensmittelAlternativen: [
      { name: "Hähnchenbrust", mengeProPortion: 0.25, portionsGroesse: "100 g" }, // ca. 250mg pro 100g
      { name: "Pute", mengeProPortion: 0.22, portionsGroesse: "100 g" },
      { name: "Rindfleisch", mengeProPortion: 0.2, portionsGroesse: "100 g" }
    ]
  },

  zink: {
    name: "Zink",
    zielgruppen: ["stressgeplagte", "senioren", "bueromensch"],
    einheit: "mg",
    faktor: (user) => 10 + (user.alter > 60 ? 5 : 0),
    lebensmittelAlternativen: [
      { name: "Rindfleisch", mengeProPortion: 4.9, portionsGroesse: "100 g" },
      { name: "Kürbiskerne", mengeProPortion: 7.8, portionsGroesse: "100 g" },
      { name: "Cashewkerne", mengeProPortion: 5.6, portionsGroesse: "100 g" }
    ]
  },

  melatonin: {
    name: "Melatonin",
    zielgruppen: ["schlafgestoerte"],
    einheit: "mg",
    faktor: () => 1,
    lebensmittelAlternativen: [
      { name: "Kirschen", mengeProPortion: 0.13, portionsGroesse: "100 g" },
      { name: "Walnüsse", mengeProPortion: 0.04, portionsGroesse: "100 g" },
      { name: "Mais", mengeProPortion: 0.1, portionsGroesse: "100 g" }
    ]
  },

  ashwagandha: {
    name: "Ashwagandha",
    zielgruppen: ["stressgeplagte", "schlafgestoerte", "gesundheitsbewusst"],
    einheit: "mg",
    faktor: (user) => (user.stress || user.schlaf === "schlecht" ? 600 : 300),
    lebensmittelAlternativen: [
      { name: "Ashwagandha-Wurzeltee", mengeProPortion: 300, portionsGroesse: "Tasse (300 mg)" },
      { name: "Ashwagandha-Pulver", mengeProPortion: 500, portionsGroesse: "Teelöffel (500 mg)" },
      { name: "Ashwagandha-Kapsel", mengeProPortion: 600, portionsGroesse: "1 Kapsel" }
    ]
  },

  magnesium: {
    name: "Magnesium",
    zielgruppen: ["sportler", "stressgeplagte", "schlafgestoerte", "senioren"],
    einheit: "mg",
    faktor: (user) => {
      let dose = 300;
      if (user.stress || user.schlaf === "schlecht" || user.aktivitaet === "hoch") {
        dose = 400;
      }
      return dose;
    },
    lebensmittelAlternativen: [
      { name: "Mandeln", mengeProPortion: 270, portionsGroesse: "100 g" },
      { name: "Spinat", mengeProPortion: 79, portionsGroesse: "100 g" },
      { name: "Kürbiskerne", mengeProPortion: 262, portionsGroesse: "100 g" }
    ]
  },

  ltheanin: {
    name: "L-Theanin",
    zielgruppen: ["stressgeplagte", "gesundheitsbewusst"],
    einheit: "mg",
    faktor: (user) => (user.stress ? 200 : 100),
    lebensmittelAlternativen: [
      { name: "Grüner Tee", mengeProPortion: 20, portionsGroesse: "Tasse (20 mg)" },
      { name: "Schwarzer Tee", mengeProPortion: 10, portionsGroesse: "Tasse (10 mg)" },
      { name: "Matcha Pulver", mengeProPortion: 30, portionsGroesse: "Teelöffel (30 mg)" }
    ]
  },

  vitaminD3K2: {
    name: "Vitamin D3 + K2",
    zielgruppen: ["bueromensch", "senioren", "gesundheitsbewusst"],
    einheit: "IE",
    faktor: (user) => (user.alter > 60 || user.bewegung === "wenig" ? 4000 : 2000),
    lebensmittelAlternativen: [
      { name: "Lachs", mengeProPortion: 600, portionsGroesse: "100 g" },
      { name: "Lebertran", mengeProPortion: 400, portionsGroesse: "1 TL (400 IE)" },
      { name: "Eier", mengeProPortion: 40, portionsGroesse: "1 Stück" }
    ]
  },

  vitaminC: {
    name: "Vitamin C",
    zielgruppen: ["stressgeplagte", "gesundheitsbewusst"],
    einheit: "mg",
    faktor: (user) => 100 + (user.stress ? 50 : 0),
    lebensmittelAlternativen: [
      { name: "Orange", mengeProPortion: 53, portionsGroesse: "100 g" },
      { name: "Paprika", mengeProPortion: 128, portionsGroesse: "100 g" },
      { name: "Kiwi", mengeProPortion: 93, portionsGroesse: "100 g" }
    ]
  },

  probiotika: {
    name: "Probiotika",
    zielgruppen: ["gesundheitsbewusst", "stressgeplagte", "bueromensch"],
    einheit: "KBE (Mrd.)",
    faktor: () => 10,
    lebensmittelAlternativen: [
      { name: "Joghurt", mengeProPortion: 1, portionsGroesse: "100 g" },
      { name: "Sauerkraut", mengeProPortion: 0.5, portionsGroesse: "100 g" },
      { name: "Kefir", mengeProPortion: 1, portionsGroesse: "100 ml" }
    ]
  },

  eisen: {
    name: "Eisen",
    zielgruppen: ["frauen", "veganer", "vegetarier", "schueler_studenten"],
    einheit: "mg",
    faktor: (user) => {
      if (user.geschlecht === "w") return 18;
      if (user.ernaehrung === "vegan" || user.ernaehrung === "vegetarisch") return 14;
      return 10;
    },
    lebensmittelAlternativen: [
      { name: "Rindfleisch", mengeProPortion: 2.6, portionsGroesse: "100 g" },
      { name: "Linsen", mengeProPortion: 3.3, portionsGroesse: "100 g" },
      { name: "Spinat", mengeProPortion: 2.7, portionsGroesse: "100 g" }
    ]
  }
};