import './App.css';
import{BrowserRouter as  Router, Route }from 'react-router-dom';
import View from './component/view/View';

function App() {
  
  return (
      <Router>
        <div className="App">
          <Route exact path="/" component={View} />
        </div>
      </Router>
  );
}

export default App;
