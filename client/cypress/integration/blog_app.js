describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const firstUser = {
      name: 'Natasa',
      username: 'natasharp',
      password: 'secret'
    }
    const secondUser = {
      name: 'Tajna',
      username: 'ninalina',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', firstUser)
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function () {
    cy.contains('pinblog')
    cy.contains('username')
    cy.contains('password')
    cy.contains('LOGIN')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('[data-cypress-id="username-input"]').type('natasharp')
      cy.get('[data-cypress-id="password-input"]').type('secret')
      cy.get('[data-cypress-id="login-button"]').click()

      cy.get('[data-cypress-id="logout"]').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cypress-id="username-input"]').type('natasharp')
      cy.get('[data-cypress-id="password-input"]').type('wrong')
      cy.get('[data-cypress-id="login-button"]').click()
      cy.get('[data-cypress-id="error"]').contains('wrong credentials')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'natasharp',
          password: 'secret'
        }).then(response => {
          localStorage.setItem('loggedBloglistAppUser', JSON.stringify(response.body))
        })
      })

      it('A blog can be created', function () {
        cy.visit('http://localhost:3001/new')
        cy.contains('pin new blog').click()
        cy.get('[data-cypress-id="title"]').type('Beetroot Latte')
        cy.get('[data-cypress-id="author"]').type('Sadia')
        cy.get('[data-cypress-id="url"]').type('https://www.pickuplimes.com/single-post/2019/11/05/Beetroot-Latte')

        cy.get('[data-cypress-id="create-button"]').click()
        cy.get('[data-cypress-id="notification"]').contains('New blog Beetroot Latte by Sadia pinned')
        cy.get('[data-cypress-id="blog-card"]').contains('Beetroot Latte')
        cy.get('[data-cypress-id="logout"]').click()
      })

      describe('User can', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Beetroot Latte',
            author: 'Sadia',
            url: 'https://www.pickuplimes.com/single-post/2019/11/05/Beetroot-Latte',
            likes: 0
          })
          cy.login({
            username: 'ninalina',
            password: 'secret'
          })
          cy.createBlog({
            title: 'Skincare Products for Sensitive Skin',
            author: 'Michelle Villett',
            url: 'https://theskincareedit.com/skincare-for-sensitive-skin',
            likes: 0
          })
        })

        it('like blog', function () {
          cy.get('[data-cypress-id="blog-card"]')
            .contains('Skincare Products for Sensitive Skin').parents('[data-cypress-id="blog-card"]').as('blog')

          cy.get('@blog').contains('0')
          cy.get('@blog').find('[aria-label="like"]').click()
          cy.get('@blog').contains('1')
        })

        it('delete blog he created', function () {
          cy.get('[data-cypress-id="blog-card"]')
            .contains('Skincare Products for Sensitive Skin')
            .parents('[data-cypress-id="blog-card"]')
            .as('blog')

          cy.get('@blog').find('[aria-label="delete"]').click()
          cy.get('[data-cypress-id="alert"]').find('button').contains('YES').click()
          cy.contains('Skincare Products for Sensitive Skin').should('not.exist')
        })

        it('not delete blog he did not create', function () {
          cy.get('[data-cypress-id="blog-card"]')
            .contains('Beetroot Latte')
            .parents('[data-cypress-id="blog-card"]')
            .as('blog')

          cy.get('@blog').find('[aria-label="delete"]').should('be.disabled')
        })

        it('go to blog source page', function () {
          cy.get('[data-cypress-id="blog-card"]')
            .contains('Skincare Products for Sensitive Skin')
            .parents('[data-cypress-id="blog-card"]')
            .as('blog')

          cy.get('@blog').find('[aria-label="launch"]').click()
        })
      })

      describe('Blogs are sorted according to likes', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Beetroot Latte',
            author: 'Sadia',
            url: 'https://www.pickuplimes.com/single-post/2019/11/05/Beetroot-Latte',
            likes: 10
          })
          cy.createBlog({
            title: 'Skincare Products for Sensitive Skin',
            author: 'Michelle Villett',
            url: 'https://theskincareedit.com/skincare-for-sensitive-skin',
            likes: 13
          })
          cy.createBlog({
            title: 'Best SPF for face',
            author: 'Hannah Coates',
            url: 'https://www.vogue.co.uk/gallery/best-sun-protection-for-face',
            likes: 2
          })
        })

        it('blog with the most likes is first', function () {
          cy.visit('http://localhost:3001/collection')
          cy.request('GET', 'http://localhost:3001/api/blogs')
            .then(response => {
              const likes = response.body.map(user => user.likes)
              const max = Math.max(...likes)
              cy.get('[data-cypress-id="blog-card"]:first').contains(max)
            })
        })
      })
    })
  })
})