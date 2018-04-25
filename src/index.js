import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Switch } from 'react-router'
// import { HashRouter } from 'react-router-dom'
// import './index.css';
// import App from './App';
// import Search from './page/search/searchTest'
// import registerServiceWorker from './registerServiceWorker';


// let data = [
//     { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
//     { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
//     { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
//     { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
//     { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
//     { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
// ];


// ReactDOM.render((
// <HashRouter>
//   <App/>
// </HashRouter>), document.getElementById('root'));
// // ReactDOM.render(<Search product={data} />, document.getElementById('root'));
// registerServiceWorker();

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/topics">主题列表</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>主题列表</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          使用 React 渲染
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          组件
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          属性 v. 状态
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>请选择一个主题。</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

ReactDOM.render(<BasicExample />, document.getElementById('root'));
