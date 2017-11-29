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
                    <div class="userState">审核结果</div>
                </div>
               <div v-for="user in searchResult">
                   <div class="userName">{{user.name}}</div>
                   <div class="userState">{{user.state}}</div>
               </div>
            </div>
            <div class="errInfo">
                {{errInfo}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'searchVue',
        data() {
            return {
                searchResult: [],
                searchName: '',
                errInfo: ''
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
                    if(res.data == ''){
                        this.errInfo = '查无此人，请重新输入！'
                        $(".search-frame").focus();
                    }
                    else{
                        this.searchResult.push(res.data);
                        console.log(this.searchResult.length)
                    }
                    })
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
        padding: 0;
        background: #fff;
    }
    .search-result .search_head {
        font-size: 1rem;
        font-weight: bold;
    }
    .userName, .userState {
        width: 20%;
        display: inline-block;
        text-align: left;
        margin: 1rem 2rem;
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