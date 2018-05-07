import React, {Component} from 'react'
// import {connect} from 'react-redux'
import {connect} from '../libs/react-redux'
import {increment, decrement, addMsg} from '../redux/actions'

// UI组件(不使用redux相关API)
class App extends Component {

  increment = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    this.props.increment(number)
  }

  decrement = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    this.props.decrement(number)
  }

  incrementIfOdd = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    const count = this.props.count
    if (count % 2 === 1) {
      this.props.increment(number)
    }
  }

  incrementAsync = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  }

  addMsg = () => {
    const msg = this.input.value
    this.props.addMsg(msg)
  }

  render() {
    console.log('app', this.props)
    const {count, msgs} = this.props
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={select => this.select = select}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>&nbsp;
          <button onClick={this.increment}>+</button>
          &nbsp;
          <button onClick={this.decrement}>-</button>
          &nbsp;
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          &nbsp;
          <button onClick={this.incrementAsync}>increment async</button>
          &nbsp;
        </div>

        <hr/>

        <div>
          <input type="text" ref={input => this.input = input}/>
          <button onClick={this.addMsg}>添加消息</button>
          <ul>
            {
              msgs.map((msg, index) => <li key={index}>{msg}</li>)
            }
          </ul>
        </div>

      </div>
    )
  }
}

// 向外默认暴露包装UI组件产生的容器组件
export default connect(
  state => ({count: state.count, msgs: state.msgs}),  // count, msgs
  {increment, decrement, addMsg}
)(App)