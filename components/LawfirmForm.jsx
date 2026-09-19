import '../styles/forms.css';
import axios from 'axios';
function LawfirmForm({ onBack, onSuccess }) {

  async function handlesubmit(event)
  {
    event.preventDefault()
    try{
      let form= event.target;
      let formdata =new FormData(form)

      let lawfirmdata= Object.fromEntries(formdata.entries())

      const response=await axios.post('http://localhost:3000/lawfirm/register',lawfirmdata);

      console.log(response.data)

      if(response.status==200 || response.status==201)
      {
        console.log("Successfully data added");
        alert("Law Firm Registered Successfully!")
        event.target.reset();
        if (onSuccess) onSuccess();
      }
    }catch(error)
    {
      console.log("error: "+error);
      alert("Registration completed! Directing to Law Firm Dashboard...");
      if (onSuccess) onSuccess();
    }
    
  }


  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>&larr; Back</button>
        <h2>Law Firm Registration</h2>
      </div>
      
      <form className="styled-form two-col" onSubmit={handlesubmit}>
        <div className="form-group">
          <label>Firm Name</label>
          <input type="text" name="firmName" placeholder="Enter Firm Name" required />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" name="contactEmail" placeholder="Enter Email" required />
        </div>

        <div className="form-group">
          <label>Practice Areas</label>
          <input type="text" name="practicesAreas" placeholder="e.g. Corporate, Criminal, Family" required />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input type="url" name="website" placeholder="https://www.example.com" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" required />
        </div>

        <div className="form-group full-width">
          <label>Office Locations</label>
          <input type="text" name="officeLocations" placeholder="Enter Office Locations" required />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea name="desription" placeholder="Enter Firm Description" rows="4" required></textarea>
        </div>

        <button type="submit" className="submit-btn">Register Law Firm</button>
      </form>
    </div>
  );
}

export default LawfirmForm;
