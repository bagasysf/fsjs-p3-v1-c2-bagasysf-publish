const cors = require('cors');
const express = require('express');
const router = require('./routers');
const app = express();

const port = process.env.PORT || 4003;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
