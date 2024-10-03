// 导入所需的库
import image from "image";
import http from "http";
import camera from "camera";

// 定义一个函数，用于将图像数据发送到Teachable Machine API并获取预测结果
function predictImage(img: Image): void {
    // 将图像转换为Base64编码的字符串
    let base64Image = image.encodeImage(img);

    // 构建请求URL和请求头
    let url = "https://teachablemachine.withgoogle.com/models/2l40MGnAp/"; // 替换为你的Teachable Machine API URL
    let headers = {"Content-Type": "application/json"};

    // 构建请求体，包含图像数据和其他可能的参数
    let body = {
        "image": base64Image,
        // 其他参数（如模型ID、标签等）
    };

    // 发送POST请求到Teachable Machine API
    http.postJSON(url, body, headers).then(response => {
        // 处理API返回的预测结果
        if (response.statusCode == 200) {
            let result = response.body;
            // 根据预测结果执行相应的操作
            if (result.prediction == "label1") {
                // 执行操作1
            } else if (result.prediction == "label2") {
                // 执行操作2
            }
        } else {
            // 处理错误情况
            basic.showString("Error");
        }
    });
}

// 主程序
basic.forever(function () {
    // 从micro:bit摄像头获取图像
    let img = camera.snapshot();

    // 调用predictImage函数进行预测
    predictImage(img);

    // 等待一段时间再进行下一次预测
    basic.pause(1000);
});
