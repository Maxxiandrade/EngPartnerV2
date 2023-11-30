import style from './ReportOption.module.css'
const ReportOption = ()=>{

  const handleReportClick = () => {
    console.log("user reported")
  };

  return(
    <div className={style.reportMessage}>
        <option disabled selected value="default" className={style.selectStyle}>Select Chat</option>
            <option value="global" >Spam</option>
            <option value="sports" >Innapropiate conduct</option>
            <option value="animals" >Offensive comunication</option>
            <option value="food" >Harassment</option>
            <option value="tech" >Tech</option>
  </div>
  )
}

export default ReportOption