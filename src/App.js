import React, {Component} from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import {connect} from 'react-redux';
import * as actions from './Action/index';

class App extends Component {  
  // ----------------------FUNCTION----------------------  
  onToggleForm = () =>{  
    var {itemEditing} = this.props;
    if(itemEditing && itemEditing.id !== ''){

    }else{
      this.props.onToggleForm();      
    }    
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
  });
  }
  onShowForm = () =>{
    this.setState({
      isDisplayForm: true
    });
  } 
  
  onSort = (sortBy, sortValue) =>{    
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue     
    });    
  } 
  // ----------------------END FUNCTION----------------------
  
  render() {        
    var {isDisplayForm} = this.props;    
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {/* TaskForm */}
            <TaskForm/>
          </div>
          <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"  : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>            
            {/* Search - Sort Truyền ngược sortBy & sortValue vào component Sort */}
            <Control/>  
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList/>
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
    isDisplayForm: state.isDisplayForm, //State lấy từ store  
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return{
    onToggleForm: () =>{
      dispatch(actions.toggleForm());
    },   
    onOpenForm: () =>{
      dispatch(actions.openForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
