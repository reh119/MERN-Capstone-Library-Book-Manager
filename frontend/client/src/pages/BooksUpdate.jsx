import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:2000',
});

function BooksUpdate() {
  const { id } = useParams();
  const [title, setTitle] = useState('');

  const handleUpdateBook = async () => {
    const payload = { title };

    try {
      await api.put(`/books/:${id}`, payload);
      window.alert(`Book updated successfully`);
      setTitle('');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>

      <label>Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleUpdateBook}>Update Book</button>
    </div>
  );
}

export default BooksUpdate;


// class BooksUpdate extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       //id: this.props.match.params._id,
//       title: '',
//     };
//   }

//   handleUpdateBook = async () => {
//     const { id, title } = this.state;

//     const payload = { title };

//     // await api.put(id, payload).then((res) => {
//     await api.put(`/books/${id}`, payload).then((res) => {
//       window.alert(`Movie updated successfully`);
//       this.setState({
//         title: '',
//         status: '',
//       });
//     });
//   };

//   render() {
//     const { title } = this.state;
//     return (
//       <Wrapper>
//         <Title>Update Book</Title>

//         <Label>Title: </Label>
//         <InputText
//           type="text"
//           value={title}
//           onChange={this.handleChangeInputName}
//         />

//         <Label>Status: </Label>
//         <InputText
//           type="text"
//           value={title}
//           onChange={this.handleChangeInputName}
//         />

//         <Button onClick={this.handleUpdateBook}>Update Book</Button>
//       </Wrapper>
//     );
//   }
// }

// export default BooksUpdate;
