import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import mapboxgl from 'mapbox-gl'
import MapboxExplorer from "@/app/components/mapbox/MapboxExplorer"
import {INITIAL_CENTER, INITIAL_ZOOM} from "@/app/components/mapbox/constants"

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

describe('MapboxExplorer', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }

    // Mock navigator.geolocation
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Rendering', () => {
    it('should render map container with correct id', () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      const { container } = render(<MapboxExplorer />)

      const mapContainer = container.querySelector('#map-container')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should render MapInfoBar with coordinates after location is obtained', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(screen.getByText(/Longitude:/)).toBeInTheDocument()
        expect(screen.getByText(/Latitude:/)).toBeInTheDocument()
        expect(screen.getByText(/Zoom:/)).toBeInTheDocument()
      })
    })
  })

  describe('Map Initialization', () => {
    it('should initialize Mapbox with token from environment', async () => {
      const testToken = 'test-mapbox-token'
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = testToken
      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(mapboxgl.accessToken).toBe(testToken)
      })
    })

    it('should create a new Mapbox Map instance with user location', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const userLat = 50.4501
      const userLng = 30.5234

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: userLat,
            longitude: userLng,
          },
        })
      })

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: expect.objectContaining({
              lng: userLng,
              lat: userLat,
            }),
            zoom: INITIAL_ZOOM,
          })
        )
      })
    })

    it('should use default location when geolocation fails', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error({
          code: 1,
          message: 'User denied geolocation',
        })
      })

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM,
          })
        )
      })
    })

    it('should not initialize map without token', () => {
      delete process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      render(<MapboxExplorer />)

      expect(MockedMap).not.toHaveBeenCalled()
    })
  })

  describe('Cleanup', () => {
    it('should remove map on unmount', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const mockRemove = jest.fn()
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      MockedMap.mockImplementation(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: mockRemove,
        getCenter: jest.fn(() => ({ lng: 30.5234, lat: 50.4501 })),
        getZoom: jest.fn(() => 12),
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        resize: jest.fn(),
        loadImage: jest.fn(),
        addImage: jest.fn(),
        addSource: jest.fn(),
        addLayer: jest.fn(),
        getLayer: jest.fn(),
        off: jest.fn(),
      }) as unknown as mapboxgl.Map)

      const { unmount } = render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalled()
      })

      unmount()

      expect(mockRemove).toHaveBeenCalled()
    })

    it('should handle cleanup when map was not initialized', () => {
      delete process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      const { unmount } = render(<MapboxExplorer />)

      // Should not throw error
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should only call Map constructor once during lifecycle', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success({
          coords: {
            latitude: 50.4501,
            longitude: 30.5234,
          },
        })
      })

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalled()
      })

      const initialCallCount = MockedMap.mock.calls.length

      // Map should not reinitialize after it's been created
      expect(initialCallCount).toBeGreaterThanOrEqual(1)
      expect(initialCallCount).toBeLessThanOrEqual(2) // Allow for React 19 double render in dev mode
    })

    it('should handle when geolocation is not available', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      // Remove geolocation from navigator
      const originalGeolocation = global.navigator.geolocation
      // @ts-expect-error - intentionally deleting geolocation for test
      delete global.navigator.geolocation

      render(<MapboxExplorer />)

      // Should fallback to default location
      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM,
          })
        )
      })

      // Restore geolocation
      Object.defineProperty(global.navigator, 'geolocation', {
        value: originalGeolocation,
        writable: true,
        configurable: true,
      })
    })
  })
})
