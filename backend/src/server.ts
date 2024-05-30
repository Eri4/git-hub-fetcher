import dotenv from 'dotenv';
import app from './app';
import { startCommitFetcher } from './services/commitFetcher';

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

startCommitFetcher();