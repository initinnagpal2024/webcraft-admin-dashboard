import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Set CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const content = await getContent();
    
    // Filter only active content for public API
    let activeContent = content.filter(item => item.status === 'active');
    
    // Filter by page if specified
    if (page) {
      activeContent = activeContent.filter(item => item.page === page);
    }
    
    // Filter by section if specified
    if (section) {
      activeContent = activeContent.filter(item => item.section === section);
    }
    
    return NextResponse.json(activeContent, { headers });
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' }, 
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}