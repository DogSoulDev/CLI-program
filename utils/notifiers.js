import { notify as _notify } from "notifiers";

export function notify(title, message) {
  _notify({
    title: title,
    message: message,
    time: 1000,
  });
}