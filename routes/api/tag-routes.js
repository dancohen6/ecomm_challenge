const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
Tag.belongsToMany(Product, {through: 'product_tag'})
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const products = await Product.findAll()
  const tags = await Tag.findAll({include: Product})
    res.send(tags);
  
});

router.get('/:id', async (req, res) => {
  const tag_id = req.params.id
  const tag = await Tag.findByPk(tag_id, {include: Product});

  if (tag) {
    res.send(tag);
  } else res.send('No tags found with that id.');
});
 

router.post('/', (req, res) => {
  const newTag = Tag.create(req.body)
 res.send(newTag)
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

});

router.delete('/:id', (req, res) => {
 Tag.destroy({
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