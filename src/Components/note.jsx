import React, { Component } from "react";
import "./main.scss";
import axios from "axios";
import bg from './bg.jpg'

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note_name: "",
      data: [],
      updatednote_name: "",
    };
  }

  onSubmit = async () => {
    alert(this.state.note_name);
    const result = await axios.post(`http://localhost:4000/app/signup`, {
      note: this.state.note_name,
    });
    console.log(result);
    if (result.status == 200) {
      this.getData();
    }
  };

  getData = async () => {
    try {
      const data = await axios.get("http://localhost:4000/app/get-all-data");
      console.log(data.data);
      this.setState({
        data: data.data,
      });
    } catch (err) {
      console.log(err);
    }
    this.setState({
      note: "",
    });
  };
  componentDidMount() {
      
    this.getData();
  }
  render() {
    return (
      <div className="note-page-container">
      <img src={bg} />
        <div className="note-app-header">
          <p>NOTE APP</p>
        </div>

        <div className="main">
          <div className="note-main-section1">
            <input
              className="input"
              placeholder="Note"
              type="text"
              value={this.state.note_name}
              onChange={(e) => this.setState({ note_name: e.target.value })}
            />

            <button className="btn" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </div>
        {this.state.data.length > 0
          ? this.state.data.reverse().map((item) => (
              <NoteRowContainer reload={()=>this.getData()} item={item} />
            ))
          : null}
      </div>
    );
  }
}
// import React, { Component } from 'react';

export class NoteRowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
         
        data: [],
        updatednote_name: "",
      };
  }

  onDelete = async (del) => {
    alert(del);
    const result = await axios.post(
      `http://localhost:4000/app/delete-data/${del}`
    );
    console.log(result);
  };

  onUpdate = async (newNote) => {
    // alert(this.state.updatednote_name);
    const data = {
      note:this.state.updatednote_name
    }
    const result = await axios.post(
      `http://localhost:4000/app/update-mail/${newNote}`,
      data
    );
    console.log(result);
  };

  componentDidMount() {
      console.log(this.props.item);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="note-page-container">
        <div className="note-main-section2">
          <>
            <form className="table">
              <h4>{item.note}</h4>
              <h4>{item.date.substr(0, 10)}</h4>
              <div>
                <input
                  className="update-input"
                  placeholder="Update"
                  type="text"
                    value={this.state.updatednote_name}
                  onChange={(e) =>
                    this.setState({ updatednote_name: e.target.value })
                  }
                />
                <button
                  onClick={() => this.onUpdate(item.note)}
                 className="btns">Update</button>
                <button
                    onClick={() => this.onDelete(item.note)}
                  className="btns"
                >
                  Delete
                </button>
              </div>
            </form>
          </>
        </div>
      </div>
    );
  }
}
