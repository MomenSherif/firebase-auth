const guidesList = document.querySelector('.guides');
const loggedOutList = document.querySelectorAll('.logged-out');
const loggedInList = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

function setupUI(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.classList.remove('hide'));
    }
    // get user bio
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(userData => {
        const html = `
        <div>Logged in as ${user.email}</div>
        <div>${userData.data().bio}</div>
        ${user.admin ? '<div class="red-text">Admin</div>' : ''}
       `;
        accountDetails.innerHTML = html;
      });

    loggedOutList.forEach(el => el.classList.add('hide'));
    loggedInList.forEach(el => el.classList.remove('hide'));
  } else {
    accountDetails.textContent = '';
    loggedOutList.forEach(el => el.classList.remove('hide'));
    loggedInList.forEach(el => el.classList.add('hide'));
    adminItems.forEach(item => item.classList.add('hide'));
  }
}

function setupGuides(guides) {
  if (guides.length > 0) {
    guidesList.innerHTML = guides
      .map(({ title, content }) => {
        return `
      <li>
      <div class="collapsible-header grey lighten-4">${title}</div>
      <div class="collapsible-body white">${content}</div>
      </li>`;
      })
      .join('');
  } else {
    guidesList.innerHTML = '<h4 class="center-align">Login to view Guides</h4>';
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
