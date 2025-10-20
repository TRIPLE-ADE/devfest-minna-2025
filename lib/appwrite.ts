import { Client, TablesDB, Storage, ID, Query } from "appwrite";

// Appwrite configuration
const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://fra.cloud.appwrite.io/v1",
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

// Initialize services
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

// Database and Table IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID || "";
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

// Types for DP data
export interface DPRecord {
  id?: string;
  name: string;
  imageId: string;
  imageUrl: string;
  $createdAt?: string;
}

// Upload image to Appwrite Storage (updated API)
export const uploadDPImage = async (
  imageBlob: Blob,
  fileName: string,
): Promise<string> => {
  try {
    const file = new File([imageBlob], fileName, { type: "image/png" });

    // Updated API with object parameters
    const response = await storage.createFile({
      bucketId: BUCKET_ID,
      fileId: ID.unique(),
      file: file,
    });

    // Get the public URL for the uploaded file
    const imageUrl = storage.getFileView({
      bucketId: BUCKET_ID,
      fileId: response.$id,
    });

    return imageUrl.toString();
  } catch (error) {
    console.error("Error uploading image to Appwrite:", error);
    throw error;
  }
};

// Save DP record to database (using TablesDB API)
export const saveDPRecord = async (
  dpData: Omit<DPRecord, "id" | "$createdAt">,
): Promise<DPRecord> => {
  try {
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: {
        name: dpData.name,
        imageId: dpData.imageId,
        imageUrl: dpData.imageUrl,
      },
    });

    return {
      id: response.$id,
      name: response.name,
      imageId: response.imageId,
      imageUrl: response.imageUrl,
      $createdAt: response.$createdAt,
    };
  } catch (error) {
    console.error("Error saving DP record to Appwrite:", error);
    throw error;
  }
};

// Get DP record by ID (using TablesDB API)
export const getDPRecord = async (id: string): Promise<DPRecord | null> => {
  try {
    const response = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    });

    return {
      id: response.$id,
      name: response.name,
      imageId: response.imageId,
      imageUrl: response.imageUrl,
      $createdAt: response.$createdAt,
    };
  } catch (error) {
    console.error("Error getting DP record from Appwrite:", error);
    return null;
  }
};

// Get recent DPs (using TablesDB API)
export const getRecentDPs = async (limit: number = 12, offset: number = 0): Promise<DPRecord[]> => {
  try {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
        Query.offset(offset)
      ],
    });

    return response.rows.map((row) => ({
      id: row.$id,
      name: row.name,
      imageId: row.imageId,
      imageUrl: row.imageUrl,
      $createdAt: row.$createdAt,
    }));
  } catch (error) {
    console.error("Error getting recent DPs from Appwrite:", error);
    return [];
  }
};

export { client };
