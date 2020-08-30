<template>
  <el-col :span="6">
    <div class="item">
      <div>
        <div class="item-img"><img :alt="item.name" :src="item.sku_info[itemIndex].ali_image + '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'" style="opacity: 1;">
        </div>
        <h6>{{item.name}}</h6>
        <h3>{{item.name_list}}</h3>
        <div class="params-colors">
          <ul class="colors-list">
            <li v-for="(sku,index) in item.sku_info" v-bind:key="index" @click="tableIndex(index)">
              <a href="javascript:;" :class="{'active': index === itemIndex}" :title="sku.spec_json.show_name">
                <img :src="'http://img01.smartisanos.cn/'+sku.spec_json.image+'20X20.jpg'">
              </a>
            </li>
          </ul>
        </div>
        <div class="item-btns clearfix">
          <el-button @click="toDetaul(item)">查看详情</el-button>
          <el-button type="primary" @click="addCarPanelHandle(item.sku_info[itemIndex])">加入购物车</el-button>
        </div>
        <div class="item-price clearfix">
          <i>¥</i><span>{{item.price}}</span>
        </div>
        <div class="discount-icon">false</div>
        <div class="item-cover">
          <router-link :to="{name:'item', query: {itemId: item.sku_info[itemIndex].sku_id}}"></router-link>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
    export default {
        name: 'shop-item',
        data() {
          return {
              itemIndex: 0
          }
        },
        props: {
            item: {
                type: Object
            }
        },
        methods: {
            tableIndex(index) {
                this.itemIndex = index
            },
            addCarPanelHandle(data) {
                let _data = {info: data, count: 1}
                this.$store.commit('addCarPanelData', _data)
            },
            toDetaul(item) {
                this.$router.push({name: 'item', query: {itemId: item.sku_info[this.itemIndex].sku_id}})
            }
        }
    }
</script>

<style scoped>

</style>
