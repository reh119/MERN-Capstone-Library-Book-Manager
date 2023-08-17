import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const api = axios.create({
  baseURL: 'http://localhost:2000',
});

class UpdateBook extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/books/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}
//
class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.get('/books').then((books) => {
      this.setState({
        books: books.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { books, isLoading } = this.state;
    console.log('TCL: BooksList -> render -> books', books);

    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Publisher',
        accessor: 'publisher',
      },
      {
        Header: 'Status',
        accessor: 'avail',
        filterable: true,
        // Cell: (props) => <span>{props.value.join(' / ')}</span>,
      },
      {
        Header: 'Checked out by',
        accessor: 'who',
        // Cell: (props) => <span>{props.value.join(' / ')}</span>,
      },
      {
        Header: 'Due Date',
        accessor: 'due',

        // Cell: (props) => <span>{props.value.join(' / ')}</span>,
      },
      {
        Header: '',
        accessor: '',
        Cell: function (props) {
          return (
            <span>
              <UpdateBook id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!books.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={books}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default BooksList;
