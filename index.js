const TODO = require("./TODO");
const express = require("express");
const bodyParser = require("body-parser");
const { removeAllListeners } = require("nodemon");

var app = express();

app.use(bodyParser.json());

// insert Data through post method

app.post("/college", (req, res) => {
 

    console.log(req.body); 
   
     TODO.query(
       "INSERT INTO alumni (Name,Roll,Email) values(?,?,?)",
       [req.body.name, req.body.roll, req.body.email],
       (err, rows) => {
         if (err) {
           console.log(err);
         
               }
              
           else {
           res.send(rows);
           console.log("Data inserted");
         }
       }
     );
   });
   
   
   
   // get data using get method
   
   app.get("/college/:id", (req, res) => {
       TODO.query(
         "SELECT * From alumni",
         [req.params.id],
         (err, rows) => {
           if (err) {
             console.log(err);
           } else {
             res.send(rows);
          
           }
       });
   });
   
   //Delete data through Delete method
    app.delete("/college/:id",(req,res)=>{
       TODO.query(
           "DELETE FROM alumni WHERE id = ?",
           [req.params.id], //pass the object and id separately
           (err,rows)=>{
               if(err){
                   console.log(err);
                   res.status(500).send("Error deleting alumni record");
               }else{
                   if(rows.affectedRows===0)
                   {
                       res.status(404).send("Alumni record not found");
                   }
                   else{
                   console.log("Alumni record deleted successfully");
                   res.status(200).send("Alumni record deleted successfully");
                   }
               }
           }
       )
   });
   
   //Update data through patch method
   app.patch("/college/:id", (req, res) => {
       TODO.query(
           "UPDATE alumni SET ? WHERE id = ?",
           [req.body,req.params.id], // Pass the object and the id separately
           (err, rows) => {
               if (err) {
                   console.log(err);
                   res.status(500).send("Error updating alumni record");
               } else {
                   console.log("Alumni record updated successfully");
                   res.status(200).send("Alumni record updated successfully");
               }
           }
       );
   });
   
   //update and insert data from put method
   app.put("/college/:id", (req, res) => {
       TODO.query(
           "UPDATE alumni SET ? WHERE id = ?",
           [req.body, req.params.id],
           (err, result) => {
               if (err) {
                   console.error(err);
                   res.status(500).send("Error updating alumni record");
               } else {
                   if (result.affectedRows === 0) {
                       // If no rows were affected by the update, retrieve the current state of the alumni record
                       connection.query(
                           "SELECT * FROM alumni WHERE id = ?",
                           [req.params.id],
                           (err, rows) => {
                               if (err) {
                                   console.error(err);
                                   res.status(500).send("Error retrieving alumni record");
                               } else {
                                   if (rows.length === 0) {
                                       res.status(404).send("Alumni record not found");
                                   } else {
                                       res.status(200).json(rows[0]);
                                   }
                               }
                           }
                       );
                   } else {
                       console.log("Alumni record updated successfully");
                       res.status(200).send("Alumni record updated successfully");
                   }
               }
           }
       );
   });
   
   
   
   
   
   
   
   app.listen(3003, () => console.log("Express server is running on port 3003"));
   