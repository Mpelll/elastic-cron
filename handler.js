"use strict";

const client = new Client({
  cloud: {
    id: process.env.CLIENT_ID,
  },
  auth: { apiKey: process.env.API_KEY },
});

exports.cron = async (event) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate = `.${year}.${month >= 10 ? month : "0" + month}.${date >= 10 ? date : "0" + date}`;

  try {
    client.indices.exists({ index: process.env.INDEX + formattedDate }).then(function (exists) {
      if (!exists) {
        client.indices.create({
          index: process.env.INDEX + formattedDate,
        });
      } else {
        console.log("index already exist");
      }
    });
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
