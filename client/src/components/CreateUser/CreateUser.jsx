import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateUser.module.css";
import { getAllCountries } from "../../redux/actions/countriesActions";
import { setUserDataCreateProfile, createNewUser } from "../../redux/actions/actions";
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries.countries);

  const uid = useSelector((state) => state.users.uid);
  const email = useSelector((state) => state.users.email);
  const password = useSelector((state) => state.users.password);
  const date = useSelector((state) => state.users.date);
  
  const birthDate = new Date(date);
  const actualDate = new Date();
  var age = actualDate.getFullYear() - birthDate.getFullYear();
  if(actualDate.getMonth() < birthDate.getMonth() || (actualDate.getMonth() === birthDate.getMonth() && actualDate.getDate() < birthDate.getDate())){
    age--;
  }

  const [selectedCountry, setSelectedCountry] = useState(''); // Estado para el país seleccionado
  const [createUserInfo, setCreateUserInfo] = useState({
    uid,
    email,
    password,
    date,
    name: '',
    lastname: '',
    user: '',
    age: age,
    sex: '',
    country: '',
    description: '',
    photo: '',
    friends: {},
    isVip: false,
    isOn: false,
  });

    const handleChangeInput = (event) => {
      setCreateUserInfo({
        ...createUserInfo,
        [event.target.name]: event.target.value,
      })
    };

    const handleChangeImage = (event) => {
      setCreateUserInfo({
        ...createUserInfo,
        [event.target.name]: event.target.files[0],
      })
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(createUserInfo);
      try {
        await uploadImageToCloudinary();
        await dispatch(setUserDataCreateProfile(createUserInfo));
        await dispatch(createNewUser(createUserInfo));
        navigate('/home');
      } catch (error) {
        throw Error(error)
      }
    }

    const uploadImageToCloudinary = async () => {
      const file = createUserInfo.photo;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "vkblr6a8");

      try {
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/engpartnercloudinary/image/upload", formData)
        setCreateUserInfo({
          ...createUserInfo,
          photo: data.url
        })
      }
      catch (error) {
        throw Error(error)
      }
    }
  

  useEffect(() => {
    if(countries.length === 0){
        dispatch(getAllCountries());
    }
  }, [countries, selectedCountry]);


  return (
    <form className={styles.createUserContainer}>

    <FormControl sx={{ m: 1, minWidth: '30%', display: 'flex', flexDirection: 'column', gap: '1em' }}>

        <TextField type="text" name="name" label="Name" value={createUserInfo.name} onChange={handleChangeInput}/>

        <TextField type="text" name="lastname" label="Lastname" value={createUserInfo.lastname} onChange={handleChangeInput}/>

        <TextField type="text" name="user" label="Username" value={createUserInfo.user} onChange={handleChangeInput}/>

        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="sex"
          value={createUserInfo.sex}
          onChange={handleChangeInput}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>

        <label htmlFor="country">Select your country:</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCountry}
          name="country"
          onChange={(e) => {
            setCreateUserInfo({
            ...createUserInfo,
            country: e.target.value
          })
          setSelectedCountry(e.target.value)
        }
        }
        >
          {countries?.map((country) => (
            <MenuItem key={country.country} value={country.country}>{country.country} <img key={country.country} src={country.flag} alt={country.country} width={25} height={15} style={{marginLeft: '0.5em'}} /> </MenuItem>
          ))}
        </Select>

        {selectedCountry && ( // Muestra el país seleccionado si existe
          <div className={styles.selectedCountryContainer}>
            <p>Selected country:</p>
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

        <label htmlFor="pfp">Please upload a profile picture:</label>
        <TextField type="file" name="photo" onChange={handleChangeImage}/>

        <TextField type="text" name="description" label="Description" value={createUserInfo.description} onChange={handleChangeInput} />

        <Button type="submit" variant="contained" onClick={handleSubmit}>SAVE PROFILE</Button>

        </FormControl>

    </form>
  );
};

export default CreateUser;
