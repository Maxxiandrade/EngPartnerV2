import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateUser.module.css";
import { getAllCountries } from "../../redux/actions/countriesActions";
import { createNewUser, setUserDataRegister, getAllUsers } from "../../redux/actions/actions";
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
import useDebounce from "../../customHooks/useDebounce";

const CreateUser = ( {setIsAuth} ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies()

  const [registred, setRegistred] = useState(false)

  const countries = useSelector((state) => state.countries.countries);
  const allUsers = useSelector((state) => state.users.allUsers);

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
    friends: [],
    isVip: false,
    isOn: false,
    isAdmin: false,
    language: '',
    languageRead: '',
    rooms: []
  });
  
  const [errors, setErrors] = useState({})
  const [errorUsername, setErrorUsername] = useState({
    user: false
  })
  const [errorEmail, setErrorEmail] = useState({
    email: false
  })


    const handleChangeInput = (event) => {
      if(event.target.name === 'email'){
        handleChangeEmail(event)
      }
      if(event.target.name === "user"){
        handleChangeUser(event)
      }
      if(event.target.name === "photo"){
        handleChangeImage(event)
      }
      setErrors(validation({
        ...createUserInfo,
        [event.target.name]: event.target.value
      }))
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

    const handleChangeUser = useDebounce(async(event) => {
      if (event.target.value === '') {
          setErrors(validation({
            ...createUserInfo,
            [event.target.name]: event.target.value
          }))
      }else if (event.target.value.includes(' ')){
        return
      }else{
          const taken = await usernameTaken(event.target.value);
          if (taken) {
            setErrorUsername({
              ...errorUsername,
              user: 'The username is already taken by another user'
            })
          }else{
            return(
              setErrorUsername({
                ...errorUsername,
                user: false
              }),
              setCreateUserInfo({
                ...createUserInfo,
                [event.target.name]: event.target.value,
              })
            )
            
          }

      }}, 1000)

    const handleChangeEmail = useDebounce(async(event) => {
          const taken = await emailTaken(event.target.value);
          if (taken) {
            setErrorEmail({
              ...errorEmail,
              email: 'The email is already taken by another user'
            })
          }else{
            return(
              setErrorEmail({
                ...errorEmail,
                email: false
              }),
              setCreateUserInfo({
                ...createUserInfo,
                [event.target.name]: event.target.value,
              })
            )
          }
    }, 1000)

  const usernameTaken = async (searchValue) => {
    try {
        const isTaken = await allUsers?.filter((user) => {
            return user.user.toLowerCase().trim() === searchValue.toLowerCase().trim()
        })
        
        if(isTaken.length > 0){
            console.log('true, ya existe', isTaken);
            return true
        }
        console.log('false, no existe');
        return false
    } catch (error) {
        throw Error(error)
    }
  }

  const emailTaken = async (searchValue) => {
    try {
        const isTaken = await allUsers?.filter((user) => {
            return user.email.toLowerCase().trim() === searchValue.toLowerCase().trim()
        })
        
        if(isTaken.length > 0){
            console.log('true, ya existe', isTaken);
            return true
        }
        console.log('false, no existe');
        return false
    } catch (error) {
        throw Error(error)
    }
  }

    const uploadImageCloudinary = async (file) => {
      const formData = new FormData();

      if(file===''){
        formData.append("file", 'https://as2.ftcdn.net/jpg/00/64/67/27/220_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg');
      }else{
        formData.append("file", file);
      }

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
        // Maneja el error específico de Firebase
        if (error.code === 'auth/email-already-in-use') {
          console.error('Error: El correo electrónico ya está en uso');
          alert('El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.');
        } else {
          console.error('Ocurrio este error al registrar usuario:', error);
          alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
        }
      }
    }

  useEffect(() => {
    if(countries.length === 0){
        dispatch(getAllCountries());
    }
    if(allUsers.length === 0){
        dispatch(getAllUsers());
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
  }, [countries, selectedCountry, createUserInfo.date, uidGoogleAccount, emailGoogleAccount, photoGoogleAccount, createUserInfo.photo, allUsers]);


  return (
    <div className='mainDiv'>
    <form className={styles.createUserContainer}>
    <h1 className={styles.h1Style} >Create your User</h1>
    <FormControl sx={{ m: 1, minWidth: '30%', display: 'flex', flexDirection: 'column', gap: '1em' }}>

        {!emailGoogleAccount && 
          <>
            <TextField name='email' value={createUserInfo.email} onChange={handleChangeInput} type='email' className='inputRegisterEmail' error={errors.email || errorEmail.email ? true : false} autoFocus required label="Email" />
            {errorEmail.email && <span className='registerErrors'>{errorEmail.email}</span>}
            {errors.email && <span className='registerErrors'>{errors.email}</span>}

            <TextField name='password' value={createUserInfo.password} onChange={handleChangeInput} type='password' className='inputRegisterPass' error={errors.password ? true : false} required label="Password" />
            {errors.password && <span className='registerErrors'>{errors.password}</span>}
          </>
        }

        <TextField type="text" name="name" label="Name" value={createUserInfo.name} onChange={handleChangeInput} required className='inputRegisterName' error={errors.name ? true : false} />
        {errors.name && <span className='registerErrors'>{errors.name}</span>}
        
        <TextField type="text" name="lastname" label="Lastname" value={createUserInfo.lastname} onChange={handleChangeInput} required className='inputRegisterLastname' error={errors.lastname ? true : false}/>
        {errors.lastname && <span className='registerErrors'>{errors.lastname}</span>}

        <TextField type="text" name="user" label="Username" value={createUserInfo.user} onChange={handleChangeInput} required className='inputRegisterUser' error={errorUsername.user || errors.user ? true : false}/>
        {errorUsername.user && <span className='registerErrors'>{errorUsername.user}</span>}
        {errors.user && <span className='registerErrors'>{errors.user}</span>}


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
        {errors.sex && <span className='registerErrors'>{errors.sex}</span>}

        <label htmlFor="country">Select your country:</label>
        {createUserInfo.country==='' && <span className='registerErrors'>{"Please select your country"}</span>}

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

        <label htmlFor="language">Select your languaje:</label>
        {errors.language && <span className='registerErrors'>{errors.language}</span>}
        <Select
          name="language"
          value={createUserInfo.language}
          onChange={handleChangeInput}
        >
          <MenuItem value={'en'}>English 🇬🇧</MenuItem>
          <MenuItem value={'es'}>Spanish 🇪🇸</MenuItem>
          <MenuItem value={'fr'}>French 🇫🇷</MenuItem>
          <MenuItem value={'it'}>Italian 🇮🇹</MenuItem>
          <MenuItem value={'de'}>German 🇩🇪</MenuItem>
          <MenuItem value={'nl'}>Dutch (Holland) 🇳🇱</MenuItem>
          <MenuItem value={'pt'}>Portuguese 🇵🇹</MenuItem>
          <MenuItem value={'ru'}>Russian 🇷🇺</MenuItem>
          <MenuItem value={'zh'}>Chinese (Simplified) 🇨🇳</MenuItem>
          <MenuItem value={'zh-TW'}>Chinese (Traditional) 🇨🇳</MenuItem>
          <MenuItem value={'ko'}>Korean 🇰🇷</MenuItem>
          <MenuItem value={'gn'}>Guarani 🇵🇾</MenuItem>
          <MenuItem value={'id'}>Indonesian 🇮🇩</MenuItem>
        </Select>

        <label htmlFor="languageRead">Select the language you want to read:</label>
        {errors.languageRead && <span className='registerErrors'>{errors.languageRead}</span>}
        <Select
          name="languageRead"
          value={createUserInfo.languageRead}
          onChange={handleChangeInput}
        >
          <MenuItem value={'en'}>English 🇬🇧</MenuItem>
          <MenuItem value={'es'}>Spanish 🇪🇸</MenuItem>
          <MenuItem value={'fr'}>French 🇫🇷</MenuItem>
          <MenuItem value={'it'}>Italian 🇮🇹</MenuItem>
          <MenuItem value={'de'}>German 🇩🇪</MenuItem>
          <MenuItem value={'nl'}>Dutch (Holland) 🇳🇱</MenuItem>
          <MenuItem value={'pt'}>Portuguese 🇵🇹</MenuItem>
          <MenuItem value={'ru'}>Russian 🇷🇺</MenuItem>
          <MenuItem value={'zh'}>Chinese (Simplified) 🇨🇳</MenuItem>
          <MenuItem value={'zh-TW'}>Chinese (Traditional) 🇨🇳</MenuItem>
          <MenuItem value={'ko'}>Korean 🇰🇷</MenuItem>
          <MenuItem value={'gn'}>Guarani 🇵🇾</MenuItem>
          <MenuItem value={'id'}>Indonesian 🇮🇩</MenuItem>
        </Select>

        {!photoGoogleAccount &&
        <>
          <label htmlFor="pfp">Please upload a profile picture:</label>
          <TextField type="file" name="photo" onChange={handleChangeImage}/>
        </>
        }
        
        <TextField type="text" name="description" label="Description" value={createUserInfo.description} onChange={handleChangeInput} />
        {errors.description && <span className='registerErrors'>{errors.description}</span>}

        {emailGoogleAccount
        ?
        <Button type="submit" variant="contained" onClick={handleSubmit}
        disabled={Object.keys(errors).length > 1 || createUserInfo.country === '' || errorUsername.user === true || errorEmail.email === true}
        >SAVE PROFILE</Button>
        :
        <Button type="submit" variant="contained" onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0 || createUserInfo.country === '' || errorUsername.user === true || errorEmail.email === true}
        >SAVE PROFILE</Button>
        }

        </FormControl>

    </form>
    </div>
  );
};

export default CreateUser;
