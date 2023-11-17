import React from 'react';
import Appbar from './Appbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { routes } from './routes';

function App() {

  return (  
    <div style={{
      backgroundColor: "#5a4777",
      margin: 0,
      padding: 0,
      height: "100vh",
      width: "100vw"
    }}>
    <Router>
    <Appbar/>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </Router>
    </div>
  )
}


export default App;           