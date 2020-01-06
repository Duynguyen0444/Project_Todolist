import * as types from '../Constant/ActionTypes';

//Action dựa vào type để reducer phân tích 
export const listAll = () => {
    return{
        type: types.LIST_ALL
    }
}