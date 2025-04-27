import React, {Component} from 'react';
import './App.css';
import Customer from './components/customer';

const customers = {
    'name': '나자신',
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
  }

class App extends Component {
  render() {
    return (
      <Customer 
        name={customers.name}
        birthday={customers.birthday}
        gender={customers.gender}
        job={customers.job}
      />
    );
  }
}

export default App;