$(document).ready(function () {

    var maxFileSize = 1024 * 1024;
    ////原生的文件选择按钮太丑了，这里放一个button覆盖他，然后在点击这个button的时候绑定文件选择框的文件
    $("#filebtn").click(function () {
        $("#file").click();
    });

    // 文件选中的事件
    $("#file").change(function (e) {
        var fileList = $(this)[0].files;
        var data = new FormData();
        var choosedSize = 0;
        for (var i = 0; i < fileList.length; i++) {
            data.append(fileList[i].name, fileList[i]);
            choosedSize += fileList[i].size;
        }

        if (maxFileSize < choosedSize) {
            alert("最大上传文件大小为10M！d当前所选大小为 " + choosedSize / 1024 / 1024 + "M");
            return;
        }

        $.ajaxResuqst.uploadFiles(
            "http://localhost:10000/ToolAPI/PDF/WordToPdf", 
             data,
            function (response) {
                alert('上传成功，服务器返回：' + response);
            },
            function (errorMessage) {
                alert('上传失败，错误信息：' + errorMessage);
            }
        );
    });
});