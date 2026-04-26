import pool from "../config/db.ts";
import path from "path";
import fs from "fs";

const sql = fs.readFileSync(path.join(process.cwd(), '../database/seeds/data.sql'), 'utf-8');

await pool.query(sql);
console.log("-----Insert data successfully------");
await pool.end();

