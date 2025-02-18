import { databases, storage, DATABASES, STORAGE } from '../config/appwrite';
import { ID, Query } from 'appwrite';

export const AppwriteService = {
    // Create initial document if it doesn't exist
    initializeDocument: async () => {
        try {
            const documents = await databases.listDocuments(
                DATABASES.ID,
                DATABASES.PROGRESS_COLLECTION_ID,
                [Query.limit(1)]
            );

            if (documents.total === 0) {
                return await databases.createDocument(
                    DATABASES.ID,
                    DATABASES.PROGRESS_COLLECTION_ID,
                    ID.unique(),
                    {
                        htmlProgress: 0,
                        cssProgress: 0,
                        javascriptProgress: 0,
                        htmlDescription: '',
                        cssDescription: '',
                        javascriptDescription: '',
                        lastUpdated: new Date().toISOString()
                    }
                );
            }
            return documents.documents[0];
        } catch (error) {
            console.error('Error initializing document:', error);
            throw error;
        }
    },

    // Get all progress data
    getProgressData: async () => {
        try {
            const documents = await databases.listDocuments(
                DATABASES.ID,
                DATABASES.PROGRESS_COLLECTION_ID,
                [Query.limit(1)]
            );
            return documents.documents[0];
        } catch (error) {
            console.error('Error getting progress data:', error);
            throw error;
        }
    },

    // Update progress value for a specific skill
    updateProgress: async (documentId, skill, newValue) => {
        try {
            const updateData = {
                [`${skill}Progress`]: newValue,
                lastUpdated: new Date().toISOString()
            };

            const response = await databases.updateDocument(
                DATABASES.ID,
                DATABASES.PROGRESS_COLLECTION_ID,
                documentId,
                updateData
            );
            return response;
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    },

    // Upload image for a specific skill
    uploadSkillImage: async (file, skill) => {
        try {
            // Upload file to storage
            const fileResponse = await storage.createFile(
                STORAGE.BUCKET_ID,
                ID.unique(),
                file
            );

            // Get the first document
            const documents = await databases.listDocuments(
                DATABASES.ID,
                DATABASES.PROGRESS_COLLECTION_ID,
                [Query.limit(1)]
            );

            // Update the document with the new image ID
            if (documents.documents.length > 0) {
                const documentId = documents.documents[0].$id;
                await databases.updateDocument(
                    DATABASES.ID,
                    DATABASES.PROGRESS_COLLECTION_ID,
                    documentId,
                    {
                        [`${skill}Image`]: fileResponse.$id,
                        lastUpdated: new Date().toISOString()
                    }
                );
            }

            return fileResponse;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    // Get image preview URL
    getImagePreview: (fileId) => {
        return storage.getFilePreview(
            STORAGE.BUCKET_ID,
            fileId,
            400, // width
            400  // height
        );
    },

    // Update description for a specific skill
    updateDescription: async (documentId, skill, description) => {
        try {
            const updateData = {
                [`${skill}Description`]: description,
                lastUpdated: new Date().toISOString()
            };

            const response = await databases.updateDocument(
                DATABASES.ID,
                DATABASES.PROGRESS_COLLECTION_ID,
                documentId,
                updateData
            );
            return response;
        } catch (error) {
            console.error('Error updating description:', error);
            throw error;
        }
    }
}; 