import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the MapboxExplorer component
jest.mock('@/app/components/mapbox/MapboxExplorer', () => ({
  __esModule: true,
  default: () => <div data-testid="mapbox-explorer">Mocked MapboxExplorer</div>,
}))

// Mock the NavBar component
jest.mock('@/app/components/navbar/NavBar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar">Mocked NavBar</nav>,
}))

describe('Home Page', () => {
  describe('Rendering', () => {
    it('should render the page', () => {
      const { container } = render(<Home />)
      expect(container).toBeInTheDocument()
    })

    it('should render the NavBar component', () => {
      render(<Home />)
      const navbar = screen.getByTestId('navbar')
      expect(navbar).toBeInTheDocument()
    })

    it('should render the MapboxExplorer component', () => {
      render(<Home />)
      const mapbox = screen.getByTestId('mapbox-explorer')
      expect(mapbox).toBeInTheDocument()
    })

    it('should render the Dashboard heading', () => {
      render(<Home />)
      const heading = screen.getByText('Dashboard')
      expect(heading).toBeInTheDocument()
    })

    it('should render Dashboard as h1 element', () => {
      render(<Home />)
      const heading = screen.getByRole('heading', { level: 1, name: 'Dashboard' })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have main element', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })

    it('should have header element', () => {
      const { container } = render(<Home />)
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('should wrap content in proper div structure', () => {
      const { container } = render(<Home />)
      const rootDiv = container.firstChild
      expect(rootDiv).toBeInTheDocument()
    })

    it('should have header inside the top section', () => {
      const { container } = render(<Home />)
      const header = container.querySelector('header')
      expect(header?.parentElement).toHaveClass('bg-slate-900', 'pb-32')
    })

  })

  describe('Styling', () => {
    it('should apply background styling to root div', () => {
      const { container } = render(<Home />)
      const rootDiv = container.firstChild as HTMLElement
      expect(rootDiv).toHaveClass('bg-zinc-50', 'font-sans', 'dark:bg-black')
    })

    it('should apply styling to header section', () => {
      const { container } = render(<Home />)
      const headerSection = container.querySelector('.bg-slate-900')
      expect(headerSection).toHaveClass('bg-slate-900', 'pb-32')
    })

    it('should apply styling to header element', () => {
      const { container } = render(<Home />)
      const header = container.querySelector('header')
      expect(header).toHaveClass('py-10')
    })

    it('should apply max-width container to header content', () => {
      const { container } = render(<Home />)
      const headerContainer = container.querySelector('header .max-w-7xl')
      expect(headerContainer).toBeInTheDocument()
      expect(headerContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6')
    })

    it('should apply styling to h1 heading', () => {
      render(<Home />)
      const heading = screen.getByText('Dashboard')
      expect(heading).toHaveClass('text-3xl', 'text-white', 'font-bold', 'tracking-tight')
    })

    it('should apply max-width container to main content', () => {
      const { container } = render(<Home />)
      const mainContainer = container.querySelector('main .max-w-7xl')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'pb-12')
    })

    it('should apply card styling to MapboxExplorer wrapper', () => {
      const { container } = render(<Home />)
      const cardWrapper = container.querySelector('.bg-white')
      expect(cardWrapper).toHaveClass('px-5', 'sm:px-6', 'py-6', 'bg-white', 'shadow-md', 'rounded-lg')
    })
  })

  describe('Component Integration', () => {
    it('should render NavBar before MapboxExplorer', () => {
      render(<Home />)
      const navbar = screen.getByTestId('navbar')
      const mapbox = screen.getByTestId('mapbox-explorer')

      // Check if navbar comes before mapbox in DOM order
      expect(navbar.compareDocumentPosition(mapbox)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })

    it('should render header between NavBar and MapboxExplorer', () => {
      render(<Home />)
      const navbar = screen.getByTestId('navbar')
      const heading = screen.getByText('Dashboard')
      const mapbox = screen.getByTestId('mapbox-explorer')

      // Check DOM order
      expect(navbar.compareDocumentPosition(heading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
      expect(heading.compareDocumentPosition(mapbox)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })

    it('should contain MapboxExplorer within a card container', () => {
      render(<Home />)
      const mapbox = screen.getByTestId('mapbox-explorer')
      const cardWrapper = mapbox.parentElement

      expect(cardWrapper).toHaveClass('bg-white', 'shadow-md', 'rounded-lg')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding classes in header', () => {
      const { container } = render(<Home />)
      const headerContainer = container.querySelector('header .max-w-7xl')
      expect(headerContainer).toHaveClass('px-4', 'sm:px-6')
    })

    it('should have responsive padding classes in main', () => {
      const { container } = render(<Home />)
      const mainContainer = container.querySelector('main .max-w-7xl')
      expect(mainContainer).toHaveClass('px-4', 'sm:px-6')
    })

    it('should have responsive padding in card wrapper', () => {
      const { container } = render(<Home />)
      const cardWrapper = container.querySelector('.bg-white')
      expect(cardWrapper).toHaveClass('px-5', 'sm:px-6')
    })

    it('should apply max-width constraint for large screens', () => {
      const { container } = render(<Home />)
      const maxWidthContainers = container.querySelectorAll('.max-w-7xl')
      expect(maxWidthContainers.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have semantic main element', () => {
      render(<Home />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should have semantic header element', () => {
      const { container } = render(<Home />)
      const header = container.querySelector('header')
      expect(header?.tagName).toBe('HEADER')
    })

    it('should have heading with proper hierarchy', () => {
      render(<Home />)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
    })

    it('should have only one h1 heading', () => {
      render(<Home />)
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })
  })

  describe('Dark Mode', () => {
    it('should include dark mode classes', () => {
      const { container } = render(<Home />)
      const rootDiv = container.firstChild as HTMLElement
      expect(rootDiv.className).toContain('dark:bg-black')
    })
  })
})
