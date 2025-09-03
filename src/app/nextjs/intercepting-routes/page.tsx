'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';
import { XMarkIcon, PhotoIcon, DocumentIcon, UserIcon } from '@heroicons/react/24/outline';

const codeExamples = {
  basicStructure: `// Estrutura para Intercepting Routes:
// app/
//   gallery/
//     page.tsx                    // Lista de fotos
//     [id]/
//       page.tsx                 // Página individual da foto
//     (.)[id]/
//       page.tsx                 // Modal interceptado
//   feed/
//     page.tsx                    // Feed principal
//     (..)gallery/
//       [id]/
//         page.tsx               // Intercepta de um nível acima
//   dashboard/
//     settings/
//       page.tsx                 // Página de configurações
//       (...)profile/
//         page.tsx               // Intercepta da raiz`,

  interceptingSyntax: `// Sintaxes de Intercepting Routes:

// (.) - Intercepta rotas no mesmo nível
// app/feed/(.)[id]/page.tsx intercepta app/feed/[id]/page.tsx

// (..) - Intercepta rotas um nível acima
// app/feed/(..)[id]/page.tsx intercepta app/[id]/page.tsx

// (...) - Intercepta rotas da raiz
// app/dashboard/(...)profile/page.tsx intercepta app/profile/page.tsx

// (..)(..) - Intercepta rotas dois níveis acima
// app/a/b/(..)(..)[id]/page.tsx intercepta app/[id]/page.tsx`,

  photoModal: `// app/gallery/(.)[id]/page.tsx - Modal de Foto
import { notFound } from 'next/navigation';
import Modal from '@/components/Modal';
import Image from 'next/image';

interface Photo {
  id: string;
  title: string;
  url: string;
  description: string;
}

async function getPhoto(id: string): Promise<Photo> {
  const res = await fetch(\`https://api.example.com/photos/\${id}\`);
  if (!res.ok) notFound();
  return res.json();
}

export default async function PhotoModal({ 
  params 
}: { 
  params: { id: string } 
}) {
  const photo = await getPhoto(params.id);
  
  return (
    <Modal>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Image
            src={photo.url}
            alt={photo.title}
            width={800}
            height={600}
            className="rounded-lg"
          />
          
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{photo.title}</h2>
            <p className="text-gray-600 mt-2">{photo.description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}`,

  modalComponent: `// components/Modal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);
  
  function onDismiss() {
    router.back();
  }
  
  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal backdrop:bg-black/50"
      onClose={onDismiss}
    >
      <div className="modal-content">
        <button
          onClick={onDismiss}
          className="close-button"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
}`,

  galleryPage: `// app/gallery/page.tsx - Lista de Fotos
import Link from 'next/link';
import Image from 'next/image';

interface Photo {
  id: string;
  title: string;
  thumbnail: string;
}

async function getPhotos(): Promise<Photo[]> {
  const res = await fetch('https://api.example.com/photos');
  return res.json();
}

export default async function GalleryPage() {
  const photos = await getPhotos();
  
  return (
    <div className="gallery">
      <h1>Galeria de Fotos</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={\`/gallery/\${photo.id}\`}
            className="photo-card"
          >
            <Image
              src={photo.thumbnail}
              alt={photo.title}
              width={300}
              height={200}
              className="rounded"
            />
            <h3>{photo.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}`,

  photoPage: `// app/gallery/[id]/page.tsx - Página Individual
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

async function getPhoto(id: string) {
  const res = await fetch(\`https://api.example.com/photos/\${id}\`);
  if (!res.ok) notFound();
  return res.json();
}

export default async function PhotoPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const photo = await getPhoto(params.id);
  
  return (
    <div className="photo-page">
      <Link href="/gallery" className="back-link">
        ← Voltar para Galeria
      </Link>
      
      <div className="photo-container">
        <Image
          src={photo.url}
          alt={photo.title}
          width={1200}
          height={800}
          className="main-photo"
        />
        
        <div className="photo-info">
          <h1>{photo.title}</h1>
          <p>{photo.description}</p>
          <div className="metadata">
            <span>Câmera: {photo.camera}</span>
            <span>Data: {photo.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  layoutWithModal: `// app/layout.tsx - Layout com Portal para Modal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
        <div id="modal-root" />
      </body>
    </html>
  );
}`,

  profileModal: `// app/dashboard/(...)profile/page.tsx
// Intercepta app/profile/page.tsx da raiz
import Modal from '@/components/Modal';
import { getCurrentUser } from '@/lib/auth';

export default async function ProfileModal() {
  const user = await getCurrentUser();
  
  return (
    <Modal>
      <div className="profile-modal">
        <h2>Perfil do Usuário</h2>
        
        <div className="user-info">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="avatar"
          />
          
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        </div>
        
        <div className="quick-actions">
          <button>Editar Perfil</button>
          <button>Configurações</button>
          <button>Logout</button>
        </div>
      </div>
    </Modal>
  );
}`,

  conditionalIntercepting: `// app/feed/(..)gallery/[id]/page.tsx
// Intercepta apenas quando vindo do feed
import { headers } from 'next/headers';
import Modal from '@/components/Modal';
import PhotoModal from '@/components/PhotoModal';
import { redirect } from 'next/navigation';

export default function InterceptedPhoto({ 
  params 
}: { 
  params: { id: string } 
}) {
  const headersList = headers();
  const referer = headersList.get('referer');
  
  // Se não veio do feed, redireciona para a página normal
  if (!referer?.includes('/feed')) {
    redirect(\`/gallery/\${params.id}\`);
  }
  
  return (
    <Modal>
      <PhotoModal id={params.id} />
    </Modal>
  );
}`,

  parallelWithIntercepting: `// Combinando Parallel Routes com Intercepting Routes:
// app/
//   dashboard/
//     layout.tsx
//     page.tsx
//     @modal/
//       (..)profile/
//         page.tsx              // Modal interceptado
//       default.tsx             // Slot vazio por padrão

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <div className="main-content">
        {children}
      </div>
      
      {/* Modal slot - renderizado quando interceptado */}
      {modal}
    </div>
  );
}

// app/dashboard/@modal/(..)profile/page.tsx
export default function ProfileModal() {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Perfil (Modal)</h2>
        {/* Conteúdo do modal */}
      </div>
    </div>
  );
}

// app/dashboard/@modal/default.tsx
export default function Default() {
  return null; // Slot vazio quando não há modal
}`
};

const interceptingTypes = [
  {
    syntax: '(.)',
    name: 'Mesmo Nível',
    description: 'Intercepta rotas no mesmo diretório',
    example: 'app/feed/(.)[id]/page.tsx',
    intercepts: 'app/feed/[id]/page.tsx',
    color: 'blue',
    useCase: 'Modais de detalhes no mesmo contexto'
  },
  {
    syntax: '(..)',
    name: 'Um Nível Acima',
    description: 'Intercepta rotas um diretório acima',
    example: 'app/feed/(..)[id]/page.tsx',
    intercepts: 'app/[id]/page.tsx',
    color: 'green',
    useCase: 'Modais que cruzam seções'
  },
  {
    syntax: '(...)',
    name: 'Da Raiz',
    description: 'Intercepta rotas a partir da raiz',
    example: 'app/dashboard/(...)profile/page.tsx',
    intercepts: 'app/profile/page.tsx',
    color: 'purple',
    useCase: 'Modais globais acessíveis de qualquer lugar'
  },
  {
    syntax: '(..)(..)',
    name: 'Dois Níveis Acima',
    description: 'Intercepta rotas dois diretórios acima',
    example: 'app/a/b/(..)(..)[id]/page.tsx',
    intercepts: 'app/[id]/page.tsx',
    color: 'orange',
    useCase: 'Interceptação em hierarquias profundas'
  }
];

function InterceptingDemo() {
  const [selectedType, setSelectedType] = useState('(.)');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const router = useRouter();

  const openModal = (type: string, content: string) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {interceptingTypes.map((type) => (
          <button
            key={type.syntax}
            onClick={() => setSelectedType(type.syntax)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === type.syntax
                ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-mono text-sm font-bold text-gray-800 dark:text-white">
              {type.syntax}
            </div>
            <div className="font-semibold text-gray-700 dark:text-gray-200 mt-1">
              {type.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {type.description}
            </div>
          </button>
        ))}
      </div>

      {/* Demonstração Visual */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Demonstração: {interceptingTypes.find(t => t.syntax === selectedType)?.name}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estrutura de Arquivos */}
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Estrutura:</h4>
            <div className="bg-white dark:bg-gray-700 p-4 rounded border font-mono text-sm">
              <div className="space-y-1">
                <div>app/</div>
                <div className="ml-4">gallery/</div>
                <div className="ml-8">page.tsx</div>
                <div className="ml-8">[id]/</div>
                <div className="ml-12">page.tsx</div>
                <div className={`ml-8 text-${interceptingTypes.find(t => t.syntax === selectedType)?.color}-600 dark:text-${interceptingTypes.find(t => t.syntax === selectedType)?.color}-400 font-bold`}>
                  {selectedType}[id]/
                </div>
                <div className={`ml-12 text-${interceptingTypes.find(t => t.syntax === selectedType)?.color}-600 dark:text-${interceptingTypes.find(t => t.syntax === selectedType)?.color}-400 font-bold`}>
                  page.tsx ← Intercepta
                </div>
              </div>
            </div>
          </div>
          
          {/* Simulação */}
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Simulação:</h4>
            <div className="space-y-3">
              <button
                onClick={() => openModal(selectedType, 'Foto 1')}
                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Abrir Foto (Modal)
              </button>
              
              <button
                onClick={() => window.open('/gallery/1', '_blank')}
                className="w-full p-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Abrir Foto (Página)
              </button>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Caso de uso:</strong> {interceptingTypes.find(t => t.syntax === selectedType)?.useCase}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Simulado */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Modal Interceptado
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <PhotoIcon className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {modalContent}
                </p>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Interceptado por:</strong> {selectedType}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    window.open('/gallery/1', '_blank');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Ver Página
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UseCasesDemo() {
  const [activeUseCase, setActiveUseCase] = useState('gallery');
  
  const useCases = [
    {
      id: 'gallery',
      title: 'Galeria de Fotos',
      description: 'Modal para visualizar fotos sem sair da galeria',
      icon: <PhotoIcon className="h-6 w-6" />,
      route: 'app/gallery/(.)[id]/page.tsx',
      color: 'blue'
    },
    {
      id: 'profile',
      title: 'Perfil de Usuário',
      description: 'Modal de perfil acessível de qualquer página',
      icon: <UserIcon className="h-6 w-6" />,
      route: 'app/dashboard/(...)profile/page.tsx',
      color: 'green'
    },
    {
      id: 'document',
      title: 'Visualizador de Documentos',
      description: 'Preview de documentos em modal',
      icon: <DocumentIcon className="h-6 w-6" />,
      route: 'app/docs/(..)preview/[id]/page.tsx',
      color: 'purple'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {useCases.map((useCase) => (
          <button
            key={useCase.id}
            onClick={() => setActiveUseCase(useCase.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeUseCase === useCase.id
                ? `border-${useCase.color}-500 bg-${useCase.color}-50 dark:bg-${useCase.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`text-${useCase.color}-500`}>
                {useCase.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {useCase.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {useCase.description}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {useCase.route}
            </code>
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Caso de Uso: {useCases.find(u => u.id === activeUseCase)?.title}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Comportamento:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {activeUseCase === 'gallery' && (
                <>
                  <li>• Clique na foto abre modal</li>
                  <li>• URL muda para /gallery/[id]</li>
                  <li>• Refresh carrega página completa</li>
                  <li>• Voltar fecha o modal</li>
                </>
              )}
              {activeUseCase === 'profile' && (
                <>
                  <li>• Acessível de qualquer página</li>
                  <li>• Modal sobrepõe conteúdo atual</li>
                  <li>• Mantém contexto da página</li>
                  <li>• Ações rápidas disponíveis</li>
                </>
              )}
              {activeUseCase === 'document' && (
                <>
                  <li>• Preview sem sair da lista</li>
                  <li>• Carregamento otimizado</li>
                  <li>• Navegação entre documentos</li>
                  <li>• Download direto do modal</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Vantagens:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Melhor UX com transições suaves</li>
              <li>• Mantém estado da página anterior</li>
              <li>• URLs compartilháveis</li>
              <li>• Fallback para página completa</li>
              <li>• SEO friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterceptingRoutesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Intercepting Routes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Intercepte rotas para criar modais e overlays com a sintaxe (.)folder
          </p>
        </div>

        <div className="space-y-12">
          {/* Tipos de Intercepting */}
          <DemoSection
            title="Tipos de Intercepting Routes"
            description="Entenda as diferentes sintaxes e quando usar cada uma"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {interceptingTypes.map((type) => (
                <div key={type.syntax} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {type.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Sintaxe:</div>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {type.syntax}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Exemplo:</div>
                      <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                        {type.example}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Intercepta:</div>
                      <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                        {type.intercepts}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Uso:</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {type.useCase}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DemoSection>

          {/* Demo Interativo */}
          <DemoSection
            title="Demonstração Interativa"
            description="Experimente diferentes tipos de intercepting routes"
          >
            <InterceptingDemo />
          </DemoSection>

          {/* Casos de Uso */}
          <DemoSection
            title="Casos de Uso Comuns"
            description="Exemplos práticos de quando usar intercepting routes"
          >
            <UseCasesDemo />
          </DemoSection>

          {/* Estrutura Básica */}
          <DemoSection
            title="Estrutura de Arquivos"
            description="Como organizar arquivos para intercepting routes"
          >
            <CodeBlock
              code={codeExamples.basicStructure}
              language="text"
              filename="Estrutura de Pastas"
            />
          </DemoSection>

          {/* Sintaxes */}
          <DemoSection
            title="Sintaxes de Intercepting"
            description="Todas as formas de interceptar rotas"
          >
            <CodeBlock
              code={codeExamples.interceptingSyntax}
              language="text"
              filename="Sintaxes Disponíveis"
            />
          </DemoSection>

          {/* Modal Component */}
          <DemoSection
            title="Componente Modal"
            description="Base para criar modais reutilizáveis"
          >
            <CodeBlock
              code={codeExamples.modalComponent}
              language="typescript"
              filename="components/Modal.tsx"
            />
          </DemoSection>

          {/* Photo Modal */}
          <DemoSection
            title="Modal de Foto"
            description="Exemplo de modal interceptado para galeria"
          >
            <CodeBlock
              code={codeExamples.photoModal}
              language="typescript"
              filename="app/gallery/(.)[id]/page.tsx"
            />
          </DemoSection>

          {/* Gallery Page */}
          <DemoSection
            title="Página da Galeria"
            description="Lista de fotos que podem ser interceptadas"
          >
            <CodeBlock
              code={codeExamples.galleryPage}
              language="typescript"
              filename="app/gallery/page.tsx"
            />
          </DemoSection>

          {/* Photo Page */}
          <DemoSection
            title="Página Individual"
            description="Página completa quando não interceptada"
          >
            <CodeBlock
              code={codeExamples.photoPage}
              language="typescript"
              filename="app/gallery/[id]/page.tsx"
            />
          </DemoSection>

          {/* Layout with Modal */}
          <DemoSection
            title="Layout com Portal"
            description="Configuração necessária para modais"
          >
            <CodeBlock
              code={codeExamples.layoutWithModal}
              language="typescript"
              filename="app/layout.tsx"
            />
          </DemoSection>

          {/* Profile Modal */}
          <DemoSection
            title="Modal Global"
            description="Modal acessível de qualquer página"
          >
            <CodeBlock
              code={codeExamples.profileModal}
              language="typescript"
              filename="app/dashboard/(...)profile/page.tsx"
            />
          </DemoSection>

          {/* Conditional Intercepting */}
          <DemoSection
            title="Intercepting Condicional"
            description="Interceptar apenas em certas condições"
          >
            <CodeBlock
              code={codeExamples.conditionalIntercepting}
              language="typescript"
              filename="app/feed/(..)gallery/[id]/page.tsx"
            />
          </DemoSection>

          {/* Parallel + Intercepting */}
          <DemoSection
            title="Parallel + Intercepting Routes"
            description="Combine ambas as técnicas para layouts avançados"
          >
            <CodeBlock
              code={codeExamples.parallelWithIntercepting}
              language="typescript"
              filename="Combinação Avançada"
            />
          </DemoSection>

          {/* Links de Navegação */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/nextjs/parallel-routes"
              className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors"
            >
              <span>← Parallel Routes</span>
            </Link>
            
            <Link
              href="/nextjs"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Voltar ao Next.js
            </Link>
            
            <Link
              href="/nextjs/loading-ui"
              className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors"
            >
              <span>Loading UI →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}