import type { SettlementCopy } from "./types";

export default {
  home: "Home", language: "Lingua della guida",
  eyebrow: "Guida all’acquisizione e al regolamento transfrontalieri",
  title: "Strutturare con chiarezza le acquisizioni transfrontaliere.",
  intro: "Una guida pratica alle verifiche preliminari, alle operazioni in valuta, alla trascrizione dei trasferimenti nei registri e al regolamento coordinato dai legali nel Regno Unito, nell’Europa continentale, nel Mediterraneo e nell’Africa australe.",
  matrix: "Verifiche, deposito fiduciario e trasferimento nei registri",
  matrixIntro: "Selezionate la classe di beni e la destinazione per individuare le verifiche da affidare agli specialisti prima della firma o dello svincolo dei fondi.",
  assetLabel: "Classe di beni", corridorLabel: "Area di destinazione",
  fields: ["Titolo, registri e autorizzazioni", "Verifiche tecniche e provenienza", "Deposito fiduciario e regolamento"],
  assets: [
    {name: "Immobili di pregio", checks: [
      "Verificare poteri del venditore, titolo, gravami e permessi di acquisto o di utilizzo.",
      "Commissionare una perizia indipendente e confrontare confini, stato e lavori autorizzati con i documenti catastali, registrali e urbanistici.",
      "Incaricare i legali di documentare la tutela dell’acconto, le condizioni, gli atti di trasferimento e le prove necessarie allo svincolo."]},
    {name: "Superyacht", checks: [
      "Verificare la catena dei titoli, i requisiti di bandiera, i gravami e i certificati di cancellazione o trasferimento.",
      "Commissionare una perizia indipendente su condizioni e macchinari con prova in mare. Ove applicabile, verificare classe e prescrizioni con la società di classificazione.",
      "Definire luogo di consegna, criteri di accettazione e documenti per coordinare atto di vendita, consegna e pagamento."]},
    {name: "Automobili da collezione", checks: [
      "Confrontare il titolo del venditore, l’identità del telaio e i documenti di esportazione o importazione per la destinazione.",
      "Affidare a uno specialista del marchio il riscontro dei numeri di telaio e motore, dell’originalità, dei restauri e delle condizioni.",
      "Concordare custodia, trasporto assicurato, consegna dei documenti e prove richieste prima del pagamento."]},
  ],
  corridors: [
    {name: "Regno Unito", titleChecks: [
      "Individuare ordinamento e registro immobiliare competenti. Far confermare dal legale locale la procedura di trasferimento.",
      "Per l’iscrizione britannica, confermare requisiti, documentazione del registro e status d’importazione.",
      "Confermare status d’importazione, eventuale omologazione e documenti per l’immatricolazione."],
      settlement: "Concordare le valute di contratto e finanziamento con legali e banca. Verificare in anticipo la conversione in GBP e l’orario limite."},
    {name: "Europa continentale e Malta", titleChecks: [
      "Confermare la procedura notarile o registrale. Per gli immobili a Malta, verificare la licenza dell’intermediario e le autorizzazioni con il notaio.",
      "Verificare bandiera e documenti doganali o IVA in funzione di uso e consegna. Se pertinente, confermare la continuità della classe.",
      "Confermare documenti doganali e di immatricolazione, incluse eventuali prove di conformità o di interesse storico."],
      settlement: "Predisporre un prospetto di imposte e dazi. I legali concordano acconto e svincolo, la banca conferma valuta e modalità di trasferimento."},
    {name: "Africa australe", titleChecks: [
      "Confermare il registro immobiliare o degli atti competente, le autorizzazioni e il professionista abilitato.",
      "Confermare bandiera, status locale di ingresso o importazione e documenti del registro prima di spostare lo yacht.",
      "Verificare permessi di importazione e possibilità di immatricolazione prima dell’acquisto, della spedizione o di pagamenti irrevocabili."],
      settlement: "Confermare con banca e legali la valuta di regolamento, eventuali controlli valutari e i documenti da conservare per futuri trasferimenti."},
  ],
  checklist: "Cinque fasi dal mandato alla consegna",
  stages: [
    ["Mandato e perimetro", "Registrare specifiche, uso, destinazione, acquirente, struttura di detenzione, budget e data obiettivo. Identificare mandante e consulenti prima di contattare i venditori."],
    ["Verifiche tecniche e legali", "Ottenere una relazione scritta su titolo e poteri, perizie indipendenti e provenienza, con un elenco di autorizzazioni, questioni fiscali e condizioni aperte."],
    ["Valuta e deposito fiduciario", "Concordare budget complessivo, valute, tempistica del cambio, coordinate bancarie o del deposito verificate e condizioni di svincolo."],
    ["Firma e trasferimento nei registri", "Far verificare poteri, condizioni e atti dai legali. Coordinare fondi disponibili, deposito degli atti e iscrizione, con prova scritta del completamento."],
    ["Consegna e adempimenti successivi", "Verificare chiavi o custodia, assicurazione, registrazioni, garanzie e archivi. Assegnare responsabilità per adempimenti, rinnovi e lavori residui."],
  ],
  buying: "Discutere un mandato d’acquisto", mandates: "Consultare i mandati privati",
  governance: "Regolamento coordinato dai legali",
  roles: "Wiele cura promozione, ricerca, presentazione delle parti e orientamento operativo. I legali e i fiscalisti incaricati forniscono consulenza e definiscono la struttura fiscale. I professionisti designati dalle parti, le banche e i professionisti dei registri curano deposito fiduciario, regolamento e trasferimento.",
  malta: "Per gli immobili a Malta, l’intermediazione disciplinata dal capitolo 644 deve essere svolta da un intermediario munito di licenza. Verificate l’intermediario e le modalità di trasferimento con il notaio o il legale maltese incaricato.",
  sources: "Property Market Agency Act · Malta, capitolo 644",
  directory: "Guide per giurisdizione e tipo di bene",
  directoryIntro: "Consultate 35 giurisdizioni, inclusi i diversi ordinamenti del Regno Unito. Le guide collegate sono in inglese e indicano fonti, date e limiti di copertura.",
  country: "Cercare un paese o una giurisdizione", countryPlaceholder: "Per esempio Malta o Scotland",
  all: "Tutte", clear: "Rimuovere i filtri", results: "{shown} giurisdizioni su {total}", noResults: "Nessuna giurisdizione trovata. Cercate un altro paese o rimuovete i filtri.",
  primary: "Area prioritaria", regions: ["Regno Unito", "Unione europea", "Altri paesi europei", "Sudafrica"],
  referenceLinks: ["Guida all’acquisto a Malta", "Stima del costo di acquisto", "Guida alla vendita transfrontaliera", "Registro e importazione di yacht", "Importazione di automobili da collezione", "Dossier illustrativi"],
  faq: "Domande prima di impegnarsi",
  questions: ["Chi gestisce il deposito fiduciario e il trasferimento del titolo?", "Chi svolge l’intermediazione immobiliare regolamentata a Malta?"],
  images: ["Scrivania in noce con lampada in ottone affacciata su un porto mediterraneo al crepuscolo", "Residenza in calcare con terrazza sopra una baia costiera al tramonto", "Poppa e ponte in teak di un superyacht ormeggiato all’ora blu"],
  illustration: "Scena illustrativa",
} satisfies SettlementCopy;
