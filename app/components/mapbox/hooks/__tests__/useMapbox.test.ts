import { renderHook } from '@testing-library/react'
import { useMapbox } from '../useMapbox'
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/app/components/mapbox/constants'
import mapboxgl from 'mapbox-gl'

describe('useMapbox', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useMapbox({
        initialCenter: INITIAL_CENTER
      })
    )

    expect(result.current.mapRef.current).toBeNull()
    expect(result.current.mapContainerRef.current).toBeNull()
    expect(result.current.center).toEqual(INITIAL_CENTER)
    expect(result.current.zoom).toBe(INITIAL_ZOOM)
  })

  it('should not initialize map without token', () => {
    delete process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    const MockedMap = mapboxgl.Map as jest.MockedClass<typeof mapboxgl.Map>

    renderHook(() =>
      useMapbox({
        initialCenter: INITIAL_CENTER
      })
    )

    expect(MockedMap).not.toHaveBeenCalled()
  })

  it('should initialize center state with initialCenter prop', () => {
    const customCenter = { lng: 100.0, lat: 25.0 } as mapboxgl.LngLat

    const { result } = renderHook(() =>
      useMapbox({
        initialCenter: customCenter
      })
    )

    expect(result.current.center).toEqual(customCenter)
  })

  it('should initialize zoom state with default zoom', () => {
    const { result } = renderHook(() =>
      useMapbox({
        initialCenter: INITIAL_CENTER
      })
    )

    expect(result.current.zoom).toBe(INITIAL_ZOOM)
  })

  it('should return mapRef and mapContainerRef', () => {
    const { result } = renderHook(() =>
      useMapbox({
        initialCenter: INITIAL_CENTER
      })
    )

    expect(result.current.mapRef).toBeDefined()
    expect(result.current.mapContainerRef).toBeDefined()
    expect(result.current.mapRef.current).toBeNull()
    expect(result.current.mapContainerRef.current).toBeNull()
  })
})
