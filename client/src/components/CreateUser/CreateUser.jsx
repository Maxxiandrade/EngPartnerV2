import styles from './CreateUser.module.css'

const CreateUser = ()=>{
    return(
        <form className={styles.createUserContainer}>
            <select>
                <option value="">select your country of origin</option>
            </select>
            

            <label htmlFor="pfp">please upload a profile picture</label>
            <input 
            type="image" 
            accept='image'
            />

            <label htmlFor="name">Name</label>
            <input type="text" name='name' />

            <label htmlFor="lastName">Last name</label>
            <input type="text" name='lastName'/>

            <div className={styles.sexsContainer}>
                <button value='male'>Male</button>
                <button value='female'>Female</button>
            </div>

            <button type='submit'>create</button>

            

        </form>
    )
}

export default CreateUser