;(function ($) {
    var imageNum = 2;
    if ($("#maxImageNum").val() != null) {
        imageNum = $("#maxImageNum").val();
    }
    var delParent;

    $.fn.extend({
        takungaeImgup: function (opt, serverCallBack) {
            if (typeof opt != "object") {
                layer.alert('参数错误!');
                return;
            }

            var $fileInput = $(this);
            var $fileInputId = $fileInput.attr('id');

            var defaults = {
                fileType: ["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP"], // 上传文件的类型
                fileSize: 1024 * 1024 * 10, // 上传文件的大小 10M
                count: 0
                // 计数器
            };

            // 组装参数;

            if (opt.success) {
                var successCallBack = opt.success;
                delete opt.success;
            }

            if (opt.error) {
                var errorCallBack = opt.error;
                delete opt.error;
            }

            /* 点击图片的文本框 */
            $(this).change(function () {
                var reader = new FileReader(); // 新建一个FileReader();
                var idFile = $(this).attr("id");
				console.log('-----------------id',idFile)
                var file = document.getElementById(idFile);
                var imgContainer = $(this).parents(".z_photo"); // 存放图片的父亲元素
                var fileList = file.files; // 获取的图片文件
                var input = $(this).parent();// 文本框的父亲元素
                var maxCount = $('#' + idFile).data('maxcount');
                if(maxCount != undefined)imageNum = maxCount;
                var imgArr = [];
                // 遍历得到的图片文件
                var numUp = imgContainer.find(".up-section").length;
                // var totalNum = numUp + fileList.length; // 总的数量
                if (fileList.length > imageNum ) {
                    layer.alert("上传图片数目不可以超过" + imageNum + "个，请重新选择"); // 一次选择上传超过5个
                } else if (numUp <= imageNum) {
                    fileList = validateUp(fileList, defaults);
                    for (var i = 0; i < fileList.length; i++) {
                        var imgUrl = window.URL.createObjectURL(fileList[i]);
                        imgArr.push(imgUrl);
                        var $section = $("<section class='up-section fl loading'>");
                        imgContainer.children(".z_file").before($section);
//                         var $span = $("<span class='up-span'>");
//                         $span.appendTo($section);
                        var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
                            event.preventDefault();
                            event.stopPropagation();
							console.log('----------------点击了吗？')
                            $(".works-mask").show();
                            delParent = $(this).parent();
                            delImg(delParent);//删除图片
                        });
                        $img0.attr("src", "img/a7.png").appendTo($section);
                        var $img = $("<img class='up-img up-opcity'>");
                        $img.attr("src", imgArr[i]);
                        $img.appendTo($section);
                        var $p = $("<p class='img-name-p'>");
                        $p.html(fileList[i].name).appendTo($section);
                        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                        $input.appendTo($section);
                        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                        $input2.appendTo($section);
						console.log("file",fileList[i])
                        uploadImg(opt, fileList[i], $section);
                    }
                    ;
                }

                numUp = imgContainer.find(".up-section").length;
                if (numUp > imageNum) {
                    $(this).parent().hide();
                };

                //input内容清空
                $(this).val("");
            });

// 			$(document).on('click','.close-upimg',function(event){
// 				event.preventDefault();
// 				event.stopPropagation();
// 				console.log('----------------点击了吗2？')
// 				$(".works-mask").show();
// 				delParent = $(this).parent();
// 				delImg(delParent);//删除图片
// 			})
			
            $(".z_photo").delegate(".close-upimg", "click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(".works-mask").show();
                delParent = $(this).parent();
                console.log(delParent.html() + "delegzat=======");
				delImg(delParent);//删除图片
            });

            $(".wsdel-ok").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(".works-mask").hide();
                var numUp = delParent.siblings(".up-section").length;
                if (numUp < imageNum + 1) {
                    delParent.parent().find(".z_file").show();
                }
                delParent.remove();
            });

            $(".wsdel-no").click(function () {
                $(".works-mask").hide();
            });

            // 验证文件的合法性
            function validateUp(files, defaults) {
                var arrFiles = [];// 替换的文件数组
                for (var i = 0, file; file = files[i]; i++) {
                    // 获取文件上传的后缀名
                    var newStr = file.name.split("").reverse().join("");
                    if (newStr.split(".")[0] != null) {
                        var type = newStr.split(".")[0].split("")
                            .reverse().join("");
                        console.log(type + "===type===");
                        if (jQuery.inArray(type, defaults.fileType) > -1) {
                            // 类型符合，可以上传
                            if (file.size >= defaults.fileSize) {
                                layer.alert('文件大小"' + file.name + '"超出10M限制！');
                            } else {
                                arrFiles.push(file);
                            }
                        } else {
                            layer.alert('您上传的"' + file.name + '"不符合上传类型');
                        }
                    } else {
                        layer.alert('您上传的"' + file.name + '"无法识别类型');
                    }
                }
                return arrFiles;
            }

            //删除图片
            function delImg(delParent) {

                console.log('******************************')
                var setid = $(this).attr("set-id");
                layer.open({
                    title: '提示',
                    content: '是否确认删除？'
                    , btn: ['删除', '取消']
                    // , skin: 'footer'
                    , yes: function (index) {
                        var numUp = delParent.siblings().length;
                        if (numUp < 7) {
                            delParent.parent().find(".z_file").show();
                        }
                        delParent.remove();
                        layer.close(index);
                    }
                });
            }
			
            //上传图片
            function uploadImg(opt, file, obj) {
                $("#imguploadFinish").val(false);
                // 验证通过图片异步上传
                var url = opt.url;
                var data = new FormData();
                data.append("path", opt.formData.path);
                data.append("file", file);
				console.log(file,opt.formData.path)
				layer.load(1, {
				  shade: [0.1,'#fff'] //0.1透明度的白色背景
				});
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function (data) {
                        console.log("chenggong");
                        console.log(data);
                        // obj.remove();
                        // 上传成功
                        
						console.log()
                        if (data.status == 1) {
					  		setTimeout(function(){
					  			layer.closeAll()
					  		},500)
                            $(".up-section").removeClass("loading");
                            $(".up-img").removeClass("up-opcity");
                            $("#imguploadFinish").val(true);
                            var htmlStr = "<input type='text' style='display:none;' " +
                                "name='" + opt.formData.name + "' value='" + data.data.id + "'>";
                            obj.append(htmlStr);
                            if (successCallBack) {
                                successCallBack(data);
                            }
                        }

                        if (data.status != 1) {
							setTimeout(function(){
								layer.closeAll()
							},500)
                            obj.remove();
                            $("#imguploadFinish").val(false);
                            if (errorCallBack) {
                                errorCallBack(data.url);
                            }
                        }
                    },
                    error: function (e) {
                        obj.remove();
                        var err = "上传失败，请联系管理员！";
                        $("#imguploadFinish").val(false);
                        if (errorCallBack) {
                            errorCallBack(err);
                        }
                    }
                });
            }

        }
    });

})(jQuery);