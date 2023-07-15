import express from 'express'
import { Bard } from "googlebard";
const app = express()
async function lol () {
app.get('/', function (req, res) {
    res.send("hello world")
})

app.get('/bard', async (req, res) => {
    const text = req.query.text;
    const id = req.query.id || "id";
    const bardcookies = req.query.bardcookies;
    
    if (!text) return res.send("put some text dumb ass")
    if (!bardcookies) return res.send("put some bardcookies dumb ass")
    
    	let cookies = `__Secure-1PSID=`+bardcookies;
		let bot = new Bard(cookies, {
  			  inMemory: false,
  			  savePath: "./conversations.json", // this is being done to save crucial information about the conversation so the bot remembers it
		});
		console.log(text, id, bardcookies)
		let conversationId = id;
		let response = await bot.ask(text, conversationId);
    	console.log(response)
        res.send({status: 200, bardcookies: bardcookies, response: response});
});
app.listen(5000)
}

lol()
