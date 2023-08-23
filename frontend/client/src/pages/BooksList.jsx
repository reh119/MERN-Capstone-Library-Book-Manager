// import React, { Component } from 'react'; will be using useeffect and state instead 
import React, {useEffect,useState} from 'react'; //using hooks instead 
// useState -> handle data that changes, want react to update user ui 
// useEffect
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

// class UpdateBook extends Component {
//   updateUser = (event) => {
//     event.preventDefault();

//     window.location.href = `/books/update/${this.props.id}`;
//   };

//   render() { // doesnt work
//     return <Update onClick={this.updateUser}>Update</Update>;
//   }
// }
// we will attempt to use a function instead

const BooksList = () => {
  const [books,setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => { // using hooks here 
    const fetchBooks = async () => {
      setIsLoading(true);
      const response = await api.get("/books"); 
      setBooks(response.data)
      setIsLoading(false); 
    };
    fetchBooks(); 
  }, []); // array of empty dependencies 

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

        const showTable = books.length > 0;

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
};

export default BooksList;




// class BooksList extends Component { // 
//   constructor(props) { // not needed when using functions 
//     super(props);
//     this.state = {
//       books: [],
//       columns: [],
//       isLoading: false,
//     };
//   }

//   componentDidMount = async () => { // asynchronous to list out books. , not needed when using functions 
//     this.setState({ isLoading: true });
//     await api.get('/books').then((books) => {
//       this.setState({
//         books: books.data,
//         isLoading: false,
//       });
//     });
//   };

//   render() { // not needed in functional
//     const { books, isLoading } = this.state;
//     console.log('TCL: BooksList -> render -> books', books);

//     const columns = [
//       {
//         Header: 'ID',
//         accessor: 'id',
//       },
//       {
//         Header: 'Name',
//         accessor: 'title',
//       },
//       {
//         Header: 'Author',
//         accessor: 'author',
//       },
//       {
//         Header: 'Publisher',
//         accessor: 'publisher',
//       },
//       {
//         Header: 'Statuss',
//         accessor: 'avail',
//         filterable: true,
//         // Cell: (props) => <span>{props.value.join(' / ')}</span>,
//       },
//       {
//         Header: 'Checked out by',
//         accessor: 'who',
//         // Cell: (props) => <span>{props.value.join(' / ')}</span>,
//       },
//       {
//         Header: 'Due Date',
//         accessor: 'due',

      
//       },
//       // {
//       //   Header: '',
//       //   accessor: '',
//       //   Cell: function (props) {
//       //     return (
//       //       <span>
//       //         <UpdateBook id={props.original._id} /> // for update functionality
//       //       </span>
//       //     );
//       //   },
//       // },
//     ];

//     let showTable = true;
//     if (!books.length) {
//       showTable = false;
//     }

//     return (
//       <Wrapper>
//         {showTable && (
//           <ReactTable
//             data={books}
//             columns={columns}
//             loading={isLoading}
//             defaultPageSize={10}
//             showPageSizeOptions={true}
//             minRows={0}
//           />
//         )}
//       </Wrapper>
//     );
//   }
// }

// export default BooksList;
