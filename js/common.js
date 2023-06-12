$.ajaxResuqst = {

  ////type=1 表示时间戳，其余值表示年月日时分秒
  getCurrentTime: function (type) {
    var time = new Date();
    if (type === 1) {
      return Math.round(time.getTime() / 1000);
    }

    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDay();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var millsecconds = time.getMilliseconds();
    return year + '' + month + '' + day + '' + hour + '' + minute + '' + second + '' + millsecconds;
  },

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

  uploadAndDownloadFile: function (url, formData, button, fileName, errorCallback) {
    ////提交按钮禁用掉
    debugger;
    var $btn = $(button);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      xhrFields: {
        ////支持二进制流响应类型,否则文件内容缺失，很重要
        responseType: 'blob'
      },
      beforeSend: function () {
        ////按钮不可再点击
        $btn.attr("disabled", true);
      }, success: function (response, status, xhr) {
        ////上传成功的
        $.ajaxResuqst.downloadFile(response, fileName);
      }, error: function (jqXHR, textStatus, errorThrown) {
        ////错误的触发
        errorCallback(textStatus + ': ' + errorThrown);
      }, complete: function () {
        ////完成后，按钮可再次点击
        $btn.attr("disabled", false);
      }
    });
  },

  uploadFiles: function (url, formData, button, successCallback, errorCallback) {
    // 禁用上传按钮避免重复提交
    var $btn = $(button);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      xhrFields: {
        responseType: 'blob'  // 支持二进制流响应类型
      },
      beforeSend: function () {
        $btn.attr('disabled', true);  // 禁用按钮
        debugger;
      },
      success: function (response, status, xhr) {
        // 请求成功，执行回调函数并启用上传按钮
        successCallback(response, status, xhr);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 网络错误，执行错误回调函数并启用上传按钮
        errorCallback(textStatus + ': ' + errorThrown);
      },
      complete: function () {
        $btn.attr('disabled', false);  // 恢复按钮可用状态
      }
    });
  },

  downloadFile: function (data, filename) {
    debugger;
    // 创建链接元素，并指定下载属性和文件名
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
    link.download = filename;
    // 模拟用户单击链接实现下载
    link.click();
    // 释放对象 URL 的内存占用
    window.URL.revokeObjectURL(link.href);
  },

  // function downloadPdf(url) {
  //   var $a = $('<a>', {href: url, download: 'example.pdf'});  // 创建一个下载链接元素
  //   $('body').append($a);  // 将元素添加到页面中
  //   $a[0].click();  // 模拟用户点击下载链接
  //   $a.remove();  // 下载完成后，将元素从页面中移除
  // }
}
