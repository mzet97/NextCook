'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Database,
  Users,
  FileText,
  Settings,
  Zap,
  Globe
} from 'lucide-react';
import { DemoCardStatic } from '@/components/DemoCardStatic';
import { DemoSection } from '@/components/DemoSection';
import Breadcrumbs from '@/components/Breadcrumbs';

const securityFeatures = [
  {
    title: 'Autenticação',
    description: 'Verificação de identidade de usuários',
    icon: Key,
    color: 'text-blue-500',
    benefits: ['Multi-factor Auth', 'Password Policies', 'Session Management', 'Token-based Auth']
  },
  {
    title: 'Autorização',
    description: 'Controle de acesso baseado em permissões',
    icon: Shield,
    color: 'text-green-500',
    benefits: ['Role-based Access', 'Permission Matrix', 'Resource Protection', 'Principle of Least Privilege']
  },
  {
    title: 'Criptografia',
    description: 'Proteção de dados em trânsito e repouso',
    icon: Lock,
    color: 'text-purple-500',
    benefits: ['Data at Rest', 'Data in Transit', 'Key Management', 'Hashing Algorithms']
  },
  {
    title: 'Auditoria',
    description: 'Monitoramento e registro de atividades',
    icon: Eye,
    color: 'text-orange-500',
    benefits: ['Access Logs', 'Change Tracking', 'Compliance Reports', 'Anomaly Detection']
  }
];

const securityThreats = [
  {
    name: 'SQL Injection',
    description: 'Inserção de código SQL malicioso',
    severity: 'Critical',
    prevention: ['Prepared Statements', 'Input Validation', 'Parameterized Queries', 'ORM Usage'],
    example: `-- Ataque SQL Injection
SELECT * FROM users WHERE id = '1; DROP TABLE users; --'

-- Prevenção com Prepared Statement
PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?';
SET @user_id = 1;
EXECUTE stmt USING @user_id;`
  },
  {
    name: 'Data Breach',
    description: 'Acesso não autorizado a dados sensíveis',
    severity: 'High',
    prevention: ['Encryption', 'Access Controls', 'Network Security', 'Regular Audits'],
    example: `-- Criptografia de dados sensíveis
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  password_hash VARCHAR(255), -- Hash, nunca plaintext
  ssn VARBINARY(255), -- Dados criptografados
  created_at TIMESTAMP
);

-- Inserção com criptografia
INSERT INTO users (email, password_hash, ssn) VALUES (
  'user@example.com',
  SHA256('password123'),
  AES_ENCRYPT('123-45-6789', 'encryption_key')
);`
  },
  {
    name: 'Privilege Escalation',
    description: 'Obtenção de privilégios não autorizados',
    severity: 'High',
    prevention: ['Least Privilege', 'Role Separation', 'Regular Reviews', 'Access Monitoring'],
    example: `-- Criação de roles com privilégios mínimos
CREATE ROLE app_read_only;
GRANT SELECT ON database.users TO app_read_only;
GRANT SELECT ON database.products TO app_read_only;

CREATE ROLE app_write;
GRANT SELECT, INSERT, UPDATE ON database.orders TO app_write;
GRANT SELECT ON database.users TO app_write;

-- Usuário da aplicação com privilégios limitados
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT app_read_only TO 'app_user'@'localhost';
GRANT app_write TO 'app_user'@'localhost';`
  }
];

const encryptionExamples = [
  {
    title: 'Criptografia de Campo',
    description: 'Criptografia de campos específicos',
    code: `-- MySQL: Criptografia AES
CREATE TABLE sensitive_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  credit_card VARBINARY(255),
  ssn VARBINARY(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados criptografados
INSERT INTO sensitive_data (user_id, credit_card, ssn) VALUES (
  1,
  AES_ENCRYPT('4532-1234-5678-9012', 'encryption_key'),
  AES_ENCRYPT('123-45-6789', 'encryption_key')
);

-- Consultar dados descriptografados
SELECT 
  id,
  user_id,
  AES_DECRYPT(credit_card, 'encryption_key') AS credit_card,
  AES_DECRYPT(ssn, 'encryption_key') AS ssn
FROM sensitive_data
WHERE user_id = 1;`
  },
  {
    title: 'Transparent Data Encryption (TDE)',
    description: 'Criptografia transparente de toda a base',
    code: `-- SQL Server: Habilitar TDE
-- 1. Criar master key
USE master;
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'StrongPassword123!';

-- 2. Criar certificado
CREATE CERTIFICATE TDECert WITH SUBJECT = 'TDE Certificate';

-- 3. Usar o certificado no banco
USE MyDatabase;
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDECert;

-- 4. Habilitar criptografia
ALTER DATABASE MyDatabase SET ENCRYPTION ON;

-- Verificar status da criptografia
SELECT 
  db_name(database_id) AS database_name,
  encryption_state,
  encryption_state_desc,
  percent_complete
FROM sys.dm_database_encryption_keys;`
  },
  {
    title: 'Hashing de Senhas',
    description: 'Armazenamento seguro de senhas',
    code: `-- PostgreSQL: Hashing com bcrypt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Função para criar hash de senha
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf', 12));
END;
$$ LANGUAGE plpgsql;

-- Inserir usuário com senha hasheada
INSERT INTO users (email, password_hash, salt) VALUES (
  'user@example.com',
  hash_password('user_password'),
  gen_salt('bf', 12)
);

-- Verificar senha
SELECT 
  id, 
  email,
  (password_hash = crypt('user_password', password_hash)) AS password_valid
FROM users 
WHERE email = 'user@example.com';`
  }
];

const accessControlExamples = [
  {
    title: 'Row Level Security (RLS)',
    description: 'Controle de acesso a nível de linha',
    code: `-- PostgreSQL: Row Level Security
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  owner_id INT,
  department_id INT,
  classification VARCHAR(20) -- 'public', 'internal', 'confidential'
);

-- Habilitar RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: usuários só veem seus próprios documentos
CREATE POLICY user_documents ON documents
  FOR ALL TO application_user
  USING (owner_id = current_setting('app.user_id')::INT);

-- Policy: managers veem documentos do departamento
CREATE POLICY department_documents ON documents
  FOR SELECT TO manager_role
  USING (department_id = current_setting('app.department_id')::INT);

-- Policy: admins veem tudo exceto confidencial
CREATE POLICY admin_documents ON documents
  FOR ALL TO admin_role
  USING (classification != 'confidential');

-- Usar com aplicação
SET app.user_id = 123;
SET app.department_id = 5;
SELECT * FROM documents; -- Só retorna documentos permitidos`
  },
  {
    title: 'Views de Segurança',
    description: 'Controle de acesso através de views',
    code: `-- Tabela base com dados sensíveis
CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  salary DECIMAL(10,2),
  ssn VARCHAR(11),
  department_id INT,
  manager_id INT
);

-- View pública (sem dados sensíveis)
CREATE VIEW public_employees AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  department_id
FROM employees;

-- View para managers (com salários do departamento)
CREATE VIEW manager_employees AS
SELECT 
  e.id,
  e.first_name,
  e.last_name,
  e.email,
  e.salary,
  e.department_id
FROM employees e
WHERE e.department_id IN (
  SELECT department_id 
  FROM employees 
  WHERE id = current_setting('app.user_id')::INT
);

-- View para HR (todos os dados)
CREATE VIEW hr_employees AS
SELECT * FROM employees;

-- Conceder permissões específicas
GRANT SELECT ON public_employees TO public_role;
GRANT SELECT ON manager_employees TO manager_role;
GRANT SELECT ON hr_employees TO hr_role;`
  }
];

export default function DatabaseSecurityPage() {
  const [selectedThreat, setSelectedThreat] = useState(0);
  const [selectedEncryption, setSelectedEncryption] = useState(0);
  const [selectedAccess, setSelectedAccess] = useState(0);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Segurança de Banco de Dados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proteção de dados, controle de acesso e prevenção de ameaças em sistemas de banco de dados
          </p>
        </motion.div>

        {/* Security Features */}
        <DemoSection title="Pilares da Segurança" description="Componentes fundamentais da segurança de banco de dados">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityFeatures.map((feature, index) => {
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
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
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

        {/* Security Threats */}
        <DemoSection title="Ameaças Comuns" description="Principais ameaças e como preveni-las">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {securityThreats.map((threat, index) => (
                  <button
                    key={threat.name}
                    onClick={() => setSelectedThreat(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedThreat === index
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {threat.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {securityThreats[selectedThreat].name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    securityThreats[selectedThreat].severity === 'Critical' 
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}>
                    {securityThreats[selectedThreat].severity}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {securityThreats[selectedThreat].description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prevenção:</h4>
                  <div className="flex flex-wrap gap-2">
                    {securityThreats[selectedThreat].prevention.map((method) => (
                      <span key={method} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{securityThreats[selectedThreat].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Encryption Examples */}
        <DemoSection title="Criptografia" description="Implementação de criptografia em bancos de dados">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {encryptionExamples.map((example, index) => (
                  <button
                    key={example.title}
                    onClick={() => setSelectedEncryption(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedEncryption === index
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {encryptionExamples[selectedEncryption].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {encryptionExamples[selectedEncryption].description}
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{encryptionExamples[selectedEncryption].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Access Control */}
        <DemoSection title="Controle de Acesso" description="Implementação de controles de acesso granulares">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {accessControlExamples.map((example, index) => (
                  <button
                    key={example.title}
                    onClick={() => setSelectedAccess(index)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedAccess === index
                        ? 'border-green-500 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {accessControlExamples[selectedAccess].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {accessControlExamples[selectedAccess].description}
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-yellow-400 text-sm">
                  <code>{accessControlExamples[selectedAccess].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Security Demo */}
        <DemoSection title="Demo de Segurança" description="Simulação de controles de segurança">
          <DemoCardStatic title="Controle de Dados Sensíveis" description="Demonstração de mascaramento de dados">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mostrar dados sensíveis:</span>
                <button
                  onClick={() => setShowSensitiveData(!showSensitiveData)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showSensitiveData ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showSensitiveData ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-mono">user@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cartão de Crédito:</span>
                    <span className="font-mono">
                      {showSensitiveData ? '4532-1234-5678-9012' : '****-****-****-9012'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">CPF:</span>
                    <span className="font-mono">
                      {showSensitiveData ? '123.456.789-00' : '***.***.***-00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Salário:</span>
                    <span className="font-mono">
                      {showSensitiveData ? 'R$ 8.500,00' : 'R$ ****,**'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                {showSensitiveData ? (
                  <><Eye className="h-4 w-4 mr-2" />Dados visíveis - Acesso autorizado</>
                ) : (
                  <><EyeOff className="h-4 w-4 mr-2" />Dados mascarados - Proteção ativa</>
                )}
              </div>
            </div>
          </DemoCardStatic>
        </DemoSection>

        {/* Best Practices */}
        <DemoSection title="Melhores Práticas" description="Diretrizes para segurança de banco de dados">
          <div className="grid md:grid-cols-3 gap-6">
            <DemoCardStatic title="🔐 Autenticação" description="Práticas de autenticação segura">
              <div className="space-y-3">
                {[
                  'Use autenticação multi-fator',
                  'Implemente políticas de senha forte',
                  'Rotacione credenciais regularmente',
                  'Use tokens com expiração',
                  'Monitore tentativas de login',
                  'Implemente bloqueio por tentativas'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="🛡️ Proteção de Dados" description="Práticas de proteção de dados">
              <div className="space-y-3">
                {[
                  'Criptografe dados sensíveis',
                  'Use hashing para senhas',
                  'Implemente mascaramento',
                  'Classifique dados por sensibilidade',
                  'Use backup criptografado',
                  'Implemente data loss prevention'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>

            <DemoCardStatic title="📊 Monitoramento" description="Práticas de monitoramento e auditoria">
              <div className="space-y-3">
                {[
                  'Registre todas as operações',
                  'Monitore acessos anômalos',
                  'Implemente alertas de segurança',
                  'Faça auditorias regulares',
                  'Use ferramentas de SIEM',
                  'Mantenha logs imutáveis'
                ].map((practice, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                  </div>
                ))}
              </div>
            </DemoCardStatic>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}