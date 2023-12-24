import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { PostsPage } from './pages/posts';
import { PostPage } from './pages/post';
import { BlogProvider } from './providers/blog-provider';
import { AuthProvider } from './providers/auth-provider';
import { Admin } from './pages/admin';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <PostsPage />
      },
      {
        path: "/posts/:id",
        element: <PostPage />,
      },
      {
        path: "/admin",
        element: <Admin />
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
