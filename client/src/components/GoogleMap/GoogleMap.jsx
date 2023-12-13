/* eslint-disable react/prop-types */
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const GoogleMapComponent = ({ users, onSelectMarker, onSelectCountry }) => {
  const mapContainerStyle = {
    width: "40%",
    height: "400px",
  };

  const center = { lat: 0, lng: 0 }; // centro predeterminado

  const handleMapClick = async (event) => {
    try {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();

      console.log("Clicked Coordinates:", clickedLat, clickedLng);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLat},${clickedLng}&key=AIzaSyBK6CQ92t3JpcAt9ayagYnAg_k4-KgfFLk`
      );

      if (!response.ok) {
        throw new Error("Error al obtener la información del lugar.");
      }

      const data = await response.json();
      console.log("Geocoding Response:", data);

      const country = findCountryInResponse(data);
      if (country) {
        onSelectCountry(country.short_name);
      } else {
        throw new Error("No se encontró el país en la respuesta.");
      }
    } catch (error) {
      console.error("Error al procesar el clic en el mapa:", error);
    }
  };

  const findCountryInResponse = (data) => {
    // Intenta encontrar el país en la respuesta del geocodificador
    const countryComponent = data.results[0]?.address_components.find(
      (component) => component.types.includes("country")
    );
    if (countryComponent) {
      const shortName = countryComponent.short_name;
      console.log("Short Name:", shortName);
      return { short_name: shortName };
    }

    return null;
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBK6CQ92t3JpcAt9ayagYnAg_k4-KgfFLk">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={2}
        onClick={handleMapClick}
      >
        {users.map((user) => (
          <Marker key={user.id} onClick={() => onSelectMarker(user)} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
