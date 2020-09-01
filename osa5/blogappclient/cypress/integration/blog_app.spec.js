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
    cy.get('button').contains('login').click();
  });

  it('user can login', () => {
    cy.get('button').contains('login').click();
    cy.get('#username').type('Tester');
    cy.get('#password').type('youneverguess');
  });

  it('login fails with wrong credentials', () => {
    cy.get('button').contains('login').click();
    cy.get('#username').type('wrong');
    cy.get('#password').type('credentials');
    cy.get('#login-button').click();

    cy.get('.error').contains('wrong username or password');
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'Tester logged in');
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ name: 'Testo', username: 'Tester', password: 'youneverguess' })
        .contains('Testo logged in');
    });

    it('user can log out', () => {
      cy.get('button').contains('log out').click();
      cy.contains('Succesfully logged out');
    });

    it('blog can be added', () => {
      cy.get('button').contains('new blog').click()
        .get('#title').type('a blog')
        .get('#author').type('cypress')
        .get('#url').type('http://testblog/blog')
        .get('button').contains('add').click()

      cy.get('.success').contains('Blog with title a blog added succesfully');
    });

    describe('when blog has been added', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'TestiBlog', author: 'TestAuthor', url: 'http://testblog.test/blog' })
          .wait(500)
      });

      it('a blog can be opened', () => {
        cy.get('button').contains('view').click()

        cy.contains('likes 0');
      });

      it('a blog can be liked', () => {
        cy.wait(500)
          .get('button').contains('view').click()
          .get('button').contains('like').click();

        cy.contains('likes 1');
      });

      it('a blog can be deleted', () => {
        cy.get('button').contains('view').click()
          .get('button').contains('delete').click()
          .get('.success').contains('Blog with title TestiBlog deleted')
          .get('.blog').should('not.contain', 'a blog cypress');
      });

      it('a blog cannot be deleted by unauthorized user', () => {
        cy.get('button').contains('log out').click();
        cy.wait(500);
        const user = {
          name: 'Testo2',
          username: 'Tester2',
          password: 'youneverguess'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.login({ username: 'Tester2', password: 'youneverguess' });
        cy.wait(500);
        cy.get('button').contains('view').click()

        cy.contains('TestiBlog').contains('hide');
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
          cy.contains('TestiBlog3').contains('delete').click();
          cy.get('.success').contains('Blog with title TestiBlog3 deleted');
        });

        it('blogs are sorted by likes', () => {
          cy.contains('TestiBlog3').contains('view').click().get('.likes');

          cy.get('.blog').then($li => {

            expect($li).to.have.length(4);

            expect($li.first()).contain('TestiBlog4');
            expect($li.first()).contain('likes 18');

            expect($li.get()[1]).contain('TestiBlog3');
            expect($li.get()[1]).contain('likes 8');

            expect($li.get()[2]).contain('TestiBlog2');
            expect($li.get()[2]).contain('likes 2');

            expect($li.last()).contain('TestiBlog');
            expect($li.last()).contain('likes 0');

          });
        });
      });
    });
  });
});




