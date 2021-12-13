import * as child from "child_process";

/* child_process allows you to spawn a separate process within your app - which grants access to things like OS commands.
In this case, it's used to access the git CLI and grab the last commit hash, which is used in the about command to confirm versioning.
 */
