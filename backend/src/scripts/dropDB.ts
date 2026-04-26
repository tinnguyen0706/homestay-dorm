import pool from "../config/db.ts";
import fs from "fs";
import path from "path";

const sql = fs.readFileSync(path.join(process.cwd(), "../database/scripts/drop.sql"), "utf-8");

await pool.query(sql);
console.log("Dropped database sucessfully")
await pool.end();