import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import mapboxgl from 'mapbox-gl'
import MapboxExplorer from "@/app/components/mapbox/MapboxExplorer"
import {INITIAL_CENTER, INITIAL_ZOOM} from "@/app/components/mapbox/constants"

describe('MapboxExplorer', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Rendering', () => {
    it('should render map container with correct id', () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const { container } = render(<MapboxExplorer />)

      const mapContainer = container.querySelector('#map-container')
      expect(mapContainer).toBeInTheDocument()
    })
  })

  describe('Map Initialization', () => {
    it('should initialize Mapbox with token from environment', async () => {
      const testToken = 'test-mapbox-token'
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = testToken

      render(<MapboxExplorer />)

      await waitFor(() => {
        expect(mapboxgl.accessToken).toBe(testToken)
      })
    })

    it('should create a new Mapbox Map instance with default props', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

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

      render(<MapboxExplorer />)

      expect(MockedMap).not.toHaveBeenCalled()
    })
  })

  describe('Cleanup', () => {
    it('should remove map on unmount', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const mockRemove = jest.fn()
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      MockedMap.mockImplementation(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: mockRemove,
        getCenter: jest.fn(() => ({ lng: 0, lat: 0 })),
        getZoom: jest.fn(() => 10),
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        resize: jest.fn(),
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
      const { unmount } = render(<MapboxExplorer />)

      // Should not throw error
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should not reinitialize map on re-render', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      const { rerender } = render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledTimes(1)
      })

      rerender(<MapboxExplorer />)

      expect(MockedMap).toHaveBeenCalledTimes(1)
    })
  })
})
