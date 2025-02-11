// src/app/api/detect/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

class DetectionError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'DetectionError';
  }
}

function validateRequest(body: any) {
  if (!body.image) {
    throw new DetectionError('Image is required', 400, 'MISSING_IMAGE');
  }
  
  if (!body.fruit_type) {
    throw new DetectionError('Fruit type is required', 400, 'MISSING_FRUIT_TYPE');
  }
}

export async function POST(request: Request) {
  try {
    // Check Content-Type header
    const headersList = headers();
    const contentType = headersList.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new DetectionError('Content-Type must be application/json', 400, 'INVALID_CONTENT_TYPE');
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      throw new DetectionError('Invalid JSON payload', 400, 'INVALID_JSON');
    }

    // Validate request
    validateRequest(body);

    // Call detection API
    const response = await fetch(
      "https://aqfrxqb3nqkjuauzsk2lnfifty0kgngl.lambda-url.ap-southeast-1.on.aws/detect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: body.image,
          fruit_type: body.fruit_type,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new DetectionError(
        errorData.message || 'Detection service error',
        response.status,
        'DETECTION_ERROR'
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Detection error:', {
      message: error.message,
      code: error.errorCode,
    });

    if (error instanceof DetectionError) {
      return NextResponse.json({
        error: error.message,
        code: error.errorCode
      }, { 
        status: error.statusCode 
      });
    }

    return NextResponse.json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { 
      status: 500 
    });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Detection API is running' });
}