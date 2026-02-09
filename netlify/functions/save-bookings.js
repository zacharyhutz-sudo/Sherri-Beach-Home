// Netlify serverless function to proxy saves to npoint
// This runs server-side, bypassing any client-side network restrictions

const NPOINT_URL = "https://api.npoint.io/9bf5ddca826de74d7320";

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: ""
    };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    if (event.httpMethod === "GET") {
      // Fetch current data
      const response = await fetch(NPOINT_URL);
      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    if (event.httpMethod === "POST") {
      // Save new data
      const response = await fetch(NPOINT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body
      });
      
      if (!response.ok) {
        throw new Error(`npoint returned ${response.status}`);
      }
      
      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
