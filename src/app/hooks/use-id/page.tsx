'use client';

import { useId, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import DemoSection from '@/components/DemoSection';

// Componente de formulário usando useId
function FormWithUseId() {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const termsId = useId();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome Completo
        </label>
        <input
          id={nameId}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          aria-describedby={`${nameId}-help`}
        />
        <p id={`${nameId}-help`} className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Digite seu nome completo
        </p>
      </div>

      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          aria-describedby={`${emailId}-help`}
        />
        <p id={`${emailId}-help`} className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Será usado para login
        </p>
      </div>

      <div>
        <label htmlFor={passwordId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Senha
        </label>
        <input
          id={passwordId}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          aria-describedby={`${passwordId}-help`}
        />
        <p id={`${passwordId}-help`} className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Mínimo 8 caracteres
        </p>
      </div>

      <div>
        <label htmlFor={confirmPasswordId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirmar Senha
        </label>
        <input
          id={confirmPasswordId}
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id={termsId}
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
          className="mt-1"
        />
        <label htmlFor={termsId} className="text-sm text-gray-700 dark:text-gray-300">
          Aceito os termos e condições de uso
        </label>
      </div>

      <div className="pt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IDs gerados:</h4>
        <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
          <p>Nome: {nameId}</p>
          <p>Email: {emailId}</p>
          <p>Senha: {passwordId}</p>
          <p>Confirmar: {confirmPasswordId}</p>
          <p>Termos: {termsId}</p>
        </div>
      </div>
    </form>
  );
}

// Componente de lista com múltiplos itens
function ListWithUseId() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [newItem, setNewItem] = useState('');
  
  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Novo item"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Adicionar
        </button>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const itemId = useId();
          const descriptionId = useId();
          
          return (
            <div key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <label htmlFor={itemId} className="text-gray-800 dark:text-gray-200">
                  {item}
                </label>
                <input
                  id={itemId}
                  type="checkbox"
                  aria-describedby={descriptionId}
                />
              </div>
              <p id={descriptionId} className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ID: {itemId}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente de modal com useId
function ModalWithUseId() {
  const [isOpen, setIsOpen] = useState(false);
  const modalId = useId();
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Abrir Modal
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        id={modalId}
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 id={titleId} className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Modal com useId
        </h2>
        <p id={descriptionId} className="text-gray-600 dark:text-gray-300 mb-6">
          Este modal usa IDs únicos gerados pelo useId para acessibilidade.
        </p>
        
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Modal ID:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{modalId}</code>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Title ID:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{titleId}</code>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Description ID:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{descriptionId}</code>
          </p>
        </div>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de tabs com useId
function TabsWithUseId() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsId = useId();
  
  const tabs = [
    { label: 'Perfil', content: 'Informações do perfil do usuário' },
    { label: 'Configurações', content: 'Configurações da aplicação' },
    { label: 'Notificações', content: 'Gerenciar notificações' }
  ];

  return (
    <div className="space-y-4">
      <div role="tablist" aria-labelledby={`${tabsId}-label`}>
        <h3 id={`${tabsId}-label`} className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Navegação por Tabs
        </h3>
        <div className="flex border-b border-gray-300 dark:border-gray-600">
          {tabs.map((tab, index) => {
            const tabId = `${tabsId}-tab-${index}`;
            const panelId = `${tabsId}-panel-${index}`;
            
            return (
              <button
                key={index}
                id={tabId}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={panelId}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === index
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {tabs.map((tab, index) => {
        const tabId = `${tabsId}-tab-${index}`;
        const panelId = `${tabsId}-panel-${index}`;
        
        return (
          <div
            key={index}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={activeTab !== index}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <p className="text-gray-800 dark:text-gray-200 mb-2">{tab.content}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Panel ID: {panelId}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function UseIdPage() {
  const pageId = useId();
  
  const codeExample = `import { useId } from 'react';

function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  
  return (
    <form>
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input 
          id={emailId}
          type="email" 
          aria-describedby={\`\${emailId}-help\`}
        />
        <p id={\`\${emailId}-help\`}>
          Digite seu email
        </p>
      </div>
      
      <div>
        <label htmlFor={passwordId}>Senha:</label>
        <input 
          id={passwordId}
          type="password"
        />
      </div>
    </form>
  );
}

// Para múltiplas instâncias
function FormField({ label, type = 'text' }) {
  const fieldId = useId();
  
  return (
    <div>
      <label htmlFor={fieldId}>{label}:</label>
      <input id={fieldId} type={type} />
    </div>
  );
}

// Uso em listas
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => {
        const itemId = useId();
        return (
          <li key={index}>
            <input id={itemId} type="checkbox" />
            <label htmlFor={itemId}>{item}</label>
          </li>
        );
      })}
    </ul>
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            useId Hook
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hook do React 18 para gerar IDs únicos estáveis, essencial para acessibilidade e associação de elementos HTML.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ID desta página: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{pageId}</code>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Formulário com Labels">
            <FormWithUseId />
          </DemoSection>

          <DemoSection title="Lista Dinâmica">
            <ListWithUseId />
          </DemoSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mb-12">
          <DemoSection title="Tabs com Acessibilidade">
            <TabsWithUseId />
          </DemoSection>

          <DemoSection title="Modal Acessível">
            <ModalWithUseId />
          </DemoSection>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Exemplo de Código</h2>
          <CodeBlock code={codeExample} language="tsx" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Por que usar useId?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Problemas sem useId:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• IDs hardcodados podem conflitar</li>
                  <li>• Math.random() não é estável (SSR)</li>
                  <li>• Múltiplas instâncias do componente</li>
                  <li>• Problemas de hidratação</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefícios do useId:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• IDs únicos garantidos</li>
                  <li>• Estável entre servidor e cliente</li>
                  <li>• Compatível com SSR</li>
                  <li>• Melhora acessibilidade</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Casos de Uso</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Acessibilidade:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <code>htmlFor</code> e <code>id</code> em labels</li>
                  <li>• <code>aria-describedby</code></li>
                  <li>• <code>aria-labelledby</code></li>
                  <li>• <code>aria-controls</code></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Componentes:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Formulários e inputs</li>
                  <li>• Modais e dialogs</li>
                  <li>• Tabs e accordions</li>
                  <li>• Tooltips e popovers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎯 Melhores Práticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">✅ Faça:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use para associar labels com inputs</li>
                <li>• Combine com aria-* attributes</li>
                <li>• Use em componentes reutilizáveis</li>
                <li>• Prefixe IDs para contexto</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">❌ Não faça:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Use como key em listas</li>
                <li>• Use para CSS styling</li>
                <li>• Assuma formato específico do ID</li>
                <li>• Use para lógica de negócio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}