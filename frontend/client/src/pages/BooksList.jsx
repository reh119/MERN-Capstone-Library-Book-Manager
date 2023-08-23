
import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
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

// class UpdateBook extends Component {
//   updateUser = (event) => {
//     event.preventDefault();

//     window.location.href = `/books/update/${this.props.id}`;
//   };

//   render() { // doesnt work
//     return <Update onClick={this.updateUser}>Update</Update>;
//   }
// }
//
const BooksList = () => {
  // constructor(props) { // used when this was a class 
  //   super(props);
  //   this.state = {
  //     books: [],
  //     columns: [],
  //     isLoading: false,
  //   };
  // }

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // componentDidMount = async () => { since this is a function,we will use 'useEffect' instead 
  //   this.setState({ isLoading: true });
  //   await api.get('/books').then((books) => {
  //     this.setState({
  //       books: books.data,
  //       isLoading: false,
  //     });
  //   });
  // };



  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const response = await axios.get('books');
      setBooks(response.data);
      setIsLoading(false);
    };

    fetchBooks();

  }, []); 



  // render() { render not used in functional components 
   //  const { books, isLoading } = this.state; // not used in functional coponents 
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
        Header: 'Statuss',
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


      },
      // {
      //   Header: '',
      //   accessor: '',
      //   Cell: function (props) {
      //     return (
      //       <span>
      //         <UpdateBook id={props.original._id} /> // for update functionality
      //       </span>
      //     );
      //   },
      // },
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


export default BooksList;
