import * as types from '../Constant/ActionTypes';
import uuidv4 from 'uuid/v4';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data
  ? data
  : [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.ADD_TASK:
      var newTask = {
        id: uuidv4(),
        name: action.task.name,
        status: action.task.status === 'true'
          ? true
          : false
      }
      state.push(newTask);
      //Lưu local dưới dặng string thay vì object
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
}

export default myReducer;