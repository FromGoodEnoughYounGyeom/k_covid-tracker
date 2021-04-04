import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import Layout from 'components/Layout/Layout'


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  
`;

export const BarWrapper = styled.div`
  width: 70%;
  height: auto;
`;

const BarChart = () => {

  const [confirmedData, setConfirmedData] = useState({})

    useEffect(()=> {
      const fetchEvents = async () => {
        const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
        makeData(res.data)
      } 
      const makeData = (items) => {
        const arr = items.reduce((acc, cur) => {
          const currentDate = new Date(cur.Date);
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const date = currentDate.getDate();
          const confirmed = cur.Confirmed;
          const active = cur.Active;
          const death = cur.Deaths;
          const recovered = cur.Recovered;

          const findItem = acc.find(a=> a.year === year && a.month === month);

          if(!findItem){
            acc.push({year, month, date, confirmed, active, death, recovered})
          }
          if(findItem && findItem.date < date){
            findItem.active = active;
            findItem.death = death;
            findItem.date = date;
            findItem.year = year;
            findItem.month = month;
            findItem.recovered = recovered;
            findItem.confirmed = confirmed;

          }

            return acc;
        }, [])

        const labels = arr.map(a=> `${a.month+1}월`)
        setConfirmedData({
            labels,
            datasets: [
                    { 
                      label: "국내 누적 확진자",
                      backgroundColor: "salmon",
                      fill: true,
                      data: arr.map(a=>a.confirmed)
                  },
    ]
        });
      }

      fetchEvents()

    }, [])


    return (
     
          <Layout
      headTitle="Bar Chart | Data Visualization"
      title="국내 누적 확진자"
      subTitle="국내 누적 확진자 월별 추이"
      chartType="Line Chart"
     >
        <Wrapper>
          <BarWrapper>
            <Bar data={confirmedData} options={
              { title:{display: true, text: "누적 확진자 추이", fontSize: 16}},
              { legend: {display: true, position: "bottom"}}
            } />
          </BarWrapper>
        </Wrapper>
            
            </Layout>
         
      
   
    )
}

export default BarChart
