export const LANGUAGE_STORAGE_KEY = "cn23-ui-language";
export const LANGUAGE_CHANGE_EVENT = "cn23-language-change";

export type Language = "it" | "en";

export const isLanguage = (value: string | null): value is Language =>
  value === "it" || value === "en";

type UiCopy = {
  language: string;
  italian: string;
  english: string;
  blog: string;
  faq: string;
  privacy: string;
  backToGenerator: string;
  settings: string;
  settingsTitle: string;
  settingsDescription: string;
  title: string;
  sender: string;
  recipient: string;
  name: string;
  business: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  customsReference: string;
  emailPhoneNumber: string;
  description: string;
  qty: string;
  netWeight: string;
  value: string;
  hsTariff: string;
  totalGrossWeight: string;
  totalValue: string;
  postalCharges: string;
  date: string;
  pickDate: string;
  categoryOfItem: string;
  selectCategory: string;
  gift: string;
  documents: string;
  commercialSample: string;
  returnedGoods: string;
  saleOfGoods: string;
  otherPleaseSpecify: string;
  explanation: string;
  comments: string;
  licence: string;
  certificate: string;
  invoice: string;
  licenceNumber: string;
  certificateNumber: string;
  invoiceNumber: string;
  download: string;
  viewOnGithub: string;
  pdfLoadError: string;
  pdfPageLoadError: string;
};

export const uiCopy: Record<Language, UiCopy> = {
  it: {
    language: "Lingua",
    italian: "Italiano",
    english: "Inglese",
    blog: "Blog",
    faq: "FAQ",
    privacy: "Privacy",
    backToGenerator: "Torna al generatore",
    settings: "Impostazioni",
    settingsTitle: "Impostazioni",
    settingsDescription: "Configura le preferenze dell'interfaccia.",
    title: "Generatore PDF CN23 Poste Italiane",
    sender: "Mittente",
    recipient: "Destinatario",
    name: "Nome",
    business: "Società",
    street: "Via",
    postcode: "CAP",
    city: "Città",
    country: "Paese",
    customsReference: "Riferimento dell'importatore",
    emailPhoneNumber: "Email/Numero di telefono",
    description: "Descrizione",
    qty: "Qtà",
    netWeight: "Peso netto",
    value: "Valore",
    hsTariff: "N. tariff. SH",
    totalGrossWeight: "Peso lordo totale",
    totalValue: "Valore totale",
    postalCharges: "Tassa di affrancatura",
    date: "Data",
    pickDate: "Seleziona una data",
    categoryOfItem: "Categoria dell'articolo",
    selectCategory: "Seleziona una categoria",
    gift: "Regalo",
    documents: "Documenti",
    commercialSample: "Campione commerciale",
    returnedGoods: "Ritorno della merce",
    saleOfGoods: "Beni destinati alla vendita",
    otherPleaseSpecify: "Altro (specificare)",
    explanation: "Spiegazione",
    comments: "Commenti",
    licence: "Licenza",
    certificate: "Certificato",
    invoice: "Fattura",
    licenceNumber: "N. della licenza",
    certificateNumber: "N. del certificato",
    invoiceNumber: "N. della fattura",
    download: "Scarica",
    viewOnGithub: "Vedi su GitHub",
    pdfLoadError: "Errore caricamento PDF",
    pdfPageLoadError: "Errore caricamento pagina PDF",
  },
  en: {
    language: "Language",
    italian: "Italian",
    english: "English",
    blog: "Blog",
    faq: "FAQ",
    privacy: "Privacy",
    backToGenerator: "Back to generator",
    settings: "Settings",
    settingsTitle: "Settings",
    settingsDescription: "Configure the interface preferences.",
    title: "Poste Italiane CN23 PDF Generator",
    sender: "Sender",
    recipient: "Recipient",
    name: "Name",
    business: "Business",
    street: "Street",
    postcode: "Postcode",
    city: "City",
    country: "Country",
    customsReference: "Customs reference",
    emailPhoneNumber: "Email/Phone number",
    description: "Description",
    qty: "Qty",
    netWeight: "Net weight",
    value: "Value",
    hsTariff: "HS tariff #",
    totalGrossWeight: "Total gross weight",
    totalValue: "Total value",
    postalCharges: "Postal charges",
    date: "Date",
    pickDate: "Pick a date",
    categoryOfItem: "Category of item",
    selectCategory: "Select a category",
    gift: "Gift",
    documents: "Documents",
    commercialSample: "Commercial sample",
    returnedGoods: "Returned goods",
    saleOfGoods: "Sale of goods",
    otherPleaseSpecify: "Other (please specify)",
    explanation: "Explanation",
    comments: "Comments",
    licence: "Licence",
    certificate: "Certificate",
    invoice: "Invoice",
    licenceNumber: "Licence number",
    certificateNumber: "Certificate number",
    invoiceNumber: "Invoice number",
    download: "Download",
    viewOnGithub: "View on GitHub",
    pdfLoadError: "PDF Load Error",
    pdfPageLoadError: "PDF Page Load Error",
  },
};
