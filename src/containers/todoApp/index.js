import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

import {IntlProvider, addLocaleData} from 'react-intl';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import zhCN from './locale/zh_CN.js';
import enUS from './locale/en_US.js';

import TodoTitle from '../../components/TodoTitle';
import TodoInput from '../../components/TodoInput';
import TodoDetail from '../../components/TodoDetail';

import * as Actions from './actions';

addLocaleData([...en,...zh]);

class TodoApp extends PureComponent {
  /**
   * todo : {
   *   id: currentTime
   *   complete: bool,
   *   content: string,
   * }
   */

  // state = {
  //   todos: [],
  // }
//
  // _findTodoIndex = (id) => {
  //   return this.state.todos.findIndex((todo) => todo.id === id);
  // }

  render() {
    return (
      <div style={{ height: '100%', width: 400 }}>
        <TodoTitle />
        <div style={{ margin: 25, marginTop: 16, }}>

          <IntlProvider locale={"zh"} messages={zhCN}>
            <TodoInput addTodo={(todo) => {
              // this.setState((prevState) => ({
              //   todos: [].concat(prevState.todos)
              // }));
              this.props.addTodo({ id: Date.now(), complete: false, content: todo });
            }} />
          </IntlProvider>

        </div>
        <div style={{ marginTop: 10, }}>
          {
            this.props.todos.length > 0 ?
              <IntlProvider locale={"zh"} messages={zhCN}>

                <TodoDetail
                  todos={this.props.todos}
                  onComplete={(id) => {
                    // const todoIdx = this._findTodoIndex(id);
                    // const newTodos = [].concat(this.state.todos);
                    // newTodos[todoIdx].complete = !newTodos[todoIdx].complete;
                    // this.setState({ todos: newTodos });

                    this.props.onComplete(id);
                  }}
                  onRemove={(id) => {
                    // const todoIdx = this._findTodoIndex(id);
                    // const newTodos = [].concat(this.state.todos);
                    // newTodos.splice(todoIdx, 1);
                    // this.setState({ todos: newTodos });

                    this.props.onRemove(id);
                  }}
                />
              </IntlProvider> : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    todos: state.todos.get('todos').toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onComplete: id => {
      dispatch(Actions.completeTodo(id))
    },

    onRemove: id => {
      dispatch(Actions.removeTodo(id))
    },

    addTodo: todo => {
      dispatch(Actions.addTodo(todo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
