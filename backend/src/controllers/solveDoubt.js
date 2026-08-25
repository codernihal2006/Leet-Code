const { GoogleGenerativeAI } = require("@google/generative-ai");

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, startCode } = req.body;

        if (!process.env.GEMINI_KEY) {
            return res.status(500).json({ message: "Gemini API key is not configured" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${title || "N/A"}
[PROBLEM_DESCRIPTION]: ${description || "N/A"}
[EXAMPLES]: ${typeof testCases === "object" ? JSON.stringify(testCases) : (testCases || "N/A")}
[startCode]: ${typeof startCode === "object" ? JSON.stringify(startCode) : (startCode || "N/A")}

## YOUR CAPABILITIES:
1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
2. **Code Reviewer**: Debug and fix code submissions with explanations
3. **Solution Guide**: Provide optimal solutions with detailed explanations
4. **Complexity Analyzer**: Explain time and space complexity trade-offs
5. **Approach Suggester**: Recommend different algorithmic approaches
6. **Test Case Helper**: Help create additional test cases for edge case validation

Always provide helpful, supportive, and precise explanations.`
        });

        let promptText = "";
        if (Array.isArray(messages)) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg?.parts?.[0]?.text) {
                promptText = lastMsg.parts[0].text;
            } else if (typeof lastMsg === "string") {
                promptText = lastMsg;
            } else {
                promptText = JSON.stringify(lastMsg);
            }
        } else if (typeof messages === "string") {
            promptText = messages;
        }

        const result = await model.generateContent(promptText || "Can you give me a hint?");
        const text = result.response.text();

        return res.status(201).json({ message: text });
    } catch (err) {
        console.error("Gemini Error:", err);
        return res.status(500).json({
            message: "AI assistance temporarily unavailable: " + (err.message || err)
        });
    }
};

module.exports = solveDoubt;
