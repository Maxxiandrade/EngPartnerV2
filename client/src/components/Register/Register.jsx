import React, { useState } from 'react';
import { TextField, Button} from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validation } from './validation';
import './register.css'
import {auth} from '../../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        date: null
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setErrors(validation({
            ...values,
            [e.target.name]: e.target.value
        }
        ))
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
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
            ...values,
            date: fechaFormateada
        }))
        setValues({
            ...values,
            date: fechaFormateada
        })
    }

    const handleRegister = async(event)=>{
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            console.log('Usuario registrado:', user);
        } catch (error) {
            throw Error(error)
        }
    }
    
    
    return(
        <StyledEngineProvider injectFirst>
        <div id='registerContainer'>
            <form action="">
                <TextField name='email' value={values.email} onChange={handleChange} type='email' className='inputRegister' error={errors.email ? true : false} autoFocus required  label="Email"/>
                {errors.email && <span className='registerErrors'>{errors.email}</span>}

                <TextField name='password' value={values.password} onChange={handleChange} type='password' className='inputRegister' error={errors.password ? true : false} required label="Password"/>
                {errors.password && <span className='registerErrors'>{errors.password}</span>}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker name='date' value={values.date} onChange={handleDateChange} className='inputRegister' />
                </LocalizationProvider>
                {errors.date && <span className='registerErrors'>{errors.date}</span>}

                <Button onClick={handleRegister} variant="contained" disabled={errors.hasOwnProperty('email') || errors.hasOwnProperty('password') || errors.hasOwnProperty('date') || !values.email || !values.password || !values.date} color="success" id='registerSubmit'>
                    Register
                </Button>              
            </form> 
        </div>
        </StyledEngineProvider>
    )
};

export default Register