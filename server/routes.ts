import type { Express } from "express";
import fs from 'fs/promises';
import path from 'path';

export function registerRoutes(app: Express) {
  app.get('/api/training-data', async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), 'Jess Runs a (Half) Marathon - Main Sheet.csv');
      const data = await fs.readFile(csvPath, 'utf-8');
      res.header('Content-Type', 'text/csv');
      res.send(data);
    } catch (error) {
      console.error('Error reading training data:', error);
      res.status(500).send('Error reading training data');
    }
  });
}
