import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from './firebase'

class App extends Component {
constructor() {
  super();
  this.state = { name : null,
                 students : null
                }
}

componentDidMount() {
  db
    .doc('bootcamps/bangalore')
    .get()
    .then((doc) => this.setState({name:doc.data().name}));

  db
    .collection('students')
    .onSnapshot(coll => {
      const students = coll.docs.map(doc => doc.data());
      this.setState({students});
      })
}

handleEvent(event) {
  event.preventDefault();
  const newStudent = db.collection('students').doc();
  newStudent.set({name:this.titleName.value,id:newStudent.id});
  this.titleName.value="";
}

render() {
  return (
    <div className="App">
        <h1>{this.state && this.state.name}</h1>
        <ul>
          {this.state && this.state.students && 
            this.state.students.map((student,index) => 
              <li> {student.name}  
                <button onClick ={() => 
                        db.collection('students')
                          .doc(`${student.id}`).delete()}> X
                </button>
              </li>
          )}
        </ul>

        <input type="text" ref={input => this.titleName = input}/>
        <button onClick={event => this.handleEvent(event)} > Submit </button>
    </div>
  );
}

}

export default App;
