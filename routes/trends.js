import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getCollection } from '../config/db.js';
import { getTrendingTopicsWithProxy } from '../services/selenium.js';

const router = express.Router();

router.get('/scrape', async (req, res) => {
  try {
    const trends = await getTrendingTopicsWithProxy();
    
    const record = {
      _id: uuidv4(),
      trends,
      timestamp: new Date(),
      ipAddress: req.ip
    };

    const collection = await getCollection('trends');
    await collection.insertOne(record);

    res.json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trending topics',
      details: error.message 
    });
  }
});

export default router;