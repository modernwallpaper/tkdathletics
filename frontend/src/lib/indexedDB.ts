const DB_NAME = "Tkdathletics";
const DB_VERSION = 1;
const STORE_NAME = "users";

export interface User {
  id: string;
  username?: string;
  password?: string;
  name: string;
  surename?: string;
  authority?: "USER" | "ADMIN";
  failed_logins?: number;
  email: string;
  birthday?: string;
  img?: string;
  kup?:
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten";
  weight_class?: "to56kg";
  gender?: "MALE" | "FEMALE";
  ag?: "Senior" | "Youth_A" | "Youth_B" | "Youth_C" | "Youth_D";
  pg?: "LK1" | "LK2" | "KADETS";
  timestamp: string;
}

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

export async function saveUser(user: User): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
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
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    }
  })
}

// Assuming you want to get user by email, you need to create an index for email
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
