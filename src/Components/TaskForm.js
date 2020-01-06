import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../Action/index';

class TaskForm extends Component {   
  constructor(props){
    super(props);
    this.state = {
      name: '',
      status: false,
      id: ''
    }
  }
  componentWillMount(){
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });      
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });      
    }else if(!nextProps.task){ //nextProps && nextProps.task !== null
      this.setState({
        name: '',
        status: false,
        id: ''
      });
    }
  }
  // ----------------------FUNCTION---------------------- 
  onCloseForm = () => {
    this.props.onCloseForm();
  }
  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true' ? true : false; //Thay đổi kiểu dữ liệu
    }
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) =>{    
    event.preventDefault();
    this.props.onAddTask(this.state);
    //Sau khi lưu: Đóng form và xóa dữ liệu
    this.onClear();
    this.onCloseForm();
  }
  onClear = () =>{
    this.setState({
      name: '',
      status: false
    });
  }
  // ----------------------END FUNCTION----------------------
  render() {
    var {id} = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== '' ? 'Cập nhật' : 'Thêm công việc'}
            <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}/>
          </h3>
        </div>
        <div className="panel-body">

          <form onSubmit={this.onSubmit} >
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange} >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br/>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">{id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
          
        </div>
      </div>
    );
  }
}

//Tham số đầu 
const mapStateToProps = state => {
  return{

  }
}

//Tham số thứ 2 => Dispatch action
const mapDispatchToProps = (dispatch, props) =>{
  return{
    onAddTask: (task) => {
      dispatch(actions.addTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);