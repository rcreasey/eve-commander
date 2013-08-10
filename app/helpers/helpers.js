var url = require('url')
  , qs = require('querystring')
  , humanize = require('humanize')

function helpers () {
  return function (req, res, next) {
    res.locals.req = req
    res.locals.isActive = function (link) {
      return req.url.indexOf(link) !== -1 ? 'active' : ''
    }
    res.locals.formatNumber = formatNumber
    res.locals.formatDatetime = formatDatetime

    if (typeof req.flash !== 'undefined') {
      res.locals.info = req.flash('info')
      res.locals.errors = req.flash('errors')
      res.locals.success = req.flash('success')
      res.locals.warning = req.flash('warning')
    }

    next()
  }
}

module.exports = helpers

function formatNumber (number) {
  return humanize.numberFormat(number)
}

function formatDatetime (date) {
  return humanize.date('MM/DD/YY HH:mm', date)
}
