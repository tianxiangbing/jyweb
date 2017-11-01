const express = require('express');
let app = express();
app.listen(8080);
app.use(express.static('./'));
