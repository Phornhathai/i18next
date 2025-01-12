import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "th",
  debug: true,
  resources: {
    en: {
      translation: {
        loading: "Loading attractions...",
        error: "An error occurred",
        attractions: "Attractions",
        latitude: "Latitude",
        longitude: "Longitude",
      },
    },
    th: {
      translation: {
        loading: "กำลังโหลดข้อมูลสถานที่ท่องเที่ยว...",
        error: "เกิดข้อผิดพลาด",
        attractions: "สถานที่ท่องเที่ยว",
        latitude: "ละติจูด",
        longitude: "ลองจิจูด",
      },
    },
  },
});

export default i18n;
