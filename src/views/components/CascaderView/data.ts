/**
 * CascaderView 数据和选项
 */

import { ref } from 'vue';
import type { CascaderOption } from 'ale-ui';

// 级联选择器选项数据
export const options: CascaderOption[] = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' }
        ]
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'sanlitun', label: '三里屯' },
          { value: 'guomao', label: '国贸' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴' },
          { value: 'zhangjiang', label: '张江' }
        ]
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjinglu', label: '南京路' },
          { value: 'waitan', label: '外滩' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' }
        ]
      }
    ]
  },
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'yinzhou', label: '鄞州区' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州市',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'sip', label: '工业园区' }
        ]
      }
    ]
  }
];

// 各种示例的值
export const basicValue = ref<(string | number)[]>([]);
export const allLevelsValue = ref<(string | number)[]>(['beijing', 'haidian', 'zhongguancun']);
export const separatorValue = ref<(string | number)[]>([]);
export const clearableValue = ref<(string | number)[]>(['guangdong', 'guangzhou', 'tianhe']);
export const disabledValue = ref<(string | number)[]>(['beijing', 'chaoyang', 'sanlitun']);
export const sizeValue = ref<(string | number)[]>([]);
export const filterableValue = ref<(string | number)[]>([]);
export const expandValue = ref<(string | number)[]>([]);
export const singleValue = ref<(string | number)[]>([]);
export const multipleValue = ref<(string | number)[][]>([]);
export const eventValue = ref<(string | number)[]>([]);
export const eventLogs = ref<string[]>([]);

// 事件处理
export const handleChange = (value: (string | number)[] | (string | number)[][]) => {
  eventLogs.value.unshift(`change: ${JSON.stringify(value)}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

export const handleExpandChange = (value: (string | number)[]) => {
  eventLogs.value.unshift(`expand-change: ${JSON.stringify(value)}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

export const handleVisibleChange = (visible: boolean) => {
  eventLogs.value.unshift(`visible-change: ${visible}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

export const handleClear = () => {
  eventLogs.value.unshift('clear');
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};
