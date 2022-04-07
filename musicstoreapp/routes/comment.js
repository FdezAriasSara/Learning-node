const {ObjectId} = require("mongodb");
module.exports = function (app,commentsRepository) {

    app.get('/comment/:song_id', function (req, res) {
        res.render("songs/song.twig");
    });
    
    app.post('/comment/:song_id', function (req, res) {
       // Si no hay usuario en sesión, en lugar de insertar el comentario, se mostrará un
       // mensaje  de error
        if(req.session.user==null){
            res.send("Has de estar registrado para publicar un comentario.")
        }
        let comment = {
            author: req.session.user,
            text: req.body.comment,
            song_id:ObjectId(req.params.id)
        }
        commentsRepository.insertComment(comment,function (songId) {
            if(songId==null){
                res.send("Error al añadir el comentario");

            }else{

                    res.send("Agregado el comentario para canción con id: " +  songId);

            }

        });
    });

}