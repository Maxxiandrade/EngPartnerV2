import style from './ReportOption.module.css'
const ReportOption = ()=>{

  const handleReportClick = () => {
    console.log("user reported")
  };

  return(
    <div className={style.reportMessage}>
        <option disabled selected value="default" className={style.selectStyle}>Select Chat</option>
            <option value="global" >Innapropriate Content</option>
            <option value="sports" >Spam</option>
            <option value="animals" >Harassment Behavior</option>
            <option value="food" >Misleading or false content</option>
            <option value="tech" >Fake identity</option>
  </div>
  )
}

export default ReportOption