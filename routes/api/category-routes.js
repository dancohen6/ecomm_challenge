const router = require('express').Router();
const { Category, Product } = require('../../models');
Category.hasMany(Product)
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const product = await Product.findAll()
  const categories = await Category.findAll({include: Product})
  res.json(categories)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const cat_id = req.params.id;

  const category = await Category.findByPk(cat_id);

  if (category) {
    res.send(category);
  } else res.send('No category found with that id.');
});


router.post('/', async (req, res) => {
 const newCat = Category.create(req.body)
 res.send(newCat)
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
       id: req.params.id
    }
  }).then(function(rowDeleted){ 
    if(rowDeleted === 1){
       res.send('Deleted successfully');
     }
  }, function(err){
      console.log(err); 
  })
});

module.exports = router;