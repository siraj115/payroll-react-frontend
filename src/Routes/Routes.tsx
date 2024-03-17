
import { lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Page, RoutesPrefixes } from './types';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import Page404 from '../Pages/Page404';
import ProtectedRoute from './ProtectedRoute';
import Authentication from '../Pages/Authentication';
import Signin from '../Components/Authentication/SignIn';
const HomePage = lazy(() => import('../Pages/Homepage'));






const {
  homePage,
  authenticateUser
} = RoutesPrefixes;
export const pages: Page[] = [
  { 
    path: `${homePage}`, 
    component: <HomePage/> 
  },
  {
    path: `${authenticateUser}`,
    component: <Authentication/>,
  },
  
];


const RoutesComponent = () => {


  const [scrollVisibility,setScrollVisibility]=useState(false);
  const checkScrollTop = () => {    
    if (!scrollVisibility && window.pageYOffset > 500){
      setScrollVisibility(true)    
    } else if (scrollVisibility && window.pageYOffset <= 500){
      setScrollVisibility(false)    
    }  
 };
 window.addEventListener('scroll', checkScrollTop)

  return (
    <BrowserRouter>
      
      <ProtectedRoute>
        <Routes>
        {pages.map(({ component, path }) => {
            return (
              <Route
                key={path}
                element={
                    <>
                      {component}
                    </>
                }
                path={path}
              />
            );
          })}
          <Route element={<Page404 />} path='*' />
        </Routes>
      </ProtectedRoute>
      <div className='grid justify-items-center'>
       
      </div>
    </BrowserRouter>
  );
};

export default RoutesComponent;
