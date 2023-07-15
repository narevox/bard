import express from 'express'
import { Bard } from "googlebard";
import fs from "fs";
import Bardv2 from "bard-ai";
const app = express()


async function lel() {
  try {
    app.get('/', function (req, res) {
    res.send("hello world")
})
app.get('/bardv2', async (req, res) => {
    const text = req.query.text;
    const id = req.query.id;
    const bardcookies = req.query.bardcookies;
    if (!text) return res.send("put some text dumb ass")
    if (!id) return res.send("put some id dumb ass")
    if (!bardcookies) return res.send("put some bardcookies dumb ass")
    console.log(text, id, bardcookies)
    
    

const filename = "./user-conversations-"+id+".json";

// Check if the file exists
if (!fs.existsSync(filename)) {
  // Create the file
    await Bardv2.init(bardcookies);
	let chat = new Bardv2.Chat();
	let response = await chat.ask(text)
	let data = await chat.export();
    fs.writeFileSync(filename, JSON.stringify(data));
} else {
  // Read the file
  const fileData = fs.readFileSync(filename, "utf8");
  // Parse the file data as JSON
  const parsedData = JSON.parse(fileData);
  //Save Output
    await Bardv2.init(bardcookies);
	let chat = new Bardv2.Chat(parsedData);
	let response = await chat.ask(text)
	let data = await chat.export();


const saveOutput = (output) => {
    const filePath = "./user-conversations-"+id+".json";

    try {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Delete the previous JSON object.
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        // Save the new JSON object.
                        fs.writeFile(filePath, JSON.stringify(output), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("Output saved successfully");
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
};

const main = async () => {
    const output = data
    await saveOutput(output);
};

main();

console.log(response);
    res.send({status: 200, bardcookies: bardcookies, id: id, response: response});

}});
    

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
        res.send({status: 200, bardcookies: bardcookies, id: id, response: response});
});


app.listen(5000)
  } catch (error) {
    // Return the error message
    return res.send({status: 300, error: error.message});
  }
}

lel()
