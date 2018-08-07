import React, { Component } from "react";
import {connect} from 'react-redux';
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  render() {
    return <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl label="Subtract 15" clicked={this.props.onSubstractCounter} />
        <hr />
        <button onClick={this.props.onStoreResult}>Store Result</button>
        <ul>
          {this.props.res.map(result => (
            <li
              onClick={() => this.props.onDeleteResult(result.id)}
              key={result.id}>
              {result.value}
            </li>
          ))}
        </ul>
      </div>;
  }
}

// will be executed by react redux
const mapStateToProps = (state) => {
	return {
    // we define prop name: ctr 
    // then we access state
    // this state arg will be given by react redux
    // that will rich the redux state
    // the initilState setup in reducer
    // so a counter prop will be available
    // so we take the value of counter and 
    // we assign it to a prop call ctr
    ctr: state.counter,
    res: state.results
	};
};

// This helper func calls dispatch 
// to store, behind the scene
// which kind of actions to dispacth in this container?
// the props hold a reference to a function that
// will be executed to dispatch an action
const mapDispatchToProps = (dispatch) => {
	return {
    // define prop names that will hold a reference to a func
    // that will eventually get executed to dispatch an action
		onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
		onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
		onAddCounter: () => dispatch({ type: 'ADD', payload: 5 }),
		onSubstractCounter: () => dispatch({ type: 'SUBSTRACT', payload: 15 }),
		onStoreResult: (result) => dispatch({ type: 'STORE_RESULT', result: result }),
		onDeleteResult: (id) => dispatch({ type: 'DELETE_RESULT', resultElemID: id })
	};
};

// connect is a function that 
// returns a HOC: Counter
// connect gives us class container with
// access to ctr property and allows us to ouput
// the ctr prop: this.props.ctr
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
