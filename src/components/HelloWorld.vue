<template>
  <div class="identity">
    <router-link to="/page">Go to search</router-link>
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
          <input type="text" readonly="readonly" id="checkCode" style="width:50px;" v-on:click="createCode" v-bind:value="codevalue">
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
      user: {
        name: '',
        phoneNumber: '',
        IDCartNumber: ''
      }
    }
  },
  methods: {
    createCode: function(){
      this.code = '';
      var codeLength = 4;//验证码的长度 
      var checkCode = document.getElementById("checkCode"); 
      var selectChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  
             'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',  
             'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',  
             'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',  
             'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    
      for(var i=0; i<4; i++){
        var charIndex = Math.floor(Math.random()*selectChar.length);
        this.code += selectChar[charIndex]; 
      }
    },
    checkCode: function() {
      if(this.inputCode.toLowerCase() == this.code.toLowerCase()){
        alert('验证成功')
      }
      else {
        alert('fail')
      }
    },
    submitInfo: function() {
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
  computed: {
    codevalue: function(){
      return this.code;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    border: none;
  }
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
    margin: 0.5em 0;
    letter-spacing: 0px;
    line-height: 24px;
  }
  .form-data {
    min-width: 400px;
  }
  .wrap {
    width: 70%;
    height: 35%;
    margin-top: 20px;
    padding: 0px;
  }
  .text-name {
    width: 8rem;
    margin-right: 10px;
    text-align: right;
  }
  .verification-code  {
    position: relative;
    display: inline-block;
    width: 170px;
    height: 20px;
  }
  .verification-code input:nth-child(1) {
    display: inline-block;
    float: left;
    width: 100px;
  }
  #checkCode {
    background-color: #0A0756;
  }
  .submit-btn {
    height: 34px;
    width: 50%;
    margin: 10px auto;
    line-height: 34px;
  }
  .submit-btn button{
    width: 100%;
  }
</style>
