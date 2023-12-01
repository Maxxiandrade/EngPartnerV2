export const validation = (values) => {
    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*\d).{8,32}$/; // 8 a 32 dígitos, al menos un dígito
    const regexName = /^[a-zA-Z\s]*$/;

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

    //Email
    if(!values.email){
        errors.email = 'Email is required';
    }
    if(values.email.length > 50){
        errors.email = 'Email must be less than 50 characters long';
    }
    if(!regexEmail.test(values.email)){
        errors.email = 'Email is invalid';
    }

    //Password
    if(!values.password){
        errors.password = 'Password is required';
    }
    if(!regexPassword.test(values.password)){
        errors.password = 'Must contain 8-32 characters and at least 1 number';
    }

    //Name
    if(!values.name){
        errors.name = 'Name is required';
    }
    if(values.name.length > 30){
        errors.name = 'Name must be less than 30 characters long';
    }
    if(!regexName.test(values.name)){
        errors.name = 'Name is invalid';
    }

    //Lastname
    if(!values.lastname){
        errors.lastname = 'Lastname is required';
    }
    if(values.lastname.length > 30){
        errors.lastname = 'Lastname must be less than 30 characters long';
    }
    if(!regexName.test(values.lastname)){
        errors.lastname = 'Lastname is invalid';
    }

    //User
    if(!values.user){
        errors.user = 'User is required';
    }
    if(values.user.includes(' ')){
        errors.user = 'User cannot contain spaces';        
    }
    if(values.user.length > 20){
        errors.user = 'User must be less than 20 characters long';
    }

    if(!values.date){
        errors.date = 'Date is required';
    }
    if(values.date!==null){
        if(!isOver18(values.date)){
            errors.date = 'Must be 18 years or older';
        }
    }

    if(values.sex===''){
        errors.sex = 'Please select a sex';
    }

    if(values.description.length > 300){
        errors.description = 'Description must be less than 200 characters long';
    }
        


    return errors;
}