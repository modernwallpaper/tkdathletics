import { UpdateUserSchema } from "../../schemas";
import * as z from "zod";

type User = z.infer<typeof UpdateUserSchema>;

const DB_NAME = "Tkdathletics";
const DB_VERSION = 1;

// user store
const STORE_NAME = "user";

// admin store
const ADMIN_STORE_NAME = "users";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export async function saveUserAsAdmin(user: User): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ADMIN_STORE_NAME, "readwrite");
    const store = transaction.objectStore(ADMIN_STORE_NAME);
    const request = store.put(user);

    request.onsuccess = () => {
      console.log("User saved successfully");
      resolve();
    };

    request.onerror = (event: Event) => {
      console.error("Error saving user:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function saveUser(user: User): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ ...user, timestamp: new Date() });

    request.onsuccess = () => {
      console.log("User saved successfully");
      resolve();
    };

    request.onerror = (event: Event) => {
      console.error("Error saving user:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function loadUser(id: string): Promise<User | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function loadAllUsers(): Promise<User | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function loadUserByEmail(
  email: string,
): Promise<User | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("email");
    const request = index.get(email);

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function deleteUser(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}
