import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-london',
    predictionPlace: {
      address: 'London, United Kindom',
      bounds: new LatLngBounds(new LatLng(51.507351, 0.127758), new LatLng(51.507351, -0.327758)),
    },
  },
  {
    id: 'default-newyork',
    predictionPlace: {
      address: 'New York, United States',
      bounds: new LatLngBounds(new LatLng(40.712776, -72.005974), new LatLng(40.712776, -76.005974)),
    },
  },
  {
    id: 'default-sanfrancisco',
    predictionPlace: {
      address: 'San Francisco, United States',
      bounds: new LatLngBounds(new LatLng(37.774929, -120.419418), new LatLng(37.774929, -124.419418)),
    },
  },
];
