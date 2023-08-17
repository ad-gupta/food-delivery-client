import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Banner from './Banner'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { gotLocationSuccessfully, locationFailure } from '../../redux/locationSlice';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.img`
  max-width: 100px;
  border-radius: 5px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  background-color: #fff;
  color: #333;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
  display: flex;
  align-items: center;
  padding-left: 50px;
  
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  height: 30px;
`;

const LocationSearchButton = styled(Button)`
  // background-color: #4caf50;
  // color: #fff;
  height: 45px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: -100px;
`;

const LocationSearchButton1 = styled(Button)`
  background-color: #4caf50;
  color: #fff;
  height: 45px;
  border-radius: 4px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: yellow;
`

const Img = styled.img`
  width: 50vw;
`

const PopularDishes = styled.div`

`

const Image = styled.img`
  width: 100vw;
  max-height: 100vh;
`
const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
const API_key = "b57da35bdf5a373f3e6ea61744c6d686"

const Main = () => {
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [location, setLocation] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude)
            setLong(pos.coords.longitude)
        })
    }, [lat, long])
    const getLocation = () => {
      try{
        const finalAPI = `${API_endpoint}lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${API_key}`
        axios.get(finalAPI)
        .then((resp)=> {
            setLocation(resp.data.name)
        })
        if(location) {
          dispatch(gotLocationSuccessfully(location))
          console.log(location)
          navigate('/dish')
        }
      }
      catch(err) {
        dispatch(locationFailure())
      }
    }
    const getLocation1 = () => {
      try{
        if(location) {
          dispatch(gotLocationSuccessfully(location))
          console.log(location)
          navigate('/dish')
        }
      }
      catch(err) {
        dispatch(locationFailure())
      }
    }
  return (
    <>
      <NavbarWrapper>
        <Logo src="./logo1.jpg" alt="Company Logo" />
        <NavLinks>
          <Link to='/signin'>
          <Button>Login</Button>
          </Link>
          {/* <Button>Signup</Button> */}
        </NavLinks>
      </NavbarWrapper>
      <Search>
        <div style={{flexDirection: "column"}}>
          <Banner />
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search the location" onChange={(e) => setLocation(e.target.value)}/>
            <LocationSearchButton onClick={getLocation}> <MyLocationIcon/> locate me</LocationSearchButton>
            <LocationSearchButton1 onClick={getLocation1}>Search</LocationSearchButton1>
          </SearchWrapper>
        </div>
        <Img src='./meals.jpg' />
      </Search>
      <PopularDishes>
        <Image src='./burger.jpg' />
        <Image src='./pizza.jpg' />
      </PopularDishes>
    </>
  );
};

export default Main;
