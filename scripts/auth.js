// track auth state
auth.onAuthStateChanged(function(user) {
  if (user) {
    // update menu if logged in
    document
      .querySelectorAll('.logged-out')
      .forEach(el => el.classList.add('hide'));

    document
      .querySelectorAll('.logged-in')
      .forEach(el => el.classList.remove('hide'));

    // get guides data from firestore
    db.collection('guides')
      .get()
      // returns querySnapshot has docs array
      .then(({ docs }) => {
        setupGuides(docs.map(doc => doc.data()));
      });
  } else {
    // update menu if not logged in
    document
      .querySelectorAll('.logged-in')
      .forEach(el => el.classList.add('hide'));

    document
      .querySelectorAll('.logged-out')
      .forEach(el => el.classList.remove('hide'));

    // User signed out
    setupGuides([]);
  }
});

// signup new account
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.email.value.trim();
  const password = signUpForm.password.value.trim();

  // after signup firebase login user automatically
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred);
      M.Modal.getInstance(document.getElementById('modal-signup')).close();
      signUpForm.reset();
    })
    .catch(error => console.log(error));
});

// signin
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      M.Modal.getInstance(document.getElementById('modal-login')).close();
      loginForm.reset();
    })
    .catch(err => console.log(err));
});

// logout
document.getElementById('logout').addEventListener('click', e => {
  auth.signOut();
});
