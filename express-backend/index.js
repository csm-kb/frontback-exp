// import dotenv before anything else
import 'dotenv/config';

import cors from "cors";
import express from "express";
import session from "express-session";
import logging from "morgan";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3001;

/////////////////////////////////////////////
//* Middleware *//

// entire API should allow cross-origin access
app.use(cors());
// body parsing: JSON
app.use(express.json());
// HTTP request logging
app.use(logging(process.env.MORGAN_LOG_FORMAT || 'dev'));
//// sessions
// var sessConfig = {
//     secret: process.env.SESS_SECRET || '6nj$^NujnZ$E*nN^N$6n4ejl!#Lt?3tjQ8t3h$#YT]N$6n4ejl!#L4ejl?3tj>SGe$#YT]N$6n4ejljnZ$',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {},
//     genid: (req) => uuidv4(req) // use UUID v4 for session IDs
// };
// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1);
//     sessConfig.cookie.secure = true;
// }
// app.use(session(sessConfig));

/////////////////////////////////////////////
//* Routing *//

// authentication API endpoint
import authRouter from './routes/api/auth.js';
app.use("/api/auth", authRouter);

////
app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

export default app;