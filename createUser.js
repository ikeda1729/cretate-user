const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  console.log("🚀 ~ file: create-user.js:8 ~ exports.handler= ~ event:", event)
  const email = event.request.userAttributes.email;
  const sub = event.request.userAttributes.sub;

  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });

    const query = `INSERT INTO User (id, email) VALUES ('${sub}', '${email}')`;
    const [rows, fields] = await connection.execute(query);
    console.log("🚀 ~ file: create-user.ts:16 ~ exports.handler= ~ createdUser:", rows);

    await connection.end();

    // cognitoのtriggerはeventを返さないとエラーになる
    return event;

  } catch (e) {
    console.error(e);
    return event;
  }
}