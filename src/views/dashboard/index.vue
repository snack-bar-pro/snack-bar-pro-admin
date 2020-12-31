<template>
  <div class="dashboard-container" v-if='isAlive'>
    <div style='display: inline-block'>
      <PieChart :data='historyPositionData' :piechart-id='"position-data"' style='display: inline'/>
    </div>
    <div style='display: inline-block'>
      <PieChart :data='historyItemData' :piechart-id='"item-data"' style='display: inline'/>
    </div>
    <div style='display: inline-block'>
      <PieChart :data='historyUserData' :piechart-id='"user-data"' style='display: inline'/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from '../../components/PieChart/PieChart';
import {getHistoryOrderData} from '../../service/dashboard.service';
import _ from 'lodash'
export default {
  name: 'Dashboard',
  components: {
    PieChart,
  },
  data () {
    return {
      historyPositionData: {},
      historyItemData: {},
      historyUserData: {},
      data: [],
      isAlive: true,
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted () {
    this.queryHistoryOrderData();
  },
  beforeDestroy () {
    this.isAlive = false;
  },
  methods: {
    async queryHistoryOrderData () {
      try {
        this.data = await getHistoryOrderData();
      }catch (e) {
        console.log(e);
      }
    },
    generateHistoryPositionData (data) {
      if (_.isEmpty(data)) {
        return {
          title: '',
          data: [],
          name: '',
        }
      }
      let addresses = _.groupBy(_.map(data, e => {
        return e.address;
      }), 'title');
      let res = [];
      let keys = _.keys(addresses);
      _.forEach(keys, e => {
        res.push({name: e, value: addresses[e].length})
      });
      this.historyPositionData = {
        title: '用户下单位置统计',
        data: res,
        name: '下单位置',
      }
    },
    generateHistoryUserData (data) {
      if (_.isEmpty(data)) {
        return {
          title: '',
          data: [],
          name: '',
        }
      }
      let users = _.groupBy(data, 'user');
      let res = [];
      let keys = _.keys(users);
      _.forEach(keys, e => {
        res.push({name: e, value: users[e].length})
      });
      this.historyUserData = {
        title: '系统常用用户分析',
        data: res,
        name: '用户名',
      }
    },
    generateHistoryOrderData (data) {
      if (_.isEmpty(data)) {
        return {
          title: '',
          data: [],
          name: '',
        }
      }
      let products = _.groupBy(_.flatten(_.map(data, e => {
        return e.products;
      })), 'title');
      let res = [];
      let keys = _.keys(products);
      _.forEach(keys, e => {
        let value = _.sumBy(products[e], y => {
          return y.count;
        });
        res.push({name: e, value: value})
      });
      this.historyItemData = {
        title: '用户下单商品统计',
        data: res,
        name: '商品信息',
      }
    }
  },
  watch: {
    data (newVal) {
      this.generateHistoryPositionData(newVal);
      this.generateHistoryOrderData(newVal);
      this.generateHistoryUserData(newVal);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
