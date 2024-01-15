const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());
app.post('/submitForm', (req, res) => {
try {const formData = req.body;
    // Write form data to CSV file
    const csvData = `${formData.name},${formData.email}\n`;
    fs.appendFileSync('formData.csv', csvData);
    res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ success: false, message: 'Error processing the form' });
    }
    });
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    });