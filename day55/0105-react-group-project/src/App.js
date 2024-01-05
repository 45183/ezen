
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./routes/Home";
import Character from "./routes/Character";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/character/:id' element={<Character />}></Route>
      </Routes>

          Learn React

    </div>
  );
}

export default App;
