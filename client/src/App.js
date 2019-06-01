import React from 'react';
import './App.css';
import { Link,Route } from 'react-router-dom';
import otherPage from './otherPage';
import Home from './Fib';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Home</Link>
        <Link to="/otherPage">OtherPage</Link>
      </header>
      <Route exact path="/" component={Home}/>
      <Route path="/news" component={otherPage}/>
    </div>
  );
}

export default App;
