import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id:'1000' ,name: 'Santosh', age: 28 },
      { id:'1001',name: 'Samarth', age: 29 },
      { id:'1002',name: 'Siyona', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {  
    console.log("Index is"+personIndex);
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});

  }
  nameChangedHandler = ( event,id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id===id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState( {persons:persons} )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map(
            (person,index) => {
              return  <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={(event)=> this.nameChangedHandler(event,person.id)}
              />
            }
          )}
    
        </div>
      );

      style.backgroundColor="red";
    }

    const styleClassP = [];
    if(this.state.persons.length <=2){
      console.log("Adding yellow color");
      styleClassP.push("red");
    }

    if(this.state.persons.length<=1){
      console.log("Adding bold");
      styleClassP.push("bold");
    }

    return (
      <div className="App">
        <h1>My First react app </h1>
       
        <p className={styleClassP.join(' ')}>List of person</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle List</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
