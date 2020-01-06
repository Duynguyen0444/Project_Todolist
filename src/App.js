import React, {Component} from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import uuidv4 from 'uuid/v4';
import {findIndex, filter} from 'lodash';
import {connect} from 'react-redux';
import * as actions from './Action/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {            
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      itemEditing: null,
      sortBy: 'name',
      sortValue: 1
    }
  }   
  // ----------------------FUNCTION----------------------  
  onToggleForm = () =>{  
    // if(this.state.isDisplayForm && this.state.taskEditing !== null){
    //   this.setState({
    //     isDisplayForm: true,
    //     taskEditing: null
    //   });
    // }else{
    //   this.setState({
    //     isDisplayForm: !this.state.isDisplayForm,
    //     taskEditing: null
    //   });
    // }   
    this.props.onToggleForm();
  }
  onShowForm = () =>{
    this.setState({
      isDisplayForm: true
    });
  } 
  onUpdateStatus = (id) =>{ //Cập nhật status
    var {tasks} = this.state;
    // var index  = this.findIndex(id);    
    var index = findIndex(tasks,(task) =>{
      return task.id === id;
    });
    if(index !== -1){ //Tìm thấy
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks' , JSON.stringify(tasks));
    }   
  }
  onDelete = (id) =>{
    var {tasks} = this.state;
    var index  = this.findIndex(id);    
    if(index !== -1){ //Tìm thấy
      tasks.splice(index, 1); //Truyền vào index và số lượng cần xóa
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks' , JSON.stringify(tasks));
    }   
    this.onCloseForm();
  }
  onUpdate = (id) =>{
    var {tasks} = this.state;
    var index  = this.findIndex(id);  
    var taskEditing = tasks[index];    
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) =>{    
    filterStatus = parseInt(filterStatus, 10); //Chuyển kiểu dữ liệu string -> boolean    
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }
  onSearch = (keyword) =>{
    this.setState({
      keyword: keyword
    });
  }
  onSort = (sortBy, sortValue) =>{    
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue     
    });
    console.log(this.state);
  }
  findIndex = (id) =>{ //Tìm vị trí của item
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) =>{
      if(task.id === id){
        result = index;
      }      
    });    
    return result;
  }  
  // ----------------------END FUNCTION----------------------
  
  render() {    
    var { taskEditing, filter, keyword, sortBy, sortValue} = this.state;    
    var {isDisplayForm} = this.props;
    var eleTaskForm = isDisplayForm === true ? <TaskForm task={taskEditing} /> : '';        
    // if(filter){
    //   if(filter.name){ //Tồn tại
    //     tasks = tasks.filter((task) =>{
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if(filter.status === -1){
    //       return task;
    //     }else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });      
    // }

    // if(keyword){
    //   tasks = tasks.filter((task) =>{
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    //   tasks = filter(tasks, (task) =>{
    //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1; 
    //   });
    // }  

    // if(sortBy === 'name'){
    //   tasks.sort((a,b) =>{
    //     if(a.name > b.name) return sortValue; //Tăng dần 
    //     else if(a.name < b.name) return -sortValue; //Giảm dần 
    //     else return 0;
    //   });
    // }else  {
    //   tasks.sort((a,b) =>{
    //     if(a.status > b.status) return -sortValue; //Tăng dần 
    //     else if(a.status < b.status) return sortValue; //Giảm dần 
    //     else return 0;
    //   });
    // }
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {/* TaskForm */}
            {eleTaskForm}
          </div>
          <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"  : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>            
            {/* Search - Sort Truyền ngược sortBy & sortValue vào component Sort */}
            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>  
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isDisplayForm: state.isDisplayForm //state này từ store
  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return{
    onToggleForm: () =>{
      dispatch(actions.toggleForm());
    },   
    onOpenForm: () =>{
      dispatch(actions.openForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
