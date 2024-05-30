import express from 'express';
import { getStarredRepositories, getCommits } from '../controllers/repositoryController';

const router = express.Router();

router.get('/starred', getStarredRepositories);
router.get('/commits', getCommits);

export default router;