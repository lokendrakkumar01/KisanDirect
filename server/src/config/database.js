import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const DEFAULT_URI = "mongodb+srv://lokendrakuma9568_db_user:zkOWnoDmc3QOIIjJ@cluster0.mjizfzs.mongodb.net/kisandirect?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_URI;
export class MongoDatabase {
    client = null;
    db = null;
    isConnected = false;
    async connect() {
        if (this.isConnected && this.db) {
            return this.db;
        }
        try {
            this.client = new MongoClient(MONGODB_URI, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
                connectTimeoutMS: 10000,
                serverSelectionTimeoutMS: 10000
            });
            await this.client.connect();
            this.db = this.client.db('kisandirect');
            // Ping database to confirm connection
            await this.db.command({ ping: 1 });
            this.isConnected = true;
            console.log('✅ Connected to MongoDB Atlas successfully! Database: kisandirect');
            return this.db;
        }
        catch (error) {
            console.warn('⚠️ MongoDB Atlas connection warning:', error.message || error);
            console.warn('⚡ Operating with synchronized in-memory database store.');
            this.isConnected = false;
            return null;
        }
    }
    getDb() {
        return this.db;
    }
    isDbConnected() {
        return this.isConnected;
    }
    async close() {
        if (this.client) {
            await this.client.close();
            this.isConnected = false;
            console.log('MongoDB connection closed.');
        }
    }
}
export const mongoDb = new MongoDatabase();
