<template>
  <div class="identity">
    <router-link to="/search">Go to search</router-link>
    <div class="message">
      <p>您正在参与广州途客广州
        <span class="selectWrap">
          <select class="selection" v-model="user.station" onmousedown="if(this.options.length>6){this.size=10}" onblur="this.size=0" onchange="this.size=0">
            <option v-for="place in places">{{place}}</option>
          </select>
        </span>
        站的骑手审核，请正确填写并提交一下表格，以免耽误入职进度
      </p>
    </div>
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
    <div class="submit-btn" ><button type="button" class="btn btn-info" @click="submitInfo">提交</button></div>
    <div class="sucessMes" v-bind:style="{display: valSucess}">
      <p>{{info}}</p>
      <span @click="sureSubmit">确定</span>
    </div>
    <div class="marsklayer" v-bind:style="{display: valMarklayer}"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      inputCode: '',
      nameAlert: 'none',
      phoneAlert: 'none',
      idcartAlert: 'none',
      codeAlert: 'none',
      timeout: 'none',
      valSucess: 'none',
      valMarklayer: 'none',
      inputName: false,
      inputPhone: false,
      inputID: false,
      inputVeri: false,
      originTime: '',
      verificationCode: '',
      dataUrl: '',
      places: [],
      info: '',
      user: {
        name: '',
        phoneNumber: '',
        IDCartNumber: '',
        station: '陈家祠'
      }
    }
  },
  methods: {
    sureSubmit :function() {
      this.valMarklayer = 'none';
      this.valSucess = 'none';
      this.user = {};
      this.inputCode = '';
      this.user.station = '陈家祠';
      this.getVerificationCode();
    },
    submitInfo: function() {
      if(this.checkCode()){
        var timeDiff = parseInt(new Date()- this.originTime)/1000;
        if(timeDiff<50){
          this.$http({
          url: '/user/new',
          method: 'POST',
          params: {
            user: this.user
          }
          }).then((res) => {
            if(res.data){
              this.info = res.data.message;
              this.valSucess = '';
              this.valMarklayer = '';
            }
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
        //$e.focus();
        $e.css("color","#ec150e");
        this.phoneAlert = '';
      }
      else {
        this.inputPhone = true;
        //$e.blur();
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
        //$e.blur();
        $e.css("color","#000");
        this.idcartAlert = 'none';
      }
      else {
        //$e.focus();
        $e.css("color","#ec150e");
        this.idcartAlert = '';
      }
    },
    checkVeriCode: function(){
      var textCode1 = this.inputCode.toLowerCase(),
          textCode2 = this.verificationCode.toLowerCase();
      var $e = $('#verification')
      if(textCode2 != textCode1){
        //$e.focus();
        $e.css("color","#ec150e");
        this.codeAlert = '';
      }
      else {
        this.inputVeri = true;
        //$e.blur();
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
    },
    alertchange: function(e){
      console.log($(e.target).selected)
      this.size = 0;
      console.log(this.selected);
    }
  },
  mounted: function(){
      this.getVerificationCode(),
      this.places = ['陈家祠','窖口','流花','三元里','云台一','梅花园','京溪','嘉禾','云台二','荔城','万博',
                     '钟村','香雪牌坊','黄埔二','黄埔','猎德1','黄村','猎德2','燕塘','花城汇','体育中心',
                     '动物园','淘金','南越宫','南越宫2','东山2','东山','东山口','新港西','琶洲','客村']
    },
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
    height: 2rem;
    text-align: left;
    box-sizing: border-box;
  }
  .input_wrap  {
    float: left;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 65%;
    height: 2rem;
    line-height: 20px;
    padding: 0;
  }
  .input_wrap input {
    display: inline-block;
    box-sizing: border-box;
    outline: none;
    border: none;
    width: 65%;
    margin: 0;
    height: 2rem;
    float: left;
  }
  .yanzhengma {
    float: left;
    width: 2rem;
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
    font-size: 1rem;
    background: #44d5cf;
    border: none;
    padding: 7px 0;
  }
  .dangerInfo {
    font-size: 10px;
    position: absolute;
    left: 0;
    top: -25px;
  }
  .sucessMes {
    padding: 1rem 0 0 0;
    width: 30%;
    height: 4rem;
    border-radius: 1rem;
    background: #caeadf;
    position: absolute;
    left: 35%;
    top: 30%;
    font-size: 1rem;
    z-index: 999;
  }
  .sucessMes span {
    display: inline-block;
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    font-size: .9rem;
    margin-top: 1rem;
    color: #44d5cf;
  }
  .marsklayer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    opacity: 0.5;
    background: #eee;
  }
  .message .selectWrap {
    width: 4rem;
    height: 1.5rem;
    display: inline-block;
    position: relative;
    margin: 0;
    padding: 0;
    text-align: left;
    vertical-align: middle;
  }
  .selection {
    position: absolute;
    z-index: 100;
    width: 4rem;
    scroll-behavior: smooth;
    overflow-y: scroll;
  }
</style>
