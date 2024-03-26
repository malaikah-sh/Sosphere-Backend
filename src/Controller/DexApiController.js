const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
async function findEtherAddresses(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const etherAddressRegex = /(0x[a-fA-F0-9]{40})/g;
    const etherAddresses = html.match(etherAddressRegex);

    if (etherAddresses && etherAddresses.length > 0) {
      return etherAddresses;
    } else {
      throw new Error("No Ethereum addresses found on the website.");
    }
  } catch (error) {
    throw error;
  }
}

function findMostRepeatedAddress(addresses) {
  const addressCountMap = addresses.reduce((acc, address) => {
    acc[address] = (acc[address] || 0) + 1;
    return acc;
  }, {});

  let maxCount = 0;
  let mostRepeatedAddress = null;

  for (const address in addressCountMap) {
    if (addressCountMap[address] > maxCount) {
      maxCount = addressCountMap[address];
      mostRepeatedAddress = address;
    }
  }

  return mostRepeatedAddress;
}

const getToken = async (req, res) => {
  try {
    const response = await axios.get("https://api.dextools.io/v1/token", {
      params: {
        chain: req.query.chain,
        address: req.query.address,
      },
      headers: {
        "x-api-key": "c471bc4c8b5f0053cf4c26c0d5af5ccf", // Replace with your API key
        "Access-Control-Allow-Origin": "true",
      },
    });
    return res.json(response.data.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
};

const getPair = async (req, res) => {
  try {
    const response = await axios.get("https://api.dextools.io/v1/pair", {
      params: {
        chain: req.query.chain,
        address: req.query.address,
      },
      headers: {
        "x-api-key": "709ef8a7117c058368c277de44efd99b", // Replace with your API key
        "Access-Control-Allow-Origin": "true",
      },
    });
    return res.json(response.data.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
};

const getaddress = async (req, res) => {
  const websiteUrl = req.query.url;
  try {
    const addresses = await findEtherAddresses(websiteUrl);
    const mostRepeatedAddress = findMostRepeatedAddress(addresses);
    res.json({ mostRepeatedAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getToken,
  getPair,
  getaddress,
};
