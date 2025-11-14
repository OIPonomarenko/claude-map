import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '../NavBar'
import { navLinks } from '../navLinks'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { priority?: boolean; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img data-priority={props.priority ? 'true' : 'false'} alt={props.alt} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  },
}))


describe('NavBar', () => {
  // Helper functions to reduce repetition
  const renderNavBar = () => render(<NavBar />)

  const getLogo = () => screen.getByAltText('Map Explorer Logo')
  const getBell = () => screen.getByAltText('Notification bell')
  const getNavLink = (label: string) => screen.getByText(label)

  describe('Rendering', () => {
    it('should render the navigation bar', () => {
      const { container } = renderNavBar()
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should render the logo image', () => {
      renderNavBar()
      expect(getLogo()).toBeInTheDocument()
    })

    it('should render logo with correct src', () => {
      renderNavBar()
      expect(getLogo()).toHaveAttribute('src', '/location_logo.svg')
    })

    it('should render logo with correct dimensions', () => {
      renderNavBar()
      const logo = getLogo()
      expect(logo).toHaveAttribute('width', '32')
      expect(logo).toHaveAttribute('height', '32')
    })

    it('should render notification bell icon', () => {
      renderNavBar()
      const bell = getBell()
      expect(bell).toBeInTheDocument()
      expect(bell).toHaveAttribute('src', '/bell_light.svg')
    })
  })

  describe('Navigation Links', () => {
    it('should render all navigation links from navLinks data', () => {
      renderNavBar()

      navLinks.forEach((link) => {
        expect(getNavLink(link.label)).toBeInTheDocument()
      })
    })

    it('should render Home link with correct href', () => {
      renderNavBar()
      expect(getNavLink('Home').closest('a')).toHaveAttribute('href', '/')
    })

    it('should render Explore link with correct href', () => {
      renderNavBar()
      expect(getNavLink('Explore').closest('a')).toHaveAttribute('href', '/explore')
    })

    it('should render About link with correct href', () => {
      renderNavBar()
      expect(getNavLink('About').closest('a')).toHaveAttribute('href', '/about')
    })

    it('should render correct number of navigation links', () => {
      const { container } = renderNavBar()
      const links = container.querySelectorAll('a')
      expect(links.length).toBe(navLinks.length)
    })
  })

  describe('Styling', () => {
    it('should render nav links as anchor elements', () => {
      renderNavBar()
      const homeLink = getNavLink('Home')
      expect(homeLink.tagName).toBe('A')
      expect(homeLink).toBeInTheDocument()
    })

    it('should have responsive container with max-width', () => {
      const { container } = renderNavBar()
      const mainContainer = container.querySelector('.max-w-7xl')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('px-8', 'sm:px-6', 'mx-auto')
    })

    it('should have border styling on container', () => {
      const { container } = renderNavBar()
      const borderContainer = container.querySelector('.border-b')
      expect(borderContainer).toBeInTheDocument()
      expect(borderContainer).toHaveClass('border-white/10')
    })

    it('should have correct height for navbar', () => {
      const { container } = renderNavBar()
      const navbarInner = container.querySelector('.h-16')
      expect(navbarInner).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should hide navigation links on mobile', () => {
      const { container } = renderNavBar()
      const desktopNav = container.querySelector('.hidden.md\\:block')
      expect(desktopNav).toBeInTheDocument()
    })

    it('should have mobile menu toggle area', () => {
      const { container } = renderNavBar()
      const mobileMenu = container.querySelector('.flex.md\\:hidden')
      expect(mobileMenu).toBeInTheDocument()
    })

    it('should hide notification section on mobile', () => {
      const { container } = renderNavBar()
      const notificationSection = container.querySelectorAll('.hidden.md\\:block')
      expect(notificationSection.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Interactive Elements', () => {
    it('should render notification button', () => {
      const { container } = renderNavBar()
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })

    it('should have proper button styling', () => {
      const { container } = renderNavBar()
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
      renderNavBar()
      const images = screen.getAllByAltText('Map Explorer Logo')
      expect(images.length).toBeGreaterThan(0)
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
      })
    })

    it('should have semantic nav element', () => {
      const { container } = renderNavBar()
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should have priority loading for logo', () => {
      renderNavBar()
      const images = screen.getAllByAltText('Map Explorer Logo')
      images.forEach((img) => {
        expect(img).toHaveAttribute('data-priority', 'true')
      })
    })
  })

  describe('Layout', () => {
    it('should use flexbox for layout', () => {
      const { container } = renderNavBar()
      const flexContainers = container.querySelectorAll('.flex')
      expect(flexContainers.length).toBeGreaterThan(0)
    })

    it('should have proper spacing between elements', () => {
      const { container } = renderNavBar()
      const spacedContainer = container.querySelector('.ms-10')
      expect(spacedContainer).toBeInTheDocument()
    })

    it('should justify content correctly', () => {
      const { container } = renderNavBar()
      const justifyBetween = container.querySelector('.justify-between')
      expect(justifyBetween).toBeInTheDocument()
    })

    it('should align items correctly', () => {
      const { container } = renderNavBar()
      const alignItems = container.querySelector('.items-center')
      expect(alignItems).toBeInTheDocument()
    })
  })
})
