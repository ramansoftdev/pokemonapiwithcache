const redis = require("redis");

let RedisClient = undefined;

const connectRedis = async () => {
  const client = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
  });

  client.on("error", (err) => {
    console.log(`redis connection error with message : ${err.message}`);
  });

  client.on("reconnecting", () => {
    console.log(
      "✅ Redis is reconnecting " +
        process.env.REDIS_URL +
        ":" +
        process.env.REDIS_PORT
    );
  });

  client.on("connect", () => {
    console.log(
      "✅ Redis has connected " +
        process.env.REDIS_URL +
        ":" +
        process.env.REDIS_PORT
    );
  });

  console.log(
    "✅ Redis is connecting " +
      process.env.REDIS_URL +
      ":" +
      process.env.REDIS_PORT
  );

  await client.connect(); // This MUST throw an error    await client.ping(); // Test the connection
  RedisClient = client;
  console.log(
    "✅ Redis is online " + process.env.REDIS_URL + ":" + process.env.REDIS_PORT
  );
};

const getRedisClient = () => RedisClient;

const getOrSetCache = async (key, cb) => {
  let pokeomons = undefined;
  pokeomons = await RedisClient.get(key);
  if (pokeomons) {
    console.log("cache hit!");
    return JSON.parse(pokeomons);
  } else {
    console.log("cache miss!!");
    const resp = await cb();
    // console.log(resp)
    const result = { count: resp.data.count, pokeomons: resp.data.results };
    // console.log(`result is ${result} and str is ${JSON.stringify(result)}`)
    await RedisClient.setEx(key, 3600 * 24 * 7, JSON.stringify(result));
    return result;
  }
};

module.exports = { getRedisClient, connectRedis, getOrSetCache };
