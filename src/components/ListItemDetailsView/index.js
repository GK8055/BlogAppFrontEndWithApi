import './index.css'
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'

const apiStatus={
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}


const ListItemDetailsView =()=>{
    const [listDetails,setListDetails]=useState("")
    const [status,setStatus]=useState(apiStatus.loading)
    let { id } = useParams();


    const getUpdateData=(data)=>(
        {
            id:data.post_id,
            postNo:data.post_no,
            postTitle:data.post_title,
            postImage:data.post_image,
            postDesc:data.post_desc
        }
    )

    const getListDetailsData= async ()=>{    
        const url=`https://blogappbackend-2.onrender.com/list/${id}`
        const response=await fetch(url)
        const data=await response.json()
        if (response.ok){
             const updateData=getUpdateData(data)
             setListDetails(updateData)
             setStatus(apiStatus.success)
            
        }
        else{
            setStatus(apiStatus.failure)
        }
    }
    useEffect(()=>{
        getListDetailsData()
    })
    const renderSuccessView=()=>{
        const {postTitle,postDesc,postImage}=listDetails     
        return (
            <div className='post_details_container'>
                <h1 className='post_details_title'>{postTitle}</h1>
                <img src={postImage} alt={postTitle} className='post_detials_image_size' />
                <p className='post_details_text'>{postDesc}</p>
            </div>
        )
    }

  const renderLoaderView=()=>(
    <p>Loading....</p>

    )

    const renderFailureView=()=>{

    }

    const renderFinalView=()=>{
        switch(status){
            case apiStatus.success:
                return renderSuccessView()
               
            case apiStatus.loading:
                return renderLoaderView()
               
            default:
                return renderFailureView()
                       
            }
        }
         return (
            <>
            <Header/>
            {renderFinalView()}
            </>

        )
    }

export default ListItemDetailsView