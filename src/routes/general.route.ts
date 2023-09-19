import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`Response from backend at ${new Date().toISOString()}`);
});

// module.exports = router;
export default router;
