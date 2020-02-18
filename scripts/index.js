const guidesList = document.querySelector('.guides');
const loggedOutList = document.querySelectorAll('.logged-out');
const loggedInList = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

function setupUI(user) {
  if (user) {
    loggedOutList.forEach(el => el.classList.add('hide'));
    loggedInList.forEach(el => el.classList.remove('hide'));
    accountDetails.textContent = `Logged in as ${user.email}`;
  } else {
    loggedOutList.forEach(el => el.classList.remove('hide'));
    loggedInList.forEach(el => el.classList.add('hide'));
    accountDetails.textContent = '';
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
    guidesList.innerHTML = '<h4 class="center-align">Login for Guides</h4>';
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
