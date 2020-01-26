const Report = require('../Model/reportModel')

class ReportController {
  async store(req, res) {
    const response = req.body
    const report = await Report.create(response)
    return res.status(200).json(report)

  }
  async show(req, res) {
    const report = await Report.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    })
    return res.json(report)
  }
}
module.exports = new ReportController()