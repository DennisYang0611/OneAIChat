import { NextResponse } from 'next/server';

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      console.log(`Attempt ${i + 1} - Request details:`, {
        url,
        method: options.method,
        headers: options.headers,
        bodyPreview: options.body ? JSON.parse(options.body as string) : null
      });

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      console.log(`Response status: ${response.status}`);
      console.log(`Response headers:`, Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Request failed:`, {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          url: url
        });
        if (i === retries - 1) {
          throw new Error(`API request failed: ${response.status} ${errorData}`);
        }
      } else {
        return response;
      }
    } catch (error) {
      console.error(`Attempt ${i + 1} error:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('All retry attempts failed');
}

export async function POST(request: Request) {
  try {
    const { message, modelId, apiUrl, apiKey } = await request.json();

    if (!apiUrl || !apiKey) {
      throw new Error('API URL or key is missing');
    }

    const fullApiUrl = apiUrl.endsWith('/v1/chat/completions') 
      ? apiUrl 
      : `${apiUrl.replace(/\/$/, '')}/v1/chat/completions`;

    console.log('Making request to:', fullApiUrl);
    console.log('Using model:', modelId);

    const requestBody = {
      model: modelId,
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      stream: false
    };

    const response = await fetchWithRetry(
      fullApiUrl,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'Host': new URL(fullApiUrl).host
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 