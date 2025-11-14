import { render, waitFor } from '@testing-library/react'
import mapboxgl from 'mapbox-gl'
import MapboxExplorer from "@/app/components/mapbox/MapboxExplorer"

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
    it('should render the map container', () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const { container } = render(<MapboxExplorer />)

      const mapContainer = container.querySelector('#map-container')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should render map container with correct id', () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const { container } = render(<MapboxExplorer />)

      const mapContainer = container.querySelector('#map-container')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should render map container with correct minimum height style', () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const { container } = render(<MapboxExplorer />)

      const mapContainer = container.querySelector('#map-container')
      expect(mapContainer).toHaveStyle({ minHeight: 'calc(100vh - 260px)' })
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
            center: [35.004776125010544, 48.43349586012707],
            zoom: 10,
          })
        )
      })
    })

    it('should create a new Mapbox Map instance with custom center and zoom', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const customCenter: [number, number] = [-74.006, 40.7128]
      const customZoom = 12

      render(
        <MapboxExplorer
          initialCenter={customCenter}
          initialZoom={customZoom}
        />
      )

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: customCenter,
            zoom: customZoom,
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

  describe('Props', () => {
    it('should accept custom initialCenter prop', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const customCenter: [number, number] = [0, 0]

      render(<MapboxExplorer initialCenter={customCenter} />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: customCenter,
          })
        )
      })
    })

    it('should accept custom initialZoom prop', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const customZoom = 15

      render(<MapboxExplorer initialZoom={customZoom} />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            zoom: customZoom,
          })
        )
      })
    })

    it('should work with different LngLatLike formats', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const centerAsObject = { lng: -122.4194, lat: 37.7749 }

      render(<MapboxExplorer initialCenter={centerAsObject} />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: centerAsObject,
          })
        )
      })
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
    it('should handle zero zoom level', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      render(<MapboxExplorer initialZoom={0} />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            zoom: 0,
          })
        )
      })
    })

    it('should handle negative coordinates', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>
      const negativeCoords: [number, number] = [-180, -90]

      render(<MapboxExplorer initialCenter={negativeCoords} />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledWith(
          expect.objectContaining({
            center: negativeCoords,
          })
        )
      })
    })

    it('should not reinitialize map on re-render', async () => {
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN = 'test-token'
      const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

      const { rerender } = render(<MapboxExplorer />)

      await waitFor(() => {
        expect(MockedMap).toHaveBeenCalledTimes(1)
      })

      rerender(<MapboxExplorer />)

      // Should still only be called once due to empty dependency array in useEffect
      expect(MockedMap).toHaveBeenCalledTimes(1)
    })
  })
})
