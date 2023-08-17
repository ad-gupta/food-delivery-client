import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const BoxImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const BoxName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: none;
  color: #3498db;
  font-size: 14px;
  // border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Box = ({ image, name }) => {
  const { currentLocation } = useSelector((state) => state.location)
  const openGoogleSearch = (platform) => {
    const searchQuery = `${name} in ${currentLocation} ${platform}`
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(currentLocation)}`;
    window.open(googleSearchUrl, '_blank'); // Open in a new tab or window
  };
  return (
    <BoxContainer>
      <BoxImage src={image} alt={name} />
      <BoxName>{name}</BoxName>
      <Button onClick={()=>openGoogleSearch('swiggy')}>
        swiggy
      </Button>
      <Button onClick={()=>openGoogleSearch('zomato')}>
        zomato
      </Button>
    </BoxContainer>
  );
};

export default Box;
