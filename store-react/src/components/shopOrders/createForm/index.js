import React, {
    Component
} from 'react';
import axios from 'axios';

class CreateOrderForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clientname: '',
        itemlist: []
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    
    async onSubmit(event) {
        event.preventDefault();
        try {
            const data = this.state;
            const result = await axios.post('http://localhost:4000/orders', data);

            console.log('result', result);
        }
        catch(error) {
            console.log('Errorrrrr');
            console.log(error);
        }
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
           <label for="clientname">clientname:</label>
           <input 
             name = "clientname"
             type = "box"
             checked = {this.state.clientname}
             onChange = {this.handleInputChange} 
            />
          </div>
          <div>          
            <label for="itemlist">itemlist:</label>
            <input 
             name = "itemlist"
             type = "box"
             checked = {this.state.itemlist}    
             onChange = {this.handleInputChange} 
             />
           </div>

          <button type="submit">
            Save order
          </button>
        </form>
      );
    }
  }


 export default CreateOrderForm;