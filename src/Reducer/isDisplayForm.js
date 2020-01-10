import * as types from '../Constant/ActionTypes';

var initialState = false; //Close form

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_FORM:
      return !state;
    case types.OPEN_FORM:
      //Cập nhật lại state sau khi mở 
      state = true;
      return state;
    case types.CLOSE_FORM:
      state = false
      return state;
    default:
      return state;
  }
}

export default myReducer;