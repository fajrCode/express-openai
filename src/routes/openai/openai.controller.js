import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.KEY,
});

// Pages
export const pagesNormal = (req, res) => {
    res.render("openai-normal.ejs");
}

export const pagesSse = (req, res) => {
    res.render("openai-sse.ejs");
}

// API
export const normal = async (req, res) => {
    try {
        const { userPrompt } = req.body;
        
        // hit api;
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant, and good marketer.",
            },
            {
              role: "user",
              content: `${userPrompt}`,
            },
          ],
        });
        const response = completion.choices[0].message.content;
        res.status(200).send(response);
      
    } catch (error) {
        console.log(error.message);
    }
}

export const sse = async (req, res) => {
    try {
        const { userPrompt } = req.body;
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          });
        
          // hit api;
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant, and good marketer.",
              },
              {
                role: "user",
                content: `${userPrompt}`,
              },
              {
                role: "user",
                content: `Buatkan dalam format HTML, namun langsung isi nya saja, child dari <main>.`,
              },
            ],
            temperature: 0,
            stream: true,
          });
        
          try {
            for await (const chunk of completion) {
              const result = chunk.choices[0].delta.content;
              if (result) {
                res.write(result);
              }
            }
          } catch (error) {
            console.log(error);
            res.write("error generate itinerary");
          }
    } catch (error) {
        console.log(error.message);
        res.write("data: Error Generate");
    }
}