const initialState = {
  counter: 0,
  results: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      // const newState = Object.assign({}, state);
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "ADD":
      return { ...state, counter: state.counter + action.payload };
    case "SUBSTRACT":
      return { ...state, counter: state.counter - action.payload };
    case "STORE_RESULT":
      // concat push old array and new array, returns a new array
      return { ...state, results: state.results.concat({
          value: state.counter,
          id: new Date()
        }) };
    case "DELETE_RESULT":
      // create a copy: 2 posibilities
      // const newArray = [...state.results];
      // const newArray = state.results.filter(result => true);
      // return true for all the elements where the ID is equal
      // to the ID we pass with the action
      // put in new array result, all ids withoud the one deleted
      return { ...state, results: state.results.filter(result => result.id !== action.resultElemID) };

    default:
      return state;
  }
}

export default reducer;