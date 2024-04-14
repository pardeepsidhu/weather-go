import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './compents/Navbar'
import Table from './compents/Table';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import  Weather  from './compents/Weather';
import About from './compents/About';



function App() {
  const [search, setSearch] = useState<string>('');
  const [suggestions,setSuggestions]=useState<string[]>([])
  return (
    <div className="App">
<Router>
<Navbar search={search}  setSearch={setSearch} setSuggestions={setSuggestions} suggestions={suggestions} />
<Routes>
  <Route index  element={<Table suggestions={suggestions} setSuggestions={setSuggestions} search={search} />} />
  <Route path='weather/:lon/:lat' element={<Weather />} />
  <Route path='/about' element={<About />} />
</Routes>
</Router>

    </div>
  );
}

export default App;
