const cache = require("memory-cache");

const Duration = 60; // minutes

function MyCache(req, res, next) {
  const key = "cache: " + req.originalUrl || req.url;
  const cachedBody = cache.get(key);

  if (cachedBody) {
    res.setHeader("X-Cache", "HIT");
    res.setHeader("Cache-Control", "public, max-age=" + Duration * 60);
    res.send(JSON.parse(cachedBody));
    console.log(
      `Cache: HIT  -- Time: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}--@${
        req.url
      }`
    );
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      res.setHeader("X-Cache", "MISS");
      res.setHeader("Cache-Control", "public, max-age=" + Duration * 60);
      cache.put(key, body, Duration * 1000 * 60);
      res.sendResponse(body);
    };
    next();
    console.log(
      `Cache: MISS -- Time: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}--@${
        req.url
      }`
    );
  }
}

module.exports = MyCache;
