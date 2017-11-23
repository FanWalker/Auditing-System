<template>
    <div class="search-container">
        <h4 class="search-title">审核结果搜索</h4>
        <div class="search-content">
            <div class="search-nav">
                <input type="text" class="search-frame ">
                <button class="search-btn btn btn-info">搜索</button>
            </div>
            <div class="search-result" style="display:none">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="name-text">姓名</th>
                            <th class="result-text">审核结果</th>
                        </tr>
                    </thead>
                    <tbody class="table-striped">
                        <tr>
                            <td class="userName">1、郭靖</td>
                            <td class="result">审核通过</td>
                        </tr>
                        <tr>
                            <td class="userName">2、周芷若</td>
                            <td class="result">审核通过</td>
                        </tr>
                        <tr>
                            <td class="userName">3、赵敏</td>
                            <td class="result">审核通过</td>
                        </tr>
                        <tr>
                            <td class="userName">4、张无忌</td>
                            <td class="result">审核通过</td>
                        </tr>
                        <tr>
                            <td class="userName">5、洪七公</td>
                            <td class="result">审核通过</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'searchVue',
        data() {
            return {

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
        margin: 30px auto;
        padding: 10px 20px;
    }
    table thead th {
        text-align: center;
    }
    .result-text {
        text-align: right;
    }
    .userName {
        width: 6em;
        text-align: left;
    }
    .result {
        text-align: right;
    }
</style>