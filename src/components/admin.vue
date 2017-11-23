<template>
    <div class="search-container">
        <h4 class="search-title">审核管理</h4>
        <div class="search-content">
            <div class="search-nav">
                <input type="text" class="search-frame">
                <button class="search-btn btn btn-info">搜索</button>
            </div>
            <div class="search-result">
                <div class="list-head">
                    <span class="user-text">姓名</span>
                    <span class="state-text">状态</span>
                    <span class="admin-text">管理</span>
                </div>
                <div class="userList">
                    <div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖你好</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div>
                    <div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div>
                    <div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div>
                    <div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div><div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div><div class="userContainer">
                        <div class="diplay-info">
                            <span class="userName" @click="displayInfo($event)">郭靖</span>
                            <span class="state">未通过</span>
                            <span class="admin-btn">通过</span>
                        </div>
                        <div class="user-info" v-bind:style="{display: isDisplay}">
                            <p>手机号码：18819259242</p>
                            <p>身份证号：441422199410291810</p>
                            <p>审核状态：已审核</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDisplay: 'none'
            }
        },
        methods: {
            displayInfo: function(e) {
                var current = $(e.target).parent().siblings()[0];
                var $current = $(current);
                if($current.css('display') === 'none'){
                    console.log('yes')
                    $current.css('display','');
                }
                else {
                    $current.css('display','none');
                }
            }
        }
    }
</script>

<style scoped>
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
    .search-btn { 
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
    .list-head {
        width: 98%;
        margin-left: 2px;
        text-align: center;  
    }
    .list-head span{
        margin: 0 6%;
        width: 4rem;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        color: #000;
        display: inline-block;
    }
    .userList {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        vertical-align: middle;
    }
    .userContainer {
        margin-top: 10px;
    }
    .display-info, .user-info {
        width: 24rem;
        height: 100%;
        margin: 0 20px 0 10px;
        margin-left: 10px;
        border: 1px solid #e7e7e7;
    }
    .user-info {
        width: 90%;
        margin-top: 10px;
        text-align: center;
    }
    .diplay-info span{
        margin: 0 4%;
        width: 5rem;
        height: 20px;
        line-height: 20px;
        color: #000;
        display: inline-block;
    }
    .user-info p {
        margin: 5px 10px;
        text-align: left;
    }
</style>