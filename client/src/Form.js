import React, { useState } from 'react';
import './styles.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the specific field error when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required.';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      // Update errors state with specific field errors
      setErrors(newErrors);
      alert('Please fix the form errors before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        // Display success message
        alert('Form submitted successfully!');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          address: '',
          phoneNumber: '',
        });
      } else {
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isValidEmail = (email) => {
    // Implement a more robust email validation if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span className="error">{errors.name}</span>
        </div>
        <div className="form-element">
          <label className="form-label">E-mail:</label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <div className="form-element">
          <label className="form-label">Address:</label>
          <input
            className="form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <span className="error">{errors.address}</span>
        </div>
        <div className="form-element">
          <label className="form-label">Phone Number:</label>
          <input
            className="form-input"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <span className="error">{errors.phoneNumber}</span>
        </div>
        <div className="form-element">
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
