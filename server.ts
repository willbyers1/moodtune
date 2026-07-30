import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/recommend", async (req, res) => {
    try {
      const { mood, reason, musicPreference, direction, apiKey } = req.body;

      if (!mood || !musicPreference || !direction) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (!apiKey) {
        return res.status(401).json({ error: "Missing API Key" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Create a music playlist of 8 to 12 songs for someone who is feeling "${mood}".
Reason for feeling this way: "${reason || 'Not specified'}".
Preferred music genre(s): "${musicPreference}".
Goal/Direction: "${direction}" (if they want to boost energy, give upbeat songs; if they want to lean into it, give songs that match the mood).
For each song, provide the title, artist, and a one-line reason (under 20 words) explaining why this specific track fits their situation. Return the playlist in English.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "The title of the song.",
                },
                artist: {
                  type: Type.STRING,
                  description: "The artist of the song.",
                },
                reason: {
                  type: Type.STRING,
                  description: "A one-line reason explaining why this track fits.",
                },
              },
              required: ["title", "artist", "reason"],
            },
          },
        },
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express v4, it is app.get('*', ...)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
