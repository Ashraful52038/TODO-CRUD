const connection= require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const { removeAllListeners } = require("nodemon");

var app = express();

app.use(bodyParser.json());

// insert Data through post method
app.post("/todo", (req, res) => {
    connection.query(
        "INSERT INTO TaskListTable(task_id, user_id, task_description,task_title,Status,Timestamp) VALUES (?, ?, ?,?,?,?)",
        [req.body.task_id, req.body.user_id, req.body.task_description,req.body.task_title,req.body.Status,req.body.Timestamp],
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error posting data");
            } else {
                console.log("Data inserted successfully");
                res.send(rows);
            }
        }
    );    
    
});


// get data using get method

app.get("/todo/:id", (req, res) => {
    connection.query(
        "SELECT * From UserTable",
        [req.params.id],
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error while getting the data");
            } else {
                res.send(rows);
                res.status(200).send("Successfully get the data");
            }
        });
    });
//Delete data through Delete method
app.delete("/todo/:id", (req, res) => {
    connection.query(
        "DELETE FROM TaskListTable WHERE task_id = ?",
        [req.params.id], // pass the task_id obtained from the URL parameters
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error deleting task record");
            } else {
                if (rows.affectedRows === 0) {
                    res.status(404).send("Task record not found");
                } else {
                    console.log("Task record deleted successfully");
                    res.status(200).send("Task record deleted successfully");
                }
            }
        }
    );
});

//Update data through patch method
app.patch("/todo/:id", (req, res) => {
    const { task_description, task_title, Status, Timestamp } = req.body;
    const updateValues = { task_description, task_title, Status, Timestamp }; // Assuming these are the columns you want to update

    connection.query(
        "UPDATE TaskListTable SET ? WHERE task_id = ?",
        [updateValues, req.params.id],
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error updating task record");
            } else {
                if (rows.affectedRows === 0) {
                    res.status(404).send("Task record not found");
                } else {
                    console.log("Task record updated successfully");
                    res.status(200).send("Task record updated successfully");
                }
            }
        }
    );
});

//update and post data by put method
app.put("/TODO/:id", (req, res) => {
    const { task_description, task_title, Status, Timestamp } = req.body;
    const updateValues = { task_description, task_title, Status, Timestamp };
    const taskId = req.params.id;

    connection.query(
        "UPDATE TaskListTable SET ? WHERE task_id = ?",
        [updateValues, taskId],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating task record");
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).send("Task record not found");
                } else {
                    console.log("Task record updated successfully");
                    res.status(200).send("Task record updated successfully");
                }
            }
        }
    );
});

//register part
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

// Check if the user already exists
connection.query('SELECT * FROM UserTable WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }

    // If user exists, send error response
    if (results.length > 0) {
        return res.status(400).send('User already exists');
    } 
    
    // If user doesn't exist, insert new user data into the database
    connection.query('INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, "user")', [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log('User registered successfully');
        return res.status(201).send('User registered successfully');
    });
});


app.listen(3003, () => console.log("Express server is running on port 3003")); 