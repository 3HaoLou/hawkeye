<template>
    <div class="ui calendar">
        <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input type="text" :placeholder="placeholder">
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import SemanticUiCalendar from 'semantic-ui-calendar/dist/calendar.min.js';
    import 'semantic-ui-calendar/dist/calendar.min.css';

    export default {
        name: 'j-datepicker',
        props: {
            dayOfStart: {
                type: Boolean,
                default: false
            },
            dayOfEnd: {
                type: Boolean,
                default: false
            },
            placeholder: String
        },
        data () {
            return {}
        },
        mounted () {
            $(this.$el).calendar({
                type: 'date',
                today: true,
                text: {
                    days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    monthsShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    today: '今天',
                    now: '现在',
                    am: '上午',
                    pm: '下午'
                },
                formatter: {
                    date: (date, settings) => {
                        return moment(date).format('YYYY-MM-DD');
                    }
                },
                onChange: this.onChange
            });
        },
        methods: {
            onChange (date, text, mode) {
                let _value;

                if (this.dayOfStart) {
                    _value = moment(text + ' 00:00:00').unix();
                    // this.$emit('input', )
                } else if (this.dayOfEnd) {
                    _value = moment(text + ' 23:59:59').unix();
                    // this.$emit('input', )
                } else {
                    _value = moment(text).unix();
                }

                console.log(_value);

                this.$emit('input', _value * 1000);
            }
        }
    }
</script>
