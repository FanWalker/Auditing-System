<template>
  <div class="identity">
    <router-link to="/search">Go to search</router-link>
    <div class="message"><p>{{ msg }}</p></div>
    <div class="form-data">
      <div class="wrap">
        <label for="" class="text-name">姓名<span>*</span></label>
        <input type="text" v-model="user.name">
      </div>
      <div class="wrap">
        <label for="" class="text-name">手机号<span>*</span></label>
        <input type="text" v-model="user.phoneNumber">
      </div>
      <div class="wrap">
        <label for="" class="text-name">身份证号码<span>*</span></label>
        <input type="text" v-model="user.IDCartNumber">
      </div>
      <div class="wrap">
        <label for="" class="text-name">验证码<span style="color:#fff">*</span></label>
        <div class="verification-code">
          <input type="text" v-model="inputCode">
          <div class="yanzhengma"><img :src="dataUrl" alt=""></div>
        </div>
      </div>
    </div>
    <div class="submit-btn"><button type="button" class="btn btn-info" @click="submitInfo">提交</button></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '您正在参与广州途客[广州]猎德站站的骑手审核，请正确填写并提交一下表格，以免耽误入职进度',
      code: '',
      inputCode: '',
      dataUrl: '',
      user: {
        name: '',
        phoneNumber: '',
        IDCartNumber: ''
      }
    }
  },
  methods: {
    submitInfo: function() {
      this.checkCode();
      this.$http({
        url: '/user/new',
        method: 'POST',
        params: {
          user: this.user
        }
      }).then((res) => {
        let data = res.data;
        console.log(data);
      })
    }
  },
  mounted: function(){
    this.$http({
        url: '/user/Verification',
        method: 'GET',
        headers: {
        'Content-Type': 'image/bmp'
      }
      }).then((res) => {
        var img = res.data;
        this.dataUrl = img.toString('base64');
        console.log(this.dataUrl);
      })
    },
  computed: {
    codevalue: function(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    color: #ec150e
  }
  .identity {
    vertical-align: center;
  }
  .message {
    padding: 2px 5px;
    margin: 0 auto;
  }
  .message p{
    text-align:justify;
    text-justify:inter-ideograph;
    margin: 1rem;
    letter-spacing: 1px;
    line-height: 24px;
  }
  .form-data {
    font-size:  1rem;
    overflow: hidden;
    background: #fff;
  }
  .wrap {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    margin: 20px 0;
    border-bottom: 1px solid #eee;
    padding: 0px;
  }
  .text-name {
    margin-left: .85rem;
    float: left;
    width: 30%;
    text-align: left;
  }
  .wrap input {
    width: 65%;
    height: 2rem;
    border: none;
    outline: none;
  }
  .verification-code  {
    position: relative;
    display: inline-block;
    width: 65%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0;
  }
  .verification-code input {
    display: inline-block;
    float: left;
    width: 60%;
    margin: 0;
    float: left;
  }
  .yanzhengma {
    float: left;
    width: 35%;
    height: 30px;
    padding: 0;
    margin: 0;
  }
  .submit-btn {
    height: 3rem;
    width: 97%;
    box-sizing: border-box;
    margin: 20px auto;
    line-height: 34px;
  }
  .submit-btn button{
    width: 100%;
    font-size: 1.3rem;
    background: #44d5cf;
    border: none;
  }
</style>
