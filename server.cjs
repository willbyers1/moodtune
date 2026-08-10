var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/recommend", async (req, res) => {
    try {
      const { mood, reason, musicPreference, direction, apiKey } = req.body;
      if (!mood || !musicPreference || !direction) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (!apiKey) {
        return res.status(401).json({ error: "Missing API Key" });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const prompt = `Create a music playlist of 8 to 12 songs for someone who is feeling "${mood}".
Reason for feeling this way: "${reason || "Not specified"}".
Preferred music genre(s): "${musicPreference}".
Goal/Direction: "${direction}" (if they want to boost energy, give upbeat songs; if they want to lean into it, give songs that match the mood).
For each song, provide the title, artist, and a one-line reason (under 20 words) explaining why this specific track fits their situation. Return the playlist in English.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: {
              type: import_genai.Type.OBJECT,
              properties: {
                title: {
                  type: import_genai.Type.STRING,
                  description: "The title of the song."
                },
                artist: {
                  type: import_genai.Type.STRING,
                  description: "The artist of the song."
                },
                reason: {
                  type: import_genai.Type.STRING,
                  description: "A one-line reason explaining why this track fits."
                }
              },
              required: ["title", "artist", "reason"]
            }
          }
        }
      });
      const jsonStr = response.text?.trim() || "[]";
      let playlist = [];
      try {
        playlist = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("Failed to parse Gemini response", parseError);
        return res.status(500).json({ error: "Failed to parse playlist from AI" });
      }
      res.json({ playlist });
    } catch (error) {
      console.error("Gemini API error", error);
      res.status(500).json({ error: "Failed to generate playlist" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
