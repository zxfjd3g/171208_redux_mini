import React, {Component} from 'react'
import PropTypes from 'prop-types'
/*
自定义react-redux库模块
1. Provider
    组件类
    接收store属性
    将store暴露给所有层次的容器子组件: 利用context技术
    在render中, 指定渲染<Provider>的所有子节点(<App />)
2. connect
    高阶函数
 */

// 1. Provider
export class Provider extends Component {
  // 声明接收属性
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  // 声明向后代组件提供的context
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }

  // 向后代提供context
  getChildContext () {
    return {// context对象
      store: this.props.store
    }
  }

  render() {
    // 将当前<Provider>的标签体(所有的子节点)
    return this.props.children
  }
}

// 2. connect
export function connect() {

}