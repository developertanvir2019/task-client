import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Router } from './Extra/Router';
function App() {
  return (
    <div className="">
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;
