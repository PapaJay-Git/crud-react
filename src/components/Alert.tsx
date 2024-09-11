import SuccessSVG from "./SuccessSVG";
import ErrorSVG from "./ErrorSVG";
import WarningSVG from "./WarningSVG";
import { useEffect } from "react";


interface NotificationType {
    alertMessage: string | null;
    type: 'warning' | 'success' | 'error';
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
const Alert: React.FC<NotificationType> = ({ alertMessage, type, showAlert, setShowAlert }) => {

    useEffect(() => {
        if (showAlert) {
          const timer = setTimeout(() => {
            setShowAlert(false);
          }, 4000);
    
          return () => clearTimeout(timer);
        } 
      }, [showAlert]);

    const alertClass = {
      warning: 'alert-warning',
      success: 'alert-success',
      error: 'alert-error'
    }[type];
  
    const SvgComponent  = {
      warning: WarningSVG,
      success: SuccessSVG,
      error: ErrorSVG
    }[type];
  
    return (showAlert &&
      <div role="alert" className={`my-5 alert`}>
        <SvgComponent />
        <span>{alertMessage}</span>
      </div>
    );
  };
  
  export default Alert;
  