
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getAddressFromCoordinates = async (coordinates) => {
  // In a real app, this would call a geocoding service like Google Maps API
  // For this demo, we'll return a mock address
  return "123 Main Street";
};
