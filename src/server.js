import express from 'express';
let app = express();

import handlebars from 'express-handlebars';


// Set directory for static assets
app.use('/public', express.static(__dirname + '/public'));

// Set Handlebars as templating engine
app.set('view engine', 'handlebars');
// Set default handlebars layout to main.hbs
app.engine('handlebars', handlebars(
    {
        defaultLayout: 'main'
    }
));

// Controllers
require('./controllers/defaultController.js')(app);

// Start Server on port 3000
app.listen(3000, () => {
    console.log('Server listening on Port 3000');
});