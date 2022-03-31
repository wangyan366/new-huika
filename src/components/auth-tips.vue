<template>
  <div class="tips-container">
    <div class="back" @click="$router.back()">
      <Icon name="arrow-left" color="#fff" size="20" />
    </div>
    <div class="title">扫脸认证</div>
    <div class="sub-title">请进行扫脸认证</div>
    <div class="tips">为了保证操作安全，需要通过扫脸进行身份认证</div>
    <div class="remark">建议录制2秒以内本人正脸视频，并作眨眼动作</div>
    <img class="auth-img" src="@/assets/images/auth.png" alt="">
    <div class="auth-btn" @click="auth">我是本人，开始认证</div>
    <input ref="videoRef" class="video-input" type="file" accept="video/*" capture="user" @change="upload">    
  </div>
</template>
<script>
import { Toast, Icon } from 'vant';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'AuthTips',
  components: {
    Icon
  },
  data() {
    return {}
  },
  mounted() {
    this.setTabbarShow(false);
  },
  methods: {
    ...mapMutations(["setTabbarShow", "changeCertificated"]),
    ...mapActions(["contrastFaceVerify", "updateCertificate"]),
    auth() {
      this.$refs.videoRef.click();
    },
    upload() {
      Toast.loading({ forbidClick: true, duration: 0 });
      const file = this.$refs.videoRef.files[0];
      this.$UploadFile({
        data: { folder: 'faceverify' },
        file
      }).then(data => {
        console.log(data);
        const { redirect, ...authInfo } = this.$route.query;
        this.contrastFaceVerify({
          videoPath: data.filePath,
          ...authInfo
        }).then(res => {
          console.log(11111, res);
          this.updateCertificateHandler(res.certifyId);
        }).catch(err => {
          console.log(err);
        })
      }).catch((err)=> {
        console.log(err);
        // msg && Toast(msg);
      })
    },
    updateCertificateHandler(certifyId) {
      this.updateCertificate({ certifyId }).then(res => {
        console.log(res);
        Toast.clear();
        this.changeCertificated(1);
        this.$router.replace({
          path: '/my'
        });
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>
.tips-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  text-align: center;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-input {
  opacity: 0;
  width: 300px;
}
.title {
  width: 100%;
  height: 40px;
  background-color: #2268F6;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.sub-title {
  margin-top: 36px;
  font-size: 22px;
  font-weight: bold;
}
.tips {
  margin-top: 14px;
  font-size: 12px;
  color: #444
}
.auth-img {
  width: 248px;
  height: 316px;
  margin-top: 40px;
}
.auth-btn {
  width: 365px;
  height: 40px;
  background-color: #2268F6;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 40px 5px 0 5px;
  border-radius: 4px;
}
.duration {
  font-size: 12px;
}
.time-limit {
  color: #2268F6
}
.remark {
  margin: 10px 0;
  font-size: 14px;
  color: red;
}
</style>