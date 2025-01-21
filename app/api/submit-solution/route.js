import { getSession } from '@auth0/nextjs-auth0';

const problemIdByDay = {1: "404030759741952000", 2: "390890364392706054", 3: "390890364392706054", 4: "390890364392706054", 5: "390890364392706054"}

async function getToken(email) {
  let response = await fetch('https://api.kontestis.ac/api/auth/managed/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: process.env.KONTESTIS_PASSWORD
    })
  })
  let data = await response.json()
  return JSON.parse(data.data).json.token;
}

async function submitCode(email, day, language, code) {
  let token = await getToken(email)
  let response = await fetch('https://api.kontestis.ac/api/submission/' + problemIdByDay[day], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      code: btoa(code),
      language: language
    })
  })
  let data = await response.json()
  return JSON.stringify(data)
}

export async function POST(req) {
    const { user } = await getSession();
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }
    try {
      const { day, language, code } = await req.json();
      const response = await submitCode(user.name, day, language, code);
      if (response.error) {
        return new Response(
          JSON.stringify({ error: response.error }),
          { status: 400 }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Solution submitted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ error: 'Something went wrong' }),
        { status: 500 }
      );
    }
  }
  