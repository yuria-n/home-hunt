import { useMap } from "react-leaflet";
import { Marker } from "@adamscybot/react-leaflet-component-marker";

import { HousingPin } from "@/app/housing-pin";
import { useHousing } from "@/hooks";

/**
 * MapMarker has to be used in MapContainer
 */
export function MapMarkers() {
  const map = useMap();
  const { housingListMap } = useHousing();
  return Array.from(housingListMap, ([coordinate, list]) => (
    <Marker
      key={coordinate.join(",")}
      position={coordinate}
      icon={
        <HousingPin coordinate={coordinate} zoom={map.getZoom()} list={list} />
      }
    />
  ));
}
