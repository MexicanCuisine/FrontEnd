module.exports = (app) => {
    // Index Route - This MUST come at the end of the controller require list
    app.get('/', (req, res) => {
        res.status(200).send('hello');
    });

    // Default 404
    app.use((req, res) => {
        res.status(404).send('Page Not Found');
    });
}
