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



// 获取计数
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
