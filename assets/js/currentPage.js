let pageLinks = window.document.querySelectorAll(".page-link");
pageLinks.forEach(link => {
    if (new URL(link.href).pathname === window.location.pathname)
        link.classList.add("current-page");
});
