import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'resumes');

export async function POST(request: NextRequest) {
  try {
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const allowed = ['.pdf', '.doc', '.docx', '.txt', '.md', '.rtf'];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: `Invalid file type: ${ext}. Allowed: ${allowed.join(', ')}` }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(UPLOAD_DIR, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return NextResponse.json({
      id: timestamp.toString(),
      name: originalName,
      fileName: safeName,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!existsSync(UPLOAD_DIR)) {
      return NextResponse.json({ files: [] });
    }

    const { readdir, stat } = await import('fs/promises');
    const files = await readdir(UPLOAD_DIR);
    const filesWithMeta = await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(UPLOAD_DIR, fileName);
        const stats = await stat(filePath);
        const timestamp = parseInt(fileName.split('-')[0]!, 10);
        const originalName = fileName.substring(fileName.indexOf('-') + 1) || fileName;
        return {
          id: timestamp.toString(),
          name: originalName,
          fileName,
          size: stats.size,
          uploadedAt: stats.birthtime.toISOString(),
        };
      })
    );

    filesWithMeta.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

    return NextResponse.json({ files: filesWithMeta });
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'File id required' }, { status: 400 });
    }

    if (!existsSync(UPLOAD_DIR)) {
      return NextResponse.json({ error: 'No uploads directory' }, { status: 404 });
    }

    const { readdir, unlink } = await import('fs/promises');
    const files = await readdir(UPLOAD_DIR);
    const target = files.find((f) => f.startsWith(id));

    if (!target) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    await unlink(path.join(UPLOAD_DIR, target));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
