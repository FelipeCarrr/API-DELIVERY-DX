import axios from "axios";
import { AdministrationService } from "../services/administration.service.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getGeocoding = async (address) => {
  try {
    const addressAdministration = await AdministrationService.getAddress();

    address = addressAdministration
      ? `${address}, ${addressAdministration}`
      : address;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_API_KEY}`
    );

    if (response.data.status === "OK") {
      return response.data.results[0].geometry.location;
    }

    if (response.data.status === "ZERO_RESULTS") {
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw new Error("Failed to fetch geocoding data");
  }
};

export const getReverseGeocoding = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (response.data.status === "OK") {
      console.log(
        "Dirección encontrada:",
        response.data.results[0].formatted_address
      );
      const components = response.data.results[0].address_components;

      let city = "";
      let state = "";
      let country = "";

      for (const comp of components) {
        if (comp.types.includes("locality")) {
          city = comp.long_name;
        }
        if (comp.types.includes("administrative_area_level_1")) {
          state = comp.long_name;
        }
        if (comp.types.includes("country")) {
          country = comp.long_name;
        }
      }

      return `${city}, ${state}, ${country}`;
    }

    if (response.data.status === "ZERO_RESULTS") {
      return null;
    }
  } catch (error) {
    console.error("Error fetching reverse geocoding data:", error);
    throw new Error("Failed to fetch reverse geocoding data");
  }
};
