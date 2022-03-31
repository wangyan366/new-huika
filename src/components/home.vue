<template>
  <div id="home-index">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="moreNoticeClick"
      safe-area-inset-top
      :border="false"
    >
      <template #left>
        <div class="nav-bar-left">
          <div>Hello！</div>
          <div>让闲置资源更有价值</div>
        </div>
      </template>
      <template #right>
        <van-icon name="bell" size="18" dot color="#fff" />
      </template>
    </van-nav-bar>
    <div class="swipe">
      <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item v-for="item in cardInfo.bannerList" :key="item.id">
          <img :src="item.imageUrl" alt="" class="swipe-pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="mark">
      <van-grid :border="false" square class="grid">
        <van-grid-item @click="zhuceClick">
          <van-image
            :src="gridItem.zhuce"
            width="26"
            height="28"
            fit="contain"
          />
          <span class="grid-text">注册</span>
        </van-grid-item>
        <van-grid-item @click="certificationClick">
          <van-image
            :src="gridItem.renzheng"
            width="22"
            height="28"
            fit="contain"
          />
          <span class="grid-text">实名认证</span>
        </van-grid-item>
        <van-grid-item @click="tijiaokamiClick">
          <van-image
            :src="gridItem.tijiao"
            width="28"
            height="28"
            fit="contain"
          />
          <span class="grid-text">提交卡密</span>
        </van-grid-item>
        <van-grid-item @click="withdrawalClick">
          <van-image
            :src="gridItem.zhanghu"
            width="28"
            height="28"
            fit="contain"
          />
          <span class="grid-text">账户提现</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="card">
      <p class="text">联系我们</p>
      <div class="contact">
        <div class="card-row"><span class="pic"></span><span>{{cardInfo.wechat}}</span></div>
        <div class="card-row"><span class="pic"></span><span>{{cardInfo.qq}}</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <!-- <van-image :src="cardItem.component" width="66" height="16" /> -->
        <span>公告</span>
        <van-image
          :src="cardItem.laba"
          width="15"
          height="15"
          style="vertical-align: middle"
        />
        <div class="you" @click="moreNoticeClick">
          <van-image :src="cardItem.you" width="20" height="20" />
        </div>
      </div>
      <div class="card-top">
        <van-notice-bar
          left-icon="volume-o"
          scrollable
          :text="cardInfo.notice.title"
          background="#27ca6c"
          color="#fff"
        />
      </div>
      <div class="card-content">
        <!-- <span class="label">天猫</span> -->
        <p>{{ cardInfo.notice.content }}</p>
        <span class="time">{{ cardInfo.notice.publishTimeLabel }}</span>
      </div>
    </div>
    <van-tabs
      swipeable
      color="#2ecc71"
      background="#f5f7fa"
      @click="onGridItemClick"
      v-model="vanActive"
    >
      <van-tab
        v-for="item in this.cardInfo.cardTypeList"
        :title="item.name"
        :key="item.id"
      >
      </van-tab>
    </van-tabs>
    <van-grid :border="false" :column-num="2" :gutter="12">
      <van-grid-item
        v-for="item in this.cardCategoryList"
        :key="item.index"
        @click="gridItemClick(item)"
      >
        <van-image :src="item.icon" height="100" fit="contain" />
        <template v-slot:error>加载失败</template>
      </van-grid-item>
    </van-grid>
    <!-- <div class="problem">
      <div>
        <p>{{ this.cardInfo.faq.title }}</p>
        <span>更多</span>
      </div>
      <div>{{ this.cardInfo.faq.content }}</div>
    </div> -->
    <div class="problem-box">
      <div class="problem-box-title">
        <div>常见问题</div>
        <span @click="moreClick">更多</span>
      </div>
      <div class="problem-box-top">
        <div class="problem-box-top-pic"></div>
        <div class="problem-box-content">{{ this.cardInfo.faq.title }}</div>
      </div>
      <div class="problem-box-down">
        <div class="problem-box-down-pic"></div>
        <div class="problem-box-content">{{ this.cardInfo.faq.content }}</div>
      </div>
    </div>
    <div style="height: 43px"></div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import {
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Image as VanImage,
  Grid,
  GridItem,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Badge,
  Toast,
  NoticeBar,
} from "vant";
export default {
  name: "Home",
  components: {
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [VanImage.name]: VanImage,
    [Lazyload.name]: Lazyload,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Badge.name]: Badge,
    [NoticeBar.name]: NoticeBar,
    //  'van-lazyload': Lazyload
  },
  data() {
    return {
      cardType: {},
      cardCategoryList: [],
      vanActive: 0,
      cardInfo: this.creatCardInfo(),
      active: 0,
      images: ["https://img01.yzcdn.cn/vant/apple-1.jpg"],
      gridItem: {
        zhuce: require("@/assets/images/zhuce.png"),
        renzheng: require("@/assets/images/renzheng.png"),
        tijiao: require("@/assets/images/tijiao.png"),
        zhanghu: require("@/assets/images/zhanghu.png"),
      },
      cardItem: {
        component: require("@/assets/images/component.png"),
        laba: require("@/assets/images/laba.png"),
        you: require("@/assets/images/you.png"),
      },
    };
  },

  mounted() {
    this.setTabbarShow(true);
    this.getHome()
      .then((res) => {
        console.log("🚀 ~ file: home.vue ~ line 216 ~ .then ~ res", res)
        this.cardInfo = res;
        this.cardCategoryList = res.cardCategoryList;
        this.gridItemTitle = res.cardTypeList[0];
      })
      .catch((err) => {});
  },

  methods: {
    ...mapMutations(["setTabbarShow"]),
    moreNoticeClick() {
      this.$router.replace({
        path: "/noticepage",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    moreClick() {
      this.$router.replace({
        path: "/problem",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    creatCardInfo() {
      return {
        faq: {
          title: "",
          content: "",
        },
        cardTypeList: [],
        notice: {
          title: "",
          content: "",
          publishTimeLabel: "",
        },
      };
    },
    ...mapActions(["getHome", "listCardCategory"]),
    gridClick(val) {},
    tijiaokamiClick() {
      this.$router.replace({
        path: "/carCenter",
        query: {
          redirect: this.$router.currentRoute.fullPath,
          active: "carCenter",
        },
      });
    },
    passwordClick() {
      this.$router.replace({
        path: "/password",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    certificationClick() {
      this.$router.replace({
        path: "/certification",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    withdrawalClick() {
      this.$router.replace({
        path: "/cash",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    phoneClick() {
      this.$router.replace({
        path: "/phone",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    gridItemClick(val) {
      this.$router.replace({
        path: "/carCenter",
        query: {
          cardType: this.cardType.id,
          gridItem: val.id,
          active: "carCenter",
        },
      });
    },
    onGridItemClick(name, title) {
      let cardType = this.cardInfo.cardTypeList.find((m) => {
        return m.name == title;
      });
      this.cardType = cardType;
      this.listCardCategory({ cardTypeId: cardType.id, limit: 1 })
        .then((res) => {
          this.cardCategoryList = res;
        })
        .catch((err) => {});
    },
    onChange(index) {
      // Toast("当前 Swipe 索引：" + index);
    },
    zhuceClick() {
      this.$router.replace({
        path: "/register",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style lang="less" scoped>
.contact{

  display: flex;
  padding-bottom: 10px;
  
  .pic{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../assets/images/weixin.png");
    background-size: cover;
    margin-right: 10px;
  }
}
.card{
  .text{
    margin:0 10px;
    display: inline-block;
    border-bottom: 3px solid #2ecc71;
    padding-bottom: 2px;
    
  }
}
.card-row {
  flex: 1;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom :6px; 
  margin-top: 10px;
}
.card-row:nth-child(1){
  border-right: 1px solid #ccc;
}
.card-row:nth-child(2){
    .pic{
    background: url("../assets/images/qq.png");
    background-size: cover;
   
  }
}
/deep/ .van-nav-bar__content {
  background: rgba(46, 204, 113, 1);
  color: #fff;
}
/deep/ .van-swipe {
  height: 100%;
}
.you {
  float: right;
  font-size: 12px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  color: rgba(46, 204, 113, 1);
}
.marquee {
  width: 100%;
  // margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 25s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

.problem-box {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 1px 21px 0px rgba(40, 46, 45, 0.06);
  width: 90%;
  margin: auto;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;
  .problem-box-content {
    flex: 1;
  }
  .problem-box-title {
    font-size: 18px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      cursor: pointer;
      color: #256df3;
    }
  }
  .problem-box-top {
    line-height: 30px;
    border-bottom: 1px dashed #ccc;
    font-size: 16px;
    display: flex;
    padding: 6px 0;
    .problem-box-top-pic {
      width: 25px;
      height: 25px;
      background: url("../assets/images/problem/b.png");
      background-size: cover;
      display: inline-block;
      margin-right: 6px;
    }
  }
  .problem-box-down {
    font-size: 14px;
    display: flex;
    color: #747474;
    padding: 6px 0;
    .problem-box-down-pic {
      margin-right: 14px;
      width: 20px;
      height: 20px;
      background: url("../assets/images/problem/c.png");
      background-size: cover;
      display: inline-block;
    }
  }
}
.swipe {
  background: rgba(46, 204, 113, 1);
  position: relative;
  box-sizing: border-box;
  height: 160px;
}
.swipe img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  height: 132px;
  object-fit: cover;
  width: 95%;
  border-radius: 14px;
}
.nav-bar-left {
  text-align: left;
  margin-top: 6px;
}
.nav-bar-left :first-child {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 2px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.nav-bar-left :nth-child(2) {
  font-size: 16px;
  font-weight: 400;
}
#home-index {
  background: #f5f7fa;
  height: 100%;
  overflow-x: auto;
}
.grid-text {
  font-size: 14px;
  font-weight: 500;
  margin-top: 6px;
}
.card {
  // margin: 0 10px;
  width: 94%;
  // height: 70px;
  margin: 0 auto;
  margin-top: 31px;
  box-sizing: border-box;
  font-size: 14px;
  background: #fff;
  padding-top: 6px;
  border-radius: 8px;
  .card-content {
    display: flex;
    align-items: center;
    height: 46px;
    border-bottom: 1px solid #f3f3f3;
  }
  .card-content p {
    word-break: break-all;
    margin-left: 10px;
  }
  .card-content:nth-child(1) {
    border-bottom: 1px solid #f3f3f3;
  }
  .card-header {
    line-height: 28px;
    height: 28px;
    padding-left: 7px;
  }
  .card-top {
    line-height: 18px;
    height: 18px;
    background: #2ecc71;
    font-size: 12px;
    color: #fff;
    overflow: hidden;
    // display: flex;
    align-items: center;
    width: 100%;
    .text {
      display: inline-block;
      // width: 90%;
      transform: scale(0.94);
      // word-break: break-all;
      // height: 100%;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // -webkit-line-clamp: 1;
      // -webkit-box-orient: vertical;
    }
    /deep/ .van-image {
      margin-right: 14px;
    }
  }
  .label {
    color: #fff;
    background: #2ecc71;
    padding: 0 6px;
    font-size: 12px;
    line-height: 18px;
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 4px;
  }
  p {
    flex: 1;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .time {
    font-size: 14px;
    color: #e6e6e6;
    margin-right: 16px;
  }
}

.grid {
  background: #f5f7fa;
  width: 94%;
  background: #f5f7fa;
  width: 94%;
  border-radius: 8px;
  margin: auto;
}
.mark {
  width: 100%;
  position: relative;
}
.mark::before {
  content: "";
  width: 100%;
  height: 50%;
  background: #2ecc71;
  display: block;
  position: absolute;
  top: 0px;
}
/deep/ .van-tab .van-tab__text {
  font-weight: 600;
}
/deep/ .van-tabs {
  background: #f5f7fa;
  padding-top: 20px;
  padding-bottom: 10px;
}
/deep/ .van-tab__pane {
  padding-top: 20px;
}
/deep/ .grid {
  box-shadow: 0 1px 6px#84f1b2;
}
/deep/ .grid .van-grid-item:nth-child(1) .van-grid-item__content {
  border-radius: 8px 0 0 8px;
}
/deep/ .grid .van-grid-item:nth-child(4) .van-grid-item__content {
  border-radius: 0px 8px 8px 0;
}
/deep/ .van-notice-bar {
  height: 100%;
}
</style>