module.exports = function (app,twig) {
    app.get("/authors/", function (req, res) {

        let authors=[{
            "name": "Flea",
            "group": "Red hot chilli pepers",
            "role":"Bass player"
        },{
            "name": "Anthony Kiedis",
            "group": "Red hot chilli pepers",
            "role":"singer"
        }, {
            "name": "John Frusciante",
            "group": "Red hot chilli pepers",
            "role":"guitarrist"
        }];

        let response=
            {
                seller:'tienda de canciones',
                authors:authors
            }
        res.render("authors/authors.twig",response);
    });

    app.get('/authors/add', function (req, res) {
        let roles=[{
            "name":"Bass player"},
            {
                "name":"guitarrist"
            },
            {
                "name":"singer"},
            {
                "name":"pianist"
            },
            {
                "name":"drummer"
            }];
        let response={
            roles:roles
        }
        res.render("authors/add.twig",response);
    });

    app.post('/authors/add', function (req, res) {
       
        let response= "Autor añadido:";
        if (req.query.name == null && typeof (req.query.name) == "undefined")
            field += '< name > no envíado en la petición. <br>';
        else
            response += req.query.name + '<br>';
        response+= "Grupo:"
        if (req.query.group == null && typeof (req.query.group) == "undefined")
            response += '< group > no envíado en la petición. <br>';
        else
            response += req.query.group + '<br>';
       response+= "Rol:"
        if (req.query.role == null && typeof (req.query.role) == "undefined")
            response += '< role > no envíado en la petición. <br>';
        else
            response += req.query.role + '<br>';


        res.send(response);
    });

    app.get('/authors/*', function (req, res) {
        req.redirect("/authors/");
    });

};