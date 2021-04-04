import React from 'react'
import styled from 'styled-components';
import Card from 'components/Card/Card'
import { CardsWrapper } from 'components/Card/Card';
import Layout from 'components/Layout/Layout'

const Wrapper = styled.div`
  padding: 5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  span {
    display: block;
    font-size: 2rem;
    font-weight: 400;
    color: #696969;
    margin-top: 1rem;
  }
`;

function Home() {
    const cards = [
        {
          bgUrl: '/images/k_Bar.png',
          title: '월별 누적 확진자 현황',
          chartType: 'Bar Chart',
          link:'/BarChart'
        },
        {
          bgUrl: '/images/k_Line.png',
          title: '월별 격리자 현황',
          chartType: 'Line Chart',
          link:'/LineChart'
          
        },
        {
          bgUrl: '/images/k_Doughnut.png',
          title: '확진, 격리해제, 사망자 누적 현황',
          chartType: 'Doughnut Chart',
          link:'/DoughnutChart'
          
        },
      ];
    
    return (
        <Layout headTitle="Data Visualization">
            <Wrapper>
                <Title>
                South korea Covid-19 Data Visualization
                </Title>
                <CardsWrapper>
                {cards.map((card, i) => (
                    <Card
                    bgUrl={card.bgUrl}
                    title={card.title}
                    chartType={card.chartType}
                    link={card.link}
                    key={i}
                    />
                ))}
                </CardsWrapper>
            </Wrapper>
        </Layout>
    
       
    )
}

export default Home
