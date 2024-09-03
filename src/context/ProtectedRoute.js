
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const ProtectedRoute=({children})=>{
    const cookies=Cookies.get('jwt_token')
    if (!cookies){
        return <Navigate to='/login'/>
    }
    return children
}
export default ProtectedRoute