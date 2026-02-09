import fs from 'node:fs/promises';
import path from 'node:path';

export const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'src/data/bookings.json');
    const publicPath = path.join(process.cwd(), 'public/data/bookings.json');
    
    // Validate data structure roughly
    if (!data.bookings || !data.pricing) {
      return new Response(JSON.stringify({ error: 'Invalid data structure' }), { status: 400 });
    }

    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content);
    
    try {
      await fs.writeFile(publicPath, content);
    } catch (e) {
      console.warn('Could not update public/data/bookings.json, but src/data was updated');
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 500 });
  }
};
