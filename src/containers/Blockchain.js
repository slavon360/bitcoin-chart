import React, { Component } from 'react';
import axiosCoinApi from '../axios-instances/axiosCoinApi';
import { timeStartGenerator, flatten, setPriceClose, addDateObj } from '../shared/utility';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import MainChart from '../components/Chart';
import classes from './Blockchain.css';

class Blockchain extends Component{
  state = {
    chartData: null,
    timeParams: [
      { title: '1 Day', period_id: '10MIN', time_start: '' },
      { title: '1 Month', period_id: '1DAY', time_start: '' },
      { title: '6 Month', period_id: '1DAY', time_start: '' },
      { title: '1 Year', period_id: '1DAY', time_start: '' }
    ],
    selectedTimeParameter: null,
    loading: false
  }
  componentWillMount(){
    //this.getChartData();
    this.setTimeParam(this.state.timeParams[0].title);
  }

  setTimeParam = (title) => {
    this.state.timeParams.forEach((parameter) => {
      parameter.title === title && this.setState({
                                                  selectedTimeParameter: {
                                                                            ...parameter,
                                                                            time_start: timeStartGenerator(parameter)
                                                                          }
                                                  }, () => {
                    this.getChartData(this.state.selectedTimeParameter);
      });
    });
  }
  setChartData = (data) => {
    let updData = addDateObj(data);
    this.setState({ chartData: updData, loading: false }, () => {
      console.log(this.state.chartData)
    })
  }
  getChartData = (param) => {
    this.setState({ loading: true });
    axiosCoinApi.get(`/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=${param.period_id}&time_start=${param.time_start}&limit=2000`)
    .then((response) => {
      console.log(response);
      let flattened = flatten(response.data);
      this.setChartData(flattened);
    })
    .catch((error) => {
      this.setState({ loading: false });
      console.error(error);
    })
    /*

    */
  }

  render() {
    let content = <p>loading...</p>;
    let day = this.state.selectedTimeParameter && this.state.selectedTimeParameter.title.indexOf('Day') >= 0 ? true : false;
    this.state.chartData && (content = <MainChart day={day} data={this.state.chartData}/>);
    return (
      <div className={classes.BlockchainWrp}>
        <Toolbar timeParams={this.state.timeParams} setTimeParam={this.setTimeParam}/>
        <h2 className={classes.Title}>BITCOIN CHART (BTC/USD)</h2>
        {content}
      </div>
    );
  }
};

export default Blockchain;
