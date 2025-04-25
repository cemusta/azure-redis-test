import * as dotenv from "dotenv";
import { createClient } from "redis";
import { DefaultAzureCredential } from "@azure/identity";

dotenv.config();

const createRedisClientWithEntraId = async () => {
  // Use DefaultAzureCredential to get an access token
  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken(
    "https://redis.azure.com/.default",
  );

  if (!tokenResponse || !tokenResponse.token) {
    throw new Error("Failed to acquire Azure Entra ID token.");
  }

  console.log("Token acquired successfully.");

  // Connect to Azure Redis Cache using Entra ID authentication
  const client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
    // Pass user oid and token to the client
    username: process.env.USER_OID,
    password: tokenResponse.token,
  }).on("error", (err) => console.log("Redis Client Error", err));

  return client;
};

const createRedisClientWithKey = () => {
  // Connect to Azure Redis Cache using access key
  const client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
    // Pass access key to the client
    password: process.env.REDIS_KEY,
  }).on("error", (err) => console.log("Redis Client Error", err));

  return client;
};

const main = async (authType = "key") => {
  const client =
    authType === "entra"
      ? await createRedisClientWithEntraId()
      : createRedisClientWithKey();

  await client.connect();
  console.log("Connected to Redis");

  // Write data to Redis
  console.log("\nWriting data to Redis");
  const data = {
    name: "test",
    description: "test",
    url: "test",
    owner: "test",
  };
  await client.set("test", JSON.stringify(data));

  // Read data from Redis
  console.log("\nReading data from Redis:");
  const value = await client.get("test");
  console.log(value);

  await client.disconnect();
  console.log("\nDisconnected from Redis");

  return;
};

main("entra");
// main("key");
