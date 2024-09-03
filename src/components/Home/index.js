// styling
import './index.css'
import {Component} from 'react'

import Loader from '../Loader'
import FailureCard from '../FailureCard'
import ListItemView from '../ListItemView'
import Navigation from "../Navigation"
import Header from '../Header'

// Home component
const apiStatus={
    success:"SUCCESS",
    failure:"FAILURE",
    loading:"LOADING"  
}

class Home extends Component{
    state={status:apiStatus.loading,listData:""}
    

    getUpdateData=(data)=>(
        {
            id:data.post_id,
            postNo:data.post_no,
            postTitle:data.post_title,
            postDesc:data.post_desc,
            postImage:data.post_image
        }

    )
        
    

    getListData= async ()=>{
        const url=`https://blogappbackend-2.onrender.com/`
        const response=await fetch(url)
        const data=await response.json()
        if (response.ok){
            // console.log(data)
            const updateData=data.map(each=>(
                this.getUpdateData(each)
            ))
            this.setState({listData:updateData,status:apiStatus.success})
        }
        else{
            this.setState({status:apiStatus.failure})
        }

    }
    
    componentDidMount(){
        this.getListData()
    }

    renderSuccessView=()=>{
        const {listData}=this.state
        return  (
            <div className='list_container'>
                {listData.map(each=>(
                    <ListItemView data={each} key={each.id}  />
                ))}
 

            </div>
        )
    }

    renderLoaderView=()=>(
        <Loader/>
    )
    renderFailureView=()=>{
        <FailureCard/>
    }

    renderFinalView=()=>{
        const {status}=this.state
        switch (status){
            case apiStatus.success:
                return this.renderSuccessView()
                 
            case apiStatus.failure:
                return this.renderFailureView()
                
            default:
                return this.renderLoaderView()
                        
        }
    }
    // checkOnce=async ()=>{
    //     const url='https://blogappbackend-2.onrender.com/'
    //     const response=await fetch(url)
    //     const data=await response.json()
    //     console.log(data)
    // // }
    // <button type="button" onClick={this.checkOnce}>Check Once</button>
    render(){
        return (
            <>
            <Header/>
            <div className='home_main_container'>
                 <Navigation/>
                <div className='home_container'>               
                    
                    {this.renderFinalView()}
                </div>
            </div>
            </>
            


          
        )

    }
}
export default Home
