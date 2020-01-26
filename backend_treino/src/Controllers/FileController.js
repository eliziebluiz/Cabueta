const File = require('../Model/File')
const Report = require('../Model/reportModel')

class FileController {
  async store(req, res) {
    const { id } = req.params
    const report = await Report.findById(id)

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    })
    report.files.push(file)
    await report.save()

    return res.status(200).send("Operação Realizada com Sucesso").json(file)
  }
}
module.exports = new FileController()