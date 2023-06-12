$(document).ready(function () {
    $("#jsonvali").on("click", function () {
        $(".content").load("../html/jsonvalidate.html");
    });

    $(".dropdown-content a").on("click", function () {
        var name=$(this).attr("id");
        alert(name);
        $(".content").load("../html/"+name+".html");
    });
});
