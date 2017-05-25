$(document).ready(function(){
    $('#hamburgerBtn').on('click', function(){
        $('#topNavigation').animate({ top: '0px' }, 300);
    });
    $('#menuCloseButton').on('click', function(){
        $('#topNavigation').animate({ top: '-300px' }, 300);
    });
});