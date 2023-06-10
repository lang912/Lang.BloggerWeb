$.ajaxResuqst = {
  postRequest: function (url, data, successCallback, errorCallback) {
    var $btn = $(this);  // 获取触发事件的按钮元素
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      beforeSend: function () {
        $btn.attr('disabled', true);  // 禁用按钮
      },
      success: function (response) {
        if (successCallback && typeof successCallback === 'function') {
          successCallback(response);
        }
      },
      error: function (error) {
        if (errorCallback && typeof errorCallback === 'function') {
          errorCallback(error);
        } else {
          alert('网络异常，请稍后再试。');
        }
      },
      complete: function () {
        $btn.attr('disabled', false);  // 恢复按钮可用状态
      }
    });
  },

  //   $('#my-button').on('click', function(event) {
  //     postRequest('https://example.com/api', {key1: 'value1', key2: 'value2'}, function(response) {
  //       console.log('请求成功:', response);
  //     }, function(error) {
  //       console.log('请求失败:', error);
  //     });
  //   });

  // var formData = new FormData();
  // formData.append('file1', $('#file1')[0].files[0]);
  // formData.append('file2', $('#file2')[0].files[0]);
  // uploadFiles(
  //   'path/to/upload',
  //   formData,
  //   function (response) {
  //     alert('上传成功，服务器返回：' + response);
  //   },
  //   function (errorMessage) {
  //     alert('上传失败，错误信息：' + errorMessage);
  //   }
  // );

  uploadFiles: function (url, formData, successCallback, errorCallback) {
    // 禁用上传按钮避免重复提交
    var uploadButton = $('#upload-button');
    uploadButton.prop('disabled', true);

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (response) {
        // 请求成功，执行回调函数并启用上传按钮
        successCallback(response);
        uploadButton.prop('disabled', false);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 网络错误，执行错误回调函数并启用上传按钮
        errorCallback(textStatus + ': ' + errorThrown);
        uploadButton.prop('disabled', false);
      }
    });
  },

  // function downloadPdf(url) {
  //   var $a = $('<a>', {href: url, download: 'example.pdf'});  // 创建一个下载链接元素
  //   $('body').append($a);  // 将元素添加到页面中
  //   $a[0].click();  // 模拟用户点击下载链接
  //   $a.remove();  // 下载完成后，将元素从页面中移除
  // }

  downloadFile: function (url, filename) {
    var $btn = $(event.currentTarget);  // 获取触发事件的按钮元素

    // 检查文件扩展名，设置 Content-Type 和 Accept 头部
    var contentType = '';
    var accept = '';
    var extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        contentType = 'application/pdf';
        accept = 'application/pdf';
        break;
      case 'docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        accept = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'xlsx':
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      default:
        contentType = 'application/octet-stream';
        accept = '*/*';
        break;
    }

    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        'Content-Type': contentType,
        'Accept': accept
      },
      xhrFields: {
        responseType: 'blob'  // 支持二进制流响应类型
      },
      beforeSend: function () {
        $btn.attr('disabled', true);  // 禁用按钮
      },
      success: function (blob) {
        var link = document.createElement('a');
        var url = window.URL.createObjectURL(blob);

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);

        link.click();
        $(link).remove();

        window.URL.revokeObjectURL(url);
      },
      error: function (xhr, status, error) {
        if (xhr.status === 404) {
          alert('文件不存在，请检查链接是否正确。');
        } else if (status === 'error') {
          alert('下载失败，请稍后再试。');
        }

        console.error(error);
      },
      complete: function () {
        $btn.attr('disabled', false);  // 恢复按钮可用状态
      }
    });
  }
}
