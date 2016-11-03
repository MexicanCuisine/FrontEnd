module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200).render('index');
    });

    app.use((req, res) => {
        res.status(404).send('Page Not Found');
    });
}