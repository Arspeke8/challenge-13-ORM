const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((tag) => {
      return res.status(200).json(tag);
    }
    )
    .catch((err) => {
      return res.status(500).send(err);
    }
    );
    });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      return res.status(200).json(tag);
    }
    )
    .catch((err) => {
      res.status(400).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body) 
    .then((tag) => {
      return res.status(201).json(tag);
    }
    )
    .catch((err) => {
      return res.status(400).json({ message: "Tag not created", error: err }
      );
    }
    );
});

    

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((updatedTag) => {
      return Tag.findByPk(req.params.id)
    })
    .then((tag) => {
      return res.status(200).json(tag);
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error updating tag", error: err });
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
 .then((deletedTag) => {
    if(deletedTag){
      return res.status(200).json({ message: "Tag deleted successfully" });
    }else{
      return res.status(404).json({ message: "Tag not found" });
    }
  })
  .catch((err) => {
    return res.status(500).json({ message: "Error deleting tag", error: err });
  });
});

module.exports = router;
