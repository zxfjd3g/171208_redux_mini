import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {increment, decrement, addMsg} from '../redux/actions'

export default class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  increment = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    this.props.store.dispatch(increment(number))
  }

  decrement = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    this.props.store.dispatch(decrement(number))
  }

  incrementIfOdd = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    const count = this.props.store.getState().count
    if (count % 2 === 1) {
      this.props.store.dispatch(increment(number))
    }
  }

  incrementAsync = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1
    setTimeout(() => {
      this.props.store.dispatch(increment(number))
    }, 1000)
  }

  addMsg = () => {
    const msg = this.input.value
    this.props.store.dispatch(addMsg(msg))
  }

  render() {
    const {count, msgs} = this.props.store.getState()
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