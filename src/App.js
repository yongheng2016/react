import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const element = <p>test</p>

//组件
function Welcome(props) {
  return <h1 >welcome 传来state {props.name}</h1>
}
//ES6 class扩展，同上
class Goods extends Component {
  render() {
    return (
      <h1>GOODS{this.props.name}</h1>
    )
  }
}

//react元素不仅可以是DOM标签，还可以是自定义**组件**


//自定义方法
function add(val1, val2) {
  return val1 + val2
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      changeNumber: 0,
      value: ''
    }
    // this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  getInitialState() {
    console.log('getInitialState')
  }
  componentWillMount() {
    const url = 'https://easy-mock.com/mock/5ac9ee1c1a9b6f7774f69e34/example/query'
    axios.get(url).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  // componentWillUpdate() {
  //   console.log('componentWillUpdate')
  // }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate')
  //   return true
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnMount')
  //   clearInterval(this.timerID);
  // }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  handleClick = (id) => {
    console.log(id)
    this.setState((preState, props) => ({
      changeNumber: preState.changeNumber + 1
    }))
  }
  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      value: event.target.value
    })
  }
  handleSubmit(event) {
    console.log('handlesubmit')
    event.preventDefault()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react 测试</h1>
        </header>
        <div className="contents">
          <Welcome name={this.state.date.toLocaleTimeString()} />
          <Goods name="this is Goods" />
        </div>
        <p className="App-intro">
          从这里开始, 编辑 <code>src/App.js</code> 更改.
        </p>
        <p>{add(4, 5)}{90 + 20}</p>
        <p>{this.props.name}</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
        <button onClick={(e) => this.handleClick(5, e)}>button</button>
        <div>button number {this.state.changeNumber}</div>
        <form action="get" onSubmit={this.handleSubmit}>
          <label htmlFor="login">
            name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" />
          <select>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
          <input type="file"/>
        </form>
      </div>
    );
  }
}

export default App;
