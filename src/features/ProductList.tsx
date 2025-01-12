import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const fetchAttractions = async (language: string) => {
  const response = await fetch(
    `https://www.melivecode.com/api/${language}/attractions`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch attractions");
  }
  return response.json();
};

const AttractionList: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันดึงข้อมูลจาก API
  const loadAttractions = async (lang: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAttractions(lang);
      setAttractions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลเมื่อภาษาเปลี่ยน
  useEffect(() => {
    loadAttractions(i18n.language);
  }, [i18n.language]);

  // ฟังก์ชันเปลี่ยนภาษา
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (loading) return <p>{t("loading")}</p>;
  if (error)
    return (
      <p>
        {t("error")}: {error}
      </p>
    );

  return (
    <div>
      <h1>{t("attractions")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("th")}>ไทย</button>

      <ul>
        {attractions.map((attraction) => (
          <li key={attraction.id}>
            <h2>{attraction.name}</h2>
            <p>{attraction.detail}</p>
            <img
              src={attraction.coverimage}
              alt={attraction.name}
              style={{ width: "200px" }}
            />
            <p>
              {t("latitude")}: {attraction.latitude}
            </p>
            <p>
              {t("longitude")}: {attraction.longitude}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionList;
