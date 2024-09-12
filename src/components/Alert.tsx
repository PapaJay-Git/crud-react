import SuccessSVG from "./SuccessSVG";
import ErrorSVG from "./ErrorSVG";
import WarningSVG from "./WarningSVG";
import { useEffect, useRef } from "react";
import { AlertType } from "@/types/types";

type NotificationType = {
    alertData: AlertType,
    setAlertData: React.Dispatch<React.SetStateAction<AlertType>>;
  }
  
const Alert: React.FC<NotificationType> = ({ alertData, setAlertData }) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (alertData.show) {
        if(timerRef.current){
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setAlertData(prevState => ({...prevState, show: false}));
        }, 5000);
      }

      return () => {
        if(timerRef.current){
          clearTimeout(timerRef.current);
        }
      }
    }, [alertData]);

    const SvgComponent  = {
      warning: WarningSVG,
      success: SuccessSVG,
      error: ErrorSVG
    }[alertData.type];
  
    if (!alertData.show || !alertData.message) return null;

    return (
      <div role="alert" className="my-5 alert">
        <SvgComponent />
        <span>{alertData.message}</span>
      </div>
    );
  };
  
  export default Alert;
  