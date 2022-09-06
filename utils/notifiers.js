import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const notifier = require('node-notifier');
// String
notifier.notify('Message');

export function notify(title, message) {
  notify({
    title: title,
    message: message,
    time: 1000,
  });
}