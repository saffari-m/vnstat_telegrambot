const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Route to get network traffic data
app.get('/traffic', (req, res) => {
    const params = req.
  // Execute the vnstat command to get network traffic in JSON format
  exec('vnstat --json', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: `Error executing vnstat: ${stderr}`,
      });
    }

    // Parse the JSON output of vnstat
    try {
      const data = JSON.parse(stdout);
      const rx = data.interfaces[0].traffic.total.rx;  // Total received data
      const tx = data.interfaces[0].traffic.total.tx;  // Total transmitted data

      // Send the traffic data as a JSON response
      res.json({
        success: true,
        traffic: {
          received: (rx / 1024 / 1024).toFixed(2) + ' GB',   // Convert bytes to GB
          transmitted: (tx / 1024 / 1024).toFixed(2) + ' GB' // Convert bytes to GB
        }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error parsing vnstat output',
      });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`vnstat monitor app listening at http://localhost:${port}`);
});
