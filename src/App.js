import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {setServiceResponse} from './actions/actions.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TiLocationOutline,TiStarFullOutline} from 'react-icons/ti';
import {AiOutlineMail} from 'react-icons/ai';

const Container=styled.div`
  font-family:'Segoe UI',
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  
`;

const UserLink = props =>{
  return <a {...props}>
    {props.text}
  </a>
}
const StyledAnchor = styled(UserLink)`
  color: blue;
  text-decoration: none;
`;
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
      errorMsg:"",
      showErrorMsg:false
    }
  }
  
  async componentDidMount(){
    let respData =[],detailsPromises=[];
    axios.get("https://api.github.com/search/users?q=location:bangalore").then(resp=>{
      resp.data.items.slice(0,10).map(res=>{
        let userObj={
          owner_id:0,
          owner_name:"",
          full_name:"",
          avatar_url:"",
          user_url:"",
          email:"test@gmail.com",
          location:"",
          bio:"",
        }  
        userObj.owner_id=res.id
        userObj.repoName=res.name;
        userObj.owner_name=res.login;
        userObj.avatar_url=res.avatar_url;
        userObj.user_url=res.html_url;
        detailsPromises.push(axios.get(res.url));
        respData.push(userObj);
      });
      Promise.all(detailsPromises).then(details=>{
        console.log("details",details)
        details.forEach(item=>{
          let index=respData.findIndex(data=>data.owner_id===item.data.id);
          respData[index].company = item.data.company !== null? item.data.company : "";
          respData[index].email=item.data.email !== null ? item.data.email : "test@gmail.com";
          respData[index].full_name=item.data.name;
          respData[index].location=item.data.location;
          respData[index].bio=item.data.bio;
        });
       
        this.props.setServiceResponse(respData);
      }).catch(error=>{
        if(error.message.includes("rate limit exceeded")){
          this.setState({showErrorMsg:true,errorMsg:"API rate limit exceeded."})
        }
      });
      });
  }

  getBody(){
     let data=this.props.githubResp &&   this.props.githubResp.map((repo,i)=>{
      return <div key={'repo_'+i} style={{marginLeft:50,marginTop:20}}>
          <img width='50' className="" src={repo.avatar_url} alt={repo.owner_name} />
          <div style={{display:'inline-block',marginLeft:10}}>
          <StyledAnchor
          target="_blank"
           rel="noopener noreferrer"
           text={repo.owner_name}
          href={repo.user_url} />
          <span style={{display:'inline-block',marginLeft:10, fontSize:'1em'}}>{repo.full_name}</span>
          <div style={{marginTop:5,marginBottom:5}}>{repo.bio}</div>
          <div><TiLocationOutline /> {repo.location} <span style={{marginLeft:5}}><AiOutlineMail /> {repo.email} </span></div>
        </div>
      </div>;
    });
    return data;
  }
  render(){
     return  <div style={{marginTop:50}}>
        <Container>
          {this.state.showErrorMsg && <div style={{color:"red"}} >API Rate limit exceeded</div>}
        {this.getBody()}
        </Container>
  </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);