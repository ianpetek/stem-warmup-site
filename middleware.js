import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge'; // Note the /edge import

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname; // e.g., /dan/1
  const res = new NextResponse();
  const session = await getSession(req, res);

  //const loggedIn = session !== null;
  const loggedIn = session !== null && session !== undefined;

  // Match dynamic routes (e.g., /dan/1, /dan/2)
  const match = pathname.match(/^\/dan\/(\d+)$/);
  if (match) {
    if(!loggedIn){
      return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }
    const pageId = match[1];
    const eventDates = {
      1: '2025-01-22',
      2: '2025-01-22',
      3: '2025-01-22',
      4: '2025-01-25',
      5: '2025-01-26',
    };

    const eventDate = eventDates[pageId];
    if (eventDate) {
      const today = new Date();
      const allowedDate = new Date(eventDate);

      // Redirect if the date has not yet been reached
      if (today < allowedDate) {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to homepage or another page
      }
    }
  }

  return NextResponse.next(); // Allow access if no conditions are met
}
