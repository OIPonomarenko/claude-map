import { LngLat } from 'mapbox-gl'

interface MapInfoBarProps {
  center: LngLat
  zoom: number
}

export function MapInfoBar({ center, zoom }: MapInfoBarProps) {
  return (
    <div className="sidebar max-w-[78vw] absolute top-8 left-6 sm:left-8 z-10 px-3 py-1.5 bg-offset text-white rounded">
      Longitude: {center.lng.toFixed(4)} | Latitude: {center.lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
    </div>
  )
}
