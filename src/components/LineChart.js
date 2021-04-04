import React from 'react'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import Layout from 'components/Layout/Layout'
import {Wrapper, BarWrapper} from 'components/BarChart'



const LineChart = () =>  {

    const [quarantinedData, setQuarantinedData] = useState({})

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
          setQuarantinedData({
            labels,
            datasets: [
                    { 
                      label: "월별 격리자 현황",
                      borderColor: "green",
                      fill: false,
                      data: arr.map(a=>a.active)
                  },
    ]
        });
    }

    fetchEvents()

  }, [])

    return (
             <Layout
      headTitle="Line Chart | Data Visualization"
      title="국내 월별 격리자 현황"
      subTitle=""
      chartType="Line Chart"
     >
        <Wrapper>
          <BarWrapper>
            <Line data={quarantinedData} options={
                { title:{display: true, text: "월별 격리자 현황", fontSize: 16}},
                { legend: {display: true, position: "bottom"}}
              } />
          </BarWrapper>
        </Wrapper>
            
            </Layout>
      
         
    )
}

export default LineChart