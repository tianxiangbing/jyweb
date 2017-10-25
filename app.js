const express = require('express');
let app = express();
app.listen(80);
app.use(express.static('./'));
