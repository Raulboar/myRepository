const bodyParser = require('body-parser');
const routes = require('../../routes');
const cors = require('cors')

const init = (app) => {
    console.log('Setting up express app');

    app.use(cors())
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());
    
    // definesc rutele
    routes.forEach((route) => {
        const path = route.PATH;
        const router = route.router;
    
        app.use('/' + path, router);
    });    
}

module.exports = init;