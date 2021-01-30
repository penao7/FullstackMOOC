describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Testo',
      username: 'Tester',
      password: 'youneverguess'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains(/bloglist app/i);
  });

  it('login form can be opened', () => {
    cy.contains('Login').click();
  });

  it('login fails with wrong credentials', () => {
    cy.contains('Login').click();
    cy.get('#username').type('wrong');
    cy.get('#password').type('credentials');
    cy.get('#submit').click();
    cy.get('#note-error').contains('bad type of credentials');
    cy.get('html').should('not.contain', 'Tester logged in');
  });

  it('user can login', () => {
    cy.contains('Login').click();
    cy.get('#username').type('Tester');
    cy.get('#password').type('youneverguess');
    cy.get('#submit').click();
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Tester', password: 'youneverguess' });
    });

    it('blog can be added', () => {
      cy.get('#nav-dropdown').click();
      cy.contains('Add Blog').click()
        .get('#title').type('blog')
        .get('#author').type('cypress')
        .get('#url').type('http://testblog/blog')
        .get('#blog-submit').click()
        .get('html').should('contain', 'blog cypress');
    });

    it('user can logout', () => {
      cy.get('#nav-dropdown').click();
      cy.get('#logout').click();
    });

    describe('when blog has been added', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'TestiBlog', author: 'TestAuthor', url: 'http://testblog.test/blog' })
          .wait(500)
      });

      it('a blog can be opened', () => {
        cy.contains('TestiBlog').click();
        cy.contains('Likes 0');
      });

      it('a blog can be liked', () => {
        cy.wait(500)
          .contains('TestiBlog').click()
          .get('#like').click()
        cy.contains('Likes 1');
      });

      it('a blog can be deleted', () => {
        cy.contains('delete').click()
        cy.contains('blog deletion succesful');
        cy.should('not.contain', 'TestiBlog');
      });

      it('a blog cannot be deleted by unauthorized user', () => {
        cy.get('#nav-dropdown').click();
        cy.get('#logout').click();
        cy.wait(500);
        const user = {
          name: 'Testo2',
          username: 'Tester2',
          password: 'youneverguess'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.login({ username: 'Tester2', password: 'youneverguess' });
        cy.wait(500);
        cy.contains('TestiBlog').should('not.contain', 'delete');
      });

      describe('when additional blogs have been added', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'TestiBlog2', author: 'TestAuthor', url: 'http://testblog.test/blog', likes: 2 });
          cy.createBlog({ title: 'TestiBlog3', author: 'TestAuthor', url: 'http://testblog.test/blog', likes: 8 });
          cy.createBlog({ title: 'TestiBlog4', author: 'TestAuthor', url: 'http://testblog.test/blog', likes: 18 });
          cy.wait(500);
        });

        it('a third blog can be deleted', () => {
          cy.get('#TestiBlog3-delete').click();
          cy.contains('blog deletion succesful');
          cy.should('not.contain', 'TestiBlog3');
        });
      });
    });
  });
});


