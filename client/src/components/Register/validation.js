export const validation = (values) => {
    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*\d).{8,32}$/; // 8 a 32 dígitos, al menos un dígito
    function isOver18(dateOfBirth) {
        const currentDate = new Date();
      
        const [year, month, day] = dateOfBirth.split('-');
        const birthDate = new Date(year, month - 1, day);
      
        const age = currentDate.getFullYear() - birthDate.getFullYear();
      
        // Check if the person is 18 years or older
        if (age > 18 || (age === 18 && currentDate >= birthDate.setFullYear(currentDate.getFullYear() - 18))) {
          return true;
        } else {
          return false;
        }
    }

    if(!values.email){
        errors.email = 'Email is required';
    }
    if(!regexEmail.test(values.email)){
        errors.email = 'Email is invalid';
    }

    if(!values.password){
        errors.password = 'Password is required';
    }
    if(!regexPassword.test(values.password)){
        errors.password = 'Must contain 8-32 characters and at least 1 number';
    }

    if(!values.date){
        errors.date = 'Date is required';
    }
    if(values.date!==null){
        if(!isOver18(values.date)){
            errors.date = 'Must be 18 years or older';
        }
    }
        


    return errors;
}