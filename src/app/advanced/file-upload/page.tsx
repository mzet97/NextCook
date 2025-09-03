'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Cloud, 
  Image, 
  File,
  Video,
  Music,
  FileText,
  Archive,
  X,
  Check,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Copy,
  Share,
  Settings,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { DemoCard } from '@/components/DemoCard';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import { CodeBlock } from '@/components/CodeBlock';

const uploadFeatures = [
  {
    title: 'Cloudinary',
    description: 'Plataforma completa para mídia na nuvem',
    icon: Cloud,
    color: 'text-blue-500',
    benefits: ['Auto Optimization', 'Image Transformations', 'Video Processing', 'CDN Global']
  },
  {
    title: 'AWS S3',
    description: 'Armazenamento escalável e seguro',
    icon: Archive,
    color: 'text-orange-500',
    benefits: ['Unlimited Storage', 'High Durability', 'Security Features', 'Cost Effective']
  },
  {
    title: 'Drag & Drop',
    description: 'Interface intuitiva para upload',
    icon: Upload,
    color: 'text-green-500',
    benefits: ['User Friendly', 'Multiple Files', 'Progress Tracking', 'Error Handling']
  },
  {
    title: 'File Processing',
    description: 'Processamento automático de arquivos',
    icon: Zap,
    color: 'text-purple-500',
    benefits: ['Auto Resize', 'Format Conversion', 'Compression', 'Metadata Extraction']
  }
];

const fileTypes = [
  { type: 'image', icon: Image, color: 'text-green-500', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'] },
  { type: 'video', icon: Video, color: 'text-red-500', extensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'] },
  { type: 'audio', icon: Music, color: 'text-purple-500', extensions: ['mp3', 'wav', 'ogg', 'aac', 'flac'] },
  { type: 'document', icon: FileText, color: 'text-blue-500', extensions: ['pdf', 'doc', 'docx', 'txt', 'rtf'] },
  { type: 'archive', icon: Archive, color: 'text-yellow-500', extensions: ['zip', 'rar', '7z', 'tar', 'gz'] },
  { type: 'other', icon: File, color: 'text-gray-500', extensions: ['*'] }
];

const configurationExamples = [
  {
    name: 'Cloudinary Setup',
    description: 'Configuração e uso do Cloudinary',
    files: [
      {
        name: 'lib/cloudinary.ts',
        content: `import { v2 as cloudinary } from 'cloudinary'

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export interface UploadOptions {
  folder?: string
  transformation?: Record<string, unknown>[]
  resource_type?: 'image' | 'video' | 'raw' | 'auto'
  public_id?: string
  overwrite?: boolean
  tags?: string[]
}

export interface UploadResult {
  public_id: string
  secure_url: string
  url: string
  format: string
  resource_type: string
  bytes: number
  width?: number
  height?: number
  created_at: string
}

// Upload de arquivo para Cloudinary
export async function uploadToCloudinary(
  file: File | Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: options.folder || 'uploads',
      resource_type: options.resource_type || 'auto',
      transformation: options.transformation,
      public_id: options.public_id,
      overwrite: options.overwrite || false,
      tags: options.tags || [],
      // Otimizações automáticas
      quality: 'auto',
      fetch_format: 'auto'
    })

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      created_at: result.created_at
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload to Cloudinary')
  }
}

// Deletar arquivo do Cloudinary
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ result: string }> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    })
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete from Cloudinary')
  }
}

// Gerar URL com transformações
export function generateCloudinaryUrl(
  publicId: string,
  transformations: Record<string, unknown>[] = []
): string {
  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true
  })
}

// Transformações comuns
export const commonTransformations = {
  thumbnail: [
    { width: 150, height: 150, crop: 'fill' },
    { quality: 'auto', fetch_format: 'auto' }
  ],
  medium: [
    { width: 500, height: 500, crop: 'limit' },
    { quality: 'auto', fetch_format: 'auto' }
  ],
  large: [
    { width: 1200, height: 1200, crop: 'limit' },
    { quality: 'auto', fetch_format: 'auto' }
  ],
  avatar: [
    { width: 200, height: 200, crop: 'fill', gravity: 'face' },
    { radius: 'max' },
    { quality: 'auto', fetch_format: 'auto' }
  ]
}

export default cloudinary`
      },
      {
        name: 'api/upload/cloudinary/route.ts',
        content: `import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const tags = formData.get('tags') as string
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 400 }
      )
    }

    // Validar tamanho (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Max size is 5MB' },
        { status: 400 }
      )
    }

    // Converter arquivo para base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = \`data:\${file.type};base64,\${buffer.toString('base64')}\`

    // Upload para Cloudinary
    const result = await uploadToCloudinary(base64, {
      folder,
      tags: tags ? tags.split(',') : [],
      resource_type: 'auto'
    })

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')
    const resourceType = searchParams.get('resourceType') as 'image' | 'video' | 'raw'

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      )
    }

    const result = await deleteFromCloudinary(publicId, resourceType)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}`
      },
      {
        name: 'components/CloudinaryUpload.tsx',
        content: `'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Check, AlertCircle, Image } from 'lucide-react'
import { generateCloudinaryUrl, commonTransformations } from '@/lib/cloudinary'

interface UploadedFile {
  public_id: string
  secure_url: string
  format: string
  bytes: number
  width?: number
  height?: number
}

interface CloudinaryUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void
  maxFiles?: number
  folder?: string
  tags?: string[]
}

export function CloudinaryUpload({
  onUploadComplete,
  maxFiles = 5,
  folder = 'uploads',
  tags = []
}: CloudinaryUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setError(null)

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)
        formData.append('tags', tags.join(','))

        const response = await fetch('/api/upload/cloudinary', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Upload failed')
        }

        const result = await response.json()
        return result.data
      })

      const results = await Promise.all(uploadPromises)
      setUploadedFiles(prev => [...prev, ...results])
      onUploadComplete?.(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [folder, tags, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles,
    disabled: uploading
  })

  const removeFile = async (publicId: string) => {
    try {
      const response = await fetch(
        \`/api/upload/cloudinary?publicId=\${publicId}&resourceType=image\`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setUploadedFiles(prev => prev.filter(file => file.public_id !== publicId))
      }
    } catch (err) {
      console.error('Failed to delete file:', err)
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={\`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors \${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        } \${uploading ? 'opacity-50 cursor-not-allowed' : ''}\`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Suporte para JPEG, PNG, GIF, WebP (máx. 5MB cada)
        </p>
        {uploading && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-blue-600 mt-2">Enviando...</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Arquivos Enviados ({uploadedFiles.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.public_id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={generateCloudinaryUrl(file.public_id, commonTransformations.medium)}
                    alt="Uploaded file"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFile(file.public_id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.format.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.bytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  {file.width && file.height && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {file.width} × {file.height}
                    </div>
                  )}
                  <div className="mt-2 flex space-x-2">
                    <a
                      href={file.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                    >
                      Ver Original
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(file.secure_url)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Copiar URL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}`
      }
    ]
  },
  {
    name: 'AWS S3 Setup',
    description: 'Configuração e uso do AWS S3',
    files: [
      {
        name: 'lib/aws-s3.ts',
        content: `import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Configuração do cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!

export interface S3UploadOptions {
  key: string
  contentType: string
  metadata?: Record<string, string>
  tags?: Record<string, string>
  acl?: 'private' | 'public-read' | 'public-read-write'
}

export interface S3UploadResult {
  key: string
  url: string
  bucket: string
  etag: string
  size: number
}

// Upload de arquivo para S3
export async function uploadToS3(
  file: Buffer,
  options: S3UploadOptions
): Promise<S3UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: options.key,
      Body: file,
      ContentType: options.contentType,
      Metadata: options.metadata,
      Tagging: options.tags ? Object.entries(options.tags)
        .map(([key, value]) => \`\${key}=\${value}\`)
        .join('&') : undefined,
      ACL: options.acl || 'private'
    })

    const result = await s3Client.send(command)
    
    const url = \`https://\${BUCKET_NAME}.s3.\${process.env.AWS_REGION}.amazonaws.com/\${options.key}\`

    return {
      key: options.key,
      url,
      bucket: BUCKET_NAME,
      etag: result.ETag || '',
      size: file.length
    }
  } catch (error) {
    console.error('S3 upload error:', error)
    throw new Error('Failed to upload to S3')
  }
}

// Deletar arquivo do S3
export async function deleteFromS3(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })

    await s3Client.send(command)
  } catch (error) {
    console.error('S3 delete error:', error)
    throw new Error('Failed to delete from S3')
  }
}

// Gerar URL assinada para acesso temporário
export async function generateSignedUrl(
  key: string,
  expiresIn: number = 3600 // 1 hora
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn
    })

    return signedUrl
  } catch (error) {
    console.error('S3 signed URL error:', error)
    throw new Error('Failed to generate signed URL')
  }
}

// Gerar chave única para arquivo
export function generateFileKey(
  originalName: string,
  folder: string = 'uploads'
): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '')
  
  return \`\${folder}/\${timestamp}-\${randomString}-\${nameWithoutExtension}.\${extension}\`
}

// Validar tipo de arquivo
export function validateFileType(
  contentType: string,
  allowedTypes: string[]
): boolean {
  return allowedTypes.includes(contentType)
}

// Validar tamanho do arquivo
export function validateFileSize(
  size: number,
  maxSize: number
): boolean {
  return size <= maxSize
}

export { s3Client }`
      },
      {
        name: 'api/upload/s3/route.ts',
        content: `import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3, generateFileKey, validateFileType, validateFileSize } from '@/lib/aws-s3'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/plain'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const isPublic = formData.get('public') === 'true'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    if (!validateFileType(file.type, ALLOWED_TYPES)) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 400 }
      )
    }

    // Validar tamanho
    if (!validateFileSize(file.size, MAX_FILE_SIZE)) {
      return NextResponse.json(
        { error: 'File too large. Max size is 10MB' },
        { status: 400 }
      )
    }

    // Converter arquivo para buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gerar chave única
    const key = generateFileKey(file.name, folder)

    // Upload para S3
    const result = await uploadToS3(buffer, {
      key,
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      },
      tags: {
        source: 'web-upload',
        folder
      },
      acl: isPublic ? 'public-read' : 'private'
    })

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        originalName: file.name,
        contentType: file.type
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      )
    }

    await deleteFromS3(key)

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}`
      },
      {
        name: 'hooks/useFileUpload.ts',
        content: `import { useState, useCallback } from 'react'

interface UploadProgress {
  [key: string]: number
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  key?: string
  public_id?: string
}

interface UseFileUploadOptions {
  endpoint: string
  maxFiles?: number
  maxFileSize?: number
  allowedTypes?: string[]
  onUploadComplete?: (files: UploadedFile[]) => void
  onUploadError?: (error: string) => void
}

export function useFileUpload(options: UseFileUploadOptions) {
  const {
    endpoint,
    maxFiles = 5,
    maxFileSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/*'],
    onUploadComplete,
    onUploadError
  } = options

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress>({})
  const [error, setError] = useState<string | null>(null)

  const validateFile = useCallback((file: File): string | null => {
    // Validar tamanho
    if (file.size > maxFileSize) {
      return \`File \"\${file.name}\" is too large. Max size is \${(maxFileSize / 1024 / 1024).toFixed(1)}MB\`
    }

    // Validar tipo
    const isValidType = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        const baseType = type.replace('/*', '')
        return file.type.startsWith(baseType)
      }
      return file.type === type
    })

    if (!isValidType) {
      return \`File type \"\${file.type}\" is not allowed\`
    }

    return null
  }, [maxFileSize, allowedTypes])

  const uploadFiles = useCallback(async (filesToUpload: File[]) => {
    if (files.length + filesToUpload.length > maxFiles) {
      const errorMsg = \`Cannot upload more than \${maxFiles} files\`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Validar todos os arquivos
    for (const file of filesToUpload) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        onUploadError?.(validationError)
        return
      }
    }

    setUploading(true)
    setError(null)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const fileId = \`\${Date.now()}-\${Math.random()}\`
        
        // Simular progresso
        const updateProgress = (percent: number) => {
          setProgress(prev => ({ ...prev, [fileId]: percent }))
        }

        updateProgress(0)

        const formData = new FormData()
        formData.append('file', file)

        // Simular progresso durante upload
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const currentProgress = prev[fileId] || 0
            if (currentProgress < 90) {
              return { ...prev, [fileId]: currentProgress + 10 }
            }
            return prev
          })
        }, 200)

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          })

          clearInterval(progressInterval)

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Upload failed')
          }

          const result = await response.json()
          updateProgress(100)

          return {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            url: result.data.secure_url || result.data.url,
            key: result.data.key,
            public_id: result.data.public_id
          }
        } catch (error) {
          clearInterval(progressInterval)
          throw error
        }
      })

      const results = await Promise.all(uploadPromises)
      setFiles(prev => [...prev, ...results])
      onUploadComplete?.(results)
      
      // Limpar progresso após um tempo
      setTimeout(() => {
        setProgress({})
      }, 1000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMsg)
      onUploadError?.(errorMsg)
    } finally {
      setUploading(false)
    }
  }, [files.length, maxFiles, validateFile, endpoint, onUploadComplete, onUploadError])

  const removeFile = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId)
    if (!file) return

    try {
      // Tentar deletar do servidor
      if (file.key) {
        await fetch(\`\${endpoint}?key=\${file.key}\`, { method: 'DELETE' })
      } else if (file.public_id) {
        await fetch(\`\${endpoint}?publicId=\${file.public_id}\`, { method: 'DELETE' })
      }
    } catch (error) {
      console.error('Failed to delete file from server:', error)
    }

    setFiles(prev => prev.filter(f => f.id !== fileId))
  }, [files, endpoint])

  const clearFiles = useCallback(() => {
    setFiles([])
    setProgress({})
    setError(null)
  }, [])

  return {
    files,
    uploading,
    progress,
    error,
    uploadFiles,
    removeFile,
    clearFiles
  }
}`
      }
    ]
  }
];

export default function FileUploadPage() {
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedFile, setSelectedFile] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Demo upload functionality
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simular upload
    newFiles.forEach(fileData => {
      simulateUpload(fileData.id);
    });
  };

  const simulateUpload = (fileId: number) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + 10, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'uploading'
            };
          }
          return file;
        })
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    if (type.includes('zip') || type.includes('archive')) return Archive;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl text-white mr-4">
              <Upload className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              File Upload
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Implemente upload de arquivos com Cloudinary, AWS S3 e outras soluções. 
            Suporte para drag & drop, progress tracking e otimização automática.
          </p>
        </motion.div>

        {/* Features */}
        <DemoSection title="Recursos Principais" description="Funcionalidades para upload e gerenciamento de arquivos">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {uploadFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <DemoCardStatic title={feature.title} description={feature.description}>
                    <div className="space-y-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                      <div className="space-y-2">
                        {feature.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DemoCardStatic>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        {/* File Types */}
        <DemoSection title="Tipos de Arquivo Suportados" description="Diferentes formatos e suas características">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fileTypes.map((fileType) => {
              const Icon = fileType.icon;
              return (
                <div key={fileType.type} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Icon className={`h-8 w-8 ${fileType.color} mr-3`} />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {fileType.type}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Extensões suportadas:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {fileType.extensions.map((ext) => (
                        <span
                          key={ext}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {ext}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DemoSection>

        {/* Interactive Demo */}
        <DemoSection title="Demo Interativo" description="Teste o upload de arquivos">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Upload de Arquivos
                </h3>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {dragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Suporte para imagens, vídeos, documentos e mais
                  </p>
                </div>
              </div>
              
              {/* File List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Arquivos ({uploadedFiles.length})
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Nenhum arquivo selecionado
                    </div>
                  ) : (
                    uploadedFiles.map((file) => {
                      const FileIcon = getFileIcon(file.type);
                      return (
                        <div key={file.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <FileIcon className="h-8 w-8 text-gray-500 mr-3 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file.name}
                              </p>
                              <button
                                onClick={() => removeFile(file.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatFileSize(file.size)}
                              </span>
                              <div className="flex items-center space-x-2">
                                {file.status === 'uploading' && (
                                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                                    <div 
                                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                      style={{ width: `${file.progress}%` }}
                                    ></div>
                                  </div>
                                )}
                                {file.status === 'completed' && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {file.status === 'uploading' ? `${file.progress}%` : 'Concluído'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Configuration Examples */}
        <DemoSection title="Implementação" description="Código para implementar upload de arquivos">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {configurationExamples.map((config, index) => (
                  <button
                    key={config.name}
                    onClick={() => setSelectedConfig(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedConfig === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {config.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {configurationExamples[selectedConfig].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {configurationExamples[selectedConfig].description}
                </p>
              </div>
              
              {/* File Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4">
                  {configurationExamples[selectedConfig].files.map((file, index) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(index)}
                      className={`py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                        selectedFile === index
                          ? 'border-green-500 text-green-600 dark:text-green-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              <CodeBlock
                language="typescript"
                code={configurationExamples[selectedConfig].files[selectedFile].content}
              />
            </div>
          </div>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para implementar upload de arquivos">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-500" />
                  Segurança
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Valide tipos de arquivo</li>
                  <li>• Limite tamanho de upload</li>
                  <li>• Sanitize nomes de arquivo</li>
                  <li>• Use antivírus scanning</li>
                  <li>• Implemente rate limiting</li>
                  <li>• Use HTTPS sempre</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Performance
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use upload progressivo</li>
                  <li>• Implemente chunked upload</li>
                  <li>• Otimize imagens automaticamente</li>
                  <li>• Use CDN para delivery</li>
                  <li>• Implemente lazy loading</li>
                  <li>• Cache arquivos estáticos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-500" />
                  Experiência do Usuário
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Forneça feedback visual</li>
                  <li>• Suporte drag & drop</li>
                  <li>• Mostre progresso de upload</li>
                  <li>• Permita cancelar uploads</li>
                  <li>• Trate erros gracefully</li>
                  <li>• Preview de arquivos</li>
                </ul>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}