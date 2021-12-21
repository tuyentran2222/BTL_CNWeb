let searchbar = document.getElementById('search-bar');
searchbarContent = 
'<div class="container">' +
    '<div class="search-bar">' +
        '<input type="text" class="search-bar__input" name="searchCourse" placeholder="Search" autocomplete="off">' +
        '<button class="search-bar__btn btn-primary" onclick="Test()">Search</button>' +
    '</div>' +
'</div>';

searchbar.innerHTML = searchbarContent;

