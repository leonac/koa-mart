const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const { init: initDB, Counter } = require("./db");

const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");

// 首页
router.get("/", async (ctx) => {
  ctx.body = homePage;
});

// 更新计数
router.post("/api/count", async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }

  ctx.body = {
    code: 0,
    data: await Counter.count(),
  };
});

// 获取计数
router.get("/api/count", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    code: 0,
    data: result,
  };
});

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});



// 活动列表接口
router.get("/api/topics", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    "msg": "请求成功",
    "data":
    {
        "totalPage": 1,
        "posts":
        [
            {
                "postId": 1,
                "title": "中古赶海市集",
                "time": "周一",
                "address": "大悦城F1",
                "description": "复古/创意"
            },
            {
                "postId": 2,
                "time": "周六和周日",
                "title": "凤凰艺市",
                "address": "西湖艺创小镇",
                "description": "创意/手工"
            },
            {
                "postId": 3,
                "time": "周三",
                "title": "2023大屋顶 怂人胆X东海溜儿节",
                "address": "良渚文化艺术中心",
                "description": "语言/话剧"
            },
            {
                "postId": 4,
                "time": "周三至周五",
                "title": "大可露营夏日市集",
                "address": "西湖区灵龙路586号田野和季风",
                "description": "露营/户外"
            },
            {
                "postId": 5,
                "time": "周一至周日",
                "title": "青山集",
                "address": "青山村 访客中心",
                "description": "手工/创意/户外/舞台"
            }
        ],
        "currentPage": 1
    },
    "code": 0
  };
});


// 具体活动接口
router.get("/api/post", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    "msg": "请求成功",
    "data":
    {
        "post":
        {
            "postId": 1495,
            "title": "青山集",
            "contentHtml": "<p><img src=\"https://mmbiz.qpic.cn/mmbiz_png/icC3U28B3gItwEtcIibRmKv1SWPzERiawkRhhfzH3UyHArSJJb3cd9zysXURUVqv9VR8cepxiavafYjsSKntAIcxxw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1\" alt=\"holder\"></p>\n  <p>\u7ed3\u675f\u4e86\u7e41\u5fd9\u7684\u5de5\u4f5c\u65e5\uff0c\u5468\u672b\u6765\u9752\u5c71\u6751\u77ed\u6682\u907f\u4e16\uff0c\u6cbf\u7740\u7af9\u6797\u5e7d\u5f84\uff0c\u8d70\u8fdb\u53e4\u6734\u519c\u5bb6\uff0c\u8fdc\u79bb\u55a7\u56a3\uff0c\u6c89\u6d78\u5728\u81ea\u7136\u7684\u6000\u62b1\u4e2d\u3002\ud83c\udf43</p>\n  <p>\u8fd9\u91cc\u6709\u56fe\u4e66\u9986\u3001\u7af9\u827a\u574a\u3001\u5496\u5561\u9986\u3001\u5c0f\u9152\u9986\u3001\u6c34\u5e93\u3001\u6237\u5916\u6d3b\u52a8\u548c\u7597\u6108\u4e2d\u5fc3\uff0c\u6bcf\u4e2a\u5730\u65b9\u90fd\u6563\u53d1\u7740\u72ec\u7279\u7684\u6c1b\u56f4\uff0c\u8ba9\u4eba\u5fc3\u60c5\u5927\u597d\uff01\ud83c\udd99</p>\n  <p><strong>\ud83d\udccd \u5730\u5740\uff1a</strong>\u4f59\u676d\u533a\u9ec4\u6e56\u9547\u9752\u5c71\u6751</p>\n  <p><strong>\ud83d\ude97 \u4ea4\u901a\uff1a</strong>\u9002\u5408\u81ea\u9a7e\uff0c\u8ddd\u79bb\u676d\u5dde\u57ce\u533a\u7ea61\u5c0f\u65f6\u8f66\u7a0b\uff08\u53ef\u5bfc\u822a\u81f3\u6751\u5185\u4efb\u610f\u5730\u70b9\uff09</p>\n  <p><strong>\ud83c\udfa2 \u5a31\u4e50\uff1a</strong>\u9f99\u575e\u6c34\u5e93\u3001\u878d\u8bbe\u8ba1\u56fe\u4e66\u9986\u3001\u5e73\u884c\u5b87\u5b99\u5b8b\u5c0f\u9986\u3001\u9752\u5c71\u81ea\u7136\u5b66\u6821\u3001\u77f3\u6276\u68af\u666f\u533a\u3001\u738b\u4f4d\u5c71</p>\n  <p><strong>\ud83d\udfe2 TIPS |</strong> \u201c\u9752\u5c71\u6751\u8fd8\u662f\u90a3\u4e2a\u9752\u5c71\u6751\uff0c\u9752\u5c71\u6751\u4e0d\u662f\u90a3\u4e2a\u9752\u5c71\u6751\u201d</p>\n  <p><strong>\ud83d\udcda \u878d\u8bbe\u8ba1\u56fe\u4e66\u9986\uff1a</strong>\u662f\u5c06\u65e7\u5382\u623f\u6539\u9020\u800c\u6210\u7684\uff0c\u975e\u5e38\u6709\u7279\u8272\u3002\u8fd9\u91cc\u4e0d\u4ec5\u63d0\u4f9b\u5b66\u4e60\u73af\u5883\uff0c\u8fd8\u5c55\u793a\u624b\u5de5\u827a\u548c\u975e\u9057\u4f20\u7edf\uff0c\u8ba9\u4eba\u53d7\u76ca\u532a\u6d45\uff5e</p>\n  <p><strong>\ud83c\udfeb \u9752\u5c71\u81ea\u7136\u5b66\u6821\uff1a</strong>\u4e0e\u4f20\u7edf\u5b66\u6821\u622a\u7136\u4e0d\u540c\uff0c\u6ce8\u91cd\u539f\u751f\u6001\u81ea\u7136\u6559\u5b66\uff0c\u662f\u4e00\u6b21\u96be\u5f97\u7684\u7814\u5b66\u9009\u62e9\uff01</p>\n  <p><strong>\ud83c\udf76 \u5e73\u884c\u5b87\u5b99\u5b8b\u5c0f\u9986\uff1a</strong>\u662f\u4e00\u5bb6\u5145\u6ee1\u5b8b\u97f5\u7684\u5c0f\u9152\u9986\uff0c\u54c1\u7c7b\u4e0d\u4ec5\u9650\u4e8e\u9152\uff0c\u8fd8\u6709\u591a\u79cd\u8336\u53f6\ud83c\udf75\u548c\u7cd5\u70b9\u4f9b\u60a8\u54c1\u5c1d\u3002\u5728\u5b8b\u5c0f\u9986\uff0c\u60a8\u8fd8\u53ef\u4ee5\u4f53\u9a8c\u5b8b\u4ee3\u56db\u96c5\u548c\u975e\u9057\u8bfe\u7a0b\u54e6\uff5e</p>"
        }
    },
    "code": 0
  };
});



const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
