// track the searches made by a user
import { Account, Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    // console.log("Search result:", result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: Number(existingMovie.count || 0) + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        movie_id: movie?.id || null,
        title: movie?.title || "",
        poster_url: movie?.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Register a new user
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    console.log("User registered:", response);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    console.log("User logged in:", response);
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Logout the user
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log("Current user:", user);
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Get saved movies by the user
// export const getSavedMovies = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal("userId", account.getSession("current").$id),
//     ]);

//     return result.documents as unknown as Movie[];
//   } catch (error) {
//     console.error("Error fetching saved movies:", error);
//     throw error;
//   }
// };