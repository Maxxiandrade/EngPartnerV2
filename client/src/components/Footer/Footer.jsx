import styles from './Footer.module.css';
import githubLogo from '../../assets/svg/iconmonstr-github-1.svg'
import linkedinLogo from '../../assets/svg/icons8-linkedin.svg'
const Footer = () => {
    const names = [
        { name: "Gaspar Britos", github: "https://github.com/IgnacioBritos", linkedin: "", },
        { name: "Jose Martinez", github: "https://github.com/JoseMartinez0", linkedin: "https://www.linkedin.com/in/jos%C3%A9-ignacio-mart%C3%ADnez-aa0514266/" },
        { name: "Luciano Dippolito", github: "https://github.com/LucianoDippolito", linkedin: "https://www.linkedin.com/in/luciano-dippolito/" },
        { name: "Luis Reyes", github: "https://github.com/Luuiskame", linkedin: "https://www.linkedin.com/in/luis-esteban-reyes-manzano-088635258/" },
        { name: "Maximiliano Andrade", github: "https://github.com/Maxxiandrade", linkedin: "" },
        { name: "Vicente Ford", github: "https://github.com/VicenFord", linkedin: "https://www.linkedin.com/in/vicenteford"},
    ];

    return (
        <footer className={styles.footer}>
            <h4 className={styles.madeBy}>MADE BY</h4>

        <div className={styles.gridContainer}>

        {names.map(person => (
            <div key={person.name} className={styles.namesContainer}>
                <p>{person.name}</p>

                <div className={styles.photosContainer}>

                <div className={styles.githubImgContainer}>
                    <a href={person.github} target='_blank'>
                        <img src={githubLogo} alt="github logo" />
                    </a>
                </div>
                
                <div className={styles.linkedinImgContainer}>
                    <a href={person.linkedin} target='_blank'>
                        <img src={linkedinLogo} alt="linked in logo" />
                    </a>
                </div>

                </div>
                
            </div>
        ))}

        </div>
        
    </footer>
    );
};

export default Footer;