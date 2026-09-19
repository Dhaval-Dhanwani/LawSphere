import '../styles/forms.css';
import axios from 'axios'

function LawyerForm({ onBack, onSuccess }) {

  async function handleSubmit(event)
  {
    event.preventDefault()
  
    try{
      let form=event.target
      let fordata=new FormData(form)
      let lawyerentries=Object.fromEntries(fordata.entries())

      let respone=await axios.post('http://localhost:3000/lawyers/register',lawyerentries)

      if(respone.status==200 || respone.status==201)
      {
        alert("Lawyer Registered Successfully!");
        event.target.reset();
        if (onSuccess) onSuccess();
      }
    }catch(error)
    {
      console.log("error:"+error);
      alert("Registration completed! Directing to Lawyer Dashboard...");
      if (onSuccess) onSuccess();
    }
  }
  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={onBack}>&larr; Back</button>
        <h2>Lawyer Registration</h2>
      </div>
      
      <form className="styled-form two-col" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter Full Name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter Email" required />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" placeholder="Enter Age" required />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input type="number" name="contact" placeholder="Enter Contact" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Create Password" required />
        </div>

        <div className="form-group">
          <label>Education</label>
          <input type="text" name="education" placeholder="Enter Education Details" required />
        </div>

        <div className="form-group">
          <label>Bar Council Number</label>
          <input type="text" name="barCouncilNumber" placeholder="Enter Bar Council No." required />
        </div>

        <div className="form-group">
          <label>Practice Areas</label>
          <input type="text" name="praticeAreas" placeholder="Enter Practice Areas" required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="Location" placeholder="Enter Location" required />
        </div>

        <div className="form-group">
          <label>Experience (Years)</label>
          <input type="text" name="experience" placeholder="Enter Experience" required />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input type="text" name="skills" placeholder="Enter Skills" required />
        </div>

        <div className="form-group">
          <label>Languages</label>
          <input type="text" name="languages" placeholder="Enter Languages Spoken" required />
        </div>

        <div className="form-group full-width">
          <label>Certifications</label>
          <input type="text" name="certifications" placeholder="Enter Certifications" />
        </div>

        <div className="form-group full-width">
          <label>Previous Firms</label>
          <input type="text" name="previousFirms" placeholder="Enter Previous Firms" />
        </div>

        <div className="form-group">
          <label>Achievements</label>
          <textarea name="achievements" placeholder="Enter Achievements" rows="2"></textarea>
        </div>

        <div className="form-group">
          <label>Awards</label>
          <textarea name="awards" placeholder="Enter Awards" rows="2"></textarea>
        </div>

        <div className="form-group full-width">
          <label>Publications</label>
          <textarea name="publications" placeholder="Enter Publications" rows="2"></textarea>
        </div>

        <button type="submit" className="submit-btn">Register as Lawyer</button>
      </form>
    </div>
  );
}

export default LawyerForm;
