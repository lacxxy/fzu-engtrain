<template>
    <div class="container">
        <!-- <Breadcrumb :name="name" /> -->
        <el-row>
            <el-col :span="12">
                <el-card>
                    <h3>各个公司的订单量</h3>
                    <el-table :data="orderData" style="width: 100%">
                        <el-table-column prop="company_name" label="公司名称"></el-table-column>
                        <el-table-column prop="order_count" label="订单量"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <h3>各个公司的员工数</h3>
                    <el-table :data="employeeData" style="width: 100%">
                        <el-table-column prop="company_name" label="公司名称"></el-table-column>
                        <el-table-column prop="employee_count" label="员工数"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <h3>各个公司的订单量</h3>
                    <div ref="chart" style="height: 500px"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <h3>各个公司的员工数</h3>
                    <div ref="employee-chart" style="height: 500px"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
  
  
<script>
import * as echarts from 'echarts'
// import Breadcrumb from "@/components/Breadcrumb";
import axios from 'axios'
export default {
    data() {
        return {
            name: "统计数据",
            orderData: [],
            employeeData: [],
        }
    },
    // components: {
    //     Breadcrumb,
    // },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('/statistic/company')
                .then((response) => {
                    console.log(response)
                    const data = response.data
                    this.orderData = this.countOrderByCompany(data)
                    this.employeeData = this.countEmployeeByCompany(data)
                    this.drawChart(this.orderData)
                    this.drawEmployeeChart(this.employeeData)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        countOrderByCompany(data) {
            const orderData = []
            const companyMap = new Map()
            for (const item of data) {
                const company = item.company.user_name
                const orderCount = item.orders.length
                if (!companyMap.has(company)) {
                    companyMap.set(company, 0)
                }
                companyMap.set(company, companyMap.get(company) + orderCount)
            }
            for (const [company, orderCount] of companyMap) {
                orderData.push({ company_name: company, order_count: orderCount })
            }
            return orderData
        },
        countEmployeeByCompany(data) {
            const employeeData = []
            const companyMap = new Map()
            for (const item of data) {
                const company = item.company.user_name
                const employeeCount = item.servicemans.length
                if (!companyMap.has(company)) {
                    companyMap.set(company, 0)
                }
                companyMap.set(company, companyMap.get(company) + employeeCount)
            }
            for (const [company, employeeCount] of companyMap) {
                employeeData.push({ company_name: company, employee_count: employeeCount })
            }
            return employeeData
        },
        drawChart(data) {
            const chart = echarts.init(this.$refs.chart)
            const legendData = []
            const seriesData = []
            data.forEach((item) => {
                legendData.push(item.company_name)
                seriesData.push({
                    name: item.company_name,
                    value: item.order_count
                })
            })
            const option = {
                title: {
                    text: '各公司订单量分析',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legendData
                },
                series: [
                    {
                        name: '订单量',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '60%'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            chart.setOption(option)
        },
        drawEmployeeChart(data) {
            const chart = echarts.init(this.$refs['employee-chart'])
            const option = {
                title: {
                    text: '各个公司的员工数',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: data.map(item => item.company_name),
                },
                series: [
                    {
                        name: '员工数',
                        type: 'pie',
                        radius: '50%',
                        data: data.map(item => {
                            return {
                                value: item.employee_count,
                                name: item.company_name,
                            }
                        }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            }
            chart.setOption(option)
        },
    }
}
</script>