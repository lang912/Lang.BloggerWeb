$(document).ready(function () {
    $("#jsonvali").on("click", function () {
        $(".content").load("../html/jsonvalidate.html");
    });

    // 绑定a标签切换内容
    $(".dropdown-content a").on("click", function () {
        var name=$(this).attr("id");
        $(".content").load("../html/"+name+".html");
    });
});
