<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="closePop()">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <i>收货人姓名</i>
                      <input type="text" class="js-verify" v-model="receive.name">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3" :class="{'form-invalid-item': phoneError}">
                      <i>手机号</i>
                      <input type="text" class="js-verify" v-model="receive.phone" @blur="inspectPhone" @focus="setPhoneError">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 area-code-w fn-left form-valid-item">
                      <i>区号（可选）</i>
                      <input type="text" class="js-verify js-address-area-code" v-model="receive.areaCode">
                      <div class="verify-error"></div>
                    </div>
                    <div class="form-item-v3 telephone-w fn-right form-valid-item">
                      <i>固定电话（可选）</i>
                      <input type="text" class="js-verify js-address-telephone" v-model="receive.landLine">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select name="province_code" class="province select-province js-form-province js-verify" v-model="receive.provinceId">
                        <option value="0">请选择省份</option>
                        <option :value="item.area_id" v-for="(item, index) in addList" v-bind:key="index">{{item.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.cityId">
                        <option value="0">请选择城市</option>
                        <option :value="item.area_id" v-for="(item, index) in cityList" v-bind:key="index">{{item.area_name}}</option>
                      </select>
                    </div>
                    <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                      <select class="city select-city js-form-city js-verify" v-model="receive.countyId">
                        <option value="0">请选择区县</option>
                        <option :value="item.area_id" v-for="(item, index) in countryList" v-bind:key="index">{{item.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <i>详细地址，如街道名称，楼层，门牌号码等</i>
                      <input type="text" class="js-verify" v-model="receive.add">
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear">
<!--                    <input type="checkbox" class="hide" v-model="receive.default">-->
                    <el-checkbox v-model="receive.default">设为默认</el-checkbox>
<!--                    <span class="blue-checkbox" :class="{'blue-checkbox-on': receive.default}" @click="receive.default=!receive.default"></span>设为默认-->
                  </div>
                  <div class="dialog-blue-btn big-main-btn js-verify-address" :class="{'disabled-btn': !isRight}" @click="submitReceiveHandle">
                    <a>保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'address-pop',
        data() {
            return {
                addList: [{'area_id': 110000,'area_name': '北京市','city_list': [{'area_name': '市辖区','area_id': 110100,'county_list': [{'area_name': '东城区','area_id': 110101},{'area_name': '海淀区','area_id': 110106}]},{'area_name': '县','area_id': 110200,'county_list': [{'area_name': '密云县','area_id': 110228},{'area_name': '延庆县','area_id': 110229}]}]},{'area_id': 440000,'area_name': '广东省','city_list': [{'area_id': 440300,'area_name': '深圳市','county_list': [{'area_name': '罗湖区','area_id': 440303},{'area_name': '福田区','area_id': 440304}]},{'area_id': 440100,'area_name': '广州市','county_list': [{'area_name': '荔湾区','area_id': 440103},{'area_name': '越秀区','area_id': 440104}]}]},{'area_id': 310000,'area_name': '上海市','city_list': [{'area_id': 310100,'area_name': '市辖区','county_list': [{'area_id': 310113,'area_name': '宝山区'},{'area_id': 310105,'area_name': '长宁区'}]},{'area_id': 310200,'area_name': '县','county_list': [{'area_name': '崇明县','area_id': 310230}]}]}],
                receive: {
                    "name": "",
                    "phone": "",
                    "areaCode": "",
                    "landLine": "",
                    "provinceId": 0,
                    "province": "",
                    "cityId": 0,
                    "city": "",
                    "countyId": 0,
                    "county": "",
                    "add": "",
                    "default": false
                },
                phoneError: false,
                isRight: false
            }
        },
        watch: {
            'receive.countyId' () {
                this.countryList.forEach((country) => {
                    if (country.area_id === this.receive.countyId) {
                        this.receive.county = country.area_name
                    }
                })
            },
            'receive.provinceId' () {
                this.addList.forEach((province) => {
                    if (province.area_id === this.receive.provinceId) {
                        this.receive.province = province.area_name
                    }
                })
                if (this.receive.provinceId === '0') {
                    this.receive.cityId = '0'
                }
            },
            'receive.cityId' () {
                this.addList.forEach((city) => {
                    if (city.area_id === this.receive.cityId) {
                        this.receive.city = city.area_name
                    }
                })
                if (this.receive.cityId === '0') {
                    this.receive.countyId = '0'
                }
            },
            receive: {
                handler() {
                    this.checkForm()
                },
                deep: true
            }
        },
        computed: {
            cityList() {
                let cityList = []
                this.addList.forEach((province) => {
                    if (province.area_id === this.receive.provinceId) {
                        cityList = province.city_list
                    }
                })

                return cityList
            },
            countryList() {
                let countryList = []
                this.cityList.forEach((city) => {
                    if (city.area_id === this.receive.cityId) {
                        countryList = city.county_list
                    }
                })
                return countryList
            }
        },
        methods: {
            closePop() {
                this.$emit('close')
            },
            inspectPhone() {
                if (this.receive.phone.length === 13) {
                    this.phoneError = false
                } else {
                    this.phoneError = true
                }
            },
            setPhoneError() {
                this.phoneError = false
            },
            checkForm() {
                if (this.receive.name) {
                    this.isRight = true
                } else {
                    this.isRight = false
                }
            },
            submitReceiveHandle() {
                if (this.isRight) {
                    this.$store.commit('submitReceive', this.receive)
                    this.closePop()
                }
            }
        }
    }
</script>

<style scoped>
  #pop .module-dialog-layer{
    display: none;
    position: fixed;
    _position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .6;
  }
  #pop .module-dialog .dialog-panel, .module-dialog:after{
    display: inline-block;
    vertical-align: middle;
  }
  #pop .module-dialog:after{
    content: '';
    height: 100%;
    margin-left: -.25em;
  }
  #pop .module-dialog{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    text-align: center;
    opacity: 0;
    transition: opacity .2s ease-in;
  }
  #pop .module-dialog-show{
    opacity: 1;
  }
  #pop .module-dialog .dialog-panel{
    position: relative;
    width: 450px;
    min-width: 200px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset, 1px 0 3px rgba(0,0,0,.1);
    text-align: left;
    height: 592px;
  }
  #pop .module-dialog .topbar{
    overflow: hidden;
    width: 100%;
    height: 60px;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 2px 0 5px rgba(0,0,0,.1);
  }
  #pop .module-dialog-address .topbar{
    position: relative;
    z-index: 10;
  }
  #pop .module-dialog .dialog-tit{
    height: 60px;
    padding: 0 15px;
    line-height: 60px;
  }
  #pop .module-dialog .dialog-tit h4{
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #666;
  }
  #pop .module-dialog .dialog-close{
    overflow: hidden;
    display: block;
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 20;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    color: #000;
    opacity: .2;
    cursor: pointer;
    transition: all .3s linear;
  }
  #pop .module-dialog .dialog-close:hover{
    opacity: .3;
  }
  #pop .module-dialog .animate-layer{
    position: relative;
  }
  #pop .module-dialog-address .save-address-box{
    width: 450px;
    padding-top: 29px;
  }
  #pop .address-form{
    width: 370px;
    margin: 0 auto;
  }
  #pop .account-address .address-form{
    padding: 30px;
    margin: 0;
  }
  #pop .module-form-row{
    position: relative;
    padding-bottom: 10px;
    margin: 0 auto;
  }
  #pop .address-form .module-form-row{
    padding-bottom: 15px;
  }
  #pop .module-form-row .form-item-v3{
    position: relative;
    height: 46px;
    background: #FFF;
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    line-height: 46px;
    font-size: 18px;
    opacity: .618;
    transition: opacity .3s ease;
  }
  #pop .module-form-row .form-item-v3 i{
    position: absolute;
    left: 15px;
    top: 0;
    font-size: 16px;
    color: #BEBEBE;
  }
  #pop .module-form-row .form-item-v3 input{
    padding: 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
  }
  #pop .address-form .form-item-v3 input{
    width: 330px;
  }
  #pop .address-form .area-code-w{
    width: 118px;
  }
  #pop .address-form .telephone-w{
    width: 238px;
  }
  #pop .module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
  }
  #pop .module-form-row .form-item-v3 select{
    margin: 0 0 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
  }
  #pop .address-form .select-province{
    width: 370px;
  }
  #pop .form-focus-item{
    z-index: 1;
    opacity: 1;
    border: 1px solid #6B93F2;
  }
  #pop .module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
  }
  #pop .module-form-row .form-item-v3 select{
    height: 48px;
    padding: 0 15px;
    margin: 0;
    background: -webkit-linear-gradient(top,#FAFAFA,#F5F5F5);
    background: linear-gradient(#FAFAFA,#F5F5F5);
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 2px 0 0 rgba(255,255,255,.4) inset, 1px 0 0 rgba(255,255,255,.3);
    line-height: 48px;
    text-indent: 0;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }
  #pop .address-form .select-city, .address-form .select-district{
    width: 180px;
  }
  #pop .blue-checkbox, .blue-checkbox-disable, .blue-checkbox-on{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-bg.png) no-repeat;
    cursor: pointer;
  }
  #pop .address-form .blue-checkbox{
    top: 0;
    float: left;
    margin-right: 5px;
  }
  #pop .dialog-blue-btn{
    padding: 1px;
    background: #6383C6;
    background: linear-gradient(#6383C6,#4262AF);
    border-radius: 6px;
    text-align: center;
    color: #FFF;
  }
  #pop .disabled-btn{
    opacity: .4;
  }
  #pop .disabled-btn, .disabled-btn a{
    cursor: not-allowed;
    -webkit-transition: none;
    transition: none;
    pointer-events: none;
  }
  #pop .dialog-blue-btn a{
    display: block;
    padding: 2px 0;
    background: #5F7ED7;
    background: linear-gradient(#6F97E5,#527ED9);
    border-radius: 5px;
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
  }
  #pop .big-main-btn a{
    height: 42px;
    line-height: 42px;
    font-size: 18px;
  }
  #pop .module-form-row .form-invalid-item{
    opacity: 1;
    border: 1px solid #D16D62;
  }
  #pop .module-form-row .form-invalid-item:after{
    visibility: visible;
    opacity: 1;
  }
</style>
