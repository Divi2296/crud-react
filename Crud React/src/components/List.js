import React, { Component } from "react";
import Item from "./Item";

export default class List extends Component {
  render() {
    const { items, handleEdit, handleDelete } = this.props;
    return (
      <ul className="list-group my-2">
        {items.map((item) => {
          return (
            <Item
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    );
  }
}
