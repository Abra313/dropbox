const mongoose = require('mongoose');

// Define the Token schema
const tokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  expires_at: { type: Date, required: true }, // Expiration time of the access token
});

// Token model
const Token = mongoose.model('Token', tokenSchema);

// MongoDB connection URL
const MONGO_URI = 'mongodb+srv://taiwopeter454:sqw8ekNOJNCY3phr@dropbox.6abio.mongodb.net/?retryWrites=true&w=majority&appName=dropbox'; // Change this to your MongoDB URI

// Function to store the token in the database
const storeToken = async (tokenData) => {
  try {
    // Calculate the expiration date from `expires_in` (in seconds)
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000); // Convert seconds to milliseconds

    // Create a new token document
    const token = new Token({
      access_token: tokenData.access_token,
      expires_at: expiresAt,
    });

    // Save the token document to the database
    await token.save();
    console.log('Token saved successfully!');
  } catch (err) {
    console.error('Error saving token:', err);
  }
};

// Example token data (replace this with actual data)
const tokenData = {
  access_token: "sl.CB6FcPA46kucMASahgtC7KomQAv5pJDOY5FDboNbiJDGF8z_PbKinKIdWItkTGEC6v_CoyHqxLrYOKHhRwx_koq1MRZJ83AeyMHMzuPiV9tSj4Fv2OQU2yMqca3PjBu6aOHZPRzhrKoyk_aDCpxD",
  token_type: "bearer",
  expires_in: 14400, // expires in 14400 seconds (4 hours)
};

// Connect to MongoDB and store the token
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    
    // Store the token
    await storeToken(tokenData);

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

// Start the script
connectDB();
