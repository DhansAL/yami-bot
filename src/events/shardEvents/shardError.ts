import { Yamishi } from "../../interfaces/Yamishi";
import { yamiErrorHandler } from "../../utils/yamiErrorHandler";

/**
 * Passes the shardError event to Becca's error handler.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @param {Error} error Standard error object.
 * @param {number} shard The number of the shard that had an error.
 */
export const shardError = async (
  Yami: Yamishi,
  error: Error,
  shard: number
): Promise<void> => {
  await yamiErrorHandler(Yami, `shard ${shard}`, error);
};
