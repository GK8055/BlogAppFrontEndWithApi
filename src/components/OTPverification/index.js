import './index.css'
import {useState} from 'react'
//import { useNavigate } from 'react-router-dom'

const OTPverification=()=>{

    const [otp,setOtp]=useState('')
    // const history=useNavigate()

    const onChangeOtp=(e)=>{
        setOtp(e.target.value)
    }

    const onEnterOTP=()=>{
       // const url = 'http://localhost:8000/verify-otp'
    }

    return (
        <div className='otp_container'>
            <input type="text" placeholder='Otp' className='otp_input_ele' value={otp} onChange={onChangeOtp} />
            <button className='otp_btn' type="button" onClick={onEnterOTP} >
                Enter Otp
            </button>

        </div>
    )

}


export default OTPverification