import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, modelId } = await request.json();

    // 这里实现您的模型API调用逻辑
    // 示例响应
    const response = {
      modelId,
      content: `Response from ${modelId}: ${message}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 