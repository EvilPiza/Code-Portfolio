const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
//const BOT_TOKEN = " nu uh i aint putting it here ";

// Serve your portfolio static files
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch Discord user data
app.get("/discord/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`
      }
    });

    const { avatar, banner } = response.data;

    const avatarUrl = avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${avatar.startsWith("a_") ? "gif" : "png"}?size=1024`
      : null;

    const bannerUrl = banner
      ? `https://cdn.discordapp.com/banners/${userId}/${banner}.${banner.startsWith("a_") ? "gif" : "png"}?size=1024`
      : null;

    res.json({ avatarUrl, bannerUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data." });
  }
});

app.listen(3000, () => {
  console.log("Portfolio + Discord API running on http://localhost:3000");
});
