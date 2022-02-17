import express from 'express';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import lodash from 'lodash';
import bcrypt from 'bcrypt';

const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

// dev: use JSON for db storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
// read data from JSON to populate db.data
await db.read();
// set default db data if null
db.data ||= { users: [] };
// lodash utility
db.chain = lodash.chain(db.data);

// get users table
const {users} = db.data;

// web token and secret stuff ;)
import jwt from 'jsonwebtoken';
const tokenSecret = process.env.JWT_TOKEN_SECRET || 'ajZ8oWOcetzssbJHLjbgnaFeWbJc3AmqNlYbsAtvQ-e9wJqiZMofppd2bEcfO4HX4g39fO2zGkbyTr61j45HkCGccwAqb7fG_mxAc5C5Q9krk-YLpj1Wg_nJlCuvUb-hzPmjR56QtVmCWef3t7TEwfisq_HmPNO4zCMGKpa1ciPS6rzffrtSNVWhXpMwy664kpP5-pDCpBAY_0QqSacwvF4zld88S1dbkGo3mdJiOJbQHl90MzIuJGVis8FaFTlXI4U6qGXaxASnAblUdXWprk2Ql2xuPqX1Ucd3gP5X74vSjt0lYqaezJ4LBAwXxn0c13KjokgOcEYJQ__R0n3nGQ';

function generateToken(user) {
    return jwt.sign({data:user}, tokenSecret, {expiresIn:'24h'});
}

const saltRounds = 10;

router.post('/', (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err)
            res.status(500).json(err);
        else {
            const newUser = { "user": req.body.email, "password": hash };
            users.push(newUser);
            db.write()
            .then(_ => {
                res.status(200).json({token:generateToken(newUser)});
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
    });
});

export default router;