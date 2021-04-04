import styled from 'styled-components';

import { Link, BrowserRouter as Router } from 'react-router-dom'

const Wrapper = styled.header`
  padding: 5rem 5rem 0;
  p {
    margin-bottom: 0.5rem;
    @media (max-width: 568px) {
      line-height: 1.5;
    }
  }
  a {
    color: currentColor;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 5rem;
  @media (max-width: 568px) {
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  position: fixed;
  top: 5rem;
  left: 5rem;
  @media (max-width: 568px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 2rem;
  color: #696969;
  margin-bottom: 4.5rem;
  @media (max-width: 568px) {
    text-align: center;
  }
`;

function Header({ title, subTitle, chartType }) {
  if (title) {
    return (
      <Wrapper>
        <Logo>
          <Link to="/">
            🌐
          </Link>
        </Logo>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <p>Chart Type: {chartType}</p>
      </Wrapper>
    );
  }

  return null;
}



export default Header;