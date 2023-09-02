const axios = require("axios");
const express = require("express");

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

module.exports = {
  getToken,
  getPair,
};
