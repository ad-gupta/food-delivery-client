import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Home/Navbar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clear, errorOccur, gotDishes } from '../redux/dishSlice';
import { useNavigate } from 'react-router';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// const Navbar = styled.nav`
//   position: sticky;
//   top: 0;
//   background-color: #f5f5f5;
// `;

const SubcategoryBox = styled.div`
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  height: 30vh;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Meals = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const getDish = async (category) => {
      try {
        const response = await axios.get(`dish/${category}`);
        const data = response.data;
  
        if (data.length > 0) {
          dispatch(clear())
          dispatch(gotDishes(data));
          navigate(`/dish/${category}`);
        } else {
          dispatch(errorOccur());
        }
      } catch (err) {
        dispatch(errorOccur());
      }
    };

  return (
    <Container>
      <Navbar/>
      <div>
        <SubcategoryBox>
          <Image src="./breakfast.jpg" alt="Category 1" />
          <Title>Breakfast</Title>
          <Button onClick={() => getDish('breakfast')}>Click</Button>
        </SubcategoryBox>
        <SubcategoryBox>
          <Image src="./lunch.jpg" alt="Category 2" />
          <Title>Lunch</Title>
          <Button onClick={() => getDish('lunch')}>click</Button>
        </SubcategoryBox>
        <SubcategoryBox>
          <Image src="./dinner.jpg" alt="Category 3" />
          <Title>Dinner</Title>
          <Button  onClick={() => getDish('dinner')}>click</Button>
        </SubcategoryBox>
        <SubcategoryBox>
          <Image src="./fastFood.jpg" alt="Category 4" />
          <Title>Fast Food</Title>
          <Button onClick={() => getDish('fastFood')}>click</Button>
        </SubcategoryBox>
        <SubcategoryBox>
          <Image src="./pizza.jpg" alt="Category 5" />
          <Title>Pizza</Title>
          <Button onClick={() => getDish('pizza')}>click</Button>
        </SubcategoryBox>
        <SubcategoryBox>
          <Image src="./burger.jpg" alt="Category 6" />
          <Title>Burger</Title>
          <Button onClick={() => getDish('burger')}>click</Button>
        </SubcategoryBox>
      </div>
    </Container>
  );
};

export default Meals;
