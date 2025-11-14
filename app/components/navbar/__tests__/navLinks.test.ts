import { navLinks, NavLink } from '../navLinks'

describe('navLinks', () => {
  describe('Data Structure', () => {
    it('should be an array', () => {
      expect(Array.isArray(navLinks)).toBe(true)
    })

    it('should not be empty', () => {
      expect(navLinks.length).toBeGreaterThan(0)
    })

    it('should contain objects with href and label properties', () => {
      navLinks.forEach((link) => {
        expect(link).toHaveProperty('href')
        expect(link).toHaveProperty('label')
      })
    })

    it('should have string values for href and label', () => {
      navLinks.forEach((link) => {
        expect(typeof link.href).toBe('string')
        expect(typeof link.label).toBe('string')
      })
    })
  })

  describe('Content Validation', () => {
    it('should contain Home link', () => {
      const homeLink = navLinks.find((link) => link.label === 'Home')
      expect(homeLink).toBeDefined()
      expect(homeLink?.href).toBe('/')
    })

    it('should contain Explore link', () => {
      const exploreLink = navLinks.find((link) => link.label === 'Explore')
      expect(exploreLink).toBeDefined()
      expect(exploreLink?.href).toBe('/explore')
    })

    it('should contain About link', () => {
      const aboutLink = navLinks.find((link) => link.label === 'About')
      expect(aboutLink).toBeDefined()
      expect(aboutLink?.href).toBe('/about')
    })

    it('should have exactly 3 links', () => {
      expect(navLinks).toHaveLength(3)
    })

    it('should not have duplicate hrefs', () => {
      const hrefs = navLinks.map((link) => link.href)
      const uniqueHrefs = new Set(hrefs)
      expect(uniqueHrefs.size).toBe(hrefs.length)
    })

    it('should not have duplicate labels', () => {
      const labels = navLinks.map((link) => link.label)
      const uniqueLabels = new Set(labels)
      expect(uniqueLabels.size).toBe(labels.length)
    })

    it('should not have empty href values', () => {
      navLinks.forEach((link) => {
        expect(link.href.length).toBeGreaterThan(0)
      })
    })

    it('should not have empty label values', () => {
      navLinks.forEach((link) => {
        expect(link.label.length).toBeGreaterThan(0)
      })
    })

    it('should have valid href paths starting with /', () => {
      navLinks.forEach((link) => {
        expect(link.href).toMatch(/^\//)
      })
    })
  })

  describe('Type Safety', () => {
    it('should match NavLink interface', () => {
      const testLink: NavLink = { href: '/test', label: 'Test' }
      expect(testLink).toHaveProperty('href')
      expect(testLink).toHaveProperty('label')
      expect(typeof testLink.href).toBe('string')
      expect(typeof testLink.label).toBe('string')
    })

    it('should allow valid NavLink objects', () => {
      const validLink: NavLink = {
        href: '/new-page',
        label: 'New Page',
      }
      expect(validLink.href).toBe('/new-page')
      expect(validLink.label).toBe('New Page')
    })
  })

  describe('Order and Consistency', () => {
    it('should have Home as first link', () => {
      expect(navLinks[0].label).toBe('Home')
      expect(navLinks[0].href).toBe('/')
    })

    it('should have Explore as second link', () => {
      expect(navLinks[1].label).toBe('Explore')
      expect(navLinks[1].href).toBe('/explore')
    })

    it('should have About as third link', () => {
      expect(navLinks[2].label).toBe('About')
      expect(navLinks[2].href).toBe('/about')
    })

    it('should maintain consistent order', () => {
      const expectedOrder = [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore' },
        { href: '/about', label: 'About' },
      ]
      expect(navLinks).toEqual(expectedOrder)
    })
  })
})
