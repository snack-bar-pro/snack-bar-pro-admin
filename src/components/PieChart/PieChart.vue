<template>
  <div :id='piechartId' style="width: 450px; height: 450px;"></div>
</template>
<script>
  export default {
    name: 'PieChart',
    data () {
      return {
        chart: {},
      };
    },
    props: {
      data: {
        default: {},
        type: Object,
      },
      piechartId: {
        default: '',
        type: String,
      }
    },
    mounted () {
      this.getEchartData();
    },
    watch: {
      data () {
        this.getEchartData();
      }
    },
    methods: {
      getEchartData () {
        const chart = document.getElementById(this.piechartId);
        if (chart) {
          const myChart = this.$echarts.init(chart);
          let option = {
              title: {
                text: this.data.title,
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: `{a} <br/>{b} : {c} ({d}%)`
              },
              series: [
                {
                  name: this.data.name,
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: this.data.data,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
          myChart.setOption(option);
          window.addEventListener('resize', () => {
            myChart.resize();
          });
          this.$on('hook:destroyed', () => {
            window.removeEventListener('resize', () => {
              myChart.resize();
            });
          });
        }
      },
    },
  };
</script>

<style scoped>
</style>
