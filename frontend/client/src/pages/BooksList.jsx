// import React, { Component } from 'react'; will be using useeffect and state instead 
import React, {useEffect,useState} from 'react'; //using hooks instead 
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
const BooksList = () => {
  const [books,setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => { // using hooks here 
    const fetchBooks = async () => {
      setIsLoading(true);
      const response = await api.get("/books"); // sending to server 
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




