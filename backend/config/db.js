mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("DB Connected") })
    .catch((err) => { console.error("DB Connection Error:", err) });