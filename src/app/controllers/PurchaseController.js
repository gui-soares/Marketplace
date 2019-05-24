const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (purchaseAd.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This ad has already been purchased' })
    }

    const purchaseAccept = await Purchase.create({
      ad,
      content,
      user: user._id
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchaseAccept)
  }

  async index (req, res) {
    const myCustomLabels = {
      page: 'currentPage',
      prevPage: false,
      nextPage: false,
      pagingCounter: false
    }

    const purchases = await Purchase.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        customLabels: myCustomLabels,
        populate: ['author'],
        sort: '-createdAt'
      }
    )

    return res.json(purchases)
  }
}

module.exports = new PurchaseController()
