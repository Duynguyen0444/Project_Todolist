import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../Action/index';

class TaskForm extends Component {   
  constructor(props){
    super(props);
    this.state = {   
      id: '',
      name: '',
      status: false
    }
  }
  componentWillMount(){
    if(this.props.itemEditing && this.props.itemEditing.id !== null){
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status
      });      
    }else{
      this.onClear();
    }  
  }
  componentWillReceiveProps(nextProps){  
    if(nextProps && nextProps.itemEditing){
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status
      });      
    }else{
      this.onClear();
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
  onSave = (event) =>{    
    event.preventDefault();
    this.props.onSaveTask(this.state);
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
    if(!this.props.isDisplayForm) return null;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {!this.state.id ? 'Thêm công việc' : 'Cập nhật'}
            <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}/>
          </h3>
        </div>
        <div className="panel-body">

          <form onSubmit={this.onSave} >
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
              <button type="submit" className="btn btn-warning">{!this.state.id ? 'Thêm mới' : 'Cập nhật'}</button>&nbsp;
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
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
}

//Tham số thứ 2 => Dispatch action
const mapDispatchToProps = (dispatch, props) =>{
  return{
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm());
    },
    onToggleForm: () =>{
      dispatch(actions.toggleForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);