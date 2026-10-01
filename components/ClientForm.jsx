import '../styles/forms.css';

import axios from 'axios'; 
function ClientForm({ onBack, onSuccess }) {

  async function handleSubmit(event){
    event.preventDefault();

    const client = event.target;

    const formdata = new FormData(client);
    let cliententries = Object.fromEntries(formdata.entries());
  

    try{
      // converted to JSON by axios itself
      const response = await axios.post("http://localhost:3000/clients/register", cliententries, {
        withCredentials: true
      });
      
      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response.data);
        alert("Client registered successfully!");
        event.target.reset(); // clear form
        if (onSuccess) onSuccess(); // Route to the dashboard
      } else {
        console.error("Error from server:", response.data);
        alert("Failed to register: " + (response.data.error || "Unknown error"));
      }
    } catch(err) {
      console.error("Network/Fetch error:", err);
      alert("Network error: Could not reach the server.");
    }
}


  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>
          &larr; Back
        </button>

        <h2>Client Registration</h2>
      </div>

      <form
        className="styled-form two-col"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="number"
            name="contact"
            placeholder="Enter Contact"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter Full Address"
            rows="3"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" >
          Register as Client
        </button>

      </form>
    </div>
  );
}

export default ClientForm;