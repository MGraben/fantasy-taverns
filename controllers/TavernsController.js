const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');


const getAllTaverns = async function(req) {
    const pool = await poolPromise;
    let result;

console.log("before query");
    try {
        result = await pool
            .request()
            // .input('UserId', sql.Int, req.user.Id)
            .query('select * from Taverns' );   //where Id = @tavernID'
    } catch (e) {
        throwError(e.message);
    }
    console.log("after query");
    return result.recordset;
};



getAll = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, taverns;

    // now call the db
    [err, taverns] = await executeOrThrow(getAllTaverns(req));
    if (err) {
        return returnError(res, err, 422);
    }
    console.log("return getAll Tavernscontroller");
    // return results
    return returnSuccessResponse(res, taverns, 201);
};

module.exports.getAll = getAll;



const test = async function(req,res){
    return res.send("Success");
};
module.exports.test = test;

const createUser = async function(userInfo) {
    const pool = await poolPromise;
    let result;
    const roleId = parseInt(userInfo.Tavern.Id) === 0 ? 1 : 2;
    console.log("return createUser Tavernscontroller");
    if (parseInt(userInfo.Tavern.Id) === 0) {
        try {
            tavernResult = await pool
                .request()
                .input('TavernName', sql.VarChar, userInfo.Tavern.TavernName)
                .query(
                    'INSERT INTO Taverns ([TavernName]) OUTPUT inserted.* values (@TavernName)',
                );
            userInfo.Tavern.Id = tavernResult.recordset.shift().ID;
            console.log("Created Tavern id: " + userInfo.Tavern.Id);
        } catch (e) {
            throwError(e.message);
        }
    }
    userInfo.Password = await hashPassword(userInfo);

    try {
        result = await pool
            .request()
            .input('UserName', sql.NVarChar, userInfo.UserName)
            .input('TavernId', sql.Int, userInfo.Tavern.Id)
            .input('RoleId', sql.Int, roleId)
            .input('Password', sql.NVarChar, userInfo.Password)
            .query(
                'INSERT INTO Users ([UserName], [TavernId], [RoleId], [Password]) OUTPUT inserted.* values (@UserName, @TavernId, @RoleId, @Password)',
            );
            console.log('Added Manager');
    } catch (e) {
        throwError(e.message);
        console.log('Create user failed');
    }

    return result.recordset[0];
};

module.exports.createUser = createUser;
create = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;

    if (!body.Password) {
        return returnError(res, 'Please enter a password to register', 422);
    }
    let err, user;

    [err, user] = await executeOrThrow(createUser(body));
    if (err) {
        return returnError(res, err, 422);
    }

    return returnSuccessResponse(res, user, 201);
};

module.exports.create = create;

const comparePassword = async function(user, passedPassword) {
    let err, pass;

    if (!user.Password) {
        throwError('password not set');
    }

    [err, pass] = await executeOrThrow(
        bcryptPromise.compare(passedPassword, user.Password),
    );
    if (err) {
        throwError(err);
    }

    if (!pass) {
        throwError('invalid password');
    }

    return user;
};

const getMyTaverns = async function(req) {
    const pool = await poolPromise;
    let result;

console.log("before query");
    try {
        result = await pool
            .request()
            .input('TavernId', sql.Int, req.tav)
            .query('select ID from Taverns where Id = @tavernID' )
    } catch (e) {
        throwError(e.message);
    }
    console.log("after query");
    return result.recordset;
};



getTaverns = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, taverns;

    // now call the db
    [err, taverns] = await executeOrThrow(getMyTaverns(req));
    if (err) {
        return returnError(res, err, 422);
    }
    console.log("return get Tavernscontroller");
    // return results
    return returnSuccessResponse(res, taverns, 201);
};

module.exports.getTaverns = getTaverns;




// const authUser = async function(userInfo) {
//     if (!userInfo.Password) {
//         throwError('Please enter a password to login');
//     }

//     let user;

//     const pool = await poolPromise;

//     try {
//         user = await pool
//             .request()
//             .input('UserName', sql.VarChar, userInfo.UserName)
//             .query('select * from Users where UserName = @UserName');
//         user = user.recordset.shift();
//     } catch (e) {
//         returnError(res, e, 500);
//     }

//     if (!user) {
//         throwError('Not registered');
//     }
//     [err, user] = await executeOrThrow(
//         comparePassword(user, userInfo.Password),
//     );

//     if (err) {
//         throwError(err.message);
//     }

//     return user;
// };

// module.exports.authUser = authUser;

// const getJwt = function(user) {
//     let expirationTime = parseInt(process.env.jwt_expiration);

//     return `Bearer ${jwt.sign(
//         // eslint-disable-next-line camelcase
//         { user_id: user.ID },
//         process.env.jwt_encryption,
//         {
//             expiresIn: expirationTime,
//         },
//     )}`;
// };

// const login = async function(req, res) {
//     let err, user;

//     [err, user] = await executeOrThrow(authUser(req.body));
//     if (err) {
//         return returnError(res, err, 422);
//     }
//     delete user.Password;
//     return returnSuccessResponse(res, {
//         token: getJwt(user),
//         user: JSON.stringify(user),
//     });
// };

// module.exports.login = login;
