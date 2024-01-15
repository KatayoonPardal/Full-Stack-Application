// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const validator = require('validator');  // Import validator library
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());

app.post('/submitForm', (req, res) => {
  try {
    const formData = req.body;

    // Server-side validation
    if (!formData.name || !formData.email || !formData.address || !formData.phoneNumber) {
      throw new Error('All fields are required.');
    }

    // Additional validation for email format using validator
    if (!validator.isEmail(formData.email)) {
      throw new Error('Invalid email format.');
    }

    // Create CSV data with additional fields
    const csvData = `${formData.name},${formData.email},${formData.address},${formData.phoneNumber}\n`;

    // Write form data to CSV file
    fs.appendFileSync('formData.csv', csvData);

    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
