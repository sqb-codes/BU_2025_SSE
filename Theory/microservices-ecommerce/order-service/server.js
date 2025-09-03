const express = require('express');
const app = express();
const PORT = process.env.PORT || 1236;

app.listen(PORT, () => {
  console.log(`Order service is running on port ${PORT}`);
});