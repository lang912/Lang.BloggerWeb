$(document).ready(function () {

    ////原生的文件选择按钮太丑了，这里放一个button覆盖他，然后在点击这个button的时候绑定文件选择框的文件
    $("#filebtn").click(function () {
        $("#file").click();
    });

    // 文件选中的事件
    $("#file").change(function (e) {
       console.log(e);
       alert("sdasd")
    });
});