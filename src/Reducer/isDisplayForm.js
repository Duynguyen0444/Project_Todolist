import * as types from '../Constant/ActionTypes';

var initialState = false; //Close form

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_FORM:
      return !state; 
    case types.OPEN_FORM:
      //Cập nhật lại state sau khi mở       
      return true;
    case types.CLOSE_FORM:      
      return false;
    default:
      return state;
  }
}

export default myReducer;