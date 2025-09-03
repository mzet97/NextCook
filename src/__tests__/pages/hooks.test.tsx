import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HooksPage from '@/app/hooks/page'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/hooks',
}))

describe('Hooks Page', () => {
  it('should render the page title', () => {
    render(<HooksPage />)
    
    expect(screen.getByText('React Hooks Demonstração')).toBeInTheDocument()
  })

  it('should render the search input', () => {
    render(<HooksPage />)
    
    expect(screen.getByPlaceholderText('Digite o nome do hook...')).toBeInTheDocument()
  })

  it('should render category filter options', () => {
    render(<HooksPage />)
    
    expect(screen.getByText('Todas as categorias')).toBeInTheDocument()
    expect(screen.getByText('Básicos')).toBeInTheDocument()
    expect(screen.getByText('Avançados')).toBeInTheDocument()
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('Utilitários')).toBeInTheDocument()
  })

  it('should render difficulty filter options', () => {
    render(<HooksPage />)
    
    expect(screen.getByText('Todas as dificuldades')).toBeInTheDocument()
    expect(screen.getByText('Iniciante')).toBeInTheDocument()
    expect(screen.getByText('Intermediário')).toBeInTheDocument()
    expect(screen.getByText('Avançado')).toBeInTheDocument()
  })

  it('should display hook cards', () => {
    render(<HooksPage />)
    
    expect(screen.getByText('useState')).toBeInTheDocument()
    expect(screen.getByText('useEffect')).toBeInTheDocument()
    expect(screen.getByText('useContext')).toBeInTheDocument()
  })

  it('should filter hooks by search term', async () => {
    const user = userEvent.setup()
    render(<HooksPage />)
    
    const searchInput = screen.getByPlaceholderText('Digite o nome do hook...')
    
    await user.type(searchInput, 'useState')
    
    expect(screen.getByText('useState')).toBeInTheDocument()
    // Other hooks should be filtered out or not visible
  })

  it('should have category filter select', () => {
    render(<HooksPage />)
    
    const categorySelect = screen.getByDisplayValue('Todas as categorias')
    expect(categorySelect).toBeInTheDocument()
  })

  it('should have difficulty filter select', () => {
    render(<HooksPage />)
    
    const difficultySelect = screen.getByDisplayValue('Todas as dificuldades')
    expect(difficultySelect).toBeInTheDocument()
  })

  it('should display statistics', () => {
    render(<HooksPage />)
    
    expect(screen.getByText(/Hooks Básicos/)).toBeInTheDocument()
    expect(screen.getByText(/Hooks Avançados/)).toBeInTheDocument()
    expect(screen.getByText(/Performance/)).toBeInTheDocument()
    expect(screen.getByText(/Utilitários/)).toBeInTheDocument()
  })

  it('should show hook descriptions', () => {
    render(<HooksPage />)
    
    // Check if any hook descriptions are present
    expect(screen.getByText(/React Hooks Complete Guide/)).toBeInTheDocument()
  })

  it('should display page content', () => {
    render(<HooksPage />)
    
    // Check if main content is present
    expect(screen.getByText(/Explore todos os React Hooks/)).toBeInTheDocument()
  })

  it('should render filter labels', () => {
    render(<HooksPage />)
    
    expect(screen.getByText('Buscar Hooks')).toBeInTheDocument()
    expect(screen.getByText('Categoria')).toBeInTheDocument()
    expect(screen.getByText('Dificuldade')).toBeInTheDocument()
  })

  it('should handle empty search results', async () => {
    const user = userEvent.setup()
    render(<HooksPage />)
    
    const searchInput = screen.getByPlaceholderText('Digite o nome do hook...')
    
    await user.type(searchInput, 'nonexistenthook')
    
    // Should show no results or empty state
    await waitFor(() => {
      const hookCards = screen.queryAllByText(/use/)
      expect(hookCards.length).toBe(0)
    })
  })

  it('should allow typing in search input', async () => {
    const user = userEvent.setup()
    render(<HooksPage />)
    
    const searchInput = screen.getByPlaceholderText('Digite o nome do hook...')
    
    await user.type(searchInput, 'test')
    
    expect(searchInput).toHaveValue('test')
  })

  it('should be responsive and accessible', () => {
    render(<HooksPage />)
    
    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Check for search input accessibility
    const searchInput = screen.getByPlaceholderText('Digite o nome do hook...')
    expect(searchInput).toHaveAttribute('type', 'text')
    
    // Check for select elements accessibility
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBe(2) // Category and difficulty selects
  })
})