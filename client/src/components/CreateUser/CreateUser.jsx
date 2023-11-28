import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateUser.module.css";
import { getAllCountries } from "../../redux/actions/countriesActions";
import { createNewUser, setUserDataRegister } from "../../redux/actions/actions";
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
import { StyledEngineProvider } from '@mui/material/styles';
import { validation } from './validation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { auth } from '../../firebase-config'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Cookies from 'universal-cookie'

const CreateUser = ( {setIsAuth} ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies()

  const [registred, setRegistred] = useState(false)

  const countries = useSelector((state) => state.countries.countries);

  const uidGoogleAccount = useSelector((state) => state.users.uidGoogleAccount);
  const emailGoogleAccount = useSelector((state) => state.users.emailGoogleAccount);
  const photoGoogleAccount = useSelector((state) => state.users.photoGoogleAccount);

  const photo = useSelector((state) => state.users.photo);
  
  const [selectedCountry, setSelectedCountry] = useState(''); // Estado para el país seleccionado
  const [createUserInfo, setCreateUserInfo] = useState({
    email: emailGoogleAccount ? emailGoogleAccount : '',
    password: '',
    date: null,
    name: '',
    lastname: '',
    user: '',
    age: null,
    sex: '',
    country: '',
    description: '',
    photo: photoGoogleAccount ? photoGoogleAccount : '',
    friends: {},
    isVip: false,
    isOn: false,
    isAdmin: false
  });
  
  const [errors, setErrors] = useState({})


    const handleChangeInput = (event) => {
      setCreateUserInfo({
        ...createUserInfo,
        [event.target.name]: event.target.value,
      })
    };

    const handleChangeImage = async (event) => {
      setCreateUserInfo({
        ...createUserInfo,
        [event.target.name]: event.target.files[0],
      })
    }

    const uploadImageCloudinary = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "vkblr6a8");

      try {
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/engpartnercloudinary/image/upload", formData)
        return data?.url
      }
      catch (error) {
        throw Error(error)
      }
    }
    const handleDateChange = (newValue) => {
      const fechaOriginal = new Date(newValue.$d);

      // Obtener los componentes de la fecha (año, mes, día)
      const año = fechaOriginal.getFullYear();
      const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0");
      const día = fechaOriginal.getDate().toString().padStart(2, "0");

      // Formatear la fecha en el formato YYYY/MM/DD
      const fechaFormateada = `${año}-${mes}-${día}`;
      setErrors(validation({
          ...createUserInfo,
          date: fechaFormateada
      }))
      setCreateUserInfo({
          ...createUserInfo,
          date: fechaFormateada
      })
  }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if(emailGoogleAccount===''){
          
            const photoURLCloudinary = await uploadImageCloudinary(createUserInfo.photo);

            const userCredential = await createUserWithEmailAndPassword(auth, createUserInfo.email, createUserInfo.password);
            const user = userCredential.user;
            console.log(user);
            await sendEmailVerification(user);
            setRegistred(true);
            cookies.set("auth-token", user.refreshToken);
          //ACA SE MANDA LA INFO AL BACK PARA CREAR EL USUARIO
          
          const userEmailPassword = {
            ...createUserInfo,
            uid: user?.uid,
            photo: photoURLCloudinary
          }
          
          dispatch(setUserDataRegister(userEmailPassword));
          dispatch(createNewUser(userEmailPassword));
          navigate("/home");                    

        } else {
          const userWithGoogle = {
            ...createUserInfo,
            uid: uidGoogleAccount
          }
          
          dispatch(setUserDataRegister(userWithGoogle));
          dispatch(createNewUser(userWithGoogle)); 
          navigate("/home");
        }
        

      } catch (error) {
        throw Error(error)
      }
    }

  useEffect(() => {
    if(countries.length === 0){
        dispatch(getAllCountries());
    }
    const getAge = () => {
      const birthDate = new Date(createUserInfo.date);
      const actualDate = new Date();
      var age = actualDate.getFullYear() - birthDate.getFullYear();
      if(actualDate.getMonth() < birthDate.getMonth() || (actualDate.getMonth() === birthDate.getMonth() && actualDate.getDate() < birthDate.getDate())){
        age--;
      }
      return setCreateUserInfo({
        ...createUserInfo,
        age: age
      })
    }
    
    getAge()
  }, [countries, selectedCountry, createUserInfo.date, uidGoogleAccount, emailGoogleAccount, photoGoogleAccount, createUserInfo.photo]);


  return (
    <div className='mainDiv'>
    <form className={styles.createUserContainer}>
    <h1 className={styles.h1Style} >Create your User</h1>
    <FormControl sx={{ m: 1, minWidth: '30%', display: 'flex', flexDirection: 'column', gap: '1em' }}>

        {!emailGoogleAccount && 
          <>
            <TextField name='email' value={createUserInfo.email} onChange={handleChangeInput} type='email' className='inputRegisterEmail' error={errors.email ? true : false} autoFocus required label="Email" />
            {errors.email && <span className='registerErrors'>{errors.email}</span>}

            <TextField name='password' value={createUserInfo.password} onChange={handleChangeInput} type='password' className='inputRegisterPass' error={errors.password ? true : false} required label="Password" />
            {errors.password && <span className='registerErrors'>{errors.password}</span>}
          </>
        }

        <TextField type="text" name="name" label="Name" value={createUserInfo.name} onChange={handleChangeInput}/>
        
        <TextField type="text" name="lastname" label="Lastname" value={createUserInfo.lastname} onChange={handleChangeInput}/>

        <TextField type="text" name="user" label="Username" value={createUserInfo.user} onChange={handleChangeInput}/>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name='date' value={createUserInfo.date} onChange={handleDateChange} className='inputRegister' />
        </LocalizationProvider>
        {errors.date && <span className='registerErrors'>{errors.date}</span>}


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
          <FormControlLabel value="other" control={<Radio />} label="Other" />
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

        {!photoGoogleAccount &&
        <>
          <label htmlFor="pfp">Please upload a profile picture:</label>
          <TextField type="file" name="photo" onChange={handleChangeImage}/>
        </>
        }
        
        <TextField type="text" name="description" label="Description" value={createUserInfo.description} onChange={handleChangeInput} />

        <Button type="submit" variant="contained" onClick={handleSubmit}>SAVE PROFILE</Button>

        </FormControl>

    </form>
    </div>
  );
};

export default CreateUser;
