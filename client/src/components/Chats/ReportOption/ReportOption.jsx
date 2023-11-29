import style from './ReportOption.module.css'
const ReportOption = ()=>{

  const handleReportClick = () => {
    console.log("user reported")
  };

  return(
    <div className={style.reportMessage}>
        <p onClick={handleReportClick}>Report</p>
  </div>
  )
}

export default ReportOption