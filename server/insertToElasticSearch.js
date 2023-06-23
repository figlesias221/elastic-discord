const elasticsearch = require("elasticsearch");
const fs = require("fs");

const client = new elasticsearch.Client({
  host: "127.0.0.1:9200",
  log: "trace",
  apiVersion: "7.2", // use the same version of your Elasticsearch instance
});

async function indexData() {
  await client.indices.create(
    {
      index: "messages",
      body: {
        mappings: {
          properties: {
            text: { type: "text" },
            date: { type: "text" },
            channel: { type: "text" },
            user: { type: "text" },
            mentions: { type: "text" },
            hasLink: { type: "boolean" },
            hasVideo: { type: "boolean" },
            hasAudio: { type: "boolean" },
            isPinned: { type: "boolean" },
          },
        },
      },
    },
    { ignore: [400] }
  );

  const jsonContent = fs.readFileSync(`${__dirname}/data.json`, "utf8");
  const dataset = JSON.parse(jsonContent).dataset;
  

  const body = dataset.flatMap((doc) => [
    { index: { _index: "messages" } },
    {
      text: doc.text,
      date: doc.date,
      channel: doc.channel,
      user: doc.user,
      mentions: doc.mentions,
      hasLink: doc.hasLink,
      hasVideo: doc.hasVideo,
      hasAudio: doc.hasAudio,
      isPinned: doc.isPinned,
    },
  ]);

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        });
      }
    });
    console.log(erroredDocuments);
  }
}

indexData().catch(console.log);
