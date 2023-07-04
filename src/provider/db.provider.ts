import mysql from 'mysql2/promise';

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
async function QueryDB<T = any>(sql: string, params?: any[]): Promise<T> {
  const connection = await mysql.createConnection(options);
  const [rows] = await connection.execute(sql, params);
  return rows as any as T;
}

export default QueryDB;
