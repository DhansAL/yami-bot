import { Yamishi } from "../../interfaces/Yamishi";
import { Message } from "discord.js";

/**
 * Handles the onMessage event. Validates that the message did not come from
 * another bot, then passes the message through to the listeners and command handler.
 *
 * @param {Yamishi} Becca Becca's Discord instance.
 * @param {Messsage} message The message object received in the gateway event. \
 */

export const messageCreate = async (
    Yami:Yamishi,
    message:Message
):Promise<void>=>{
    try{
        const {author,channel,guild} = message;

        //edge cases
        if(author.bot) return;
        if(!guild || channel.type === "DM") return;

        const serverConfig = await 
    }
}