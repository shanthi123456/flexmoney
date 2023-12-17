// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    selectedBatch: '',
  });

  const [enrollmentStatus, setEnrollmentStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (formData.age < 18 || formData.age > 65) {
        alert('Age must be between 18 and 65');
        return;
      }

      
      const response = await axios.post('http://localhost:3001/enroll', formData);

      
      if (response.data.success) {
        alert('Enrollment successful!');
        
        handlePayment(response.data.userDetails);
        setEnrollmentStatus('Enrollment successful!');
      } else {
        alert('Enrollment failed. Please try again.');
        setEnrollmentStatus('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setEnrollmentStatus('Internal server error. Please try again later.');
    }
  };

  const handlePayment = (userDetails) => {

    console.log(`Processing payment for ${userDetails.name}`);
  };

  return (
    <div>
      <h1>Yoga Class Admission Form</h1>
      <form>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleInputChange} required />

        <label>Age:</label>
        <input type="number" name="age" onChange={handleInputChange} required />

        <label>Select Batch:</label>
        <select name="selectedBatch" onChange={handleInputChange} required>
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>

        <button type="button" onClick={handleSubmit}>
          Enroll
        </button>
      </form>

      {enrollmentStatus && <p>{enrollmentStatus}</p>}
    </div>
  );
};

export default App;

