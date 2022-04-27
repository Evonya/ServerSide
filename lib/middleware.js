const flashMiddleware = (req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
}


const getNewsData = () => [
    {
      heading: 'End of school',
      body: "The president has announced the end of school and work, we are all on holiday forever !",
      Auther: 'Jacques REMY'
    },
    {
        heading: 'The joking president',
        body: "The announcement that the president just made was actually a joke... What a little joker that one is!",
        Auther: 'Jacques REMY',

    }  
  ]
  
  const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
  }

module.exports = { newsMiddleware: newsMiddleware, flashMiddleware: flashMiddleware }