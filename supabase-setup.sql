-- =====================================================
-- GERADOR DE PROPOSTAS - SETUP DO SUPABASE
-- =====================================================
-- Execute este script no SQL Editor do seu projeto Supabase
-- para configurar o banco de dados

-- =====================================================
-- 1. CRIAR TABELA PROPOSALS
-- =====================================================

CREATE TABLE IF NOT EXISTS proposals (
  flow_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. CRIAR POLÍTICAS DE SEGURANÇA
-- =====================================================

-- Política para permitir leitura apenas para usuários autenticados
CREATE POLICY "Permitir leitura para usuários autenticados"
ON proposals
FOR SELECT
TO authenticated
USING (true);

-- Política para permitir inserção apenas para usuários autenticados
CREATE POLICY "Permitir inserção para usuários autenticados"
ON proposals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para permitir atualização apenas para usuários autenticados
CREATE POLICY "Permitir atualização para usuários autenticados"
ON proposals
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Política para permitir exclusão apenas para usuários autenticados
CREATE POLICY "Permitir exclusão para usuários autenticados"
ON proposals
FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- 4. CRIAR ÍNDICES PARA OTIMIZAÇÃO
-- =====================================================

-- Índice para busca por nome (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_proposals_name_lower
ON proposals (LOWER(name));

-- Índice para busca por flow_id (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_proposals_flow_id_lower
ON proposals (LOWER(flow_id));

-- Índice para ordenação por data de criação
CREATE INDEX IF NOT EXISTS idx_proposals_created_at
ON proposals (created_at DESC);

-- =====================================================
-- 5. CRIAR FUNÇÃO PARA ATUALIZAR updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. CRIAR TRIGGER PARA AUTO-ATUALIZAR updated_at
-- =====================================================

DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;

CREATE TRIGGER update_proposals_updated_at
BEFORE UPDATE ON proposals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. INSERIR DADOS DE EXEMPLO (OPCIONAL)
-- =====================================================

-- Descomente as linhas abaixo para inserir dados de exemplo

/*
INSERT INTO proposals (flow_id, name, url) VALUES
  ('FLOW001', 'Proposta Cliente A - Desenvolvimento Web', 'https://example.com/proposta-a'),
  ('FLOW002', 'Proposta Cliente B - App Mobile', 'https://example.com/proposta-b'),
  ('FLOW003', 'Proposta Cliente C - Sistema ERP', 'https://example.com/proposta-c'),
  ('FLOW004', 'Proposta Cliente D - E-commerce', 'https://example.com/proposta-d'),
  ('FLOW005', 'Proposta Cliente E - Dashboard Analytics', 'https://example.com/proposta-e'),
  ('FLOW006', 'Proposta Cliente F - API REST', 'https://example.com/proposta-f')
ON CONFLICT (flow_id) DO NOTHING;
*/

-- =====================================================
-- 8. VERIFICAR SETUP
-- =====================================================

-- Contar registros na tabela
SELECT COUNT(*) as total_propostas FROM proposals;

-- Listar todas as propostas
SELECT * FROM proposals ORDER BY name ASC;

-- =====================================================
-- SETUP COMPLETO!
-- =====================================================
-- Próximos passos:
-- 1. Crie um usuário em Authentication > Users
-- 2. Configure as variáveis de ambiente no .env.local
-- 3. Execute npm run dev e faça login
-- =====================================================

