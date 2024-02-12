import React from 'react';
import './App.css';
import NavBar from './NavBar'; // Make sure the path is correct
import Footer from './components/footer.js'

import { useState } from 'react';
import { Outlet } from 'react-router-dom';


function App() {
  const [pageName, setPageName] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home setPageTitle={setPageTitle} />
  //   },
  //   {
  //     path: "/posts",
  //     element: <posts setPageTitle={setPageTitle} />
  //   },
  //   // ...other routes
  // ]);



  return (
    <div className="App">
      <NavBar namePages={setPageName} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
