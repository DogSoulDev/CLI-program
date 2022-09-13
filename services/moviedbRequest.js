import { createRequire } from "module";
import { getRequestOptions } from "./getRequestOptions.js";

const require = createRequire(import.meta.url);
const https = require("node:https");

/**
 * It resolves to the response data from the API
 * @param command - CLI executed command
 * @param options - CLI command options
 * @returns A promise.
 */
export async function moviedbRequest(command, identifier) {
  const requestOptions = getRequestOptions(command, identifier);
  let data = "";

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const responseData = JSON.parse(data);
        if (responseData.status_code === 34) {
          reject(new Error("The resource you requested could not be found"));
        }
        resolve(responseData);
      });
    });

    req.on("error", (err) => {
      reject(new Error(err.message));
    });

    req.end();
  });
}
