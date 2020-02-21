// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', e => {
  e.preventDefault();
  const adminEmail = adminForm['admin-email'].value.trim();
  // reference to cloud function
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(res => {
    console.log(res);
  });

  adminForm.reset();
});

// track auth state
auth.onAuthStateChanged(function(user) {
  if (user) {
    // check for user admin custom claim
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });

    // get guides data from firestore in realtime
    db.collection('guides').onSnapshot(
      ({ docs }) => {
        setupGuides(docs.map(doc => doc.data()));
      },
      error => console.log(error.message)
    );
  } else {
    // User signed out
    setupUI();
    setupGuides([]);
  }
});

// signup new account
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm.email.value.trim();
  const password = signUpForm.password.value.trim();
  const bio = signUpForm.bio.value.trim();

  // after signup firebase login user automatically
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      // add user to users collection
      return db
        .collection('users')
        .doc(user.uid)
        .set({
          bio
        });
    }) // user added successfully
    .then(() => {
      M.Modal.getInstance(document.getElementById('modal-signup')).close();
      signUpForm.reset();
      signUpForm.querySelector('.error').textContent = '';
    })
    .catch(error => {
      signUpForm.querySelector('.error').textContent = error.message;
    });
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
      loginForm.querySelector('.error').textContent = '';
    })
    .catch(error => {
      loginForm.querySelector('.error').textContent = error.message;
    });
});

// logout
document.getElementById('logout').addEventListener('click', e => {
  auth.signOut();
});

// add a guide
const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = createForm.title.value.trim();
  const content = createForm.content.value.trim();

  M.Modal.getInstance(document.getElementById('modal-create')).close();
  createForm.reset();

  // Add guide to firebase guides collection
  db.collection('guides').add({ title, content });
});
