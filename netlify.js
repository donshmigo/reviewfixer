// For Netlify Deployment
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ReviewFixer API is running" }),
  };
};
