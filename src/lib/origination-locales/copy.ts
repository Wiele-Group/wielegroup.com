type Triple = readonly [string, string, string];
type Phase = readonly [title: string, objective: string, governance: string, deliverable: string];
type Row = readonly [criterion: string, portal: string, mandate: string];

type Copy = {
 home: string; language: string; eyebrow: string; title: string; intro: string; start: string;
 architecture: string; selection: string; fields: Triple;
 phases: readonly [Phase, Phase, Phase, Phase];
 comparison: string; portal: string; placement: string; rows: readonly Row[];
 terms: string; malta: string; termsLink: string;
 actionTitle: string; selling: string; list: string; mandates: string; valuation: string;
 captions: Triple; illustration: string;
};

export const originationCopy = {
 en: {
  home:"Home",language:"Protocol language",eyebrow:"Proprietary Origination & Capital Placement Protocol",
  title:"Precision Cross-Border Buyer Origination.",
  intro:"How Wiele Group maps verified liquidity, orchestrates multi-jurisdictional private outreach, and delivers qualified principals to counsel-led settlement across the United Kingdom, Continental Europe, the Mediterranean, and Southern Africa.",
  start:"Explore the origination protocol",architecture:"Origination architecture",selection:"Select a phase",
  fields:["Objective","Governance standard","Client deliverable"],
  phases:[
   ["Jurisdictional Liquidity Mapping","Map the London and UK, DACH and Monaco, Malta and Mediterranean, and Cape Town and Southern Africa corridors using comparable transactions, currency parity and evidenced buyer demand.","Agree corridor scope and disclosure permissions before sharing asset details. Distinguish verified liquidity from indications of interest.","Private corridor placement blueprint and comparable benchmark."],
   ["Multi-Language Dossier Curation","Translate architectural, maritime or automotive evidence into a Viewing Room dossier for principals, family offices and their advisers in English, German, French, Italian and Spanish.","Record verified particulars, provenance and evidence gaps. Approve translations, access and disclosures with the owner before circulation.","Dedicated Viewing Room dossier and private syndicate brief."],
   ["Targeted Cross-Border Capital Placement","Approach relevant principals and advisers through approved private wealth and specialist channels. Adjust outreach based on substantive engagement, including dossier requests and inspection readiness.","Use agreed distribution permissions and record why each enquiry progresses. Review disclosure and corridor scope as evidence develops.","Buyer engagement ledger and a principal briefing every two weeks during active placement."],
   ["Principal Qualification & Counsel Handoff","Assess mandate fit and readiness to evidence funds before inspection. Refer formal funds checks, technical surveys and execution to appointed professionals.","The parties’ attorneys and bankers handle agreements, escrow and settlement. A licensed intermediary conducts regulated work for Maltese immovable property under Chapter 644.","Qualified inspection dossier and introduction to appointed counsel."],
  ],
  comparison:"Discretion and open-portal exposure",portal:"Open-portal exposure",placement:"Mandate-led private placement",
  rows:[
   ["Disclosure","Public particulars, asking prices and price-change history may be visible.","Owner-approved disclosure and controlled access to the dossier."],
   ["Buyer reach","Broad exposure and inbound enquiries, with screening determined by the listing process.","Targeted outreach across agreed UK, European, Mediterranean and Southern African corridors."],
   ["Qualification and settlement","Qualification, inspections and closing depend on separate arrangements.","Wiele coordinates mandate fit and introductions. Independent counsel and bankers handle final agreements and settlement."],
   ["Placement commitment","Publication charges and any separate brokerage terms depend on the portal and engagement.","{retainer} per month per asset for placement. {credit} of same-asset net retainers paid is credited against the standard {commission} success commission at an eligible completion."],
  ],
  terms:"Standard terms exclude applicable VAT. The retainer has a {months}-month minimum. Success commission applies to an eligible sale to a Wiele-introduced buyer, subject to law and written terms. The credit is capped at the commission due.",
  malta:"Maltese immovable property requires a Chapter 644 licensed intermediary. Any permitted success fee or referral share requires a separate lawful written arrangement with advance disclosures.",
  termsLink:"Read the seller retainer terms",
  actionTitle:"Start a private mandate",selling:"Explore seller representation",list:"Submit a private mandate",mandates:"View private mandates",valuation:"Open the landed-cost estimator",
  captions:["Walnut chart table and brass compass overlooking a harbour at twilight","Cognac portfolio, brass dividers and fountain pen on slate","Limestone colonnade lit by lanterns above a twilight coast"],illustration:"Illustrative scene",
 },
 de: {
  home:"Startseite",language:"Sprache des Protokolls",eyebrow:"Eigenes Verfahren für Käuferansprache und Kapitalplatzierung",
  title:"Gezielte grenzüberschreitende Käuferansprache.",
  intro:"Wie Wiele Group belegte Liquidität ermittelt, vertrauliche Kontakte über Rechtsgrenzen hinweg koordiniert und geeignete Käufer im Vereinigten Königreich, in Kontinentaleuropa, im Mittelmeerraum und im südlichen Afrika an die beauftragten Rechtsberater übergibt.",
  start:"Verfahren ansehen",architecture:"Vier Phasen der Platzierung",selection:"Phase auswählen",fields:["Ziel","Verfahrensstandard","Ergebnis für den Auftraggeber"],
  phases:[
   ["Liquidität und Käuferkreise nach Region","Vergleichstransaktionen, Währungen und belegte Nachfrage für London und Großbritannien, DACH und Monaco, Malta und den Mittelmeerraum sowie Kapstadt und das südliche Afrika erfassen.","Markt- und Offenlegungsumfang vor Weitergabe von Objektdaten vereinbaren. Belegte Liquidität und erste Interessenbekundungen getrennt bewerten.","Vertraulicher Platzierungsplan nach Region mit Vergleichsdaten."],
   ["Mehrsprachiges Dossier","Architektur-, Schiffs- oder Fahrzeugnachweise in ein Dossier auf Englisch, Deutsch, Französisch, Italienisch und Spanisch überführen.","Belegte Angaben, Provenienz und Lücken dokumentieren. Übersetzungen, Zugriff und Offenlegung vorab freigeben lassen.","Dossier für den Viewing Room und vertrauliches Briefing für ausgewählte Empfänger."],
   ["Gezielte grenzüberschreitende Platzierung","Geeignete Käufer und Berater über freigegebene Vermögens- und Fachkreise ansprechen. Gespräche anhand von Dossieranfragen und Besichtigungsbereitschaft vertiefen.","Verteilungsfreigaben einhalten und die Gründe für die nächste Stufe festhalten.","Übersicht der Käufergespräche und zweiwöchentliches Briefing während der aktiven Platzierung."],
   ["Käuferprüfung und anwaltliche Übergabe","Eignung und Bereitschaft zum Finanzierungsnachweis vor Besichtigungen prüfen. Fachprüfungen und Vollzug an die beauftragten Stellen übergeben.","Anwälte und Banken der Parteien verantworten Verträge, Treuhand und Vollzug. Regulierte Vermittlung für Immobilien in Malta erfolgt gemäß Kapitel 644 durch lizenzierte Vermittler.","Besichtigungsdossier für qualifizierte Interessenten und Kontakt zur beauftragten Rechtsberatung."],
  ],
  comparison:"Diskretion und öffentliche Portale",portal:"Öffentliches Portal",placement:"Private Platzierung im Mandat",rows:[
   ["Offenlegung","Daten, Angebotspreis und Preisverlauf können öffentlich einsehbar sein.","Vom Eigentümer freigegebene Angaben und kontrollierter Dossierzugang."],
   ["Reichweite","Breite Veröffentlichung und eingehende Anfragen nach dem jeweiligen Portalverfahren.","Gezielte Ansprache in vereinbarten Regionen in Großbritannien, Europa, dem Mittelmeerraum und dem südlichen Afrika."],
   ["Prüfung und Vollzug","Prüfung, Besichtigung und Vollzug werden gesondert vereinbart.","Wiele koordiniert Eignungsprüfung und Kontakte. Unabhängige Anwälte und Banken übernehmen Verträge und Vollzug."],
   ["Platzierungsmandat","Veröffentlichungs- und Vermittlungsgebühren hängen vom Portal und Auftrag ab.","{retainer} monatlich je Objekt. {credit} der gezahlten Nettoentgelte für dasselbe Objekt werden bei einem geeigneten Abschluss auf die Standard-Erfolgsprovision von {commission} angerechnet."],
  ],
  terms:"Zuzüglich anwendbarer MwSt. Die Mindestlaufzeit beträgt {months} Monate. Die Erfolgsprovision gilt beim geeigneten Verkauf an einen von Wiele eingeführten Käufer nach Gesetz und schriftlicher Vereinbarung. Die Anrechnung ist auf die Provision begrenzt.",
  malta:"Für Immobilien in Malta ist ein nach Kapitel 644 lizenzierter Vermittler erforderlich. Zulässige Erfolgsgebühren und Vermittlungsanteile erfordern eine gesonderte rechtmäßige schriftliche Vereinbarung und Vorausinformation.",
  termsLink:"Retainer-Bedingungen lesen",actionTitle:"Privates Mandat beginnen",selling:"Verkaufsvertretung ansehen",list:"Privates Mandat einreichen",mandates:"Private Mandate ansehen",valuation:"Rechner für Erwerbskosten öffnen",
  captions:["Walnusstisch mit Kompass und Blick auf den Hafen in der Dämmerung","Lederportfolio, Messingzirkel und Füller auf Schiefer","Beleuchtete Kalksteinkolonnade an der Küste"],illustration:"Illustrative Szene",
 },
 fr: {
  home:"Accueil",language:"Langue du protocole",eyebrow:"Protocole exclusif d’origination et de placement",
  title:"Origination ciblée d’acquéreurs transfrontaliers.",
  intro:"Comment Wiele Group analyse la liquidité documentée, coordonne des démarches privées entre juridictions et présente des acquéreurs qualifiés aux conseils chargés du règlement au Royaume-Uni, en Europe continentale, en Méditerranée et en Afrique australe.",
  start:"Explorer le protocole",architecture:"Les quatre phases d’origination",selection:"Choisir une phase",fields:["Objectif","Gouvernance","Livrable client"],
  phases:[
   ["Cartographie de la liquidité par juridiction","Évaluer Londres et le Royaume-Uni, DACH et Monaco, Malte et la Méditerranée, Le Cap et l’Afrique australe à partir des comparables, des devises et de la demande documentée.","Valider les zones et la diffusion avant de communiquer le dossier. Distinguer liquidité vérifiée et marques d’intérêt.","Plan privé de placement par zone et référentiel de comparables."],
   ["Constitution du dossier multilingue","Présenter les preuves architecturales, maritimes ou automobiles dans un dossier en anglais, allemand, français, italien et espagnol.","Consigner provenance, pièces vérifiées et lacunes. Faire valider les traductions et droits d’accès par le propriétaire.","Dossier de consultation dédié et note de diffusion privée."],
   ["Placement ciblé de capitaux transfrontaliers","Approcher les acquéreurs et conseils par les réseaux patrimoniaux et spécialisés approuvés. Ajuster la démarche selon les demandes de dossier et la préparation des visites.","Respecter les autorisations de diffusion et documenter la progression de chaque échange.","Registre des échanges et point bimensuel avec le mandant pendant le placement actif."],
   ["Qualification des acquéreurs et transfert aux conseils","Évaluer la concordance avec le mandat et la capacité à documenter les fonds avant visite. Confier vérifications, expertises et réalisation aux professionnels mandatés.","Les avocats et banques des parties gèrent les actes, le séquestre et le règlement. Un intermédiaire agréé intervient pour les immeubles maltais relevant du chapitre 644.","Dossier de visite qualifiée et mise en relation avec les conseils mandatés."],
  ],
  comparison:"Discrétion et exposition sur les portails",portal:"Exposition publique",placement:"Placement privé sous mandat",rows:[
   ["Divulgation","Les caractéristiques, le prix affiché et son historique peuvent être publics.","Informations approuvées par le propriétaire et accès contrôlé au dossier."],
   ["Accès aux acquéreurs","Audience large et demandes entrantes selon le dispositif du portail.","Démarches ciblées dans les zones convenues au Royaume-Uni, en Europe, en Méditerranée et en Afrique australe."],
   ["Qualification et règlement","Qualification, visites et règlement dépendent d’accords distincts.","Wiele coordonne la mise en relation. Les conseils et banques indépendants traitent les actes et le règlement."],
   ["Engagement de placement","Les frais de publication et de courtage dépendent du portail et des accords.","{retainer} par mois et par actif. {credit} des honoraires nets versés pour le même actif sont imputés sur la commission standard de {commission} à la réalisation éligible."],
  ],
  terms:"TVA applicable en sus. Engagement minimum de {months} mois. Commission applicable à une vente éligible à un acquéreur présenté par Wiele, sous réserve de la loi et des accords écrits. Crédit plafonné à la commission.",
  malta:"Les immeubles à Malte nécessitent un intermédiaire agréé au titre du chapitre 644. Toute rémunération au succès ou quote-part autorisée exige un accord écrit distinct et licite et une divulgation préalable.",
  termsLink:"Consulter les conditions du mandat",actionTitle:"Engager un mandat privé",selling:"Découvrir la représentation des vendeurs",list:"Soumettre un mandat privé",mandates:"Consulter les mandats privés",valuation:"Ouvrir l’estimateur des coûts",
  captions:["Table de travail en noyer et boussole face à un port au crépuscule","Portfolio en cuir, compas et stylo-plume sur ardoise","Colonnade de calcaire éclairée en bord de mer"],illustration:"Scène illustrative",
 },
 it: {
  home:"Home",language:"Lingua del protocollo",eyebrow:"Protocollo proprietario di origination e collocamento",
  title:"Ricerca mirata di acquirenti transfrontalieri.",
  intro:"Come Wiele Group mappa la liquidità verificata, coordina contatti riservati tra giurisdizioni e introduce acquirenti qualificati agli specialisti del regolamento nel Regno Unito, nell’Europa continentale, nel Mediterraneo e nell’Africa australe.",
  start:"Esplora il protocollo",architecture:"Le quattro fasi del collocamento",selection:"Seleziona una fase",fields:["Obiettivo","Governance","Documento per il cliente"],
  phases:[
   ["Mappatura della liquidità per giurisdizione","Valutare Londra e Regno Unito, DACH e Monaco, Malta e Mediterraneo, Città del Capo e Africa australe tramite comparabili, valute e domanda documentata.","Concordare aree e permessi di divulgazione prima di condividere il bene. Distinguere liquidità verificata e manifestazioni di interesse.","Piano riservato per area e riferimento di operazioni comparabili."],
   ["Preparazione del dossier multilingue","Organizzare la documentazione architettonica, marittima o automobilistica in un dossier in inglese, tedesco, francese, italiano e spagnolo.","Registrare dati verificati, provenienza e lacune. Concordare traduzione, accesso e divulgazione con il proprietario.","Dossier per la sala di consultazione e nota riservata per i destinatari."],
   ["Collocamento transfrontaliero mirato","Contattare acquirenti e consulenti tramite reti patrimoniali e specialistiche approvate. Calibrare i contatti in base alle richieste e alla disponibilità alle ispezioni.","Rispettare i consensi alla distribuzione e documentare le ragioni di ogni avanzamento.","Registro dei contatti e aggiornamento quindicinale durante il collocamento attivo."],
   ["Qualificazione e passaggio agli avvocati","Esaminare la compatibilità con il mandato e la disponibilità a provare i fondi prima della visita. Affidare i controlli, le perizie e la chiusura agli specialisti incaricati.","I legali e le banche delle parti curano contratti, deposito e regolamento. A Malta l’attività regolamentata sugli immobili spetta a un intermediario abilitato secondo il capitolo 644.","Dossier di visita qualificata e presentazione agli avvocati incaricati."],
  ],
  comparison:"Riservatezza ed esposizione sui portali",portal:"Esposizione pubblica",placement:"Collocamento privato su mandato",rows:[
   ["Divulgazione","Dati, prezzi richiesti e storico delle variazioni possono essere pubblici.","Informazioni approvate dal proprietario e accesso controllato al dossier."],
   ["Copertura","Pubblico ampio e richieste in ingresso secondo le modalità del portale.","Contatti mirati nelle aree concordate di Regno Unito, Europa, Mediterraneo e Africa australe."],
   ["Qualificazione e regolamento","Verifiche, visite e chiusura dipendono da accordi separati.","Wiele coordina compatibilità e presentazioni. Legali e banche indipendenti curano contratti e regolamento."],
   ["Impegno di collocamento","Costi di pubblicazione e di intermediazione variabili secondo portale e incarico.","{retainer} al mese per bene. Il {credit} dei compensi netti versati per lo stesso bene viene accreditato sulla commissione standard del {commission} al perfezionamento idoneo."],
  ],
  terms:"IVA applicabile esclusa. Impegno minimo di {months} mesi. Commissione per vendita idonea a un acquirente presentato da Wiele, nel rispetto della legge e degli accordi scritti. Il credito è limitato alla commissione.",
  malta:"Gli immobili a Malta richiedono un intermediario abilitato secondo il capitolo 644. Compensi di successo o quote di segnalazione consentiti richiedono un accordo scritto separato, lecito e comunicato in anticipo.",
  termsLink:"Leggi le condizioni del mandato",actionTitle:"Avvia un mandato privato",selling:"Scopri la rappresentanza di vendita",list:"Presenta un mandato privato",mandates:"Consulta i mandati privati",valuation:"Apri lo stimatore dei costi",
  captions:["Tavolo in noce e bussola davanti a un porto al crepuscolo","Portafoglio in pelle, compasso e penna su ardesia","Colonnato in calcare illuminato sulla costa"],illustration:"Scena illustrativa",
 },
 es: {
  home:"Inicio",language:"Idioma del protocolo",eyebrow:"Protocolo propio de originación y colocación de capital",
  title:"Originación precisa de compradores transfronterizos.",
  intro:"Cómo Wiele Group analiza la liquidez verificada, coordina contactos privados entre jurisdicciones y presenta compradores cualificados a los profesionales de la liquidación en el Reino Unido, Europa continental, el Mediterráneo y África austral.",
  start:"Explorar el protocolo",architecture:"Cuatro fases de originación",selection:"Seleccionar fase",fields:["Objetivo","Gobernanza","Entregable para el cliente"],
  phases:[
   ["Análisis de liquidez por jurisdicción","Evaluar Londres y Reino Unido, DACH y Mónaco, Malta y el Mediterráneo, Ciudad del Cabo y África austral con comparables, divisas y demanda documentada.","Acordar corredores y permisos de divulgación antes de comunicar datos. Distinguir la liquidez verificada de las muestras de interés.","Plan privado de colocación por corredor y referencia de comparables."],
   ["Preparación del dosier multilingüe","Organizar documentación arquitectónica, náutica o automovilística en un dosier en inglés, alemán, francés, italiano y español.","Registrar datos comprobados, procedencia y lagunas. Validar con el propietario la traducción, el acceso y la divulgación.","Dosier de consulta y resumen confidencial para destinatarios autorizados."],
   ["Colocación transfronteriza selectiva","Contactar compradores y asesores mediante redes patrimoniales y especializadas aprobadas. Ajustar la gestión según las solicitudes de dosier y la preparación de visitas.","Respetar los permisos de distribución y documentar por qué avanza cada consulta.","Registro de interacciones y resumen quincenal durante la colocación activa."],
   ["Cualificación y entrega a los abogados","Comprobar el encaje con el mandato y la preparación para acreditar fondos antes de visitar. Remitir comprobaciones, inspecciones y cierre a los profesionales designados.","Abogados y bancos de las partes gestionan contratos, depósito y liquidación. En Malta interviene un intermediario habilitado conforme al capítulo 644.","Dosier de inspección cualificada y presentación a los abogados designados."],
  ],
  comparison:"Discreción y exposición en portales",portal:"Exposición pública",placement:"Colocación privada por mandato",rows:[
   ["Divulgación","El público puede ver características, precios e historial de cambios.","Información aprobada por el propietario y acceso controlado al dosier."],
   ["Alcance","Difusión amplia y consultas según las condiciones del portal.","Contactos selectivos en los corredores acordados del Reino Unido, Europa, Mediterráneo y África austral."],
   ["Cualificación y liquidación","Comprobaciones, visitas y cierre dependen de acuerdos separados.","Wiele coordina la adecuación al mandato y las presentaciones. Abogados y bancos independientes formalizan y liquidan."],
   ["Compromiso de colocación","Los cargos de publicación e intermediación dependen del portal y del encargo.","{retainer} al mes por activo. El {credit} de los honorarios netos abonados para ese mismo activo se descuenta de la comisión estándar del {commission} en un cierre elegible."],
  ],
  terms:"IVA aplicable excluido. Compromiso mínimo de {months} meses. La comisión se aplica a operaciones elegibles con compradores presentados por Wiele, conforme a la ley y el acuerdo escrito. El crédito se limita a la comisión.",
  malta:"Los inmuebles en Malta requieren un intermediario autorizado conforme al capítulo 644. Las comisiones o participaciones permitidas requieren acuerdo lícito separado, por escrito y con información anticipada.",
  termsLink:"Leer las condiciones del mandato",actionTitle:"Iniciar un mandato privado",selling:"Explorar la representación de venta",list:"Presentar un mandato privado",mandates:"Ver mandatos privados",valuation:"Abrir el estimador de costes",
  captions:["Mesa de nogal y brújula frente a un puerto al anochecer","Cartera de piel, compás y pluma sobre pizarra","Columnata iluminada de piedra caliza sobre el mar"],illustration:"Escena ilustrativa",
 },
} satisfies Record<string, Copy>;
