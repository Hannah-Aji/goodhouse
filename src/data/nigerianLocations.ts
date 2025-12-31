// Nigerian States, Cities, and Localities (Areas) data
// Waterfall logic: State -> City -> Locality

export interface LocationData {
  [state: string]: {
    [city: string]: string[];
  };
}

export const nigerianLocations: LocationData = {
  Lagos: {
    'Lagos Island': [
      'Victoria Island',
      'Ikoyi',
      'Lekki Phase 1',
      'Banana Island',
      'Eko Atlantic',
      'Oniru',
      'Marina',
      'Obalende',
    ],
    'Lagos Mainland': [
      'Yaba',
      'Surulere',
      'Ikeja',
      'Ikeja GRA',
      'Maryland',
      'Ogba',
      'Gbagada',
      'Magodo',
      'Ogudu',
      'Anthony Village',
    ],
    Ikorodu: [
      'Ikorodu Town',
      'Igbogbo',
      'Ijede',
      'Imota',
      'Agric',
    ],
    Ajah: [
      'Ajah',
      'Sangotedo',
      'Lekki Phase 2',
      'Abraham Adesanya',
      'Ogombo',
      'Badore',
    ],
    Epe: [
      'Epe Town',
      'Ibeju-Lekki',
      'Eleko',
      'Awoyaya',
    ],
  },
  Abuja: {
    'Central Area': [
      'Maitama',
      'Asokoro',
      'Wuse',
      'Wuse 2',
      'Garki',
      'Jabi',
      'Utako',
      'Guzape',
      'Life Camp',
      'Katampe',
    ],
    Gwarinpa: [
      'Gwarinpa',
      'Dawaki',
      'Kubwa',
      'Dutse',
    ],
    Lugbe: [
      'Lugbe',
      'Airport Road',
      'Sauka',
    ],
    Gwagwalada: [
      'Gwagwalada',
      'Dobi',
    ],
    Kuje: [
      'Kuje',
      'Coko',
    ],
  },
  Rivers: {
    'Port Harcourt': [
      'GRA Phase 1',
      'GRA Phase 2',
      'Old GRA',
      'New GRA',
      'Trans Amadi',
      'Peter Odili Road',
      'Rumuola',
      'Rumuokoro',
      'D-Line',
      'Elekahia',
    ],
    Obio: [
      'Rumuigbo',
      'Rumuokwuta',
      'Rukpokwu',
    ],
    Bonny: [
      'Bonny Island',
      'Finima',
    ],
  },
  Kano: {
    'Kano Municipal': [
      'Nassarawa GRA',
      'Bompai',
      'Sabon Gari',
      'Fagge',
      'Gyadi Gyadi',
    ],
    Ungogo: [
      'Ungogo',
      'Bachirawa',
    ],
  },
  Oyo: {
    Ibadan: [
      'Bodija',
      'Ring Road',
      'Iyaganku GRA',
      'Old Bodija',
      'New Bodija',
      'Jericho',
      'Agodi GRA',
      'Dugbe',
      'Challenge',
      'Mokola',
    ],
    'Oyo Town': [
      'Oyo Town',
      'Isale Oyo',
    ],
  },
  Delta: {
    Warri: [
      'GRA Warri',
      'Effurun',
      'Ekpan',
      'Enerhen',
    ],
    Asaba: [
      'GRA Asaba',
      'Okpanam',
      'Cable Point',
    ],
  },
  Enugu: {
    'Enugu City': [
      'Independence Layout',
      'GRA Enugu',
      'Trans Ekulu',
      'New Haven',
      'Coal Camp',
      'Achara Layout',
    ],
    Nsukka: [
      'Nsukka Town',
      'University of Nigeria',
    ],
  },
  Kaduna: {
    'Kaduna City': [
      'Barnawa',
      'Malali',
      'Sabon Tasha',
      'Ungwan Rimi',
      'Tudun Wada',
    ],
    Zaria: [
      'Samaru',
      'Sabon Gari Zaria',
    ],
  },
  Anambra: {
    Awka: [
      'Awka GRA',
      'Amawbia',
      'Nibo',
    ],
    Onitsha: [
      'Onitsha GRA',
      'Fegge',
      '3-3',
    ],
  },
  Edo: {
    'Benin City': [
      'GRA Benin',
      'Ring Road Benin',
      'Uselu',
      'Ugbowo',
      'Sapele Road',
    ],
    Ekpoma: [
      'Ekpoma Town',
      'AAU Area',
    ],
  },
  'Cross River': {
    Calabar: [
      'State Housing',
      'Diamond Hill',
      'Marian Road',
      'Satellite Town',
    ],
  },
  Imo: {
    Owerri: [
      'New Owerri',
      'World Bank',
      'Prefab',
      'Ikenegbu',
    ],
  },
  Ogun: {
    Abeokuta: [
      'Ibara GRA',
      'Oke Mosan',
      'Kuto',
    ],
    Ijebu: [
      'Ijebu Ode',
      'Ijebu Igbo',
    ],
  },
  Kwara: {
    Ilorin: [
      'GRA Ilorin',
      'Tanke',
      'Fate',
      'Challenge Ilorin',
    ],
  },
};

// Helper functions
export const getStates = (): string[] => {
  return Object.keys(nigerianLocations);
};

export const getCities = (state: string): string[] => {
  if (!state || !nigerianLocations[state]) return [];
  return Object.keys(nigerianLocations[state]);
};

export const getLocalities = (state: string, city: string): string[] => {
  if (!state || !city || !nigerianLocations[state] || !nigerianLocations[state][city]) return [];
  return nigerianLocations[state][city];
};
