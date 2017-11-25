<template>
    <div class="search-container">
        <h4 class="search-title">审核管理</h4>
        <div class="search-content">
            <div class="search-nav">
                <input type="text" class="search-frame" placeholder="请输入名字" v-model="searchName">
                <button class="search-btn btn btn-info" @click="search">搜索</button>
            </div>
            <div class="search-result">
                <div class="list-head">
                    <span class="admin-text btn current" @click="selectChoice($event)">待审核</span>
                    <span class="state-text btn" @click="selectChoice($event)">不通过</span>
                    <span class="user-text btn" @click="selectChoice($event)">通过</span>
                </div>
                <div class="userList">
                    <div class="userContainer" v-for='user in users' :style="{display:not_research}">
                        <div v-if="user.state== choice">
                            <div class="diplay-info">
                                <span class="userName" @click="showDisplayInfo($event)">{{user.name}}</span>
                                <span class="state">{{user.state}}</span>
                                <span class="admin-btn btn" style="background-color:#5bc0de" @click="showConfirmFrame($event,'pass')">通过</span>
                                <span class="admin-btn btn" @click="showConfirmFrame($event,'nopass')">不通过</span>
                            </div>
                            <div class="user-info" v-bind:style="{display: isDisplay}">
                                <p>手机号码：{{ user.phoneNumber }}</p>
                                <p>身份证号：{{ user.IDCartNumber}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="userContainer" v-for='user in searchResult' :style="{display: had_research}">
                        <div class="diplay-info">
                            <span class="userName" @click="showDisplayInfo($event)">{{user.name}}</span>
                            <span class="state">{{user.state}}</span>
                            <span class="admin-btn btn" style="background-color:#5bc0de" @click="showConfirmFrame($event,'pass')">通过</span>
                            <span class="admin-btn btn" @click="showConfirmFrame($event,'nopass')">不通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：{{ user.phoneNumber }}</p>
                            <p>身份证号：{{ user.IDCartNumber}}</p>
                        </div>
                    </div>
                </div>
                <div class="search-list">
                    
                </div>
                <div class="confirmFrame" v-bind:style="{display: isConfirm}">
                    <div class="confirm-wrap">
                        <span class="close" @click="closeConfirmFrame">关闭</span>
                        <p>确定让{{curUserName}}{{passText}}吗</p>
                        <span class="btn btn-info" style="background-color:#5bc0de" @click="confirmInfo(curUserName,passText)">确定</span>
                        <span class="btn btn-danger" style="background-color:#ddd" @click="closeConfirmFrame">取消</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="marsklayer" v-bind:style="{display: isMarklayer}"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDisplay: 'none',
                isConfirm: 'none',
                isMarklayer: 'none',
                choice: '待审核',
                curUserName: '',
                searchName: '',
                not_research: '',
                had_research: 'none',
                passText: '',
                users: [],
                searchResult: []
            }
        },
        methods: {
            showDisplayInfo: function(e) {
                let current = $(e.target).parent().siblings()[0];
                let $current = $(current);
                if($current.css('display') === 'none'){
                    $current.css('display','');
                }
                else {
                    $current.css('display','none');
                }
            },
            showConfirmFrame: function(e,str) {
                let cur_user = $(e.target).siblings()[0],
                    $cur_user = $(cur_user);
                this.curUserName = $cur_user.text();
                this.isConfirm = '';
                this.isMarklayer = '';
                if(str == 'pass'){
                    this.passText = '通过'
                }else {
                    this.passText = '不通过'
                }
            },
            closeConfirmFrame: function() {
                this.isConfirm = 'none';
                this.isMarklayer = 'none';
            },
            confirmInfo: function(user, state) {
                this.$http({
                    url: '/user/admin/update',
                    method: 'POST',
                    params: {
                        userName: user,
                        state: state
                    }
                }).then((res)=>{
                    this.users = res.data;
                    this.closeConfirmFrame();
                })
            },
            selectChoice: function(e) {
                this.choice = $(e.target).text();
                $(e.target).siblings().removeClass('current');
                $(e.target).addClass('current');
            },
            search: function(){
                this.searchResult = [];
                this.not_research = 'none';
                this.had_research = '';
                $(".list-head").children().removeClass('current');
                this.$http({
                    url: '/user/admin/search',
                    method: 'GET',
                    params: {
                        userName: this.searchName
                    }
                }).then((res)=>{
                    this.searchResult.push(res.data);
                    console.log(this.searchResult);
                })
            }
        },
        mounted: function() {
            this.$http({
                url: '/user/admin',
                method: 'GET'
            }).then((res) => {
                this.users = res.data;
            })
        }
    }
</script>

<style scoped>
    .btn{
        border: none;
    }
    .search-title {
        font-size: 16px;
        margin: 15px auto;
        text-align: center;
    }
    .search-nav {
        position: relative;
        max-width: 100%;
        min-width: 50%;
        height: 30px;
        margin: 30px 0 10px 30px;
    }
    .search-nav input {
        width: 40%;
        height: 100%;
        margin-left: 15px;
        border: none;
        border-bottom: 1px solid #a1d543;
    }
    .search-nav .search-btn { 
        width: 4rem;
        height: 100%;
        margin: 0 20px 0 10px;
        padding: 0;
        background-color: #f5f5f5;
        color: #000;
        border: none;
        vertical-align: middle;
        text-align: center;
    }
    .search-result {
        margin: 30px auto;
        padding: 10px 20px;
        width: 97%;
    }
    .search-result .list-head {
        width: 98%;
        margin-left: 2px;
        text-align: center;  
    }
    .search-result .list-head span{
        margin: 0 6%;
        width: 4rem;
        font-weight: bold;
        color: #000;
        background: #f5f5f5;   
        padding: 0;
    }
    .search-result .list-head .current {
        background: #bce8f1;
    }
    .search-result .userList {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        vertical-align: middle;
    }
    .search-result .userList .userContainer {
        margin-top: 10px;
    }
    .userContainer .display-info, .userContainer .user-info {
        width: 30rem;
        height: 100%;
        margin: 0 20px 0 10px;
        margin-left: 10px;
        border: 1px solid #e7e7e7;
    }
    .userContainer .user-info {
        width: 80%;
        margin-top: 10px;
        margin-left: 9%;
        text-align: center;
    }
    .userContainer .diplay-info span{
        margin: 0 4% 0 8%;
        width: 4rem;
        height: 20px;
        line-height: 20px;
        color: #000;
        display: inline-block;
    }
    .userContainer .diplay-info .admin-btn {
        padding: 0;
        margin: 0;
        display: inline-block;
        width: 4rem;
        background: #eee;
    }
    .userContainer .user-info p {
        margin: 5px 10px;
        text-align: left;
    }
    .search-result .confirmFrame {
        width: 50%;
        height: 15%;
        left: 25%;
        top: 30%;
        position: absolute;
        vertical-align: middle;
        padding-top: 5%;
        background: #bce8f1;
        z-index: 999;
    }
    .confirmFrame .confirm-wrap {
        position: relative;
    }
    .confirm-wrap .close {
        width: 24px;
        height: 15px;
        font-size: 12px;
        position: absolute;
        right: 5px;
        top: -15px;
    }
    .marsklayer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 998;
        background: #eee;
        opacity: 0.7;
    }
    ._show {
        display: none;
    }
    ._noshow {
        display: block;
    }
</style>