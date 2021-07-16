describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const firstUser = {
      name: 'Natasa S. P.',
      username: 'natasharp',
      password: 'secret'
    }
    const secondUser = {
      name: 'Nina S.',
      username: 'ninalina',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', firstUser)
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('natasharp')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()

      cy.get('#logout-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('natasharp')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'natasharp',
          password: 'secret'
        }).then(response => {
          localStorage.setItem('loggedBloglistAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('Beetroot Latte')
        cy.get('#author').type('Sadia')
        cy.get('#url').type('https://www.pickuplimes.com/single-post/2019/11/05/Beetroot-Latte')

        cy.get('#create-button').click()
        cy.get('#blogs-div').contains('Beetroot Latte').find('button').contains('view')
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
          cy.get('#blogs-div')
            .contains('Beetroot Latte Sadia').as('blog')

          cy.get('@blog').find('button').click()
          cy.get('@blog').find('button').contains('like').click()
          cy.get('@blog').contains('1')
        })

        it('delete blog he created', function () {
          cy.get('#blogs-div')
            .contains('Skincare Products for Sensitive Skin').as('blog')

          cy.get('@blog').find('button').click()
          cy.get('@blog').find('button').contains('remove').click()
          cy.contains('Skincare Products for Sensitive Skin').should('not.exist')
        })

        it('not delete blog he did not create', function () {
          cy.get('#blogs-div')
            .contains('Beetroot Latte').as('blog')
          cy.get('@blog').find('button').click()
          cy.get('@blog').children().get('#delete-button').should('not.be.visible')
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
          cy.request('GET', 'http://localhost:3001/api/blogs')
            .then(response => {
              const likes = response.body.map(user => user.likes)
              const max = Math.max(...likes)
              cy.get('.blog:first').find('button').click()
              cy.get('#likes-div').contains(max)
            })
        })
      })
    })
  })
})