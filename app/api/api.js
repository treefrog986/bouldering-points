"use server"
import sql from "./db";
const bcrypt = require('bcrypt')

export async function signUp(credentials){
    const {email, password, username} = credentials
    const hashPass = await bcrypt.hash(password, 10)
   try { const res = await sql`
    INSERT INTO users
    (name, password, email) values 
    (${username}, ${hashPass}, ${email})
    `
    if (res.count === 0) {
      return null
  }
  const user = await sql`
  SELECT * FROM users WHERE email = ${email}
  `
  if (user.length === 0) {

      return null
  }
  delete user[0].password
  return user[0]
  } catch (error) {
    return "error";
  }
 
}

export async function loginUser(credentials) {
    const {email, password} = credentials
    const user = await sql`
    SELECT * FROM users WHERE email = ${email}
    `
    if (user.length === 0) {
        return null
    }
    const isValid = await bcrypt.compare(password, user[0].password)
    if (!isValid) {
        return null
    }
    delete user[0].password
    return user[0]
}

export async function getClimbs(id) {
    console.log("getting climbs")
    const climbs = await sql`
    SELECT * FROM exercises where climber_id = ${id} and
    week = (CURRENT_DATE - ((EXTRACT(dow FROM CURRENT_DATE)::int+6)%7))
     `
    return climbs
}   

export async function putClimbs(id, climbs) {
    for (const [color, statuses] of Object.entries(climbs)) {
        for (const [status, { count }] of Object.entries(statuses)) {
          const query = `
            DO $$
            BEGIN
            
                  INSERT INTO exercises (climber_id, color, status, count)
                    VALUES (${id}, '${color}', '${status}', ${count})
                    ON CONFLICT (climber_id, color, status, week)
                    DO UPDATE SET count = EXCLUDED.count;

                DELETE FROM exercises
                WHERE climb_id IS NOT NULL
                  AND climber_id = ${id}
                  AND color = '${color}'
                  AND status = '${status}'
                  AND count = 0;
            END $$;
          `;
          await sql.unsafe(query);
        }
      }
}

export async function getWeeksClimb(id) {
  const weeks = await sql`
  select week, sum(count) as climbs
  from exercises
  where climber_id=${id}
  group by week
  order by week desc
  limit 3
  `
  weeks.reverse()
  return weeks
}