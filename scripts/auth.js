const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.email.value.trim();
  const password = signUpForm.password.value.trim();

  // after sign up firebase login user automatically
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred);
      M.Modal.getInstance(document.getElementById('modal-signup')).close();
      signUpForm.reset();
    })
    .catch(error => console.log(error));
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.email.value.trim();
  const password = signUpForm.password.value.trim();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred);
      M.Modal.getInstance(document.getElementById('modal-login')).close();
      loginForm.reset();
    })
    .catch(err => console.log(err));
});

document.getElementById('logout').addEventListener('click', e => {
  auth.signOut();
});

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log(user);
  } else {
    // User signed out
    console.log('signed out');
  }
});
