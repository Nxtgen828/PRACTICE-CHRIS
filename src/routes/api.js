const express = require('express');
const router = express.Router();

// Sample data for testing
const sampleData = [
  { id: 1, name: 'Practice Item 1', status: 'active' },
  { id: 2, name: 'Practice Item 2', status: 'inactive' },
  { id: 3, name: 'Practice Item 3', status: 'active' }
];

// GET /api/v1/items
router.get('/items', (req, res) => {
  res.json({
    success: true,
    data: sampleData,
    count: sampleData.length
  });
});

// GET /api/v1/items/:id
router.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = sampleData.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// POST /api/v1/items
router.post('/items', (req, res) => {
  const { name, status } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Name is required'
    });
  }
  
  const newItem = {
    id: sampleData.length + 1,
    name,
    status: status || 'active'
  };
  
  sampleData.push(newItem);
  
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// PUT /api/v1/items/:id
router.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = sampleData.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const { name, status } = req.body;
  
  if (name) sampleData[itemIndex].name = name;
  if (status) sampleData[itemIndex].status = status;
  
  res.json({
    success: true,
    data: sampleData[itemIndex]
  });
});

// DELETE /api/v1/items/:id
router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = sampleData.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  
  const deletedItem = sampleData.splice(itemIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedItem,
    message: 'Item deleted successfully'
  });
});

module.exports = router;
