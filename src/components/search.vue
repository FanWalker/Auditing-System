<template>
    <div class="search-container">
        <h4 class="search-title">审核结果搜索</h4>
        <div class="search-content">
            <div class="search-nav">
                <input type="text" class="search-frame" v-model="searchName">
                <button class="search-btn btn btn-info" @click="search">搜索</button>
            </div>
            <div class="search-result"  v-if="searchResult.length>0">
                <div class="search_head">
                    <div class="userName">姓名</div>
                    <div class="userPhone">手机号</div>
                    <div class="userState">审核结果</div>
                </div>
               <div class="userDisplay" v-for="user in searchResult">
                   <div class="userName">{{user.name}}</div>
                   <div class="userPhone">{{showphone(user)}}</div>
                   <div class="userState">{{user.state}}</div>
               </div>
            </div>
            <div class="errInfo">
                {{errInfo}}
            </div>
           <v-pagination  v-if="total>0" ref="child" :total="total" :current-page='curPage' @pagechange="pagechange"></v-pagination>
        </div>
    </div>
</template>

<script>
import pagination from '@/components/pagination'

    export default {
        name: 'searchVue',
        data() {
            return {
                searchResult: [],
                searchName: '',
                errInfo: '',
                phone: '',
                curTarget: '',
                total: 0,     // 记录总条数
                curPage: 1,   // 当前的页数
            }
        },
        methods: {
            search: function(){
                this.searchResult = [];
                this.$http({
                    url: '/user/admin/search',
                    method: 'GET',
                    params: {
                        userName: this.searchName
                    }
                }).then((res)=>{
                    if(res.data == "error"){
                        this.errInfo = '查无此人，请重新输入！'
                        $(".search-frame").focus();
                    }
                    else{
                        this.errInfo = '';
                        this.searchResult=res.data.users;
                        this.total = res.data.totalPage;
                        if(this.total>0){
                            this.clickChild();      
                        }
                    }
                    })
            },
            pagechange:function(currentPage){
             // ajax请求, 向后台发送 currentPage, 来获取对应的数据
                this.$http({
                    url: '/user/admin/search',
                    method: 'GET',
                    params: {
                        userName: this.searchName,
                        p: currentPage-1
                    }
                }).then((res) => {
                    this.searchResult = res.data.users;
                })
            },
            showphone: function(user) {
                return user.phoneNumber.replace(/\d{7}(\d{4})/, '*******$1');;
            },
            clickChild: function() {
                this.$refs.child.setCurrent(1);
            }
        },
        components: {
            'v-pagination': pagination,
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
    }
    .search-nav input {
        width: 50%;
        height: 100%;
        margin: 0 15px;
        border: none;
        border-bottom: 1px solid #a1d543;
    }
    .search-btn { 
        width: 10%;
        height: 100%;
        margin: 0 5px;
        padding: 0;
        vertical-align: middle;
        text-align: center;
    }
    .search-result {
        margin: 2rem 0;
        font-size: .85rem;
        padding: 0;
        background: #fff;
        box-sizing: border-box;
        height: 19rem;
        overflow: hidden;
    }
    .search-result .search_head {
        font-size: 1rem;
        font-weight: bold;
        width: 100%;
    }
    .userName, .userState, .userPhone{
        width: 4rem;
        height: 1rem;
        display: inline-block;
        text-align: left;
        padding: 0;
        margin: 1rem 0;
    }
    .userDisplay {
        margin-left: 1rem;
    }
    .userDisplay .userPhone {
        margin-right: 1.5rem;
    }
    .errInfo {
        width: 50%;
        height: 100%;
        margin: 0 13%;
        color: #ff5533;
        font-size: 0.9rem;
        border: none;
    }
</style>