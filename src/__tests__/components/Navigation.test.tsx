import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    render(<Navigation />);
  });

  it('renders the navigation component', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays the main title', () => {
    const title = screen.getByText('React Hook Next');
    expect(title).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    // Check for main section links
    expect(screen.getByText('Hooks')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Zustand')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('has proper link structure', () => {
    const hooksLink = screen.getByRole('link', { name: /hooks/i });
    expect(hooksLink).toHaveAttribute('href', '/hooks');
    
    const nextjsLink = screen.getByRole('link', { name: /next\.js/i });
    expect(nextjsLink).toHaveAttribute('href', '/nextjs');
  });

  it('is accessible', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup();
    
    // Look for mobile menu button (if exists)
    const mobileMenuButton = screen.queryByRole('button', { name: /menu/i });
    
    if (mobileMenuButton) {
      await user.click(mobileMenuButton);
      // Add assertions for mobile menu behavior
    }
  });
});