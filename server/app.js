const express = require("express");
const cors = require("cors");
var elasticsearch = require("elasticsearch");
const app = express();
var client = new elasticsearch.Client({
  host: "127.0.0.1:9200",
  log: "trace",
  apiVersion: "7.1", // use the same version of your Elasticsearch instance
});

app.use(cors());
app.use(express.json());

// Helper function to parse Elasticsearch response
const parseElasticResponse = (elasticResponse) => {
  const responseHits = elasticResponse.hits.hits;
  const result = responseHits.map((hit) => hit._source);
  return result;
};

// Endpoint which queries Elasticsearch
app.get("/elastic", async (req, res, next) => {
  try {
    const { text = "" } = req.query;
    const response = await client.search({
      index: "messages", // Replace with the appropriate index name
      from: 0,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ["text", "date", "channel", "user"], // Adjust fields based on your message data
            type: "phrase_prefix",
          },
        },
      },
    });

    res.json({
      message: "Search Successful",
      records: parseElasticResponse(response),
    });
  } catch (err) {
    next(err);
  }
});

app.post("/messages", async (req, res, next) => {
  console.log("req.body", req);
  try {
    const {
      text,
      date,
      channel,
      user,
      mentions = [],
      hasLink,
      hasVideo,
      hasAudio,
      isPinned,
    } = req.body;

    const message = {
      text,
      date,
      channel,
      user,
      mentions,
      hasLink,
      hasVideo,
      hasAudio,
      isPinned,
    };

    // Index the new message in Elasticsearch
    await client.index({
      index: "messages", // Replace with the appropriate index name
      body: message,
    });

    res.json({
      message: "Message successfully posted",
    });
  } catch (err) {
    next(err);
  }
});

app.listen(8080, () => {
    console.log("Server running on port 3000");
});

