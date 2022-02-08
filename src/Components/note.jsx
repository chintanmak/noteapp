import React, { Component } from 'react';
import './main.scss';
import axios from 'axios';

export default class Note extends Component {
constructor(props) {
    super(props);
    this.state={
        note_name:'',
        data:[]
    }
}

onSubmit=async()=>{
    alert(this.state.note_name);
    await axios.post(`http://localhost:4000/app/signup`, {note:this.state.note_name})
    
}
 
getData=async()=>{
        
    try{
        const data = await axios.get('http://localhost:4000/app/get-all-data');
        console.log(data.data);
        this.setState({
        data:data.data
        })
    }catch(err){
        console.log(err);
    }
    this.setState({
        note:''
    })
}
componentDidMount() {
    this.getData();
}
  render() {
    return (
        <div className='note-page-container'>
            <div className='note-app-header'>
            <p>NOTE APP</p>
            </div>

            <div className='main'>


            <div className='note-main-section1'>
                
                    <input className='input'
                    placeholder='Note'
                    type='text'
                    value={this.state.note_name}
                    onChange={(e)=> this.setState({note_name:e.target.value})}
                    />
                
                <button className='btn'
                onClick={this.onSubmit}
                >Submit</button>
            </div>

            <div className='note-main-section2'>
                    {
                        this.state.data.length>0?
                        this.state.data.map(item=>(
                            <>

                            <h4>
                                {item.note} {'-'} {item.date.substr(0,10)}
                            </h4>
                            
                            </>

                        ))
                        : 
                       <h1>No data</h1>
                    }


                </div>
                </div>
        </div>
        );
  }
}
