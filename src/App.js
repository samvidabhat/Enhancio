import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {setServiceResponse} from './actions/actions.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
  
  componentDidMount(){
    let folPromises =[];
    axios.get("https://api.github.com/search/repositories?q=location:Bangalore").then(resp=>{
      this.props.setServiceResponse(resp.data);
    });
    // axios.get("https://api.github.com/search/repositories?q=location:Bangalore").then(resp=>{

    // });
  }
  getBody(){
    let data=this.props.githubResp &&   this.props.githubResp.map((repo,i)=>{
      return <div key={'repo_'+i}>
          <img src={repo.owner.avatar_url} alt={repo.name} width={50} height={30}/>
          <div>{repo.name}</div>
          <br/>
      </div>;
    });
    return data;
  }
  render(){
    console.log("githubResp",this.props.githubResp)
    return  <div className="container">
      {this.getBody()}
  </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);