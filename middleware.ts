import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname; // e.g., /dan/1

  // log to test
  console.log('middleware', pathname);

  // Match dynamic routes (e.g., /dan/1, /dan/2)
  const match = pathname.match(/^\/dan\/(\d+)$/);
  if (match) {
    const pageId = match[1];
    const eventDates: Record<string, string> = {
      1: '2025-01-20',
      2: '2025-01-21',
      3: '2025-01-22',
      4: '2025-01-23',
      5: '2025-01-24',
    };

    const eventDate = eventDates[pageId];
    if (eventDate) {
      const today = new Date();
      const allowedDate = new Date(eventDate);

      // Redirect if the date has not yet been reached
      if (today < allowedDate) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage or another page
      }
    }
  }

  return NextResponse.next(); // Allow access if no conditions are met
}
