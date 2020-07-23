const loginReducer = (state = false, action) => {
    const newState = state;
    switch (action.type) {
      case 'LOGIN':
        return !newState;
      case 'LOGOUT':
        return !newState;
      default:
        return state;
    }
  };
  
  export default loginReducer;