var express = require('express');
var router = express.Router();
const controllerx = require('../controllers/users');
const controllery = require('../controllers/notes');
const authorization = require('../middleware/token');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Welcome to ART'
    });
});
router.post('/login', controllerx.login);
router.post('/signup', controllerx.signup)
router.get('/total', controllerx.total)
router.delete('/deleteuser/:id', controllerx.deleteUser)



router.post('/create', controllery.noteEntry);
router.get('/allnotes', controllery.allNotes);
router.get('/singlenote/:id', controllery.singleNote);
router.put('/noteupdate/:id', controllery.noteUpdate);
router.delete('/delete/:id', controllery.deleteNote)

module.exports = router;