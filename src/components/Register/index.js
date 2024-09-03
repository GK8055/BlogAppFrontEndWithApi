import './index.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import {Link} from 'react-router-dom'

const Register = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [errMsg, setErrMsg] = useState('')

  const history=useNavigate()

  const apiSuccess = data => {   
    if (data.success_message==='User is added suucessfully...'){
      setErrMsg(data.success_message)
      history('/login')
    }
    if (data.database_msg==='User is already exist in database...'){
      setErrMsg(data.database_msg +'please Login')
      
    }
  }

  const apiFailure = msg => {
    setErrMsg(msg)
  }

  const getRegisterData = async () => {
    const url = `https://blogappbackend-2.onrender.com/register`
    const userDetails = {username, password,firstName,lastName}
    const option = {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        accept:'application/json'
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      apiSuccess(data)
      setFirstName('')
      setLastName('')
      setUserName('')
      setPassword('')
    } else {
      apiFailure(data.error_msg)
      setFirstName('')
      setLastName('')
      setUserName('')
      setPassword('')
    }
  }

  const onChangeFirstName=(e)=>{
    setFirstName(e.target.value)
  }

  const onChangeLastName=(e)=>{
    setLastName(e.target.value)
  }

  const onChangeUsername = event => {
    setUserName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeSubmit = event => {
    event.preventDefault()
    getRegisterData()
  }

  const renderLoginBtn=()=>{
    if (errMsg!==''){
        const showBtn=errMsg.startsWith('User is already exist in database...')
        if (showBtn){
          return <Link to='/login' className='link_styles'>
            <button className="register_btn" type="button">
             Login Here...
            </button>
      </Link>
    }
    }

  
  }

  return (
    <>
        <Header/>
    <div className="login_container">
      <form className="form_container" onSubmit={onChangeSubmit}>
        <h1 className="login_title">Blog App</h1>
        <div className='input_details_container'>
        <div className='input_text_container'>
        <label className="login_label_text" htmlFor="firstname">
          First Name
        </label>
        <input
          required
          type="text"
          className="input_ele_register"
          id="firstname"
          placeholder="Firstname"
          value={firstName}
          onChange={onChangeFirstName}
        />
        </div>
        <div className='input_text_container'>
        <label className="login_label_text" htmlFor="lastname">
          Last Name
        </label>
        <input
          required
          type="text"
          className="input_ele_register"
          id="lastname"
          placeholder="Lastname"
          value={lastName}
          onChange={onChangeLastName}
        />
        </div>
        </div>

        <div className='input_details_container'>
            <div className='input_text_container'>
            <label className="login_label_text" htmlFor="username">
          USERNAME
        </label>
        <input
          required
          type="text"
          className="input_ele_register"
          id="username"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
        />
        
        </div> 
        <div className='input_text_container'>
        <label className="login_label_text" htmlFor="password">
          PASSWORD
        </label>
        <input
          required
          type="password"
          className="input_ele_register"
          id="password"
          value={password}
          placeholder="Password"
          onChange={onChangePassword}
        />
      </div>
    </div>
        <button className="login_btn" type="submit">
          Register
        </button>
        <p className="error_msg">{errMsg}</p>
         {renderLoginBtn()} 
      </form>
    </div>
    </>


  )
}

export default Register
