import fs from 'fs/promises';
import path from 'path';
import { getSession } from '@auth0/nextjs-auth0';

// Path to JSON file for storing user scores
const scoresFilePath = path.join("/root/stem-warmup-site/scores.json");

// Hardcoded flags for CTF problems
const FLAGS = {
  web: 'SUSFER{wish_you_were_not_here}',
  pwn: 'SUSFER{i_have_become_comfortably_numb_from_pwn}',
  crypto: 'SUSFER{ill_see_you_on_the_dark_side_of_crypto}',
};

// Helper to read scores from the file
const readScores = async () => {
  try {
    const data = await fs.readFile(scoresFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {}; // If file doesn't exist, return empty object
    }
    throw error;
  }
};

// Helper to write scores to the file
const writeScores = async (scores) => {
  await fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2), 'utf8');
};

// API Route Handler
export async function GET(req, { params }) {
  const { slug } = params;
  const scores = await readScores();

  // Assuming user session details are fetched
  const session = await getSession(req); // Mocked getSession
  const user = session?.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (slug) {
    // If slug is provided, return specific problem points
    const userPoints = scores[user.username]?.[slug] || 0;
    return new Response(JSON.stringify({ user: user.username, slug, points: userPoints }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Return all user points
  const userScores = scores[user.username] || {};
  return new Response(JSON.stringify({ user: user.username, scores: userScores }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req, { params }) {
  const { slug } = params;
  const { flag } = await req.json();
  const scores = await readScores();

  // Assuming user session details are fetched
  const session = await getSession(req); // Mocked getSession
  const user = session?.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (!FLAGS[slug]) {
    return new Response(JSON.stringify({ error: 'Invalid CTF problem' }), { status: 400 });
  }

  // Validate flag
  if (FLAGS[slug] !== flag) {
    return new Response(JSON.stringify({ error: 'Incorrect flag' }), { status: 400 });
  }

  // Award points (e.g., 100 points for correct flag)
  const points = 33;
  scores[user.username] = scores[user.username] || {};
  scores[user.username][slug] = points;

  // Save scores back to file
  await writeScores(scores);

  return new Response(
    JSON.stringify({ message: 'Correct flag!', user: user.username, slug, points }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
