$(document).ready(function () {
    // 绑定a标签切换内容
    $(".main ul a[id]").on("click", function () {
        var name=$(this).attr("id");
        $(".content").load("../html/"+name+".html");
    });
});
