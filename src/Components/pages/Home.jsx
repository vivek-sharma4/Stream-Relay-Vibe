import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const HomeWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 0;
  background-color:#74d7e9;
`;

const HeroSection = styled.section`
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 100px 20px;
  box-sizing: border-box;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  background-color:#1e93b0;
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 200px;
  
  &:hover {
    background-color:#708ef0;
    transform: translateY(-5px);
  }

  &:focus {
    outline: none;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #2196f3;

  &:hover {
    background-color: #1976d2;
  }
`;

const FeaturesWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 60px 0;
  flex-wrap: wrap;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <HomeWrapper>
      {/* Hero Section */}
      <HeroSection>
        <h1>Welcome to Stream Relay Vibe</h1>
        <p>Your ultimate platform for connecting, sharing, and discovering new possibilities!</p>

        <ButtonGroup>
          <Button onClick={handleGoToLogin}>Login</Button>
          <RegisterButton onClick={handleGoToRegister}>Register</RegisterButton>
        </ButtonGroup>
      </HeroSection>

      {/* Feature Section */}
      <FeaturesWrapper>
        <FeatureCard>
          <h3>Connect</h3>
          <p>Build lasting connections with friends, family, and colleagues. Stay in touch effortlessly.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Share</h3>
          <p>Share your thoughts, moments, and experiences with the world. Express yourself freely.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Discover</h3>
          <p>Explore new content, trends, and people from different parts of the world. Endless possibilities await.</p>
        </FeatureCard>
      </FeaturesWrapper>
    </HomeWrapper>
  );
};

export default Home;