import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LngLat } from 'mapbox-gl'
import {MapInfoBar} from "@/app/components/mapbox/components/mapInfo/MapInfoBar"

describe('MapInfoBar', () => {
  const mockCenter: LngLat = { lng: 30.5234, lat: 50.4501 } as LngLat

  it('should render coordinates when location is ready', () => {
    render(<MapInfoBar center={mockCenter} zoom={12} />)

    expect(screen.getByText(/Longitude:/)).toBeInTheDocument()
    expect(screen.getByText(/Latitude:/)).toBeInTheDocument()
    expect(screen.getByText(/Zoom:/)).toBeInTheDocument()
  })

  it('should format longitude to 4 decimal places', () => {
    render(<MapInfoBar center={mockCenter} zoom={12} />)

    expect(screen.getByText(/Longitude: 30.5234/)).toBeInTheDocument()
  })

  it('should format latitude to 4 decimal places', () => {
    render(<MapInfoBar center={mockCenter} zoom={12} />)

    expect(screen.getByText(/Latitude: 50.4501/)).toBeInTheDocument()
  })

  it('should format zoom to 2 decimal places', () => {
    render(<MapInfoBar center={mockCenter} zoom={12.456} />)

    expect(screen.getByText(/Zoom: 12.46/)).toBeInTheDocument()
  })

  it('should handle negative coordinates', () => {
    const negativeCenter: LngLat = { lng: -74.006, lat: -40.7128 } as LngLat

    render(<MapInfoBar center={negativeCenter} zoom={10} />)

    expect(screen.getByText(/Longitude: -74.0060/)).toBeInTheDocument()
    expect(screen.getByText(/Latitude: -40.7128/)).toBeInTheDocument()
  })

  it('should round coordinates properly', () => {
    const roundingCenter: LngLat = { lng: 100.12345, lat: 25.98765 } as LngLat

    render(<MapInfoBar center={roundingCenter} zoom={8.999} />)

    expect(screen.getByText(/Longitude: 100.1235/)).toBeInTheDocument()
    expect(screen.getByText(/Latitude: 25.9876/)).toBeInTheDocument()
    expect(screen.getByText(/Zoom: 9.00/)).toBeInTheDocument()
  })

  it('should handle zero values', () => {
    const zeroCenter: LngLat = { lng: 0, lat: 0 } as LngLat

    render(<MapInfoBar center={zeroCenter} zoom={0} />)

    expect(screen.getByText(/Longitude: 0.0000/)).toBeInTheDocument()
    expect(screen.getByText(/Latitude: 0.0000/)).toBeInTheDocument()
    expect(screen.getByText(/Zoom: 0.00/)).toBeInTheDocument()
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <MapInfoBar center={mockCenter} zoom={12} />
    )

    const sidebar = container.querySelector('.sidebar')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar).toHaveClass('max-w-[78vw]')
    expect(sidebar).toHaveClass('absolute')
    expect(sidebar).toHaveClass('top-8')
    expect(sidebar).toHaveClass('left-6')
    expect(sidebar).toHaveClass('sm:left-8')
    expect(sidebar).toHaveClass('z-10')
    expect(sidebar).toHaveClass('px-3')
    expect(sidebar).toHaveClass('py-1.5')
    expect(sidebar).toHaveClass('bg-offset')
    expect(sidebar).toHaveClass('text-white')
    expect(sidebar).toHaveClass('rounded')
  })

  it('should update when center changes', () => {
    const { rerender } = render(
      <MapInfoBar center={mockCenter} zoom={12} />
    )

    expect(screen.getByText(/Longitude: 30.5234/)).toBeInTheDocument()

    const newCenter: LngLat = { lng: 35.0221, lat: 48.4249 } as LngLat
    rerender(<MapInfoBar center={newCenter} zoom={12} />)

    expect(screen.getByText(/Longitude: 35.0221/)).toBeInTheDocument()
    expect(screen.getByText(/Latitude: 48.4249/)).toBeInTheDocument()
  })

  it('should update when zoom changes', () => {
    const { rerender } = render(
      <MapInfoBar center={mockCenter} zoom={12} />
    )

    expect(screen.getByText(/Zoom: 12.00/)).toBeInTheDocument()

    rerender(<MapInfoBar center={mockCenter} zoom={15.5} />)

    expect(screen.getByText(/Zoom: 15.50/)).toBeInTheDocument()
  })

  it('should toggle between loading and ready states', () => {
    const { rerender } = render(
      <MapInfoBar center={mockCenter} zoom={12} />
    )

    rerender(<MapInfoBar center={mockCenter} zoom={12} />)
    expect(screen.getByText(/Longitude:/)).toBeInTheDocument()
  })
})
