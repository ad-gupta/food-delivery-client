import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom";
import Main from './components/Home/Main';
import '../src/App.css'
import SignIn from './Pages/SignIn';
import Meals from './Pages/Meals';
import Breakfast from './Pages/breakfast';
import Lunch from './Pages/lunch';
import Dinner from './Pages/dinner';
import FastFood from './Pages/fastFood';
import Pizza from './Pages/pizza';
import Burger from './Pages/burger';

const Container = styled.div`
  
`

const App = () => {
  return (
    <Container>
      {/* <SearchLink /> */}
      <Routes>
        <Route path='/'>
          <Route index element = {<Main />} />
          <Route path='signin' element= {<SignIn/>}/>
          <Route path='dish'>
            <Route index element= {<Meals/>} />
            <Route path='breakfast' element = {<Breakfast/>} />
            <Route path='lunch' element = {<Lunch/>} />
            <Route path='dinner' element = {<Dinner/>} />
            <Route path='fastFood' element = {<FastFood/>} />
            <Route path='burger' element = {<Burger/>} />
            <Route path='pizza' element = {<Pizza/>} />
          </Route>
        </Route>
      </Routes>
    </Container>
  )
}

export default App
