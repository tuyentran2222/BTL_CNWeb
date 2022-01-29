class SearchController {
    // [GET] /news/
    index(req, res) {
      console.log(123)
      res.render('searchWord');
    }
  
    //[GET] /new/:slug
    show(req, res) {
      res.send('New detail');
    }
}
  
module.exports = new SearchController();
  