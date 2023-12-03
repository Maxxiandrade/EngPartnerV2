import style from './ReportOption.module.css';
import { useDispatch } from 'react-redux';
import { submitReport } from '../../../redux/actions/actions';

const ReportOption = ({setLastClickedMessageId, message, messageId,user}) => {
  const dispatch = useDispatch();

  const handleReportClick = (event) => {
    const selectedValue = event.target.value
    console.log(`Reported: ${selectedValue}`);
    
    const reportData = {
      user: user,
      reportData: {
        reason: selectedValue,
        timesReported: 1,
        message: message,
        messageId: messageId,
      }
    }
    console.log(reportData)
    dispatch(submitReport(reportData))
    setLastClickedMessageId(null)
  };

  return (
    <div className={style.reportMessage}>

        <option disabled selected value="default" className={style.optionStyle}>Select an option</option>
        <option onClick={handleReportClick} className={style.optionStyle} value="innapropriateContent">Innapropriate Content</option>
        <option onClick={handleReportClick} className={style.optionStyle} value="spam">Spam</option>
        <option onClick={handleReportClick} className={style.optionStyle} value="HarrassmentBehavior">Harassment Behavior</option>
        <option onClick={handleReportClick} className={style.optionStyle} value="misleadingOfFalseContent">Misleading or false content</option>
        <option onClick={handleReportClick} className={style.optionStyle} value="fakeIdentity">Fake identity</option>
    </div>
  );
};

export default ReportOption;
