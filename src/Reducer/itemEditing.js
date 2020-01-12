import * as types from '../Constant/ActionTypes';
var initialState = {
  id: '',
  name: '',
  status: false
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_TASK:
      return action.task; //Trả về một action chứa các thuộc tính
    default:
      return state;
  }
}

export default myReducer;