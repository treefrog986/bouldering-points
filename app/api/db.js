// db.js
import postgres from 'postgres'
const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL)

export default sql