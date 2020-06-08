import * as types from '../Constant/ActionTypes';
import uuidv4 from 'uuid/v4';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data
  ? data
  : [];

// ----------------------FUNCTION---------------------- Tìm vị trí của item
var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
}
// ----------------------END FUNCTION----------------------

var myReducer = (state = initialState, action) => {
  var id='';
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state
    // -------------------ADD AND UPDATE TASK-------------------
    case types.SAVE_TASK:
      var task ={
        id: action.task.id,
        name: action.task.name,
        status: action.task.status === 'true' ? true : false
      };
      if(!task.id){ //Trường hợp chưa có id
        task.id = uuidv4();        
        state.push(task);
      } else {
        index = findIndex(state, task.id);
        state[index] = task;
      }    
      //Lưu local dưới dặng string thay vì object
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
      // -------------------UPDATE STATUS-------------------
    case types.UPDATE_STATUS_TASK:
      id = action.id;
      index = findIndex(state, id);
      // Tạo object mới => Thay đổi status => Cắt ra khỏi mảng cũ và push vào
      // cloneTask 
      //----------Cách 1---------- var cloneTask = {...state[index]};
      // cloneTask.status = !cloneTask.status; state[index] = cloneTask;
      // ----------Cách 2---------- state.splice(index, 1); state.push(cloneTask);
      // ----------Cách 3----------
      state[index] = {
        ...state[index],
        status: !state[index].status
      }
      localStorage.setItem('tasks', JSON.stringify(state)); //State lúc này là các task
      return [...state];
      // -------------------DELETE STATUS-------------------
    case types.DELETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state]
    default:
      return state;
  }
}

export default myReducer;