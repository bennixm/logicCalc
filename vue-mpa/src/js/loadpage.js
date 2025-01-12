document.addEventListener("DOMContentLoaded", () => {
  loadPage('pages/home.html');
  history.replaceState({ page: 'pages/home.html' }, '', 'home');
});

function loadPage(pagePath) {
  fetch(pagePath)
    .then(response => {
      if (!response.ok) throw new Error('Page not found');
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
    });
}

function navigateTo(page) {
  const currentState = history.state;
  loadPage(page);
  history.pushState({ page: page }, '', page);
}

window.addEventListener('popstate', event => {
  if (event.state && event.state.page) {
    loadPage(event.state.page);
  }
});
