// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  // get guides from firebase and add them to list
  const guides = document.querySelector('.guides');
  db.collection('guides')
    .get()
    .then(querySnapshot => {
      let html = '';
      querySnapshot.forEach(doc => {
        const { title, description } = doc.data();
        html += `
        <li>
          <div class="collapsible-header grey lighten-4">${title}</div>
          <div class="collapsible-body white">${description}</div>
        </li>`;
      });
      guides.insertAdjacentHTML('beforeend', html);
    });
});
