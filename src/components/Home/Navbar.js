import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import axios from "axios";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { gotLocationSuccessfully, locationFailure } from "../../redux/locationSlice";

const Nav = styled.div`
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  height: 35px;
  width: 30vw;
  border: 2px solid grey;
  border-right: none;
  outline: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
`;

const SearchBtn = styled.button`
  width: 45px;
  height: 48.5px;
  border: 2px solid grey;
  outline: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  padding: 5px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
`;

const LoginButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(10, 104, 203);
  color: rgba(10, 104, 203);
  padding: 5px 15px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg};
  margin: 5px;
  gap: 5px;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImg = styled.img`
  border-radius: 50%;
  height: 27px;
  width: 25px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const MenuAndLogo = styled.div`
  display: flex;
  align-items: center;
`;

const Menubtn = styled.button`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  border: none;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  background-color: #fff;
  color: #333;
  cursor: pointer;
`;


const LocationSearchButton = styled(Button)`
  height: 45px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Locate = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Username = styled.p``;
const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
const API_key = "b57da35bdf5a373f3e6ea61744c6d686"

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentLocation } = useSelector((state) => state.location)
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [location, setLocation] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(currentUser)

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
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auths/logout");
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    
    <Nav>
      <Container>
        <MenuAndLogo>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>
              <img src='./logo1.jpg' alt = 'logo' style={{ height: "100px" }} />
              Food-delivery
            </Logo>
          </Link>
          <div>
          {!currentLocation ? (
                <LocationSearchButton onClick={getLocation}> <MyLocationIcon/> locate me</LocationSearchButton>
              ) : (
                <Locate>
                  <b>{currentLocation}</b>
                  <LocationSearchButton onClick={getLocation}> <MyLocationIcon/> locate me</LocationSearchButton>
                </Locate>
              )}
          </div>
        </MenuAndLogo>
        <SearchBar>
          <Input type="text" placeholder="Search" />
          <SearchBtn>
            <SearchIcon />{" "}
          </SearchBtn>
        </SearchBar>
        {!currentUser ? (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <LoginButton>
              <LoginIcon />
              SIGN IN
            </LoginButton>
          </Link>
        ) : (
          <User>
            <UserImg src={currentUser.imgUrl} />
            <Username>{`Hi ${currentUser.username ? currentUser.username : currentUser}`} </Username>
            <LoginButton onClick={handleLogout}>Logout</LoginButton>
          </User>
        )}
      </Container>
      <Hr />
    </Nav>
  );
};

export default Navbar;
