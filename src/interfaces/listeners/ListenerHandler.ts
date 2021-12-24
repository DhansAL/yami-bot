// remember the difference bw listenerHandler(type) and Listener interface

import { Message } from "discord.js";
import { ServerConfig } from "../database/ServerConfig";
import { Yamishi } from "../Yamishi";

export type ListenerHandler = (
  Yami: Yamishi,
  message: Message,
  config: ServerConfig
) => Promise<void>;
