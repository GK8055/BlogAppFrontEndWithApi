import './index.css'
import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { Link } from 'react-router-dom'

const Navigation=()=>(
    <div className='navigation_container'>
    <Link to="/" className='link_text_decoration'>
        <FaHome size={33} className='icon_size'/>
    </Link>
    <Link to="/add" className='link_text_decoration'>
        <MdOutlinePostAdd size={33} className='icon_size'/>
    </Link>
    <Link to="/edit" className='link_text_decoration'>
        <FaEdit size={33} className='icon_size'/>
    </Link>
    
    </div>

)

export default Navigation