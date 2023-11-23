import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateUser.module.css";
import { getAllCountries } from "../../redux/actions/countriesActions";

const CreateUser = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para el país seleccionado

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  const handleShowCountries = () => {
    setIsActive(!isActive);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsActive(false); 
  };

  return (
    <form className={styles.createUserContainer}>
      <div onClick={handleShowCountries} className={styles.countriesContainer}>
        <p>please select your country of origin</p>
        {countries.map((country, index) => (
          <div
            onClick={() => handleSelectCountry(country.country)}
            className={`${isActive ? styles.showCountryContainer : styles.hideCountryContainer}`}
            key={index}
          >
            {country.country}
            <div className={styles.flagContainer}>
              <img src={country.flag} alt={country.country} />
            </div>
          </div>
        ))}
      </div>

      {selectedCountry && ( // Muestra el país seleccionado si existe
        <div className={styles.selectedCountryContainer}>
          <p>your country:</p>
          <div className={styles.selectedCountry}>
            {selectedCountry}
            <div className={styles.flagContainer}>
              {/* Busca la bandera del país seleccionado */}
              {countries.map((country) =>
                country.country === selectedCountry ? (
                  <img key={country.country} src={country.flag} alt={country.country} />
                ) : null
              )}
            </div>
          </div>
        </div>
      )}

      <label htmlFor="pfp">please upload a profile picture</label>
      <input type="image" accept="image" />

      <label htmlFor="name">Name</label>
      <input type="text" name="name" />

      <label htmlFor="lastName">Last name</label>
      <input type="text" name="lastName" />

      <div className={styles.sexsContainer}>
        <button value="male">Male</button>
        <button value="female">Female</button>
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default CreateUser;
