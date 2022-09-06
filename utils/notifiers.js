//!To use require we need to import createRequire from node:module
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const notifier = require("node-notifier");
notifier.notify("Message");

export function notify(title, message) {
	notify({
		title: title,
		message: message,
		time: 1000,
	});
}
