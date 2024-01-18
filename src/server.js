import "dotenv/config"
import express from 'express'
import OpenAI from 'openai'

const app = express();
const PORT = 3000;

app.use(express.static('public'))

const openai = new OpenAI({
    apiKey: process.env.KEY,
});

// SSE route
app.get('/sse', async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    const sendData = (data) => {
        // res.write(`data: ${JSON.stringify(data)}\n\n`);
        res.write(`data: ${data}\n\n`);
    };

    // hit api;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": "Hello!" }
        ],
        stream: true,
    });

    //hit result api
    try {
        for await (const chunk of completion) {
            const result = chunk.choices[0].delta.content;
            if (result) {
                sendData(result)
            }
        }

    } catch (error) {
        console.log(error)
    }

    // Simulate SSE data
    // const intervalId = setInterval(async () => {
    //     console.log(kata)
    //     sendData(kata);
    // }, 1000);
    // // Close SSE connection when the client disconnects
    // req.on('close', () => {
    //     clearInterval(intervalId);
    // });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});