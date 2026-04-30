import pool from "../config/db.ts";
import path from "node:path";
import fs from "fs";
import { cwd } from "node:process";

const sql = fs.readFileSync(path.join(cwd(), "../database/scripts/dropRecords.sql"), 'utf-8');

await pool.query(sql);
console.log("---------Drop Records successfully------------");
await pool.end();

