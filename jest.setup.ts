import '@testing-library/jest-dom'

// Mock Mapbox GL JS
jest.mock('mapbox-gl', () => ({
  __esModule: true,
  default: {
    Map: jest.fn(() => ({
      addControl: jest.fn(),
      on: jest.fn(),
      remove: jest.fn(),
      getCenter: jest.fn(() => ({ lng: 0, lat: 0 })),
      getZoom: jest.fn(() => 10),
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      resize: jest.fn(),
    })),
    NavigationControl: jest.fn(),
    Marker: jest.fn(() => ({
      setLngLat: jest.fn().mockReturnThis(),
      addTo: jest.fn().mockReturnThis(),
      remove: jest.fn(),
      getElement: jest.fn(() => document.createElement('div')),
      setPopup: jest.fn().mockReturnThis(),
    })),
    Popup: jest.fn(() => ({
      setLngLat: jest.fn().mockReturnThis(),
      setHTML: jest.fn().mockReturnThis(),
      addTo: jest.fn().mockReturnThis(),
      remove: jest.fn(),
    })),
    accessToken: '',
  },
  LngLatLike: {},
}))

// Mock Mapbox Geocoder
jest.mock('@mapbox/mapbox-gl-geocoder', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    addTo: jest.fn(),
    clear: jest.fn(),
  }))
})

// Mock CSS imports
jest.mock('mapbox-gl/dist/mapbox-gl.css', () => ({}))
jest.mock('@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css', () => ({}))
