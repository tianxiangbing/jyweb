const express = require('express');
let app = express();
app.listen(process.env.PORT||8080);
app.use(express.static('./'));
