import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {forEach} from 'lodash';
import {AreaChart} from 'react-easy-chart';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statistics: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.setState({
      loading: true,
    });
    axios.get('http://localhost:9999/statistics')
    .then(result => {
      this.setState({
        loading: false,
        statistics: result.data,
      });
    });
  }

  buildHoursData() {
    const hourStatistics = this.state.statistics.hourStatistics.hours;
    const result = [];

    forEach(hourStatistics, (value, key) => {
      const hour = ('0' + key).slice(-2) + ':00';
      result.push({
        x: hour,
        y: value,
      })
    });

    return result;
  }

  buildDaysDate() {
    const dayStatistics = this.state.statistics.dayStatistics.days;
    const DAYS = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    const result = [];

    forEach(dayStatistics, (value, key) => {
      const day = DAYS[key];
      result.push({
        x: day,
        y: value,
      })
    });

    return result;
  }

  renderCharts() {
    return (
      <div>
        <h3>Hours Chart</h3>
        <AreaChart
          axes
          xType={'text'}
          interpolate={'cardinal'}
          margin={{top: 10, right: 10, bottom: 50, left: 50}}
          axisLabels={{x: 'Hours'}}
          width={1000}
          height={250}
          data={[this.buildHoursData()]}
        />
        <h3>Days Chart</h3>
        <AreaChart
          axes
          xType={'text'}
          interpolate={'cardinal'}
          margin={{top: 10, right: 10, bottom: 50, left: 50}}
          axisLabels={{x: 'Hours'}}
          width={1000}
          height={250}
          data={[this.buildDaysDate()]}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.loading && <p className="loader">Loading...</p>}
        {!this.state.loading && this.renderCharts()}
      </div>
    );
  }
}

export default App;
