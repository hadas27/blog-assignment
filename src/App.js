import React from 'react';
import './App.css';
import NavBar from './NavBar'; // Make sure the path is correct
import HeaderFn from './components/header.js'
import Footer from './components/footer.js'
import { Contact } from './pages/contact.js';
import { Admin } from './pages/admin.js';
import { PostsPage } from './pages/posts.js';
import { useState } from 'react';
import { Home } from './pages/home.js';
import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

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
      {/* {renderPageByPageName()} */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
