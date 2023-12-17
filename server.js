// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const enrolledParticipants = [];

const completePayment = (userDetails, paymentDetails) => {
  
  const success = Math.random() < 0.8; // 80% success rate
  return { success, message: success ? 'Payment successful' : 'Payment failed' };
};

app.post('/enroll', async (req, res) => {
  try {
    console.log('Received enrollment request:', req.body);

    const { name, age, selectedBatch } = req.body;

    // Basic server-side validation
    if (!name || age < 18 || age > 65 || !selectedBatch) {
      res.json({ success: false, message: 'Invalid data' });
      return;
    }

    enrolledParticipants.push({ name, age, selectedBatch });

    const paymentResponse = completePayment({ name, age, selectedBatch }, { amount: 500 });

    console.log('Payment Response:', paymentResponse);

    if (paymentResponse.success) {
      res.json({ success: true, userDetails: { name, age, selectedBatch } });
    } else {
      res.json({ success: false, message: 'Enrollment failed. Payment unsuccessful.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
