$(document).ready(function() {
    initPage();
})
function initPage(){
    const $start = $('#start');
    const $end = $('#end');
    $.get('/components/header.html', data => {$start.append(data)})
    $.get('/components/footer.html', data => {$end.append(data)})
}