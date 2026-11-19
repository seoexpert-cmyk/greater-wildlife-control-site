// French copy for the Quebec pages (/fr/qc/...). English stays the default
// everywhere else; components take `lang` ('en' | 'fr') and read from here.

export const FR_PROVINCES = { qc: 'QC' };

// French place names where they differ from the English ones in cities.json.
export const FR_CITY_NAMES = {
  'greater-montreal': 'Grand Montréal',
  montreal: 'Montréal',
  'greater-quebec-city': 'Grande région de Québec',
  'quebec-city': 'Québec',
  levis: 'Lévis',
};

export const FR_SERVICE_NAMES = {
  'wildlife-control': 'Contrôle de la faune',
  'raccoon-removal': 'Retrait de ratons laveurs',
  'squirrel-removal': "Retrait d'écureuils",
  'skunk-removal': 'Retrait de mouffettes',
  'bird-removal': "Retrait d'oiseaux",
  'bat-removal': 'Retrait de chauves-souris',
  'opossum-removal': "Retrait d'opossums",
  'groundhog-removal': 'Retrait de marmottes',
  'pest-control': 'Extermination et contrôle des parasites',
  restoration: 'Restauration après dommages',
  roofing: 'Réparation de toiture',
};

export const FR_CATEGORIES = {
  'Wildlife Removal': 'Retrait de la faune',
  'Pest Control': 'Contrôle des parasites',
  'Restoration Services': 'Restauration',
  'Roofing Services': 'Toiture',
};

export const frCityName = (city) => FR_CITY_NAMES[city.slug] ?? city.name;

// Only Quebec has French twins for now.
export const hasFrench = (city) => city.province === 'qc';
export const frPath = (city) => `/fr/${city.province}/${city.slug}`;
export const enPath = (city) => `/${city.province}/${city.slug}`;

export const UI = {
  en: {
    tagline: 'Commercial and Residential Services',
    servicesAndLocations: 'Services & Locations',
    getQuote: 'Get a Quote',
    call: 'Call',
    switchLabel: 'Français',
    // Lead form
    steps: ['Service', 'Contact', 'Confirm'],
    pickTitle: 'What do you need help with?',
    pickSub: 'Pick one to get started.',
    contactTitle: 'Your contact details',
    contactSub: "We'll use this to call you back.",
    fullName: 'Full name',
    namePlaceholder: 'Jane Smith',
    nameError: 'Please enter your full name.',
    phone: 'Phone number',
    phoneError: 'Enter a valid phone number (at least 10 digits).',
    email: 'Email',
    optional: '(optional)',
    emailPlaceholder: 'jane@email.com',
    emailError: 'Enter a valid email address.',
    back: 'Back',
    continue: 'Continue',
    confirmTitle: 'Confirm your request',
    confirmSub: 'Double-check the details below.',
    service: 'Service',
    name: 'Name',
    phoneShort: 'Phone',
    general: 'General inquiry',
    privacy: 'Your info goes straight to a trained local operator — no spam, ever.',
    sending: 'Sending...',
    submit: 'Get my free quote',
    submitError: 'Something went wrong. Please try again or call us directly.',
    successTitle: 'Success!',
    successBody: 'Thanks! A local technician will call you shortly.',
  },
  fr: {
    tagline: 'Services résidentiels et commerciaux',
    servicesAndLocations: 'Services et régions',
    getQuote: 'Soumission',
    call: 'Appeler',
    switchLabel: 'English',
    steps: ['Service', 'Coordonnées', 'Confirmation'],
    pickTitle: 'De quoi avez-vous besoin?',
    pickSub: 'Choisissez une option pour commencer.',
    contactTitle: 'Vos coordonnées',
    contactSub: 'Nous les utiliserons pour vous rappeler.',
    fullName: 'Nom complet',
    namePlaceholder: 'Marie Tremblay',
    nameError: 'Veuillez entrer votre nom complet.',
    phone: 'Numéro de téléphone',
    phoneError: 'Entrez un numéro de téléphone valide (au moins 10 chiffres).',
    email: 'Courriel',
    optional: '(facultatif)',
    emailPlaceholder: 'marie@courriel.com',
    emailError: 'Entrez une adresse courriel valide.',
    back: 'Retour',
    continue: 'Continuer',
    confirmTitle: 'Confirmez votre demande',
    confirmSub: 'Vérifiez les renseignements ci-dessous.',
    service: 'Service',
    name: 'Nom',
    phoneShort: 'Téléphone',
    general: 'Demande générale',
    privacy: 'Vos renseignements vont directement à un technicien local qualifié. Aucun pourriel.',
    sending: 'Envoi en cours...',
    submit: 'Obtenir ma soumission gratuite',
    submitError: 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.',
    successTitle: 'Merci!',
    successBody: 'Un technicien local vous appellera sous peu.',
  },
};
