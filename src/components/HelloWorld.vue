<template>
  <div class="identity">
    <router-link to="/search">Go to search</router-link>
    <div class="message"><p>{{ msg }}</p></div>
    <div class="form-data">
      <div class="wrap">
        <label for="" class="text-name">姓名<span>*</span></label>
        <div class="input_wrap">
          <input type="text" id="username" v-model="user.name" @blur="checkUserName()">
          <span class="dangerInfo" :style="{display: nameAlert}">请输入正确的姓名！</span>
        </div>
      </div>
      <div class="wrap">
        <label for="" class="text-name">手机号<span>*</span></label>
        <div class="input_wrap">
          <input type="text" id="userphone" v-model="user.phoneNumber" @blur="checkPhoneNumber()">
          <span class="dangerInfo" :style="{display: phoneAlert}">请输入正确的手机号码！</span>
        </div>
      </div>
      <div class="wrap">
        <label for="" class="text-name">身份证号码<span>*</span></label>
        <div class="input_wrap">
          <input type="text" id="userIDnumber" v-model="user.IDCartNumber" @blur="checkIDCartNumber()">
          <span class="dangerInfo" :style="{display: idcartAlert}">请输入正确的身份证号码！</span>
        </div>
      </div>
      <div class="wrap">
        <label for="" class="text-name">验证码<span style="color:#fff">*</span></label>
        <div class="input_wrap">
          <input type="text" v-model="inputCode" id="verification" @blur="checkVeriCode()">
          <span class="dangerInfo" :style="{display: codeAlert}">请输入正确的验证码！</span>
          <span class="dangerInfo" :style="{display: timeout}">验证码已过期请重新输入</span>
          <div class="yanzhengma" @click="getVerificationCode"><img :src="dataUrl" alt=""></div>
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
      nameAlert: 'none',
      phoneAlert: 'none',
      idcartAlert: 'none',
      codeAlert: 'none',
      timeout: 'none',
      inputName: false,
      inputPhone: false,
      inputID: false,
      inputVeri: false,
      originTime: '',
      verificationCode: '',
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
      if(this.checkCode()){
        var timeDiff = parseInt(new Date()- this.originTime)/1000;
        if(timeDiff<30){
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
        }else {
          this.timeout = ''
        }
      }
    },
    checkUserName: function() {
      var regtitle = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
      var uname = this.user.name;
      var $e = $("#username")
      if (uname.length <= 0 || !regtitle.test(uname)) {
        $e.focus();
        $e.css("color","#ec150e");
        this.nameAlert = '';
      }
      else{
        this.inputName = true;
        $e.blur();
        $e.css("color","#000");
        this.nameAlert = 'none';
      }
    },
    checkPhoneNumber: function(){
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      var phone = this.user.phoneNumber;
      var $e = $("#userphone");
      if(phone.length<11 || !reg.test(phone)) {
        $e.focus();
        $e.css("color","#ec150e");
        this.phoneAlert = '';
      }
      else {
        this.inputPhone = true;
        $e.blur();
        $e.css("color","#000");
        this.phoneAlert = 'none';
      }
    },
    checkIDCartNumber: function() {
      var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,  //15位的身份证
      isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;  //18位的身份证
      var $e = $("#userIDnumber");
      var IDCartNumber = this.user.IDCartNumber;
      if(isIDCard1.test(IDCartNumber) || isIDCard2.test(IDCartNumber)) {
        this.inputID = true;
        $e.blur();
        $e.css("color","#000");
        this.idcartAlert = 'none';
      }
      else {
        $e.focus();
        $e.css("color","#ec150e");
        this.idcartAlert = '';
      }
    },
    checkVeriCode: function(){
      var textCode1 = this.inputCode.toLowerCase(),
          textCode2 = this.verificationCode.toLowerCase();
      var $e = $('#verification')
      if(textCode2 != textCode1){
        $e.focus();
        $e.css("color","#ec150e");
        this.codeAlert = '';
      }
      else {
        this.inputVeri = true;
        $e.blur();
        $e.css("color","#000");
        this.codeAlert = 'none';
      }
    },
    checkCode: function(){
        if(!this.inputName) {
          this.checkUserName();
        }else if (!this.inputPhone) {
          this.checkPhoneNumber();
        }else if(!this.inputID){
          this.checkIDCartNumber();
        }else if(!this.inputVeri){
          this.checkVeriCode()
        }else {
          return true;
        }
    },
    getVerificationCode: function() {
      this.timeout = 'none';
      this.$http({
        url: '/user/Verification',
        method: 'GET',
        headers: {
        'Content-Type': 'image/bmp'
      }
      }).then((res) => {
        this.verificationCode = res.data.str;
        this.dataUrl = res.data.url.toString('base64');
        this.originTime = new Date();
        console.log(this.verificationCode);
      })
    }
  },
  mounted: function(){
      this.getVerificationCode()
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
    position: relative;
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
  .input_wrap  {
    position: relative;
    display: inline-block;
    width: 65%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0;
  }
  .input_wrap input {
    display: inline-block;
    float: left;
    width: 70%;
    margin: 0;
    float: left;
  }
  .yanzhengma {
    float: right;
    width: 30%;
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
  .dangerInfo {
    font-size: 10px;
    position: absolute;
    left: 0;
    top: -25px;
  }
</style>
