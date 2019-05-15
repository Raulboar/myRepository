import React, {
    Component
} from 'react';
import axios from 'axios';

class CreateItemForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        price: '',
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
      const initialValue = this.props.initialValue;

      if (initialValue) {
        this.setState({
          name: initialValue.name,
          description: initialValue.description,
          price: initialValue.price,
        });
      }
    }
    
    async onSubmit(event) {
      event.preventDefault();
      const onSubmitClick = this.props.onSubmitClick;
      onSubmitClick(this.state);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <br />
          <div>
           <label htmlFor="name">name:</label>
           <input 
             name = "name"
             value = {this.state.name}
             onChange = {this.handleInputChange} 
            />
          </div>
          <div>
           <label htmlFor="description">description:</label>
           <input 
             name = "description"
             value = {this.state.description}
             onChange = {this.handleInputChange} 
           />
          </div>
          <div>          
            <label htmlFor="price">price:</label>
            <input 
             name = "price"
             value = {this.state.price}    
             onChange = {this.handleInputChange} 
             />
           </div>

          <button type="submit">
            Save item
          </button>
        </form>
      );
    }
  }


 export default CreateItemForm;