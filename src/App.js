import React from 'react';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      githubResp:[]
    }
  }
  componentDidMount(){
    axios.get("https://api.github.com/repositories").then(resp=>{
      this.setState({githubResp:resp});
    });
  }
  render(){
    return <div>
        Test app
      </div>;
  }
}