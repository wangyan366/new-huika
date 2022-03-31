<template>
  <div class="content">
    <van-nav-bar
      title="礼品卡回收说明"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
      <div class="container help-center">
            <div class="help-main">
                <div>
                     <div class="help-main"><h2>礼品卡回收说明</h2><div class="help-cont"><p>1、礼品卡回收成功后，金额将打入您的账户余额中，您需要通过实名认证之后才可提现；</p><p>2、当选择的面值与实际面值不一致时，您将损失差额，而且会造成延迟到账，请正确选择；</p><p>3、转让成功前请不要丢弃实体卡；</p><p>4、您的账号因自身原因礼品卡被盗取或封存导致不能审核的责任由您自己承担，我们将直接撤单；</p><p>5、若您重复提交同一卡号或故意提交错误信息的，我们会取消交易，并冻结您的账户信息；</p><p>6、如果您私下将礼品卡信息交易给其他买家，并再次出售给本网站，造成的损失由您承担，我们将对您的账户信息进行冻结处理；</p><p>7、礼品卡交易在未给您打款期间出现问题的话，您应积极配合解决问题，根据要求我们将延迟打款，如果问题没有解决我们将按责任轻重来加以处理；</p></div></div> <p><br></p>                </div>
                
            </div>
        </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "Yinsi",
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {};
  },

  mounted() {    this.setTabbarShow(false);},

  methods: {
       ...mapMutations(["setTabbarShow"]),
    onClickLeft() {
      if (this.$route.query.redirect) {
        this.$router.replace({
          path: decodeURIComponent(this.$route.query.redirect),
        });
        this.setTabbarShow(true);
      }
    },
  },
};
</script>


<style scoped>
.content {
      height: 90%;
}
.container {
  height: 100%;
  overflow-y: auto;
}

.help-main {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
}
h2{
    font-size: 18px;
    font-weight: 600;
    margin: 6px 0;
}
h6 {
  font-size: 16px;
  color: #999;
}
p {
  font-size: 12px;
  color: #333;
}
.help-main .top {
  font-size: 24px;
  color: #000;
  padding: 10px 0 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f3;
}
p{
    font-size: 13px;
    line-height: 22px;
}
.top ul li {
  float: right;
  font-size: 14px;
  width: 60px;
  color: #666;
  margin-top: -15px;
}
</style>