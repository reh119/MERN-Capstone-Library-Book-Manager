import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const api = axios.create({
  baseURL: 'http://localhost:2000',
});

class BooksUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //id: this.props.match.params._id,
      title: '',
    };
  }

  handleUpdateBook = async () => {
    const { id, title } = this.state;

    const payload = { title };

    // await api.put(id, payload).then((res) => {
    await api.put(`/books/${id}`, payload).then((res) => {
      window.alert(`Movie updated successfully`);
      this.setState({
        title: '',
        status: '',
      });
    });
  };

  render() {
    const { title } = this.state;
    return (
      <Wrapper>
        <Title>Update Book</Title>

        <Label>Title: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputName}
        />

        <Label>Status: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputName}
        />

        <Button onClick={this.handleUpdateBook}>Update Book</Button>
      </Wrapper>
    );
  }
}

export default BooksUpdate;
