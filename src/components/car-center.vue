<template>
  <div id="car-center">
    <!-- <div class="car-center-header" ref="header">
			<form action="/">
				<van-search v-model="value" placeholder="搜索商品名称" @search="onSearch" safe-area-inset-top border>
				</van-search>
			</form>
		</div> -->
    <van-nav-bar safe-area-inset-top :border="false" title="兑卡中心" />
    <div class="car-center-content" ref="content">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.name"
          v-for="item in cardList.cardTypeList"
          :key="item.index"
        >
        </van-sidebar-item>
      </van-sidebar>
      <div class="van-sidebar-content">
        <!-- <div class="van-sidebar-content-header">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" style="" />
        </div> -->
        <div class="van-sidebar-content-nav">
          <div class="nav-title">移动运营商</div>
          <div class="nav-choose-content">
            <div
              class="nav-choose"
              v-for="(item, index) in cardList.cardCategoryList"
              :key="index"
              :class="current == index ? 'active' : ''"
              @click="handleClick(index, item.id)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="nav-title">充值金额</div>
          <div class="nav-panel" v-show="cardList.cardValueList.length > 0">
            <div
              class="nav-panel-choose"
              v-for="(item, index) in cardList.cardValueList"
              :key="index"
              :class="rechargeCurrent == index ? 'rechargeActive' : ''"
              @click="handleRechargeClick(index, item)"
            >
              <div class="choose-box">
                <div class="choose-top">
                  <span class="choose-title">{{ item.faceValue }}元</span>
                  <span class="choose-discount">{{ item.discountLabel }}</span>
                </div>
                <div class="choose-down">售价{{ item.discountValue }}元</div>
                <span class="choose-remark">{{ item.remark }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      :title="cardInfo.cardCategoryName ? cardInfo.cardCategoryName : ''"
      :closeable="false"
      safe-area-inset-bottom
    >
      <div class="action-sheet-content">
        <div class="van-sidebar-content-header2">
          <div class="sola">单张面值</div>
          <div class="money">{{ cardInfo.faceValue }}</div>
          <div class="money2">￥{{ cardInfo.discountValue }}</div>
          <div class="fold">{{ cardInfo.discountLabel }}</div>
        </div>
        <div class="remark">{{cardInfo.cardCategoryRemark}} </div>
        <div class="submit-way">提交方式</div>
        <van-tabs swipeable color="#2ecc71" background="#ffffff">
          <van-tab
            v-for="(item, index) in submitWay"
            :title="item.title"
            :key="index"
          >
          </van-tab>
        </van-tabs>
        <!-- <p style=" font-size: 16px;">单张提交</p> -->
        <div class="form-card" v-if="show">
          <van-form @submit="onSubmit">
            <van-field
              v-model="cardnumber"
              name="cardNumber"
              label="卡号"
              :rules="[{ required: true, message: '请填写卡号' }]"
              :border="false"
              :colon="true"
              label-width="36"
            />
            <van-field
              v-model="password"
              type="password"
              name="cardPassword"
              label="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
              :border="false"
              :colon="true"
              label-width="36"
            />

            <van-checkbox-group v-model="checked">
              <van-checkbox name="3" shape="square" icon-size="14">
                <span>
                  已阅读并同意[
                  <span class="avtive" @click.stop="zhuanrangClick"
                    >惠卡礼品转让协议</span
                  >
                  ]和[
                  <span class="avtive" @click.stop="huishou"
                    >礼品卡回收说明</span
                  >
                  ]
                </span>
              </van-checkbox>
              <van-checkbox name="1" shape="square" icon-size="14">
                <span>
                  我已确认该卡号卡密
                  <span class="redStyle">来源合法</span>，
                  如有问题，本人愿意承担一切法律责任。
                </span>
              </van-checkbox>
              <van-checkbox name="2" shape="square" icon-size="14">
                <span>
                  我已确认该卡号卡密<span class="redStyle">面值</span
                  >准确无误，<span class="redStyle"
                    >如有面值错误余额恕不退还！损失自行承担！</span
                  >
                </span>
              </van-checkbox>
            </van-checkbox-group>
            <div style="margin: 16px">
              <van-button block type="primary" native-type="submit"
                >提交</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </van-action-sheet>
    <div style="height: 43px"></div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import {
  Search,
  NavBar,
  Image,
  Sidebar,
  SidebarItem,
  Notify,
  ActionSheet,
  Tab,
  Tabs,
  Form,
  Field,
  Button,
  Toast,
  Checkbox,
  CheckboxGroup,
} from "vant";
export default {
  name: "carCenter",
  components: {
    [Search.name]: Search,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Notify.name]: Notify,
    [ActionSheet.name]: ActionSheet,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  data() {
    return {
      radioChange: false,
      checked: [],
      gridItem: null,
      cardInfo: {},
      cardList: this.creatcardList(),
      cardCategoryList: [],
      cardnumber: "",
      password: "",
      submitWay: [
        { id: 1, title: "单张提交" },
        // { id: 2, title: "批量提交" },
      ],
      rechargeCurrent: 0,
      current: 0,
      value: "",
      activeKey: 0,
      show: false,
      rechargeList: [
        { id: 1, title: "30", price: 26, discount: 8 },
        { id: 1, title: "30", price: 26, discount: 8 },
        { id: 1, title: "30", price: 26, discount: 8 },
        { id: 1, title: "30", price: 26, discount: 8 },
        { id: 1, title: "30", price: 26, discount: 8 },
        { id: 1, title: "30", price: 26, discount: 8 },
      ],
      dataList: [
        { id: 1, title: "中国移动" },
        { id: 1, title: "中国电信" },
        { id: 1, title: "中国联通" },
        { id: 1, title: "中国移动" },
        { id: 1, title: "中国电信" },
        { id: 1, title: "中国联通" },
      ],
    };
  },
  computed: {
    ...mapState({
      userId: "userId", // 第一种写法
    }),
  },
  mounted() {
    this.gridItem = this.$route.query.gridItem;
    this.getCarCenter().then((res) => {
      this.cardList = res;
      if (this.$route.query.cardType) {
        this.cardList.cardCategoryList = [];
        this.cardList.cardValueList = [];
        this.activeKey = this.cardList.cardTypeList.findIndex(
          (m) => m.id == this.$route.query.cardType
        );
        this.listCardCategoryClick(this.$route.query.cardType);
      }
    });
  },

  methods: {
    huishou() {
      this.$router.replace({
        path: "/hui-shou",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    zhuanrangClick() {
      this.$router.replace({
        path: "/zhuan-rang",
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },
      });
    },
    radClick() {
      if (!this.radioChange) {
        this.checked = "";
      }
      this.radioChange = false;
    },
    changeRad() {
      this.radioChange = true;
    },
    clear() {
      this.current = 0;
      this.rechargeCurrent = 0;
    },
    creatcardList() {
      return {
        cardTypeList: [],
        cardCategoryList: [],
        cardValueList: [],
      };
    },
    listCardValue(id) {
      this.getlistCardValue(id).then((res) => {
        this.gridItem = null;
        this.cardList.cardValueList = res;
      });
    },
    listCardCategoryClick(cardTypeId) {
      this.listCardCategory({ cardTypeId: cardTypeId })
        .then((res) => {
          this.clear();
          this.cardList.cardCategoryList = res;

          // this.current = this.gridItem
          //   ? this.cardList.cardCategoryList.findIndex(
          //       (m) => m.id == this.gridItem
          //     )
          //   : 0;
          // console.log(
          //   "🚀 ~ file: car-center.vue ~ line 230 ~ .then ~ this.current",
          //   this.current
          // );
          this.listCardValue(this.cardList.cardCategoryList[0].id);
        })
        .catch((err) => {
        });
    },
    ...mapActions([
      "getCarCenter",
      "listCardCategory",
      "getlistCardValue",
      "setSave",
    ]),
    onSubmit(values) {
      if (this.checked.length < 3) {
        Toast("请先勾选协议");
        return;
      }
      if (this.userId == "") {
        this.$router.replace({
          path: "/login",
          query: {
            redirect: this.$router.currentRoute.fullPath,
          },
        });
        return;
      }
      let saveInfo = {
        info: values,
        userId: this.userId,
        cardValueId: this.cardInfo.id,
      };
      this.setSave(saveInfo)
        .then((res) => {
          Toast("提交成功");
          this.show = false;
        })
        .catch((err) => {
          Toast(JSON.stringify(err));
        });
    },
    handleRechargeClick(index, item) {
      this.rechargeCurrent = index;
      this.cardInfo = item;
      console.log("🚀 ~ file: car-center.vue ~ line 342 ~ handleRechargeClick ~ this.cardInfo", this.cardInfo)
      this.show = true;
    },
    handleClick(index, id) {
      this.listCardValue(id);
      this.current = index;
      this.rechargeCurrent = 0;
    },
    showClick() {
      this.show = true;
    },
    onChange(index) {
      let cardId = this.cardList.cardTypeList[index].id;
      this.listCardCategoryClick(cardId);
    },
    onSearch(val) {},
    onCancel(val) {},
  },
};
function copy(obj) {
  let newobj = null; // 接受拷贝的新对象
  if (typeof obj == "object" && typeof obj !== null) {
    // 判断是否是引用类型
    newobj = obj instanceof Array ? [] : {}; // 判断是数组还是对象
    for (var i in obj) {
      newobj[i] = copy(obj[i]); // 判断下一级是否还是引用类型
    }
  } else {
    newobj = obj;
  }
  return newobj;
}
</script>

<style lang="less" scoped>
.remark{
  margin-top: 6px;
  font-size: 12px;
  color: red;
}
.redStyle {
  color: red;
  font-weight: 600;
}
.avtive {
  color: #1989fa;
  cursor: pointer;
}
/deep/.van-checkbox {
  margin-top: 10px;
  margin-left: 12px;
}
/deep/.van-checkbox__label {
  font-size: 12px;
}
#car-center {
  background: #f5f7fa;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;

  .van-sidebar-content-header2 {
    width: 300px;
    height: 100px;
    margin: auto;
    background-color: #2ecc71;
    background-image: url("../assets/images/bg1.png");
    background-size: cover;
    border-radius: 10px;
    color: #fff;
    position: relative;
    .sola {
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Bold, Alibaba PuHuiTi;
      position: absolute;
      left: 12px;
      top: 6px;
    }
    .money {
      position: absolute;
      top: 20px;
      right: 110px;
      text-align: center;
      font-weight: 600;
      font-size: 60px;
    }
    .money2 {
      position: absolute;
      right: 54px;
      bottom: 44px;
      font-family: DIN-Bold, DIN;
      font-size: 16px;
    }
    .fold {
      position: absolute;
      right: 50px;
      bottom: 24px;
      font-family: DIN-Bold, DIN;
      font-size: 16px;
    }
  }
  /deep/ .van-action-sheet__header {
    font-size: 20px;
    font-weight: 600;
  }
  .form-card {
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    margin-top: 10px;
    padding-top: 16px;
  }
  .action-sheet-content {
    padding: 0 30px 36px;

    /deep/ .van-field__control {
      border: 1px solid #ccc;
    }
  }
  .submit-way {
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    margin-top: 10px;
    margin-left: 8px;
  }
  .car-center-content {
    flex: 1;
    display: flex;
    // margin-bottom: 50px;
  }
  .car-center-header {
    display: flex;
    align-items: center;
    form {
      flex: 1;
    }
  }
  .van-sidebar {
    float: left;
    height: 100%;
    background: #fff;
  }
  .van-sidebar-content {
    flex: 1;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .card {
    background: red;
  }
  /deep/ .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    color: #c7cad1;
  }
  /deep/ .van-search {
    border-bottom: 1px solid #f5f7fa;
  }
  /deep/ .van-sidebar-item--select::before {
    position: absolute;
    top: 46px;
    left: 50%;
    width: 32px;
    height: 5px;
    border-radius: 4px;
    background-color: #2ecc71;
    -webkit-transform: translateY(-50%);
    transform: translateX(-50%);
    // content: "";
  }
  /deep/ .van-sidebar-item {
    text-align: center;
    font-weight: 600;
  }
  /deep/ .van-tabs__nav {
    width: 150px;
  }
  /deep/ .van-button--block {
    border-radius: 10px;
  }
  .van-sidebar-content-header {
    height: 100px;
    width: 100%;
    padding-top: 14px;
    margin-bottom: 16px;
    box-sizing: border-box;
    img {
      margin: auto;
      display: block;
      width: 252px;
      height: 84px;
      object-fit: cover;
    }
  }
  .van-sidebar-content-nav {
    padding-top: 30px;
    box-sizing: border-box;
    margin-bottom: 50px;
    .nav-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .nav-choose-content {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
    }

    .nav-choose {
      font-size: 12px;
      line-height: 30px;
      display: inline-block;
      // width: 33%;
      box-sizing: border-box;
      margin-bottom: 10px;
      margin-right: 6px;
      span {
        display: inline-block;
        background: #fff;
        padding: 0 13px;
        border-radius: 6px;
        border: 1px solid #fff;
      }
    }
    .active {
      span {
        border: 1px solid #2ecc71;
      }
    }
  }

  .nav-panel {
    background: #fff;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding-top: 16px;
    border-radius: 6px;
    .choose-box {
      display: inline-block;
      border: 1px solid #2ecc71;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 10px;
      min-width: 88%;
      margin-bottom: 16px;
      .choose-remark {
        display: inline-block;
        width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        text-align: center;
      }
    }
    .nav-panel-choose {
      color: #2ecc71;
      font-size: 14px;
      width: 50%;
      text-align: center;

      .choose-top {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .choose-discount {
          font-size: 12px;
          margin-left: 4px;
        }
      }
      .choose-down {
        font-size: 14px;
      }
    }
    .rechargeActive {
      color: #fff;
      .choose-box {
        background: #2ecc71;
      }
    }
  }
}
</style>