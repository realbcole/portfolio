const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Allow for cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requsted-With, Content-Type, Accept");
    next();
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

app.post("/gpt", async (req, res) => {
    const prompt = req.body.prompt;
    const language = req.body.language;
    const explanation = req.body.explanation;
    const apiKey = req.body.apiKey;
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await promptGPT(prompt, language, explanation, openai);
        res.send(response);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Invalid API Key" });
    }

});

let promptGPT = async (prompt, language, explanation, openai) => {
    switch (explanation) {
        case "None":
            explanation = "Provide ONLY the code. No explanation needed."
            break;
        case "Concise":
            explanation = "Provide an explanation in addition the code. BE VERY CONCISE. Provide explanation in PLAIN TEXT, NOT COMMENTS"
            break;
        case "Detailed":
            explanation = "Provide an explanation in addition the code. BE VERY DETAILED. Provide explanation in PLAIN TEXT, NOT COMMENTS"
            break;
        default:
    }
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I want you to act as a coding syntax consultant. I will provide you with a
        specific programming task that I need help with,
        and your role is to suggest the most suitable and simple syntax that can 
        achieve the task. Provide only necessary code to complete the task. You should use your 
        knowledge of coding languages, software engineering, web development, etc.. 
        My first request is in ${language}. ${explanation} SURROUND YOUR CODE WITH TRIPLE
        BACKTICKS TO ENSURE IT IS FORMATTED CORRECTLY.
        
        Text: """${prompt}"""}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
}

//promptGPT("what is the syntax for creating a class in javascript").then((res) => console.log(res));