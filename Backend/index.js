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
    try {

        conn = await mysql.createConnection({
            host: '127.0.0.1',   // ใช้แบบนี้กับ Docker
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });

        console.log('✅ MySQL Connected');

    } catch (error) {

        console.error('❌ MySQL connection failed:', error.message);

    }
};


//
// ✅ GET all users
//
app.get('/users', async (req, res) => {

    try {

        if (!conn) {
            return res.status(500).json({
                message: 'Database not connected'
            });
        }

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
// ✅ CREATE user
//
app.post('/users', async (req, res) => {

    try {

        if (!conn) {
            return res.status(500).json({
                message: 'Database not connected'
            });
        }

        const {
            firstName,
            lastName,
            age,
            gender,
            interests,
            description
        } = req.body;


        // ✅ validation
        if (!firstName || !lastName || !age || !gender) {

            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบ'
            });

        }


        const [result] = await conn.query(
            `INSERT INTO users 
            (firstname, lastname, age, gender, interests, description)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                firstName,
                lastName,
                age,
                gender,
                interests || '',
                description || ''
            ]
        );


        res.json({
            message: 'User created successfully',
            insertId: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Database error',
            error: error.message
        });

    }

});


//
// ✅ GET user by id
//
app.get('/users/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [results] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (results.length === 0) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        res.json(results[0]);

    } catch (error) {

        res.status(500).json({
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

        const id = req.params.id;

        const updateData = req.body;

        const [result] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateData, id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        res.json({
            message: 'User updated successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Update failed',
            error: error.message
        });

    }

});


//
// ✅ DELETE user
//
app.delete('/users/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Delete failed',
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