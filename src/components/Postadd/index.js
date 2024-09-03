import './index.css'
import {v4} from 'uuid'
import {useState} from 'react'
import Navigation from "../Navigation"

import Loader from '../Loader'
import FailureCard from '../FailureCard'
import Header from '../Header'

const apiStatus={
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Postadd=()=>{
    const [postNo,setPostNo]=useState("")
    const [postTitile,setPostTitle]=useState("")
    const [postDesc,setPostDesc]=useState("")
    const [postImg,setPostImg]=useState("")
    const [deleteBtnStatus,setDeleteBtnStatus]=useState(false)
    const [deletePostNo,setDeletePostNo]=useState("")

    const [apiPostStatus,setApiPostStatus]=useState("")
    const [apiPostMsg,setApiPostMsg]=useState("")
    const [apiDeleteStatus,setApiDeleteStatus]=useState("")
    const [apiDeleteMsg,setApiDeleteMsg]=useState("")

    const onChangePageNo=(event)=>{
        setPostNo(event.target.value)

    }

    const onChangePageTitle=(event)=>{
        setPostTitle(event.target.value)
    }

    const onChangePageDesc=(e)=>{
        setPostDesc(e.target.value)
    }
    const onChangePageImg=(e)=>{
        setPostImg(e.target.value)
    }

    const onChangeDeletePostNo=(e)=>{
        setDeletePostNo(e.target.value)
    }
    const deleteBtnClk=()=>{
        setDeleteBtnStatus(prev=>!prev)
    }

    const onSubmitForm= async (e)=>{
        e.preventDefault()
        const newPost={
            postId:v4(),
            postNo:postNo,
            postTitle:postTitile,
            postDesc:postDesc,
            postImage:postImg
        }
        const url=`https://blogappbackend-2.onrender.com/list/add`
        const options={
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                accept:"application/json"
            },
            body:JSON.stringify(newPost)
        }
        const response=await fetch(url,options)
        const data=await response.text()
        if (response.ok){
            setApiPostMsg(data)
            setApiPostStatus(apiStatus.success)
            setPostNo('')
            setPostTitle('')
            setPostDesc('')
            setPostImg('')
        }
        else{
            setApiPostMsg(data)
            setApiPostStatus(apiStatus.failure)
            setPostNo('')
            setPostTitle('')
            setPostDesc('')
            setPostImg('')
        }
         

    }

    const renderSuccessMsg=()=>(
        <p className='api_status_msg'>apiPostStatus: {apiPostMsg}</p>
    )

    const renderFailureMsg=()=>(
        <FailureCard/>
    )

    const renderLoaderView=()=>(
        <Loader/>
    )

    const renderIntialState=()=>(
        <p>......</p>
    )

    const renderApiPostMsg=()=>{
        switch(apiPostStatus){
            case apiStatus.success:
                return renderSuccessMsg()
            case apiStatus.failure:
                return renderFailureMsg()
             default:
                return renderIntialState()   
                   
        }
    }

    const renderDeleteApiSuccessMsg=()=>(
        apiDeleteMsg
    )

    const renderDeleteApiFailureMsg=()=>(
        apiDeleteMsg
    )
        
    

    const renderDeleteApiLoaderView=()=>(
          "Loading...."
    )

    const renderApiDeleteMsg=()=>{
        switch(apiDeleteStatus){
            case apiStatus.success:
                return renderDeleteApiSuccessMsg()
                
            default:
                return renderDeleteApiFailureMsg() 
                   
        }
    }

    const onDeleteRequest= async ()=>{
        console.log("deleteApi",deletePostNo)
        const url=`http://localhost:8000/list/delete/${deletePostNo}`
        const options={
            method:"DELETE"
        }
        const response=await fetch(url,options)
        const data=await response.text()
        if (response.ok){
            console.log("delete",data)
            setApiDeleteMsg(data)
            setApiDeleteStatus(apiStatus.success)
            setDeletePostNo('')
        }
        else{
            setApiDeleteMsg(data)
            setApiDeleteStatus(apiStatus.failure)
            setDeletePostNo('')
        }
     
    }
    // console.log(typeof Number("gk"))
    // const postNoValue=typeof postNo===num
    // <p className='post_label_text'>{errMsg}</p>


    return (
        <>
        <Header/>
        <div className='post_container'>
        <Navigation/>
        <div className='post_add_container'>
            <h1 className='post_title'>Want Add Blog Post?</h1>
            <form onSubmit={onSubmitForm} className='form_container_1'>
                <div className='input_postNo_title_container'>
                    <div className='post_title_container'>
                        <label className='post_label_text' htmlFor='postno' >Post No</label>
                        <input required className='post_no_input_ele' id="postno" type="number" placeholder="Number" value={postNo} onChange={onChangePageNo}  />
                    </div>
                    <div className='post_title_container'>
                        <label className='post_label_text' htmlFor='posttitle' >Post Title</label>
                        <input required className='post_input_ele' id="posttitle" type="text" placeholder="Posttitle" value={postTitile} onChange={onChangePageTitle} />                   
                    </div>
                </div>
                <label className='post_label_text' htmlFor='postdesc'>Post Desc</label>
                <textarea required rows="7" cols="30" id="postdesc" placeholder='PostDesc' className='post_input_ele' vlaue={postDesc} onChange={onChangePageDesc} />
                <label className='post_label_text' htmlFor='postimage' >Post ImageUrl</label>
                <input required className='post_input_ele' id="posttitle" type="url" placeholder="https://example.com" value={postImg} onChange={onChangePageImg} />
                <div className='input_postNo_title_container'>
                    <button type="submit"  className='post_add_btn'>
                        Add Post
                    </button>
                        
                </div>
                 {apiPostStatus==="LOADING"?(renderLoaderView()):(renderApiPostMsg())}
            </form>
                    {deleteBtnStatus===false?(<button onClick={deleteBtnClk} type="button" className='post_delete_btn'>
                         Want to Delete Post?
                    </button>):(
                        <div className='delete_container'>
                            <div className='post_title_container'>
                                <label className='post_label_text' htmlFor='postno' >Post No</label>
                                <input required className='post_no_input_ele' id="postno" type="text" placeholder="Number" value={deletePostNo} onChange={onChangeDeletePostNo} min="1" max="20" />
                             </div>
                             <button onClick={onDeleteRequest} type="button" className='post_delete_btn'>
                                Delete Post
                             </button>
                             <br/>
                             <button onClick={deleteBtnClk} type="button" className='post_back_btn'>
                                Back
                             </button>
                            </div>
                    )
                        }
                        <p className='api_status'>apiPostStatus: {apiDeleteStatus==="LOADING"?(renderDeleteApiLoaderView()):(renderApiDeleteMsg())}</p>                    
                </div>
            </div>
    </>
    )

}


export default Postadd





// <p className='err_msg'>{postImgErr}</p>
//                 <p className='err_msg'>{postDescErr}</p>
//                 {postNoErr===""?<p className='err_msg'>{postNoErr}</p>:''}
//                         <p className='err_msg'>{postTitleErr}</p>

// const validateForm=()=>{
//     if (postNo===''){
//         console.log("postNo/..")
//         postNoErr="*required!"
//         setPostNoErr(postNoErr)


//     }
//     if (postTitile===''){
//         postTitleErr="*required!"
//         setPostNoErr(postTitleErr)

//     }
//     if (postDesc===''){
//         postDescErr="*required!"
//         setPostNoErr(postDescErr)

//     }
//     if (postImg===''){    
//         postImgErr="*required!"
//         setPostNoErr(postImgErr)
//     }
// }

// validateForm()
// const [postNoErr,setPostNoErr]=useState("")
//     const [postTitleErr,setPostTitleErr]=useState("")
//     const [postDescErr,setpostDescErr]=useState("")
//     const [postImgErr,setPostImgErr]=useState("")