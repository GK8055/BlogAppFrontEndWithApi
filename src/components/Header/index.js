import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'


const Header = () => {
  const navigate=useNavigate()
  const onLogoutBtnClk=()=>{
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="header_container">
      <Link to="/" className="link_text link_style">
      <h1 className="title">ZuAI</h1>
      </Link>
      <div className="links_container">
        <button onClick={onLogoutBtnClk} className="join_now_btn" type="button" >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default (Header)
