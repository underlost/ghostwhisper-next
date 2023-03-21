import type { NextRequest } from 'next/server';
import glimpse from '@haydenbleasel/glimpse/server';

const headers = {
  'content-type': 'application/json',
  'Cache-Control': 's-maxage=86400',
};

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { url } = (await req.json()) as { url?: string };

  if (!url) {
    return new Response(JSON.stringify({}), { status: 400, headers });
  }

  try {
    const data = await glimpse(url);

    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({}), { status: 500, headers });
  }
};

export default handler;