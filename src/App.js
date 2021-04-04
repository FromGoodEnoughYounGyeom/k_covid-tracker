
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from 'components/Home'
import BarChart from 'components/BarChart'
import LineChart from 'components/LineChart'
import DoughnutChart from 'components/DoughnutChart'

function App() {
  return (
    <>

    <Switch>
      <Route exact path = "/" component={Home} />
      <Route path="/barChart" component={BarChart} />
      <Route path="/lineChart" component={LineChart} />
      <Route path="/doughnutChart" component={DoughnutChart} />
     
    </Switch>
    </>
  );
}

export default App;
