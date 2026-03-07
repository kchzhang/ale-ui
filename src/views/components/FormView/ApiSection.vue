<template>
  <section class="component-demo-view__section">
    <h2 class="component-demo-view__section-title">API 说明</h2>

    <div v-for="(section, index) in sections" :key="index" class="api-section">
      <h3>{{ section.title }}</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th v-for="col in section.columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in section.data" :key="rowIndex">
            <td v-for="col in section.columns" :key="col">
              <code v-if="shouldWrapCode(col)">{{ getRowValue(row, col) }}</code>
              <span v-else>{{ getRowValue(row, col) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  formPropsTable,
  formMethodsTable,
  formItemPropsTable,
  validationRulesTable
} from './api';

interface ApiSection {
  title: string;
  columns: string[];
  data: Record<string, string>[];
}

const sections: ApiSection[] = [
  {
    title: 'Form Props',
    columns: ['参数', '说明', '类型', '默认值'],
    data: formPropsTable.map(item => ({
      '参数': item.param,
      '说明': item.desc,
      '类型': item.type,
      '默认值': item.default
    }))
  },
  {
    title: 'Form 方法',
    columns: ['方法名', '说明', '参数'],
    data: formMethodsTable.map(item => ({
      '方法名': item.method,
      '说明': item.desc,
      '参数': item.params
    }))
  },
  {
    title: 'FormItem Props',
    columns: ['参数', '说明', '类型', '默认值'],
    data: formItemPropsTable.map(item => ({
      '参数': item.param,
      '说明': item.desc,
      '类型': item.type,
      '默认值': item.default
    }))
  },
  {
    title: '验证规则',
    columns: ['规则', '说明', '示例'],
    data: validationRulesTable.map(item => ({
      '规则': item.rule,
      '说明': item.desc,
      '示例': item.example
    }))
  }
];

const shouldWrapCode = (col: string) => {
  return ['类型', '默认值', '参数', '示例'].includes(col);
};

const getRowValue = (row: Record<string, string>, col: string) => {
  return row[col] || '-';
};
</script>

<style scoped>
.api-section {
  margin-bottom: 32px;
}

.api-section:last-child {
  margin-bottom: 0;
}

.api-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  background: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.api-table td {
  color: var(--color-text-secondary);
}

.api-table code {
  padding: 2px 6px;
  background: var(--color-bg-secondary);
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: var(--color-primary);
}
</style>
