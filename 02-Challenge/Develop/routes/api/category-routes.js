const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
   // be sure to include its associated Products
Category.findAll({
  include:[{
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }]
}).then(categories => {
  return res.status(200).json(categories);
  }).catch(err => {
  return res.status(500).send(err);
  });
  });

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include:[{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  }).then(category => {
    if (!category) {
    return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
    }).catch(err => {
    return res.status(500).send(err);
    });
    });

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(category => {
    return res.status(201).json(category);
    }).catch(err => {
    return res.status(500).send(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findByPk(req.params.id).then(category => { if (!category) {
    return res.status(404).json({ message: "Category not found" });
    }
    const { name } = req.body;
    category.name = name;
    return category.save()
    })
    .then(category => {
    return res.status(200).json(category);
    })
    .catch(err => {
    return res.status(500).send(err);
    });
    }); 

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
    id: req.params.id
    }
  })
  .then(deletedCategory => {
    if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
    })
    .catch(err => {
    return res.status(500).send(err);
    });
    });


module.exports = router;
