import { openDB, type IDBPDatabase } from "idb";

type QueuedAction = {
  id?: number;
  stampId: string;
  action: "add" | "remove" | "exchange";
  timestamp: number;
};

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB("panini-offline", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("queue")) {
          db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
        }
      },
    });
  }
  return dbPromise;
}

export async function enqueue(stampId: string, action: QueuedAction["action"]) {
  const db = await getDb();
  await db.add("queue", { stampId, action, timestamp: Date.now() });
}

export async function getQueueLength(): Promise<number> {
  const db = await getDb();
  return db.count("queue");
}

export async function processQueue(
  callbacks: {
    add: (id: string) => Promise<unknown>;
    remove: (id: string) => Promise<unknown>;
    exchange: (id: string) => Promise<unknown>;
  }
) {
  const db = await getDb();
  const tx = db.transaction("queue", "readwrite");
  const all = await tx.store.getAll();
  for (const item of all) {
    try {
      if (item.action === "add") await callbacks.add(item.stampId);
      else if (item.action === "remove") await callbacks.remove(item.stampId);
      else if (item.action === "exchange") await callbacks.exchange(item.stampId);
      await tx.store.delete(item.id!);
    } catch {
      // Leave it in queue for next sync attempt
    }
  }
  await tx.done;
}
