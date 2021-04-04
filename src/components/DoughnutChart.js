import React from 'react'
import { useState, useEffect } from 'react'
import {  Doughnut } from 'react-chartjs-2'
import axios from 'axios'
import Layout from 'components/Layout/Layout'
import {Wrapper, BarWrapper} from 'components/BarChart'

const DoughnutChart = () => {

    const [comparedData, setComparedData] = useState({})

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

 const last = arr[arr.length -1]
      setComparedData({
        labels:["확진자","격리해제","사망"],
        datasets: [
                { 
                  label: "누적 확진, 해제 사망 비율",
                  backgroundColor:["#ff3d67","#059bff","#ffc233"],
                  borderColor: ["#ff3d67","#059bff","#ffc233"],
                  fill: false,
                  data: [last.confirmed, last.recovered, last.death]
              },
]
    });
}

fetchEvents()

}, [])

    return (
         
        <Layout
        headTitle="Bar Chart | Data Visualization"
        title="국내 누적 확진, 격리해제, 사망자"
        subTitle=""
        chartType="Line Chart"
       >
          <Wrapper>
            <BarWrapper>
                <Doughnut data={comparedData} options={
                { title:{display: true, text: `누적 확진, 해제, 사망 (${new Date().getMonth()+1})`, fontSize: 16}},
                { legend: {display: true, position: "bottom"}}
              } />
            </BarWrapper>
          </Wrapper>
              
              </Layout>
    )
}

export default DoughnutChart
