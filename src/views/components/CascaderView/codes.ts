/**
 * CascaderView 代码示例
 */

export const basicCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="请选择地区"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';
import type { CascaderOption } from 'ale-ui';

const value = ref<(string | number)[]>([]);

const options: CascaderOption[] = [
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
  }
];
<\/script>`;

export const allLevelsCode = `<template>
  <!-- 显示完整路径 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="true"
    placeholder="显示完整路径"
  />
  
  <!-- 只显示最后一级 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="false"
    placeholder="只显示最后一级"
  />
</template>`;

export const separatorCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    separator=" > "
    placeholder="自定义分隔符"
  />
</template>`;

export const clearableCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    clearable
    placeholder="可清空的选择器"
  />
</template>`;

export const disabledCode = `<template>
  <!-- 禁用状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    disabled
    placeholder="禁用状态"
  />
  
  <!-- 正常状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="正常状态"
  />
</template>`;

export const sizeCode = `<template>
  <AleCascader v-model="value" :options="options" size="large" placeholder="大尺寸" />
  <AleCascader v-model="value" :options="options" size="medium" placeholder="中等尺寸" />
  <AleCascader v-model="value" :options="options" size="small" placeholder="小尺寸" />
</template>`;

export const filterableCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    filterable
    placeholder="可搜索的选择器"
  />
</template>`;

export const expandCode = `<template>
  <!-- 点击展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="click"
    placeholder="点击展开"
  />
  
  <!-- 悬停展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="hover"
    placeholder="悬停展开"
  />
</template>`;

export const strictCode = `<template>
  <!-- 单选任意节点 -->
  <AleCascader
    v-model="singleValue"
    :options="options"
    check-strictly="single"
    placeholder="单选任意节点"
  />
  
  <!-- 多选任意节点 -->
  <AleCascader
    v-model="multipleValue"
    :options="options"
    check-strictly="multiple"
    placeholder="多选任意节点"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';

// 单选模式：值为一维数组
const singleValue = ref<(string | number)[]>([]);

// 多选模式：值为二维数组
const multipleValue = ref<(string | number)[][]>([]);
<\/script>`;

export const eventCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    @change="handleChange"
    @expand-change="handleExpandChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<(string | number)[]>([]);

const handleChange = (value) => {
  console.log('change:', value);
};

const handleExpandChange = (value) => {
  console.log('expand-change:', value);
};

const handleVisibleChange = (visible) => {
  console.log('visible-change:', visible);
};

const handleClear = () => {
  console.log('clear');
};
<\/script>`;
