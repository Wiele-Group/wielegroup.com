import type { SettlementCopy } from "./types";

export default {
  home: "Accueil", language: "Langue du guide",
  eyebrow: "Guide de l’acquisition et du règlement transfrontaliers",
  title: "Structurer clairement les acquisitions transfrontalières.",
  intro: "Un guide pratique sur les vérifications préalables, les flux de devises, les transferts de registre et le règlement sous la conduite des conseils juridiques au Royaume-Uni, en Europe continentale, en Méditerranée et en Afrique australe.",
  matrix: "Vérifications, séquestre et transfert de registre",
  matrixIntro: "Choisissez une classe d’actifs et une zone de destination pour identifier les points à faire vérifier avant de signer ou de libérer les fonds.",
  assetLabel: "Classe d’actifs", corridorLabel: "Zone de destination",
  fields: ["Titre, registre et autorisations", "Contrôles techniques et provenance", "Séquestre et règlement"],
  assets: [
    {name: "Immobilier de prestige", checks: [
      "Vérifier les pouvoirs du vendeur, le titre, les charges et les autorisations d’acquisition ou d’usage.",
      "Mandater un expert indépendant et rapprocher les limites, l’état du bien et les travaux autorisés des pièces du registre et de l’urbanisme.",
      "Faire consigner par les conseils la protection de l’acompte, les conditions, les actes de transfert et les justificatifs de libération des fonds."]},
    {name: "Superyachts", checks: [
      "Rapprocher la chaîne des titres, l’éligibilité au pavillon, les sûretés et les certificats de radiation ou de transfert.",
      "Commander une expertise indépendante de l’état et des machines ainsi qu’un essai en mer. Vérifier le statut de classe et les prescriptions auprès de la société compétente, le cas échéant.",
      "Fixer le lieu de livraison, les critères de réception et les pièces requises pour coordonner paiement, acte de vente et livraison."]},
    {name: "Automobiles de collection", checks: [
      "Vérifier le titre du vendeur, l’identification du châssis et les documents d’exportation ou d’importation pour la destination retenue.",
      "Confier à un spécialiste de la marque les vérifications des numéros de châssis et de moteur, de l’originalité, des restaurations et de l’état.",
      "Fixer la garde, le transport assuré, la remise des pièces et les justificatifs nécessaires avant le paiement."]},
  ],
  corridors: [
    {name: "Royaume-Uni", titleChecks: [
      "Identifier le système juridique et le registre foncier compétents. Faire confirmer la procédure de transfert par le conseil local.",
      "En cas d’immatriculation britannique, vérifier l’éligibilité, les justificatifs du registre et le statut d’importation.",
      "Vérifier le statut d’importation, les éventuelles homologations et les pièces d’immatriculation."],
      settlement: "Convenir des devises de financement et du contrat avec le conseil et la banque. Confirmer la conversion en GBP et l’heure limite de règlement."},
    {name: "Europe continentale et Malte", titleChecks: [
      "Vérifier la procédure notariale ou d’enregistrement. À Malte, vérifier la licence de l’intermédiaire et les éventuelles autorisations avec le notaire.",
      "Vérifier le pavillon et les justificatifs douaniers ou de TVA selon l’usage et le lieu de livraison, ainsi que le maintien de la classe, le cas échéant.",
      "Confirmer les documents douaniers et d’immatriculation, y compris les preuves de conformité ou de statut de véhicule historique si nécessaire."],
      settlement: "Chiffrer les taxes et droits locaux. Faire convenir des conditions d’acompte et de libération par les conseils et valider la devise et le circuit de paiement avec la banque."},
    {name: "Afrique australe", titleChecks: [
      "Confirmer le registre foncier ou des actes compétent, les autorisations de transfert et le professionnel habilité.",
      "Confirmer le pavillon retenu, les formalités locales d’entrée ou d’importation et les pièces du registre avant de déplacer le yacht.",
      "Confirmer le permis d’importation et l’éligibilité à l’immatriculation avant l’achat, l’expédition ou tout paiement irrévocable."],
      settlement: "Confirmer avec les conseils et la banque la devise, les éventuelles règles de change et les justificatifs à conserver pour un transfert ultérieur."},
  ],
  checklist: "Cinq étapes du mandat à la remise",
  stages: [
    ["Mandat et périmètre", "Consigner le cahier des charges, l’usage, la destination, l’acquéreur, la structure de détention, le budget et la date visée. Identifier le mandant et les conseils avant l’approche des vendeurs."],
    ["Vérifications techniques et juridiques", "Obtenir un rapport écrit sur le titre et les pouvoirs, les expertises indépendantes, la provenance et les autorisations, conditions et points fiscaux encore ouverts."],
    ["Devises et séquestre", "Arrêter le budget tout compris, les devises et le calendrier du change, vérifier les coordonnées bancaires ou de séquestre et convenir des conditions de libération."],
    ["Signature et transfert de registre", "Faire confirmer les pouvoirs, conditions et actes par les conseils. Coordonner la disponibilité des fonds, le dépôt des actes et l’inscription, puis obtenir une preuve écrite."],
    ["Remise et suivi après règlement", "Vérifier la remise des clés ou la garde, l’assurance, les inscriptions, les garanties et les archives. Désigner les responsables des déclarations, renouvellements et travaux restants."],
  ],
  buying: "Échanger sur un mandat d’acquisition", mandates: "Voir les mandats privés",
  governance: "Règlement sous la conduite des conseils juridiques",
  roles: "Wiele assure la commercialisation, la recherche, la mise en relation et l’orientation sur le déroulement de l’opération. Les juristes et fiscalistes mandatés conseillent les parties. Le séquestre, le règlement et le transfert du titre ou du registre relèvent des conseils, banques et professionnels du registre désignés.",
  malta: "Pour les immeubles à Malte, les activités d’intermédiation relevant du chapitre 644 doivent être confiées à un intermédiaire dûment autorisé. Confirmez les modalités et l’identité de l’intermédiaire avec votre notaire ou conseil maltais.",
  sources: "Property Market Agency Act · Malte, chapitre 644",
  directory: "Guides par juridiction et par actif",
  directoryIntro: "Consultez 35 juridictions, dont les différents systèmes du Royaume-Uni. Les guides liés sont en anglais et indiquent leurs sources, dates et limites.",
  country: "Rechercher un pays ou une juridiction", countryPlaceholder: "Par exemple Malta ou Scotland",
  all: "Toutes", clear: "Effacer les filtres", results: "{shown} juridictions sur {total}", noResults: "Aucune juridiction trouvée. Essayez un autre pays ou effacez les filtres.",
  primary: "Zone prioritaire", regions: ["Royaume-Uni", "Union européenne", "Autres pays européens", "Afrique du Sud"],
  referenceLinks: ["Guide d’acquisition à Malte", "Estimation du coût d’acquisition", "Guide de cession transfrontalière", "Registre et importation des yachts", "Importation d’automobiles de collection", "Dossiers illustratifs"],
  faq: "Questions avant de s’engager",
  questions: ["Qui gère le séquestre et le transfert du titre ?", "Qui peut exercer l’intermédiation immobilière réglementée à Malte ?"],
  images: ["Bureau en noyer et lampe en laiton surplombant un port méditerranéen au crépuscule", "Résidence en calcaire et terrasse au-dessus d’une crique à la tombée du jour", "Poupe et pont arrière en teck d’un superyacht amarré à l’heure bleue"],
  illustration: "Scène illustrative",
} satisfies SettlementCopy;
