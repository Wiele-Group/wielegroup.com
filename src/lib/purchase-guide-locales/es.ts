import type { SettlementCopy } from "./types";

export default {
  home: "Inicio", language: "Idioma de la guía",
  eyebrow: "Guía de adquisición y liquidación transfronterizas",
  title: "Estructurar con claridad las adquisiciones transfronterizas.",
  intro: "Una guía práctica sobre diligencia debida, operaciones en divisas, transferencias registrales y liquidación coordinada por los abogados en el Reino Unido, Europa continental, el Mediterráneo y África austral.",
  matrix: "Diligencia debida, depósito en garantía y transferencia registral",
  matrixIntro: "Seleccione una clase de activo y una zona de destino para conocer las verificaciones que deben realizar los especialistas antes de firmar o liberar los fondos.",
  assetLabel: "Clase de activo", corridorLabel: "Zona de destino",
  fields: ["Título, registro y autorizaciones", "Verificación técnica y procedencia", "Depósito en garantía y liquidación"],
  assets: [
    {name: "Inmuebles de prestigio", checks: [
      "Verifique las facultades del vendedor, el título, las cargas y los permisos de adquisición o uso.",
      "Encargue un informe estructural independiente y coteje límites, estado y obras autorizadas con el registro y la documentación urbanística.",
      "Solicite a los abogados que documenten la protección del anticipo, las condiciones, los documentos de transmisión y los requisitos para liberar fondos."]},
    {name: "Superyates", checks: [
      "Compruebe la cadena de títulos, los requisitos del pabellón, los gravámenes y los certificados de baja o transferencia.",
      "Encargue una inspección independiente del estado y la maquinaria, con prueba de mar. Confirme, cuando proceda, la clase y las prescripciones pendientes con la sociedad de clasificación.",
      "Acuerde el lugar de entrega, los criterios de aceptación y los documentos para coordinar el pago, la escritura de compraventa y la entrega."]},
    {name: "Automóviles de colección", checks: [
      "Coteje el título del vendedor, la identidad del chasis y la documentación de exportación o importación para el destino.",
      "Encargue a un especialista de la marca la comprobación de números de chasis y motor, originalidad, restauraciones y estado.",
      "Defina la custodia, el transporte asegurado, la entrega de documentos y la evidencia necesaria antes del pago."]},
  ],
  corridors: [
    {name: "Reino Unido", titleChecks: [
      "Identifique la jurisdicción británica y el registro de la propiedad competente. Confirme el trámite de transmisión con el abogado local.",
      "Para un registro británico, confirme los requisitos, la documentación registral y la situación de importación.",
      "Confirme el estado de importación, la homologación que proceda y la documentación de matriculación."],
      settlement: "Acuerde las divisas del contrato y de la financiación con el abogado y el banco. Confirme la conversión a GBP y la hora límite de liquidación."},
    {name: "Europa continental y Malta", titleChecks: [
      "Confirme el trámite notarial o registral local. Para un inmueble en Malta, compruebe la licencia del intermediario y consulte los permisos con el notario.",
      "Confirme el pabellón y los justificantes aduaneros o de IVA según el uso y la entrega. Cuando proceda, compruebe la continuidad de la clase.",
      "Confirme los documentos de aduana y matriculación, incluidos los de conformidad o condición de vehículo histórico cuando proceda."],
      settlement: "Prepare un desglose de impuestos y aranceles. Los abogados acuerdan el anticipo y sus condiciones de liberación, y el banco confirma divisa y vía de pago."},
    {name: "África austral", titleChecks: [
      "Confirme el registro de títulos o de la propiedad competente, los permisos de transmisión y el profesional habilitado.",
      "Confirme el pabellón, los requisitos locales de entrada o importación y los documentos registrales antes de trasladar el yate.",
      "Verifique el permiso de importación y la posibilidad de matricular el vehículo antes de comprarlo, enviarlo o hacer un pago irrevocable."],
      settlement: "Confirme con el banco y los abogados la divisa, los posibles controles de cambio y los justificantes necesarios para futuras remesas."},
  ],
  checklist: "Cinco etapas desde el mandato hasta la entrega",
  stages: [
    ["Mandato y alcance", "Documente las especificaciones, uso, destino, comprador, estructura de titularidad, presupuesto y fecha objetivo. Identifique al mandante y sus asesores antes de contactar con vendedores."],
    ["Diligencia técnica y jurídica", "Obtenga un informe escrito sobre título y facultades del vendedor, inspección independiente y procedencia, con una relación de permisos, cuestiones fiscales y condiciones pendientes."],
    ["Divisas y depósito en garantía", "Acuerde el presupuesto total, divisas, momento del cambio, instrucciones bancarias o de depósito verificadas y condiciones de liberación."],
    ["Firma y transferencia registral", "Solicite a los abogados que confirmen facultades, condiciones y documentos. Coordine la disponibilidad de fondos con la presentación e inscripción y obtenga constancia escrita."],
    ["Entrega y seguimiento posterior", "Coteje llaves o custodia, seguro, registros, garantías y archivos. Asigne responsables para trámites, renovaciones y trabajos pendientes."],
  ],
  buying: "Consultar un mandato de adquisición", mandates: "Ver mandatos privados",
  governance: "Liquidación coordinada por los abogados",
  roles: "Wiele presta servicios de comercialización, búsqueda, presentación de las partes y orientación operativa. Los abogados y asesores fiscales designados se ocupan del asesoramiento y la estructura fiscal. Los abogados, bancos y profesionales registrales designados por las partes gestionan el depósito, la liquidación y la transferencia.",
  malta: "Para inmuebles en Malta, las actividades de intermediación sujetas al capítulo 644 deben realizarse mediante un intermediario debidamente autorizado. Confirme el intermediario y los trámites de transmisión con su notario o abogado maltés.",
  sources: "Property Market Agency Act · Malta, capítulo 644",
  directory: "Guías por jurisdicción y tipo de activo",
  directoryIntro: "Consulte 35 jurisdicciones, incluidos los distintos sistemas del Reino Unido. Las guías enlazadas están en inglés y detallan fuentes, fechas y límites de cobertura.",
  country: "Buscar país o jurisdicción", countryPlaceholder: "Por ejemplo, Malta o Scotland",
  all: "Todas", clear: "Quitar filtros", results: "{shown} de {total} jurisdicciones", noResults: "No hay coincidencias. Busque otro país o quite los filtros.",
  primary: "Zona prioritaria", regions: ["Reino Unido", "Unión Europea", "Resto de Europa", "Sudáfrica"],
  referenceLinks: ["Guía de adquisición en Malta", "Estimador del coste de adquisición", "Guía de venta transfronteriza", "Registro e importación de yates", "Importación de automóviles de colección", "Dosieres ilustrativos"],
  faq: "Preguntas antes de asumir compromisos",
  questions: ["¿Quién gestiona el depósito y la transferencia del título?", "¿Quién puede ejercer la intermediación inmobiliaria regulada en Malta?"],
  images: ["Escritorio de nogal con lámpara de latón frente a un puerto mediterráneo al anochecer", "Residencia de piedra caliza con terraza sobre una cala al atardecer", "Popa y cubierta de teca de un superyate amarrado a la hora azul"],
  illustration: "Escena ilustrativa",
} satisfies SettlementCopy;
