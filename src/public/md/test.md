* * *
## 强制浏览器使用本地缓存
强制浏览器使用本地缓存（cache-control/<strong>expires</strong>），不要和服务器通信。这个好像是服务器返回一个头让浏览器缓存下来。
```
var handle = function (req, res) {
    fs.readFile(filename, function(err, file) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
        res.setHeader("Expires", expires.toUTCString());
        res.writeHead(200, "Ok");
        res.end(file);
    });
};
```

非条件请求（在服务端响应内容时，让浏览器明确地将内容缓存起来）
Expires是一个GMT格式的时间字符串（GMT时间与北京时间相互可以转化），在服务器端设置Expires可以告知浏览器要缓存的内容，只要本地还存在这个文件，在过期时间之前，都不会再发起.
## 文件级别的精确缓存控制
利用数据摘要算法对文件求摘要信息，摘要信息与文件内容一一对应，就有了一种可以精确到单个文件粒度的缓存控制依据了。
![文件级别的精确缓存控制](http://upload-images.jianshu.io/upload_images/3808143-f037d3a1efd3ea1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## CDN部署
>两个方案
1. 先部署页面，再部署资源：在二者部署的时间间隔内，如果有用户访问页面，就会在新的页面结构中加载旧的资源，并且把这个旧版本的资源当做新版本缓存起来，其结果就是：用户访问到了一个样式错乱的页面，除非手动刷新，否则在资源缓存过期之前，页面会一直执行错误。
2. 先部署资源，再部署页面：在部署时间间隔之内，有旧版本资源本地缓存的用户访问网站，由于请求的页面是旧版本的，资源引用没有改变，浏览器将直接使用本地缓存，这种情况下页面展现正常；但没有本地缓存或者缓存过期的用户访问网站，就会出现旧版本页面加载新版本资源的情况，导致页面执行错误，但当页面完成部署，这部分用户再次访问页面又会恢复正常了。

## 非覆盖式发布

![非覆盖式发布](http://upload-images.jianshu.io/upload_images/3808143-13931a37282302c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
看上图，用文件的摘要信息来对资源文件进行重命名，把摘要信息放到资源文件发布路径中，这样，内容有修改的资源就变成了一个新的文件发布到线上，不会覆盖已有的资源文件。上线过程中，先全量部署静态资源，再灰度部署页面，整个问题就比较完美的解决了。

### 总结
1. 配置超长时间的本地缓存                 —— 节省带宽，提高性能
2. 采用内容摘要作为缓存更新依据      —— 精确的缓存控制
3. 静态资源CDN部署                           —— 优化网络请求
4. 更资源发布路径实现非覆盖式发布  —— 平滑升级

![facebook](http://upload-images.jianshu.io/upload_images/3808143-5edabc91ab93d0ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)