const express = require('express');
const DenunciaController = require('./Controllers/DenunciaController');
const ReportController = require('./Controllers/reportController')
const FileController = require('./Controllers/FileController')
const multer = require('multer')
const multerConfig = require('./Config/multer')

const routes = express.Router();
routes.get('/teste', (req,res)=> {
  return res.status(200).send('<h1>Ola, Tudo Okay</h1>')
})
routes.get('/noticias', DenunciaController.index);
routes.get('/noticias/:id', DenunciaController.show);
routes.post('/noticias', DenunciaController.store);
routes.put('/noticias/:id', DenunciaController.update);
routes.delete('/noticias/:id', DenunciaController.destroy);


routes.post('/report', ReportController.store)
routes.get('/report/:id', ReportController.show)
routes.post('/report/:id/files', multer(multerConfig).single('file'), FileController.store)
module.exports = routes;
// pode instar com npm install ou apenas yarn