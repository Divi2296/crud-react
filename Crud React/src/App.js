import React, { Component } from "react";
import TodoInput from "./components/Input";
import TodoList from "./components/List";
import axios from "axios";

export default class App extends Component {
  state = {
    List: [],
    activeItem: {
      title: "",
      completed: false,
    },
    editItem: false,
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("api/v1/tasks")
      .then((res) => this.setState({ List: res.data.tasks }))
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  handleSubmit = (item) => {
    this.setState({
      editItem: false,
    });
   
    if (item._id) {
      axios
        .patch(`/api/v1/tasks/${item._id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post("/api/v1/tasks/", item).then((res) => this.refreshList());
  };

  handleEdit = (item) => {
    this.setState({ activeItem: item, editItem: true });
  
  };

  handleDelete = (item) => {
   
    axios
      .delete(`/api/v1/tasks/${item._id}/`)
      .then((res) => this.refreshList());
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-uppercase text-center my-2"> App</h1>
        <div className="row">
          <div className="col-8 col-md-6 mx-auto">
            <Input
              activeItem={this.state.activeItem}
              editItem={this.state.editItem}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <List
              items={this.state.List}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}
