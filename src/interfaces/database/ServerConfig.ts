import { Document } from "mongoose";

import { LevelRole } from "../settings/LevelRole";

export interface ServerConfig extends Document {
  serverID: string;
  serverName: string;
  levels: string;
  welcome_channel: string;
  depart_channel: string;
  level_channel: string;
  suggestion_channel: string;
  muted_role: string;
  custom_welcome: string;
  hearts: string[];
  blocked: string[];
  self_roles: string[];
  triggers: [string, string][];
  automod_channels: string[];
  no_automod_channels: string[];
  automod_roles: string[];
  allowed_links: string[];
  link_message: string;
  level_roles: LevelRole[];
  join_role: string;
  leave_message: string;
  report_channel: string;
  level_ignore: string[];
  sass_mode: string;
  message_events: string;
  voice_events: string;
  thread_events: string;
  moderation_events: string;
  member_events: string;
  links: string;
  profanity: string;
  profanity_message: string;
}
