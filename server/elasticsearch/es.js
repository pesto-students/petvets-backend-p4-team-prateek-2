const express = require('express');
const client = require('../elasticsearch/client');
const { Client } = require('@elastic/elasticsearch');
const router = express.Router();

router.get('/results', (req, res) => {
  const doctor = req.query.doctor;
  const result = [];
  console.log(doctor);

  async function sendESRequest() {
    const body = await client.search({
      index: 'doctors',
      body: {
        size: 300,
        query: {
            bool: {
              must: {
                term: { isEmailVerified: true },
              },
              filter: [
                {
                  match: { firstName: { query: doctor } },
                },
              ]
            },
        },
      },
    });

    if (body.hits.hits.length) {
      body.hits.hits.forEach((data) => {
        result.push(data._source);
      });
    }

    res.json(result);
  }
  sendESRequest();
});

module.exports = router;
