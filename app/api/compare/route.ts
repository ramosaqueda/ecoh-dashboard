import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { configureAWS } from '@/lib/aws-config';

export async function POST(req: NextRequest) {
  configureAWS();

  const formData = await req.formData();
  const file1 = formData.get('file1') as File | null;
  const file2 = formData.get('file2') as File | null;

  if (!file1 || !file2) {
    return NextResponse.json(
      { error: 'Se requieren dos archivos' },
      { status: 400 }
    );
  }

  const rekognition = new AWS.Rekognition();

  try {
    const params = {
      SourceImage: {
        Bytes: await file1.arrayBuffer()
      },
      TargetImage: {
        Bytes: await file2.arrayBuffer()
      }
    };

    const compareFacesResponse = await rekognition
      .compareFaces(params)
      .promise();

    const result = {
      similarity: compareFacesResponse.FaceMatches[0]?.Similarity || 0,
      matchingFaces: compareFacesResponse.FaceMatches.map((match) => ({
        confidence: match.Face.Confidence
      }))
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al comparar imágenes:', error);
    return NextResponse.json(
      { error: 'Error al procesar las imágenes' },
      { status: 500 }
    );
  }
}
