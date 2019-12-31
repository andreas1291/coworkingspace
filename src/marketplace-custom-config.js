/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'wlan',
    label: 'W-LAN',
  },
  {
    key: 'printer',
    label: 'Printer',
  },
  {
    key: 'scanner',
    label: 'Scanner',
  },
  {
    key: 'coffee',
    label: 'Coffee',
  },
  {
    key: 'bristro',
    label: 'Bistro / Bar',
  },
  {
    key: 'parkspace',
    label: 'Parkspace',
  },
  {
    key: 'bikeplace',
    label: 'Bike Place',
  },
  {
    key: 'aircondition',
    label: 'Air Condition',
  },
  {
    key: 'lounge',
    label: 'Lounge',
  },
];

export const categories = [
  { key: 'singledesk', label: 'Single Desk' },
  { key: 'flexdesk', label: 'Flex Desk' },
  { key: 'fixdesk', label: 'Fix Desk' },
  { key: 'meetingroom', label: 'Meeting Room' },
  { key: 'workshoproom', label: 'Workshop Room' },
  { key: 'individual', label: 'Individual' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};


export const spokenlanguages = [
  { key: 'english', label: 'English', label_it: 'Inglese', label_es: 'Inglesa', code: 'en' },
  { key: 'spanish', label: 'Spanish', label_it: 'Spagnolo', label_es: 'Española', code: 'es' },
  // { key: 'italian', label: 'Italian', label_it: 'Italiano', label_es: 'Italiano', code: 'it' },
  { key: 'french', label: 'French', code: 'fr' },
  { key: 'german', label: 'German', code: 'de' },
  // { key: 'dutch', label: 'Dutch', code: 'nl' },
  // { key: 'chinese', label: 'Chinese', code: 'zh' },
];


export const timePickerConfig = {
  min: 0,
  max: 23,
  step: 1,
  startTime: "09:00",
  endTime: "20:00",
  urgentStartTime: "00:00",
  urgentEndTime: "24:00",
  restStartTime: "13:00",
  restEndTime: "13:30",
  marginStartTime: "00:00",
  marginEndTime: "24:00",
};


export const languageCountryConfig = {
  UK: "EN",
  US: "en",
  // IT: "it",
  FR: "fr",
  DE: "de",
  ES: "es",
}

