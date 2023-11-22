import styles from './CreateUser.module.css'

const CreateUser = ()=>{
    return(
        <div className={styles.createUserContainer}>
            <button>select your country of origin</button>
            <button>select your native lenguage</button>

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
                but
            </div>

            

        </div>
    )
}

export default CreateUser