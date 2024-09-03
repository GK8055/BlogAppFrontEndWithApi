import './index.css'
import {Link} from 'react-router-dom'


const ListItemView=(props)=>{
    const {data}=props
    const {id,postNo,postTitle,postImage,postDesc}=data
    // console.log(postNo)
    return (
    <>
    <div className='list_item_container'>
    <p className='list_title'>{postNo}:-</p>
            <img src={postImage} alt={postTitle} className='list_image_size'/>
        <div className='list_text_container'>
            <h1 className='list_title'>{postTitle}</h1>
            <p className='list_desc'>{postDesc}</p>
            <Link to={`/list/${id}`} className='read_more_btn_align'>
            <button type="button" className='read_more_btn' >Read More</button>
            </Link>
        </div>
    </div>
    </>
    )
}

export default ListItemView