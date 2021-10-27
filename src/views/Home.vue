<template>
  <div class="about">
    <h1>todos</h1>
    <div class="about_box">
      <div>
        <div style="display:flex;align-items:center;border-bottom:1px solid gray">
          <i @click="quan()"
             class="el-icon-arrow-down"
             id="font"
             :style="{color:check==true?'black':'gainsboro'}"></i><input type="text"
                 placeholder="what needs to be done"
                 class="input"
                 v-model="values"
                 v-on:keydown.enter="tiang">
        </div>
        <div style="overflow-y:auto;">
          <div v-show="indexs==0">
            <div v-for="(item) in $store.getters.getts"
                 class="radio"
                 :key="item.id">
              <input type="checkbox"
                     class="checkboxx"
                     :checked="item.check"
                     @change="shuan(item)" />
              <div :class="{'text':item.check==true}"
                   style="padding-left:10px; height:50px;flex:1;line-height:50px">{{item.name}}</div>
              <i @click.self="det(item)"
                 class="btn el-icon-close"></i>
            </div>
          </div>
          <div v-show="indexs==2">
            <div v-for="(item) in list"
                 class="radio"
                 :key="item.id"
                 v-show="item.check==true">
              <input type="checkbox"
                     class="checkboxx"
                     :checked="item.check"
                     @change="shuan(item)" />
              <div :class="{'text':item.check==true}"
                   style="padding-left:10px; height:50px;flex:1;line-height:50px">{{item.name}}</div>
              <i @click.self="det(item)"
                 class="btn el-icon-close"></i>
            </div>
          </div>
          <div v-show="indexs==1">
            <div v-for="(item) in list"
                 class="radio"
                 :key="item.id"
                 v-show="item.check==false">
              <input type="checkbox"
                     class="checkboxx"
                     :checked="item.check"
                     @change="shuan(item)" />
              <div :class="{'text':item.check==true}"
                   style="padding-left:10px; height:50px;flex:1;line-height:50px">{{item.name}}</div>

              <i @click.self="det(item)"
                 class="btn el-icon-close"></i>
            </div>
          </div>
        </div>
        <div class="midden"
             v-show="hume">
          <div>{{num}} items left</div>
          <div class="about_btn">
            <div v-for="(item,index) in arr"
                 :key="item.id"
                 :class='{"color":index==indexs}'
                 @click.self="fnn(index)">{{item.title}}</div>
          </div>
          <div :class="[{'xuan':hu}]"
               @click="clear()">Clear completed</div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "About",
  data () {
    return {
      num: 0,
      values: "",
      check: false,
      indexs: 0,
      inde: false,
      hu: true,
      hume: false,
      arr: [{
        title: "All",
        id: "1"
      },
      {
        title: "Action",
        id: "2"
      },
      {
        title: "Completed",
        id: "3"
      }]
    }
  },
  computed: {
    ...mapState(['list']),
  },
  mounted () {
    // console.log(this);
    var dayjs = require('dayjs')
    //import dayjs from 'dayjs' // ES 2015
    console.log(dayjs('2021-10-25+5').format('YYYY-MM-DDTHH:mm:ssZ[Z]'));
  },
  watch: {
    list: {
      handler (newval) {
        var a = []
        a = newval.filter((item) => {
          return item.check == false
        })
        this.num = a.length

      },
      deep: true
    }
  },
  methods: {
    clear () {
      let a = [];
      a = this.list.filter((item) => {
        return !item.check == true
      })
      this.$store.commit('shuan', a)
    },
    quan () {
      this.hu = !this.hu
      this.check = !this.check
      let kk = this.list
      kk.forEach(item => {
        item.check = this.check
      });
      this.$store.commit('shuan', kk)
    },
    shuan (val) {
      let kk = this.list
      kk.forEach(item => {
        if (item.name == val.name) {
          item.check = !item.check
        }
      });
      this.$store.commit('shuan', kk)
    },
    det (val) {
      var a = this.list.filter((item) => {
        return !(item.name == val.name)
      })
      this.$store.commit('studelete', a)
    },
    tiang () {
      this.hume = true

      if (this.values != "") {
        this.$store.commit('tiang', { name: this.values, check: false, id: Math.random() })
        this.values = ""
      }
    },
    fnn (val) {
      this.indexs = val;
    }
  }
}
</script>
<style>
.checkboxx {
  width: 25px;
  height: 25px;
  border: 1px solid rgb(219, 218, 218);
  background-color: #fff;
  line-height: 24px;
  font-size: 16px;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
}
input[type='checkbox']:checked {
  color: rgb(0, 243, 198);
  background: white;
  border: 1px solid rgb(150, 149, 149);
}
input[type='checkbox']:after {
  content: '✔';
}
.xuan {
  visibility: hidden;
}
.about_btn {
  padding: 0px 30px;
}
.about h1 {
  font-size: 80px;
  font-weight: 100;
  color: rgb(238, 211, 211);
  text-align: center;
}
.xianshi {
  /* border: 1px solid red; */
  visibility: hidden;
}
.midden {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input {
  border: none;
  outline: medium;
}
#font {
  font-size: 30px;
  font-weight: 800;
}
* {
  user-select: none;
}
.about .about_box .radio .text {
  text-decoration: line-through;
  color: gray;
}
.about .about_box .radio:hover .btn {
  display: block;
  cursor: pointer;
}
.about .about_box .radio .btn {
  margin-right: 10px;
  display: none;
  color: rgb(175, 91, 95);
  font-weight: 600;
  font-size: 20px;
}
.about .about_box .radio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background: white;
  height: 50px;
  border-bottom: 1px solid gainsboro;
}
.about .about_btn .color {
  border: 2px solid #5a5a59;
  padding: 0px 10px;
}
.about_btn > div {
  padding: 2px;

  border: 2px solid transparent;
  /* background: white; */
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
}
.about_btn {
  width: 170px;
  display: flex;
  justify-content: space-between;
}
.about_box {
  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  color: black;
}
.about {
  width: 500px;
  margin: 0 auto;
}
</style>