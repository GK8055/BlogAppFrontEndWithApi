import './index.css'
import { useState} from 'react'
import Navigation from "../Navigation"
import {v4} from 'uuid'
import Header from '../Header'

const apiStatus={
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const PostEdit=()=>{
    const [postNo,setPostNo]=useState("")
    const [postTitile,setPostTitle]=useState("")
    const [postDesc,setPostDesc]=useState("")
    const [postImg,setPostImg]=useState("")

    const [apiPutStatus,setApiPutStatus]=useState("")
    const [apiPutResponse,setApiPutResponse]=useState("")


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

    //PUT Request:
    const onSubmitForm= async(e)=>{
        e.preventDefault()
        const editPost={
            PostId:v4(),
            postNo:postNo,
            postTitle:postTitile,
            postDesc:postDesc,
            postImage:postImg
        }
        const url=`https://blogappbackend-2.onrender.com/list/edit/${postNo}`
        const options={
            method:"PUT",
            headers:{
                'Content-Type':"application/json",
                accept:"application/json"
            },
            body:JSON.stringify(editPost)
        }
        const response=await fetch(url,options)
        const data=await response.text()
        if (response.ok){
            setApiPutResponse(data)
            setApiPutStatus(apiStatus.success)
            setPostNo('')
            setPostTitle('')
            setPostDesc('')
            setPostImg('')
        }
        else{
            setApiPutResponse(data)
            setApiPutStatus(apiStatus.failure)
            setPostNo('')
            setPostTitle('')
            setPostDesc('')
            setPostImg('')
        }
    }

    const renderSuccessMsg=()=>(
        apiPutResponse
    )

    const renderFailureMsg=()=>(
        apiPutResponse
    )
        
    

    const renderLoaderView=()=>(
          "Loading...."
    )
    const renderApiPutMsg=()=>{
        switch(apiPutStatus){
            case apiStatus.success:
                return renderSuccessMsg()
                
            default:
                return renderFailureMsg()
                

        }
    }
    
    return (
        <>
        <Header/>
        <div className='post_container'>
        <Navigation/>
        <div className='post_add_container'>
            <h1 className='post_title'>Want Edit Blog Post?</h1>
            <form onSubmit={onSubmitForm} className='form_container_1'>
                <div className='input_postNo_title_container'>
                    <div className='post_title_container'>
                        <label className='post_label_text' htmlFor='postno' >Post No</label>
                        <input required className='post_no_input_ele' id="postno" type="number" placeholder="Number" value={postNo} onChange={onChangePageNo} />
                    </div>
                    <div className='post_title_container'>
                        <label className='post_label_text' htmlFor='posttitle' >Post Title</label>
                        <input required className='post_input_ele' id="posttitle" type="text" placeholder="Posttitle" value={postTitile} onChange={onChangePageTitle} />                   
                    </div>
                </div>
                <label className='post_label_text' htmlFor='postdesc'>Post Desc</label>
                <textarea required rows="7" cols="30" id="postdesc" placeholder='PostDesc' className='post_input_ele' vlaue={postDesc} onChange={onChangePageDesc} />
                <label className='post_label_text' htmlFor='postimage' >Post ImageUrl</label>
                <input required className='post_input_ele' id="postimage" type="url" placeholder="https://example.com" value={postImg} onChange={onChangePageImg} />
                <div className='input_postNo_title_container'>
                    <button type="submit"  className='post_add_btn'>
                        Edit Post
                    </button>    
                </div>
                <p className='api_status'>apiPostStatus: {apiPutStatus==="LOADING"?(renderLoaderView()):(renderApiPutMsg())}</p>
            </form>
        </div>
        </div>
        </>
    )

}


export default PostEdit
