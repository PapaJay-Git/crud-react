import SuccessSVG from "./SuccessSVG";
import ErrorSVG from "./ErrorSVG";
import WarningSVG from "./WarningSVG";
import { useEffect } from "react";


interface NotificationType {
    message: string | null;
    type: 'warning' | 'success' | 'error';
    showAlert: Boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<Boolean>>;
  }
  
const Alert: React.FC<NotificationType> = ({ message, type, showAlert, setShowAlert }) => {

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
      <div role="alert" className={`mt-10 alert`}>
        <SvgComponent />
        <span>{message}</span>
      </div>
    );
  };
  
  export default Alert;
  