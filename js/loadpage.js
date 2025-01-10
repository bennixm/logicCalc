function loadPage(page) {
    const contentDiv = document.getElementById("content");
    const pageUrl = `pages/${page}`;
    
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
            window.history.pushState({ page: page }, page, pageUrl);
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>Error loading page: ' + error.message + '</p>';
        });
}

window.onpopstate = function(event) {
    if (event.state) {
        loadPage(event.state.page); 
    }
};
