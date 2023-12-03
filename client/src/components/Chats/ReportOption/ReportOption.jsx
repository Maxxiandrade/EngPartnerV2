import style from './ReportOption.module.css'
const ReportOption = ()=>{

  const handleReportClick = () => {
    console.log("user reported")
  };

  return(
    <div className={style.reportMessage}>
        <option disabled selected value="default" className={style.selectStyle}>Select Chat</option>
            <option className={style.optionStyle} value="innapropriateContent" >Innapropriate Content</option>
            <option className={style.optionStyle} value="spam" >Spam</option>
            <option className={style.optionStyle} value="HarrassmentBehavior" >Harassment Behavior</option>
            <option className={style.optionStyle} value="misleadingOfFalseContent" >Misleading or false content</option>
            <option className={style.optionStyle} value="fakeIdentity">Fake identity</option>
  </div>
  )
}

export default ReportOption