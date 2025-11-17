import { renderHook, act } from '@testing-library/react'
import { useMapLayers, LayerConfig } from '../useMapLayers'
import { MutableRefObject } from 'react'

describe('useMapLayers', () => {
  let mockMapRef: MutableRefObject<mapboxgl.Map | null>

  beforeEach(() => {
    jest.clearAllMocks()

    mockMapRef = {
      current: null,
    }
  })

  it('should initialize with default layer state', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    expect(result.current.layerState).toHaveLength(4)
    expect(result.current.layerState).toEqual([
      { name: 'expensive', color: '#33a02c', isChecked: false },
      { name: 'good', color: '#ffff99', isChecked: true },
      { name: 'cheap', color: '#6a3d9a', isChecked: true },
      { name: 'american', color: '#a6cee3', isChecked: true },
    ])
  })

  it('should provide setLayerState function', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    expect(result.current.setLayerState).toBeDefined()
    expect(typeof result.current.setLayerState).toBe('function')
  })

  it('should allow updating layer state', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    const newLayerState: LayerConfig[] = [
      { name: 'test', color: '#000000', isChecked: true },
    ]

    act(() => {
      result.current.setLayerState(newLayerState)
    })

    expect(result.current.layerState).toEqual(newLayerState)
  })

  it('should update individual layer properties', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    const updatedLayers = result.current.layerState.map((layer) =>
      layer.name === 'expensive' ? { ...layer, isChecked: true } : layer
    )

    act(() => {
      result.current.setLayerState(updatedLayers)
    })

    const expensiveLayer = result.current.layerState.find(
      (layer) => layer.name === 'expensive'
    )

    expect(expensiveLayer?.isChecked).toBe(true)
  })

  it('should maintain layer state across rerenders', () => {
    const { result, rerender } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    const newLayerState: LayerConfig[] = [
      { name: 'custom', color: '#ff0000', isChecked: false },
    ]

    act(() => {
      result.current.setLayerState(newLayerState)
    })

    rerender()

    expect(result.current.layerState).toEqual(newLayerState)
  })

  it('should have correct default layer colors', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    const layers = result.current.layerState

    expect(layers.find((l) => l.name === 'expensive')?.color).toBe('#33a02c')
    expect(layers.find((l) => l.name === 'good')?.color).toBe('#ffff99')
    expect(layers.find((l) => l.name === 'cheap')?.color).toBe('#6a3d9a')
    expect(layers.find((l) => l.name === 'american')?.color).toBe('#a6cee3')
  })

  it('should have correct default layer checked states', () => {
    const { result } = renderHook(() => useMapLayers({ mapRef: mockMapRef }))

    const layers = result.current.layerState

    expect(layers.find((l) => l.name === 'expensive')?.isChecked).toBe(false)
    expect(layers.find((l) => l.name === 'good')?.isChecked).toBe(true)
    expect(layers.find((l) => l.name === 'cheap')?.isChecked).toBe(true)
    expect(layers.find((l) => l.name === 'american')?.isChecked).toBe(true)
  })
})
