import emitters from "./emitters";
import type KeyOf from "./util/KeyOf";

/**
 * Execute handlers attached to the event name with payload.
 * @param {object} target - An object used as reference.
 * @param {string} name - An event name.
 * @param {*} payload - Any value used as argument for event handlers.
 */
function emit<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>
>(target: object, name: Name, payload: Events[Name]) {
  const listeners = emitters.get(target);

  if (!listeners) {
    return;
  }

  const handlers = listeners.get(name);

  if (!handlers) {
    return;
  }

  for (const handler of handlers) handler(payload);
}

export default emit;
