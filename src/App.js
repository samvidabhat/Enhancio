import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {setServiceResponse} from './actions/actions.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "./App.css"
import {TiLocationOutline} from 'react-icons/ti';
import {AiOutlineMail} from 'react-icons/ai';

export const mapStateToProps = (state) =>{
  return {
  githubResp: state.githubrepos
  }
}
export const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({setServiceResponse}, dispatch);
}
 class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      githubResp:[]
    }
  }
  
  async componentDidMount(){
    let respData =[];
    axios.get("https://api.github.com/search/repositories?q=location:Bangalore").then(resp=>{
     
      
      resp.data.items.slice(0,10).map(async res=>{
        let userObj={
          owner_id:0,
          owner_name:"",
          repoName:"",
          avatar_url:"",
          user_url:"",
          company:"",
          email:"test@gmail.com",
          location:"Bangalore, India"
        }  
        userObj.owner_id=res.owner.id
        userObj.repoName=res.name;
        userObj.owner_name=res.owner.login;
        userObj.avatar_url=res.owner.avatar_url;
        userObj.user_url=res.owner.html_url
        // await axios.get(res.owner.url).then(details=>{
        //   console.log("details",details)
        //   userObj.company = details.data.company !== null? details.company : "";
        //   userObj.email=details.data.email !== null ? details.email : "";
        // });
        
        respData.push(userObj);
      });
      console.log("respData",respData)
      respData.length && this.props.setServiceResponse(respData);
    });
    // axios.get("https://api.github.com/search/repositories?q=location:Bangalore").then(resp=>{

    // });
  }
  getBody(){
    let data=this.props.githubResp &&   this.props.githubResp.map((repo,i)=>{
      return <div key={'repo_'+i} style={{marginLeft:50}}>
          <img width='50' className="spacing__vertical" src={repo.avatar_url} alt={repo.repoName} />
          <div style={{display:'inline-block',marginLeft:10}}>
          <a style={{fontSize:'1.25em'}} target="_blank" rel="noopener noreferrer" href={repo.user_url}> 
          {repo.repoName}
          </a><span style={{display:'inline-block',marginLeft:10, fontSize:'1.25em'}}>{repo.owner_name}</span>
          <div><TiLocationOutline /> {repo.location} <AiOutlineMail />{repo.email} </div>
        </div>
      </div>;
    });
    return data;
  }
  render(){
    console.log("githubResp",this.props.githubResp)
    return  <div className="container" style={{marginTop:50}}>
      {this.getBody()}
  </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);