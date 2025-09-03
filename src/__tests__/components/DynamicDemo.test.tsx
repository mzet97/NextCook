import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DynamicDemo from '@/components/DynamicDemo'

// Mock performance.now
const mockPerformanceNow = jest.fn()
Object.defineProperty(global, 'performance', {
  value: {
    now: mockPerformanceNow,
  },
})

describe('DynamicDemo', () => {
  beforeEach(() => {
    mockPerformanceNow.mockReturnValue(1000)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default title', () => {
    render(<DynamicDemo />)
    
    expect(screen.getByText('Dynamic Component')).toBeInTheDocument()
  })

  it('should render with custom title', () => {
    render(<DynamicDemo title="Custom Title" />)
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('should display load time', async () => {
    mockPerformanceNow.mockReturnValueOnce(1000).mockReturnValueOnce(1050)
    
    render(<DynamicDemo />)
    
    await waitFor(() => {
      expect(screen.getByText('50.00ms')).toBeInTheDocument()
    })
  })

  it('should display load time after component mounts', async () => {
    mockPerformanceNow.mockReturnValueOnce(1000).mockReturnValueOnce(1050)
    
    render(<DynamicDemo />)
    
    await waitFor(() => {
      expect(screen.getByText(/\d+\.\d+ms/)).toBeInTheDocument()
    })
  })

  it('should initialize counter at 0', () => {
    render(<DynamicDemo />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should increment counter when + button is clicked', async () => {
    const user = userEvent.setup()
    render(<DynamicDemo />)
    
    const incrementButton = screen.getByText('+')
    await user.click(incrementButton)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should decrement counter when - button is clicked', async () => {
    const user = userEvent.setup()
    render(<DynamicDemo />)
    
    const decrementButton = screen.getByText('-')
    await user.click(decrementButton)
    
    expect(screen.getByText('-1')).toBeInTheDocument()
  })

  it('should handle multiple increments and decrements', async () => {
    const user = userEvent.setup()
    render(<DynamicDemo />)
    
    const incrementButton = screen.getByText('+')
    const decrementButton = screen.getByText('-')
    
    // Increment 3 times
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    
    expect(screen.getByText('3')).toBeInTheDocument()
    
    // Decrement 1 time
    await user.click(decrementButton)
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should display component information', () => {
    render(<DynamicDemo />)
    
    expect(screen.getByText(/Este componente foi carregado dinamicamente/)).toBeInTheDocument()
    expect(screen.getByText(/Ele não foi incluído no bundle inicial/)).toBeInTheDocument()
  })

  it('should display configuration grid', () => {
    render(<DynamicDemo />)
    
    expect(screen.getByText('SSR')).toBeInTheDocument()
    expect(screen.getByText('Disabled')).toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(screen.getByText('Bundle')).toBeInTheDocument()
    expect(screen.getByText('Separate')).toBeInTheDocument()
  })

  it('should have proper CSS classes for styling', () => {
    render(<DynamicDemo />)
    
    const container = screen.getByText('Dynamic Component').closest('div')
    expect(container).toHaveClass('p-4', 'bg-purple-100', 'dark:bg-purple-900/30', 'rounded-lg')
  })

  it('should have accessible button elements', () => {
    render(<DynamicDemo />)
    
    const incrementButton = screen.getByText('+')
    const decrementButton = screen.getByText('-')
    
    expect(incrementButton).toBeInTheDocument()
    expect(decrementButton).toBeInTheDocument()
    expect(incrementButton.tagName).toBe('BUTTON')
    expect(decrementButton.tagName).toBe('BUTTON')
  })

  it('should handle rapid button clicks', async () => {
    const user = userEvent.setup()
    render(<DynamicDemo />)
    
    const incrementButton = screen.getByText('+')
    
    // Rapid clicks
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should work with negative numbers', async () => {
    const user = userEvent.setup()
    render(<DynamicDemo />)
    
    const decrementButton = screen.getByText('-')
    
    // Click decrement multiple times to get negative numbers
    await user.click(decrementButton)
    await user.click(decrementButton)
    await user.click(decrementButton)
    
    expect(screen.getByText('-3')).toBeInTheDocument()
  })
})