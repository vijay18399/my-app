import { FiLoader } from "react-icons/fi";
function Loader({color}){
    const loaderStyle ={
        color:color,
        fontSize:'30px',
        animation: 'spin 2s linear infinite' 
    }
    return <FiLoader style={loaderStyle}  />
}
export default Loader;