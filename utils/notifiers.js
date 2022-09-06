import { notify as _notify } from "node-notifier";

function notify(title, message) {
  _notify({
    title: title,
    message: message,
    time: 1000,
  });
}

export const notify = notify;