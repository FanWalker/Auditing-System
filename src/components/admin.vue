<template>
    <div class="search-container">
        <h4 class="search-title">审核管理</h4>
        <div class="search-content">
            <div class="search-nav">
                <input type="text" class="search-frame" placeholder="请输入名字" v-model="searchName">
                <button class="search-btn" @click="search">搜索</button>
            </div>
            <div class="search-result">
                <div class="list-head">
                    <span class="admin-text current" @click="selectChoice($event)">待审核</span>
                    <span class="state-text" @click="selectChoice($event)">驳回</span>
                    <span class="user-text" @click="selectChoice($event)">通过</span>
                    <span class="selectWrap">
                      <select class="selection" v-model="station" onmousedown="if(this.options.length>6){this.size=10}" onblur="this.size=0" onchange="this.size=0" @change="selectChoice('')">
                        <option v-for="place in places">{{place}}</option>
                      </select>
                    </span>
                </div>
                <div class="userList">
                    <div class="userContainer" v-for='(user,index) in users' :style="{display:not_research}">
                        <div class="diplay-info">
                            <span class="userName" @click="showDisplayInfo($event)">{{user.name}}</span>
                            <span class="state">{{user.state}}</span>
                            <div style="display:inline-block">
                                <span class="admin-btn" style="background-color:#bce8f1" @click="showConfirmFrame(user,'pass')">通过</span>
                                <span class="admin-btn" @click="showConfirmFrame(user,'nopass')">驳回</span>
                            </div>
                        </div>
                        <div class="user-info" v-bind:style="{display: valDisplay}">
                            <p>手机号码：{{ user.phoneNumber }}</p>
                            <p>身份证号：{{ user.IDCartNumber}}</p>
                            <p>站点：{{ user.station }}</p>
                        </div>
                    </div>
                    <div class="userContainer" v-for='user in searchResult' :style="{display: had_research}">
                        <div class="diplay-info">
                            <span class="userName" @click="showDisplayInfo($event)">{{user.name}}</span>
                            <span class="state">{{user.state}}</span>
                            <div style="display:inline-block">
                                <span class="admin-btn" style="background-color:#bce8f1" @click="showConfirmFrame(user,'pass')">通过</span>
                                <span class="admin-btn" @click="showConfirmFrame(user,'nopass')">驳回</span>
                            </div>
                        </div>
                        <div class="user-info" v-bind:style="{display: valDisplay}">
                            <p>手机号码：{{ user.phoneNumber }}</p>
                            <p>身份证号：{{ user.IDCartNumber}}</p>
                            <p>站点：{{user.station}}</p>
                        </div>
                    </div>
                    <v-pagination  v-if="total>0" ref="child" :total="total" :current-page='curPage' @pagechange="pagechange"></v-pagination>
                </div>
                <div class="confirmFrame" v-bind:style="{display: valConfirm}">
                    <div class="confirm-wrap">
                        <span class="close" @click="closeConfirmFrame">关闭</span>
                        <p>确定让{{name}}{{passText}}吗</p>
                        <span class="btnConfirm" style="background-color:#5bc0de" @click="confirmInfo(curUserID,passText)">确定</span>
                        <span class="btnConfirm" style="background-color:#ddd" @click="closeConfirmFrame">取消</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="marsklayer" v-bind:style="{display: valMarklayer}"></div>
    </div>
</template>

<script>
import pagination from '@/components/pagination'
export default {
    data() {
        return {
            valDisplay: 'none',
            valConfirm: 'none',
            valMarklayer: 'none',
            choice: '待审核',
            curUserID: '',
            searchName: '',
            valSearch: '',
            not_research: '',
            had_research: 'none',
            passText: '',
            users: [],
            name: '',
            places: [],
            station: '陈家祠',
            searchResult: [],
            curTarget: '',
            total: 0,     // 记录总条数
            curPage: 1,   // 当前的页数
        }
    },
    methods: {
        showDisplayInfo: function(e) {
            this.curTarget = e;
            let current = $(e.target).parent().siblings()[0];
            let $current = $(current);
            if($current.css('display') === 'none'){
                $current.css('display','');
            }
            else {
                $current.css('display','none');
            }
            
        },
        showConfirmFrame: function(user,str) {
            this.name = user.name;
            this.curUserID = user.IDCartNumber;
            this.valConfirm = '';
            this.valMarklayer = '';
            if(str == 'pass'){
                this.passText = '通过'
            }else {
                this.passText = '驳回'
            }
        },
        closeConfirmFrame: function() {
            this.valConfirm = 'none';
            this.valMarklayer = 'none';
        },
        confirmInfo: function(userid, newstate) {
            this.$http({
                url: '/user/admin/update',
                method: 'POST',
                params: {
                    userID: userid,
                    state: newstate,
                    originstate: this.choice,
                    station: this.station
                }
            }).then((res)=>{
                this.users = res.data.users;
                this.total = res.data.totalPage;
                this.curPage = 1;
                this.closeConfirmFrame();
            })
        },
        selectChoice: function(e) {
            var _self = this;
            _self.not_research = '';
            _self.had_research = 'none';
            var _choice = $(e.target).text();
            _self.choice = _choice == "" ? this.choice : _choice;
            $(e.target).siblings().removeClass('current');
            $(e.target).addClass('current');
            _self.$http({
                url: '/user/admin',
                method: 'GET',
                params: {
                    state: _self.choice,
                    station: _self.station
                }
            }).then((res) => {
                _self.users = res.data.users;
                this.total = res.data.totalPage;
                this.curPage = 1;
                if(this.total>0){
                    this.clickChild();      
                }
            })
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
                this.valSearch = 'none';
                this.searchResult = res.data.users;
                this.total = res.data.totalPage;
                this.curPage = 1;
                if(this.total>0){
                    this.clickChild();      
                }
            })
        },
        pagechange:function(currentPage){
             // ajax请求, 向后台发送 currentPage, 来获取对应的数据
            this.showDisplayInfo('');
            this.$http({
                url: '/user/admin',
                method: 'GET',
                params: {
                    state: this.choice,
                    station: this.station,
                    p: currentPage-1
                }
            }).then((res) => {
                this.users = res.data.users;
                $(".user-info").css("display","none");
            })
        },
        clickChild: function() {
            this.$refs.child.setCurrent(1);
        }
    },
    mounted: function() {
        this.places = ['陈家祠','窖口','流花','三元里','云台一','梅花园','京溪','嘉禾','云台二','荔城','万博',
                '钟村','香雪牌坊','黄埔二','黄埔','猎德1','黄村','猎德2','燕塘','花城汇','体育中心',
                '动物园','淘金','南越宫','南越宫2','东山2','东山','东山口','新港西','琶洲','客村'];
        this.$http({
            url: '/user/admin',
            method: 'GET',
            params: {
                state: "待审核",
                station: this.station
            }
        }).then((res) => {
            this.users = res.data.users;
            this.total = res.data.totalPage;
        })
    },
    components: {
          'v-pagination': pagination,
    }
}
</script>

<style scoped>
    .search-container {
        font-size: 1rem;
    }
    .search-title {
        font-size: 1rem;
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
        outline: none;
        background: #eee;
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
        padding-top: 1rem;
        width: 100%;
        height: 19rem;
        overflow-y:scroll;
    }
    .search-result .list-head {
        width: 98%;
        margin-left: 2rem;
        text-align: center;  
    }
    .search-result .list-head span{
        margin: 0 3%;
        width: 30%;
        font-weight: bold;
        color: #000;
        background: #eee;
        border-radius: .5rem;
        padding: .2rem;
    }
    .list-head .selectWrap {
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
    .search-result .list-head .current {
        background: #bce8f1;
    }
    .search-result .userList {
        width: 100%;
        margin: 20px 0;
        font-size: .85rem;
        text-align: center;
        background: #fff;
        padding: 1rem 0;
    }
    .search-result .userList .userContainer {
        margin-top: 10px;
    }
    .userContainer .display-info, .userContainer .user-info {
        width: 3rem;
        height: 100%;
        margin: 0 20px 0 10px;
        border: 1px solid #e7e7e7;
    }
    .userContainer .user-info {
        width: 80%;
        margin: 10px 1rem;
        text-align: center;
    }
    .userContainer .diplay-info>span{
        margin: 0 2% 0 4%;
        width: 25%;
        height: 20px;
        line-height: 20px;
        float: left;
        color: #000;
        display: inline-block;
        text-align: center;
    }
    .userContainer .diplay-info .admin-btn {
        margin: 0;
        display: inline-block;
        width: 3rem;
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
        font-size: .85rem;
        position: absolute;
        vertical-align: middle;
        border-radius: 1rem;
        padding-top: 5%;
        background: #bce8f1;
        z-index: 999;
    }
    .confirmFrame .confirm-wrap {
        padding: 1rem 0;
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
    .confirm-wrap .btnConfirm {
        display: inline-block;
        width: 2rem;
        height: 1.5rem;
        border-radius: 5px;
        margin: .85rem 5px 0 0;
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