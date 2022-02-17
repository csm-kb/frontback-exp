import jwt from 'jsonwebtoken';
const tokenSecret = process.env.JWT_TOKEN_SECRET || 'ajZ8oWOcetzssbJHLjbgnaFeWbJc3AmqNlYbsAtvQ-e9wJqiZMofppd2bEcfO4HX4g39fO2zGkbyTr61j45HkCGccwAqb7fG_mxAc5C5Q9krk-YLpj1Wg_nJlCuvUb-hzPmjR56QtVmCWef3t7TEwfisq_HmPNO4zCMGKpa1ciPS6rzffrtSNVWhXpMwy664kpP5-pDCpBAY_0QqSacwvF4zld88S1dbkGo3mdJiOJbQHl90MzIuJGVis8FaFTlXI4U6qGXaxASnAblUdXWprk2Ql2xuPqX1Ucd3gP5X74vSjt0lYqaezJ4LBAwXxn0c13KjokgOcEYJQ__R0n3nGQ';

export function jwtVerify(req, res, next) {
    const token = req.headers.authorization;
    if (!token)
        res.status(403).json({error: "No authentication token specified"});
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err)
                res.status(500).json({error: 'Failed to authenticate token'});
            else {
                delete value.data["password"];
                req.user = value.data;
                next();
            }
        });
    }
};