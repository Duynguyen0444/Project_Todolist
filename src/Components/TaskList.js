import React, {Component} from 'react';
import TaskItem from './TaskItem';
import * as actions from '../Action/index';
import {connect} from 'react-redux';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === 'filterName'
        ? value
        : this.state.filterName,
      status: name === 'filterStatus'
        ? value
        : this.state.filterStatus
    }
    this.props.onFilterTable(filter);
    this.setState({[name]: value});

  }
  render() {
    var {tasks, filterTable, keyword} = this.props;
    var {filterName, filterStatus} = this.state;

    //------------FILTER TABLE FUNCTION---------------------
    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
      });
    }
    tasks = tasks.filter((task) => {
      if (filterTable.status === -1) {
        return task;
      } else {
        return task.status === (filterTable.status === 1 ? true : false);
      }
    });
    //------------SEARCH FUNCTION---------------------
    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword) !== -1;
    });
    var eleTasks = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index + 1} task={task}/>
    })
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td/>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}/>
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}>
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td/>
          </tr>
          {/* TaskItem */}
          {eleTasks}
        </tbody>
      </table>
    );
  }
}

//Các state của Store sẽ chuyển thành các Props
const mapStateToProps = state => {
  return {tasks: state.tasks, filterTable: state.filterTable, keyword: state.search}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);