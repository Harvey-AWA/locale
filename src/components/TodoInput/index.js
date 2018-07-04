import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage,injectIntl } from 'react-intl';
import './todoInput.css';

import {connect} from 'react-redux';


class TodoInput extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        addTodo: PropTypes.func,
    }

    static defaultProps = {

        addTodo: (input) => { },
    }

    state = {
        inputValue: '',
    }

    addTodo = () => {
        this.props.addTodo(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    _allowAdd(value) {
        return value !== undefined && value.length > 0;
    }


    render() {
        console.log(this.props);
        const { inputValue } = this.state;
        let tmp = this.props.intl.formatMessage({id: 'PlaceHolder'});

        return <div className="todo-input-container shadow-container" >
            <TextInput
                value={inputValue}
                onChange={(value) => {
                    this.setState({inputValue: value});
                }}
                addTodo={this.addTodo}
                placeHolder = {tmp}
            />
            {
                this._allowAdd(inputValue) ? <AddTodo addTodo={this.addTodo} /> : null
            }
        </div>;
    }
};

const TextInput = (props) => {

    return <input
        className="todo-input"
        type="text"
        placeholder= {props.placeHolder}
        value={props.value}
        onChange={(e) => {
            props.onChange(e.target.value);
        }}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
                props.addTodo();
            }
        }}
    />
}

TextInput.propTypes = {
    addTodo: PropTypes.func,
    onChange: PropTypes.func,
}

const AddTodo = (props) => {
    return <span className="add-todo" onClick={() => {
        props.addTodo();
    }}>
          <FormattedMessage
            id= 'Add'
            description='Add buttom.'
            defaultMessage='Add2'
            />
    </span>;
}

AddTodo.propTypes = {
    addTodo: PropTypes.func,
}

export default (injectIntl(TodoInput));
