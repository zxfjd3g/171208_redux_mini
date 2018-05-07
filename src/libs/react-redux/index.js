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
    参数:
      参数1: mapStateToProps= state => ({})
      参数2: mapDispatchToProps={}
    返回值:
      一个函数, 接收一个UI组件, 返回一个容器组件
    容器组件:
      容器组件包含是UI组件
      容器组件会向UI组件传递属性
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

/*
2. connect
mapStateToProps: state => ({count: state.count, msgs: state.msgs})
mapDispatchToProps:  {increment, decrement, addMsg}

function increment(number) {
  return {type:'INCREMENT', data: number}
}
function increment (...args) {
  store.dispatch(increment(...args))
}
 */
export function connect(mapStateToProps= state => ({}), mapDispatchToProps={}) {

  // 一个函数, 接收一个UI组件, 返回一个容器组件
  return function (UIComponent) {
    return class ConnectComponent extends Component {

      // 声明读取context中的store
      static contextTypes = {
        store: PropTypes.object.isRequired
      }

      // 为UI组件准备一般属性
      // 为UI组件准备函数属性
      constructor(props, context) {
        super(props, context)

        /*为UI组件准备一般属性*/
        // stateProps包含所有需要传递的一般属性的对象
        const stateProps = mapStateToProps(context.store.getState())  // {count: 2, msgs: ['aa']}

        // 初始化容器组件的状态
        this.state = stateProps

        /*为UI组件准备函数属性*/
        this.dispatchProps = this.bindActionCreators(mapDispatchToProps)
      }

      // 返回的数据: 对象
      // 内部包含的是一些方法
      bindActionCreators = (mapDispatchToProps) => {
        // 1. 准备一个对象
        const dispatchProps = {}

        // 2. 向对象中添加方法(根据mapDispatchToProps中的方法产生)
        Object.keys(mapDispatchToProps).forEach(key => {
          const actionCreator = mapDispatchToProps[key]
          dispatchProps[key] = (...args) => { // 执行它是是去分发action
            this.context.store.dispatch(actionCreator(...args))
          }
        })

        // 3. 返回对象
        return dispatchProps
      }

      componentDidMount () {
        // 订阅监听(store中的state)
        this.context.store.subscribe(() => { // store中有了一个新的state
          // 更新容器组件的state
          this.setState(mapStateToProps(this.context.store.getState()))
        })
      }

      bindActionCreators2 = (mapDispatchToProps) => {
        return Object.keys(mapDispatchToProps).reduce((dispatchProps, key) => {
          dispatchProps[key] = (...args) => {
            this.context.store.dispatch(mapDispatchToProps[key](...args))
          }
          return dispatchProps
        },{})
      }


      render () {

        // 容器组件包含是UI组件
        return <UIComponent {...this.state} {...this.dispatchProps}/>
      }
    }
  }
}