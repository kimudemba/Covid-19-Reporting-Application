import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Delete = styled.div.attrs({
  className: 'delete-item-btn',
})`
  color: #ff0000;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 5;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
`;

class DeleteButton extends Component {
  confirmDeletePatient = event => {
    event.preventDefault();

    if (
        window.confirm(
            `Do you want to permanently delete this patient? ${this.props.id}`
        )
    ) {
         this.props.onClick(this.props.id);
        // this.confirmDeletePatient(onDelete)
    }
  };

  render() {
    return <Delete onClick={this.confirmDeletePatient}>Delete Patient</Delete>;
  }
}

DeleteButton.propTypes = {
  id: PropTypes.string,
};

export default DeleteButton;
