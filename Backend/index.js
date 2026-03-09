const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

//
// ✅ Connect MySQL
//
const initMySQL = async () => {

    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });

    console.log('✅ MySQL Connected');

};


//
// ✅ Validation (เหมือนโค้ดแรก)
//
const validateData = (userData) => {

    let errors = [];

    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }

    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }

    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }

    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }

    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรก');
    }

    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }

    return errors;
};


//
// ✅ GET all users
//
app.get('/users', async (req, res) => {

    try {

        const [results] = await conn.query(
            'SELECT * FROM users'
        );

        res.json(results);

    } catch (error) {

        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });

    }

});


//
// ✅ CREATE user (แก้ให้เหมือนโค้ดแรก)
//
app.post('/users', async (req, res) => {

    try {

        let user = req.body;

        const errors = validateData(user);

        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }

        const [results] = await conn.query(
            'INSERT INTO users SET ?',
            user
        );

        res.json({
            message: 'User created successfully',
            data: results
        });

    } catch (error) {

        const errorMessage = error.message || 'Error creating user';
        const errors = error.errors || [];

        console.error('Error creating user:', error.message);

        res.status(500).json({
            message: errorMessage,
            errors: errors
        });

    }

});


//
// ✅ GET user by id
//
app.get('/users/:id', async (req, res) => {

    try {

        let id = req.params.id;

        const [results] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (results.length === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json(results[0]);

    } catch (error) {

        let statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });

    }

});


//
// ✅ UPDATE user
//
app.put('/users/:id', async (req, res) => {

    try {

        let id = req.params.id;
        let updatedUser = req.body;

        const [results] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updatedUser, id]
        );

        if (results.affectedRows === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {

        let statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });

    }

});


//
// ✅ DELETE user
//
app.delete('/users/:id', async (req, res) => {

    try {

        let id = req.params.id;

        const [results] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (results.affectedRows === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {

        let statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });

    }

});


//
// ✅ Start server
//
app.listen(port, async () => {

    await initMySQL();

    console.log(`🚀 Server running on http://localhost:${port}`);

});