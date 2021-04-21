import { useLocation } from "react-router-dom";
import EquipmentDetail from "./components/EquipmentDetail";

function Location () {
        
    let location = useLocation();
 
    return (
        <EquipmentDetail location={location} />   
    )
}   

export default Location;