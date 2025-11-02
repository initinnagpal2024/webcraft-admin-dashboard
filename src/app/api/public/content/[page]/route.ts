import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  try {
    // Set CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    const content = await getContent();
    
    // Filter by page and active status
    let pageContent = content.filter(
      item => item.page === params.page && item.status === 'active'
    );
    
    // Filter by section if specified
    if (section) {
      pageContent = pageContent.filter(item => item.section === section);
    }
    
    return NextResponse.json(pageContent, { headers });
  } catch (error) {
    console.error('Failed to fetch page content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page content' }, 
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