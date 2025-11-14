import { render, screen } from '@testing-library/react'
import NavBar from '../NavBar'
import { navLinks } from '../navLinks'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Remove priority prop as it's not a standard img attribute
    const { priority, alt, ...restProps } = props
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...restProps} data-priority={priority ? 'true' : 'false'} alt={alt} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>
  },
}))



describe('NavBar', () => {
  describe('Rendering', () => {
    it('should render the navigation bar', () => {
      const { container } = render(<NavBar />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should render the logo image', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      expect(images.length).toBeGreaterThan(0)
      expect(images[0]).toBeInTheDocument()
    })

    it('should render logo with correct src', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      const logo = images[0]
      expect(logo).toHaveAttribute('src', '/location_logo.svg')
    })

    it('should render logo with correct dimensions', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      const logo = images[0]
      expect(logo).toHaveAttribute('width', '32')
      expect(logo).toHaveAttribute('height', '32')
    })

    it('should render notification bell icon', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      // Second image should be the bell icon
      expect(images.length).toBe(2)
      expect(images[1]).toHaveAttribute('src', '/bell_light.svg')
    })
  })

  describe('Navigation Links', () => {
    it('should render all navigation links from navLinks data', () => {
      render(<NavBar />)

      navLinks.forEach((link) => {
        const linkElement = screen.getByText(link.label)
        expect(linkElement).toBeInTheDocument()
      })
    })

    it('should render Home link with correct href', () => {
      render(<NavBar />)
      const homeLink = screen.getByText('Home')
      expect(homeLink.closest('a')).toHaveAttribute('href', '/')
    })

    it('should render Explore link with correct href', () => {
      render(<NavBar />)
      const exploreLink = screen.getByText('Explore')
      expect(exploreLink.closest('a')).toHaveAttribute('href', '/explore')
    })

    it('should render About link with correct href', () => {
      render(<NavBar />)
      const aboutLink = screen.getByText('About')
      expect(aboutLink.closest('a')).toHaveAttribute('href', '/about')
    })

    it('should render correct number of navigation links', () => {
      const { container } = render(<NavBar />)
      const links = container.querySelectorAll('a')
      // Should have 3 navigation links
      expect(links.length).toBe(navLinks.length)
    })
  })

  describe('Styling', () => {
    it('should render nav links as anchor elements', () => {
      render(<NavBar />)
      const homeLink = screen.getByText('Home')
      expect(homeLink.tagName).toBe('A')
      expect(homeLink).toBeInTheDocument()
    })

    it('should have responsive container with max-width', () => {
      const { container } = render(<NavBar />)
      const mainContainer = container.querySelector('.max-w-7xl')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('px-8', 'sm:px-6', 'mx-auto')
    })

    it('should have border styling on container', () => {
      const { container } = render(<NavBar />)
      const borderContainer = container.querySelector('.border-b')
      expect(borderContainer).toBeInTheDocument()
      expect(borderContainer).toHaveClass('border-white/10')
    })

    it('should have correct height for navbar', () => {
      const { container } = render(<NavBar />)
      const navbarInner = container.querySelector('.h-16')
      expect(navbarInner).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should hide navigation links on mobile', () => {
      const { container } = render(<NavBar />)
      const desktopNav = container.querySelector('.hidden.md\\:block')
      expect(desktopNav).toBeInTheDocument()
    })

    it('should have mobile menu toggle area', () => {
      const { container } = render(<NavBar />)
      const mobileMenu = container.querySelector('.flex.md\\:hidden')
      expect(mobileMenu).toBeInTheDocument()
    })

    it('should hide notification section on mobile', () => {
      const { container } = render(<NavBar />)
      const notificationSection = container.querySelectorAll('.hidden.md\\:block')
      // Should have at least 2 hidden elements (nav links and notification section)
      expect(notificationSection.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Interactive Elements', () => {
    it('should render notification button', () => {
      const { container } = render(<NavBar />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })

    it('should have proper button styling', () => {
      const { container } = render(<NavBar />)
      const button = container.querySelector('button')
      expect(button).toHaveClass(
        'rounded-full',
        'relative',
        'text-slate-200',
        'cursor-pointer',
        'hover:bg-slate-950',
        'hover:text-white',
        'p-2'
      )
    })
  })

  describe('Accessibility', () => {
    it('should have alt text for all images', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      expect(images.length).toBeGreaterThan(0)
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
      })
    })

    it('should have semantic nav element', () => {
      const { container } = render(<NavBar />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should have priority loading for logo', () => {
      render(<NavBar />)
      const images = screen.getAllByAltText('Map Explorer Logo')
      images.forEach((img) => {
        expect(img).toHaveAttribute('data-priority', 'true')
      })
    })
  })

  describe('Layout', () => {
    it('should use flexbox for layout', () => {
      const { container } = render(<NavBar />)
      const flexContainers = container.querySelectorAll('.flex')
      expect(flexContainers.length).toBeGreaterThan(0)
    })

    it('should have proper spacing between elements', () => {
      const { container } = render(<NavBar />)
      const spacedContainer = container.querySelector('.ms-10')
      expect(spacedContainer).toBeInTheDocument()
    })

    it('should justify content correctly', () => {
      const { container } = render(<NavBar />)
      const justifyBetween = container.querySelector('.justify-between')
      expect(justifyBetween).toBeInTheDocument()
    })

    it('should align items correctly', () => {
      const { container } = render(<NavBar />)
      const alignItems = container.querySelector('.items-center')
      expect(alignItems).toBeInTheDocument()
    })
  })
})
