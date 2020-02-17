const guidesList = document.querySelector('.guides');
function setupGuides(guides) {
  if (guides.length > 0) {
    guidesList.innerHTML = guides
      .map(({ title, description }) => {
        return `
      <li>
      <div class="collapsible-header grey lighten-4">${title}</div>
      <div class="collapsible-body white">${description}</div>
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
