import { Client, Databases, Storage } from 'appwrite';
import { 
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    APPWRITE_BUCKET_ID
} from './appwrite.constants';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

export const DATABASES = {
    ID: APPWRITE_DATABASE_ID,
    PROGRESS_COLLECTION_ID: APPWRITE_COLLECTION_ID
};

export const STORAGE = {
    BUCKET_ID: APPWRITE_BUCKET_ID
};

export { client, databases, storage };