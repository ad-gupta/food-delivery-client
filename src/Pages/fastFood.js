import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import { useSelector } from 'react-redux';
import Navbar from '../components/Home/Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const FastFood = () => {
  const [boxes, setBoxes] = useState([]);
  const { currentDish } = useSelector((state) => state.dish);
  useEffect(() => {
    setBoxes(currentDish);
  }, [])
  console.log(boxes)
  return (
    <Container>
      <Navbar />
      <BoxContainer>
        {boxes.map((box) => (
          <Box key={box._id} image={box.dishPic} name={box.dishName}/>
        ))}
      </BoxContainer>
    </Container>
  );
};

export default FastFood;
