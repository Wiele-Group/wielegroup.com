import type { SettlementCopy } from "./types";

export default {
  home: "Startseite", language: "Sprache des Leitfadens",
  eyebrow: "Leitfaden für grenzüberschreitenden Erwerb und Vollzug",
  title: "Grenzüberschreitende Erwerbe klar strukturieren.",
  intro: "Ein Praxisleitfaden zu Sorgfaltsprüfung, Währungsabwicklung, Registerumschreibung und anwaltlich begleitetem Vollzug im Vereinigten Königreich, in Kontinentaleuropa, im Mittelmeerraum und im südlichen Afrika.",
  matrix: "Sorgfaltsprüfung, Treuhand & Registerumschreibung",
  matrixIntro: "Wählen Sie Anlageklasse und Zielregion. Die Übersicht zeigt, was Ihre Fachleute vor der Unterschrift oder Zahlungsfreigabe prüfen sollten.",
  assetLabel: "Anlageklasse", corridorLabel: "Zielregion",
  fields: ["Eigentum, Register & Zulassungen", "Technik & Provenienz", "Treuhand & Vollzug"],
  assets: [
    {name: "Erstklassige Immobilien", checks: [
      "Verfügungsbefugnis des Verkäufers, Eigentum, Belastungen und Erwerbs- oder Nutzungsgenehmigungen prüfen.",
      "Ein unabhängiges Baugutachten einholen und Grenzen, Zustand und genehmigte Arbeiten mit Grundbuch und Bauakten abgleichen.",
      "Die Rechtsberatung dokumentiert Anzahlungsschutz, Bedingungen, Übertragungsunterlagen und Nachweise für die Zahlungsfreigabe."]},
    {name: "Superyachten", checks: [
      "Eigentümerkette, Flaggenberechtigung, Pfandrechte und Löschungs- oder Übertragungsbescheinigungen abgleichen.",
      "Unabhängige Zustands- und Maschinenprüfung samt Probefahrt beauftragen. Gegebenenfalls Klasse und offene Auflagen bei der Klassifikationsgesellschaft prüfen.",
      "Lieferort, Abnahmekriterien und Dokumente für die gleichzeitige Freigabe von Kaufurkunde, Schiff und Zahlung vereinbaren."]},
    {name: "Sammlerautomobile", checks: [
      "Eigentum des Verkäufers, Fahrgestellnummer und Aus- oder Einfuhrdokumente für das Zielland abgleichen.",
      "Markenfachleute prüfen Fahrgestell- und Motornummern, Originalität, Restaurierungen und Zustand anhand der Provenienzunterlagen.",
      "Verwahrung, versicherten Transport, Dokumentenübergabe und Voraussetzungen für die Zahlungsfreigabe festlegen."]},
  ],
  corridors: [
    {name: "Vereinigtes Königreich", titleChecks: [
      "Die zuständige britische Rechtsordnung und das Grundbuch bestimmen. Die örtliche Rechtsberatung bestätigt den Übertragungsweg.",
      "Bei britischer Registrierung Berechtigung, Registernachweise und Einfuhrstatus vorab klären.",
      "Einfuhrstatus, erforderliche Straßenzulassung und Registrierungsnachweise klären."],
      settlement: "Vertrags- und Finanzierungswährung mit Bank und Rechtsberatung abstimmen. GBP-Umtausch und Annahmeschluss vor dem Vollzug bestätigen lassen."},
    {name: "Kontinentaleuropa & Malta", titleChecks: [
      "Das örtliche Notar- oder Registerverfahren klären. Bei maltesischen Immobilien die Vermittlerlizenz prüfen und Erwerbsgenehmigungen notariell abklären.",
      "Flagge, Zoll- oder MwSt.-Nachweise für Nutzung und Lieferort sowie gegebenenfalls Fortbestand der Klasse prüfen.",
      "Zoll- und Zulassungsunterlagen des Ziellandes klären, gegebenenfalls mit Konformitäts- oder Oldtimernachweis."],
      settlement: "Örtliche Steuern und Abgaben erfassen. Die Rechtsberatung vereinbart Anzahlung und Freigabe, die Bank bestätigt Währung und Überweisungsweg."},
    {name: "Südliches Afrika", titleChecks: [
      "Das zuständige Urkunden- oder Grundbuchverfahren, Übertragungsgenehmigungen und zugelassene Fachleute bestimmen.",
      "Flagge, örtliche Einreise- oder Einfuhrvoraussetzungen und Registerpapiere vor dem Verholen der Yacht klären.",
      "Einfuhrgenehmigung und Zulassungsfähigkeit im Zielland vor Kauf, Versand oder unwiderruflicher Zahlung klären."],
      settlement: "Abwicklungswährung, mögliche Devisenkontrollen und Nachweise für spätere Rücküberweisungen mit Bank und Rechtsberatung klären."},
  ],
  checklist: "Fünf Schritte vom Mandat bis zur Übergabe",
  stages: [
    ["Mandat & Umfang", "Anforderungen, Nutzung, Zielland, Erwerber, Haltestruktur, Budget und Wunschdatum schriftlich festlegen. Auftraggeber und Berater vor der Verkäuferansprache benennen."],
    ["Technische & rechtliche Prüfung", "Schriftliche Prüfung von Eigentum und Verkäuferbefugnis, unabhängige Gutachten und Provenienzbefunde sowie eine Liste offener Genehmigungen, Steuerfragen und Bedingungen einholen."],
    ["Währung & Treuhand", "Gesamtbudget, Finanzierungs- und Vertragswährung, Wechselzeitpunkt, verifizierte Bank- oder Treuhanddaten und vertragliche Freigabebedingungen vereinbaren."],
    ["Vertrag & Registerumschreibung", "Die Rechtsberatung überprüft Zeichnungsbefugnis, Bedingungen und Vollzugsunterlagen. Geldeingang, Einreichung und Übertragung abstimmen und schriftlich belegen."],
    ["Übergabe & Nachbetreuung", "Schlüssel oder Verwahrung, Versicherung, Registereinträge, Garantien und Akten abgleichen. Zuständigkeiten für Meldungen, Verlängerungen und Restarbeiten festlegen."],
  ],
  buying: "Erwerbsmandat besprechen", mandates: "Private Mandate ansehen",
  governance: "Anwaltlich begleiteter Vollzug",
  roles: "Wiele übernimmt Vermarktung, Anbahnung und Kontaktvermittlung und gibt Orientierung zum Ablauf. Beauftragte Rechts- und Steuerberater verantworten Rechtsberatung und steuerliche Strukturierung. Die von den Parteien bestellten Rechtsberater, Banken und Registerfachleute koordinieren Treuhand, Zahlung und Übertragung.",
  malta: "Bei maltesischen Immobilien muss die durch Kapitel 644 geregelte Vermittlung durch entsprechend lizenzierte Vermittler erfolgen. Klären Sie Vermittlung und Übertragung mit Ihrem beauftragten maltesischen Notar oder Rechtsbeistand.",
  sources: "Property Market Agency Act · Malta, Kapitel 644",
  directory: "Länder- und Anlageleitfäden",
  directoryIntro: "35 Rechtsordnungen, darunter die einzelnen britischen Rechtssysteme. Die verlinkten Länder- und Fachleitfäden sind auf Englisch und enthalten Quellen, Datumsangaben und Geltungsgrenzen.",
  country: "Land oder Rechtsordnung suchen", countryPlaceholder: "Zum Beispiel Malta oder Scotland",
  all: "Alle", clear: "Filter zurücksetzen", results: "{shown} von {total} Rechtsordnungen", noResults: "Keine Treffer. Wählen Sie ein anderes Land oder setzen Sie die Filter zurück.",
  primary: "Schwerpunktregion", regions: ["Vereinigtes Königreich", "Europäische Union", "Übriges Europa", "Südafrika"],
  referenceLinks: ["Malta-Erwerbsleitfaden", "Schätzer für Gesamterwerbskosten", "Leitfaden für grenzüberschreitenden Verkauf", "Yachtregister und Einfuhr", "Einfuhr von Sammlerautomobilen", "Beispieldossiers"],
  faq: "Fragen vor dem Abschluss",
  questions: ["Wer koordiniert Treuhand und Eigentumsübertragung?", "Wer darf regulierte Immobilienvermittlung in Malta übernehmen?"],
  images: ["Walnussschreibtisch mit Messinglampe über einem Mittelmeerhafen im Abendlicht", "Kalksteinvilla mit Terrasse über einer Küstenbucht in der Dämmerung", "Teak-Achterdeck und Heck einer vertäuten Superyacht zur blauen Stunde"],
  illustration: "Illustrative Szene",
} satisfies SettlementCopy;
