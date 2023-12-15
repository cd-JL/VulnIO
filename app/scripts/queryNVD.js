// pages/api/queryNVD.js
import axios from 'axios';

export default async function handler(req, res) {
  const { cpeName } = req.query;

  try {
    const response = await axios.get('https://services.nvd.nist.gov/rest/json/cves/2.0', {
      params: { cpeName },
    });

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error making API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
