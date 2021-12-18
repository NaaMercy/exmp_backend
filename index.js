import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import TodoModel from './schema/todo_schema.js';

//loading environment variables from .env file
//to store configuration separately from code.

//configuring .env before using it
dotenv.config()



//creating an instance of express server
const app = express();


//get the body of a request using this middleware
app.use(express.json());
app.use(cors());

//assigning port number to server
const PORT = 4000;

//assigning our database url to a variable
const db = process.env.PORT || process.env.DB_URL;


app.get('/', (req, res) => {
    return res.status(200).json({
    message: "Welcome to the todo API."
    })
    })
//getting all todos
app.get('/todos/', async (req, res) => {
    const { status } = req.params;
    console.log('Fetch todo status', status);
    const todoModel = await TodoModel.find({});
    if (todoModel) {
        return res.status(200).json({
            status: true,
            message: "Todos fetched successfully",
            data: todoModel

        })
    } else {
        return res.status(400).json({
            status: false,
            message: "Todos not found",
        })
    }
})

//create a todo
app.post('/todo', async (req, res) => {
    const { title, description, date_time } = req.body;
    console.log('Fetch todo status', { title, description, date_time });
    const todoModel = await TodoModel.create({
        title,
        description,
        date_time
    })
    if (todoModel) {
        return res.status(201).json({
            status: true,
            message: "Todos created",
            data: todoModel

        })
    } else {
        return res.status(400).json({
            status: false,
            message: "Todos not created",
        })
    }
})



mongoose.connect(db,{
    useNewURLParser: true,
    useUnifiedTopology: true,
    }).then(()=>{console.log('Connected to db')}).catch((error) =>{console.log(error)})


//listening to port of server
app.listen(PORT, ()=>{console.log('Server is up and running')});