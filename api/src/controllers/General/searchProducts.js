const Product = require('../../models/Product');

module.exports = {
  searchProducts: async (req, res, next) => {
    if(req.query.categories){
      return filterProductsCategories(req,res,next);
    }
    if(req.query.estilos){
      return filterProductsStyles(req,res,next);
    }
    if(req.query.volumen){
      return filterProductsVolume(req,res,next);
    }
    if(req.query.price){
      return getMaxPrice(req,res,next);
    }
    if(req.query.priceSort){
      return getPriceSort(req,res,next);
    }
    
    let sort = req.query.sort
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
    if (req.query.name) { //si se hace una búsqueda, se manda name por query
      try {
          const name = req.query.name
          const regex = new RegExp(`${name}+`, 'i') // i for case insensitive
          const product = await Product.find({name: {$regex: regex}})
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: sort
                                        })


          const productLength = (await Product.find({name: {$regex: regex}})).length
          return res.json([productLength, product]);
        } catch (error) {
          console.log(error);
        }
    } else { //si no se hace búsqueda se mandan todos los productos(dependiendo ProductsPerPage)
      const product = await Product.find()
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: sort
                                        })
      const productLength = await (await Product.find()).length                      
          return res.json([productLength, product]);
    }

  }
}

  const filterProductsCategories = async (req, res, next) => {
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
    
      try {
        const name = req.query.categories
        const query = {'categories.name': name};
        const sort = {
          name: req.query.sort === 'asc' ? 1 : -1
        }
        const queries = await Product.aggregate([{
            $facet: {
              paginatedResult: [
                { $match: query },
                 { $sort : sort  },  
                { $skip: ProductsPerPage * page },
                { $limit: ProductsPerPage }
              ],
              totalCount: [
                { $match: query },
                { $count: 'totalCount' }
              ]
            }
          }])
              
        // const productLength = product.length;
        return res.json([
          queries[0].totalCount.length ? queries[0].totalCount[0].totalCount : 0, 
          queries[0].paginatedResult]
         );
      } catch (error) {
        console.log(error);
      }
    
  }

  const filterProductsStyles = async (req, res, next) => {
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
      try {
          const style = req.query.estilos
          const regex = new RegExp(`${style}+`, 'i') // i for case insensitive
          const product = await Product.find({name: {$regex: regex}})
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: req.query.sort
                                        })
          const productLength = (await Product.find({name: {$regex: regex}})).length
          return res.json([productLength, product]);
        } catch (error) {
          console.log(error);
        }
  }

  const filterProductsVolume = async (req, res, next) => {
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
      try {
          const volume = parseFloat(req.query.volumen)
          const product = await Product.find({ volumen : volume})
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            name: req.query.sort
                                        })
          const productLength = (await Product.find({volumen: volume})).length
          return res.json([productLength, product]);
        } catch (error) {
          console.log(error);
        }
  }

  const getMaxPrice = async (req, res, next) => {
      try {
          const maxPrice = await Product.find()  
                                        .select("price")
                                        .sort({"price" : -1})
                                        .limit(1)
          return res.json(maxPrice);
          } catch (error) {
            console.log(error);
          }
  }

  const getPriceSort = async (req, res, next) => {
    let ProductsPerPage = 8;
    let pageNumber = req.query.pageNumber;
    let page = Math.max(0, pageNumber);
      try {
          const prices = req.query.priceSort.split(',')
          const product = await Product.find( { $and: [ { price: { $gte: prices[0] } }, { price: { $lte: prices[1] } } ] } )
                                        .limit(ProductsPerPage)
                                        .skip(ProductsPerPage * page)
                                        .sort({
                                            price: 1
                                        })
          const productLength = (await Product.find({ $and: [ { price: { $gte: prices[0] } }, { price: { $lte: prices[1] } } ] })).length
          return res.json([productLength, product]);
        } catch (error) {
          console.log(error);
        }
  }
