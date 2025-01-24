import path from 'path';
import fs from 'fs';

export async function GET(req, { params }) {
  const { slug } = params;

  // Map slugs to filenames
  const files = {
    web: 'web.zip',
    pwn: 'pwn.zip',
    crypto: 'crypto.zip',
  };

  // Check if the requested slug exists
  const fileName = files[slug];
  if (!fileName) {
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Construct the file path
  const filePath = path.join(process.cwd(), 'public', 'files', fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'File not found on server' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Serve the file as a download
  const fileStream = fs.createReadStream(filePath);

  return new Response(fileStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
