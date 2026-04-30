// server.js

const express = require("express");
const { Pool } = require("pg");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "academic_city_trade",
    password: "1234",
    port: 5432
});



// HOME
app.get("/", function(req, res){
    res.send("Backend Connected With PostgreSQL");
});



// REGISTER
app.post("/register", async function(req,res){

    let full_name = req.body.full_name;
    let email = req.body.email;
    let password = req.body.password;

    if(email.includes("@acity.edu")==false){
        res.send("Use Academic City Email");
        return;
    }

    await pool.query(
        "INSERT INTO users(full_name,email,password) VALUES($1,$2,$3)",
        [full_name,email,password]
    );

    res.send("Registered Successfully");
});



// LOGIN
app.post("/login", async function(req,res){

    let email = req.body.email;
    let password = req.body.password;

    let result = await pool.query(
        "SELECT * FROM users WHERE email=$1 AND password=$2",
        [email,password]
    );

    if(result.rows.length > 0){
        res.send(result.rows[0]);
    }
    else{
        res.send("Wrong Login");
    }
});



// UPDATE PROFILE
app.put("/profile/:id", async function(req,res){

    let id = req.params.id;

    await pool.query(
        "UPDATE users SET full_name=$1, skills_offered=$2, skills_needed=$3 WHERE id=$4",
        [
            req.body.full_name,
            req.body.skills_offered,
            req.body.skills_needed,
            id
        ]
    );

    res.send("Profile Updated");
});



// ADD LISTING
app.post("/listing", async function(req,res){

    await pool.query(
        "INSERT INTO listings(user_id,title,description,category,status) VALUES($1,$2,$3,$4,$5)",
        [
            req.body.user_id,
            req.body.title,
            req.body.description,
            req.body.category,
            "Available"
        ]
    );

    res.send("Listing Added");
});



// GET ALL LISTINGS
app.get("/listings", async function(req,res){

    let result = await pool.query("SELECT * FROM listings ORDER BY id DESC");

    res.send(result.rows);
});



// SEARCH LISTINGS
app.get("/search", async function(req,res){

    let word = "%" + req.query.word + "%";

    let result = await pool.query(
        "SELECT * FROM listings WHERE title ILIKE $1",
        [word]
    );

    res.send(result.rows);
});



// INTERESTED BUTTON
app.post("/interested", async function(req,res){

    await pool.query(
        "INSERT INTO requests(listing_id,sender_id,status) VALUES($1,$2,$3)",
        [
            req.body.listing_id,
            req.body.sender_id,
            "Pending"
        ]
    );

    res.send("Interest Sent");
});



// SEND MESSAGE
app.post("/message", async function(req,res){

    await pool.query(
        "INSERT INTO messages(sender_id,receiver_id,message_text) VALUES($1,$2,$3)",
        [
            req.body.sender_id,
            req.body.receiver_id,
            req.body.text
        ]
    );

    res.send("Message Sent");
});



// ADMIN STATS
app.get("/admin/stats", async function(req,res){

    let users = await pool.query("SELECT COUNT(*) FROM users");
    let listings = await pool.query("SELECT COUNT(*) FROM listings");
    let requests = await pool.query("SELECT COUNT(*) FROM requests");

    res.send({
        total_users: users.rows[0].count,
        total_listings: listings.rows[0].count,
        total_requests: requests.rows[0].count
    });
});



// DELETE LISTING
app.delete("/admin/listing/:id", async function(req,res){

    let id = req.params.id;

    await pool.query(
        "DELETE FROM listings WHERE id=$1",
        [id]
    );

    res.send("Listing Deleted");
});



app.listen(3000, function(){
    console.log("Server Running On Port 3000");
});