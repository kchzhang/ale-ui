<template>
  <section class="demo-section">
    <h2 class="demo-section__title">属性说明</h2>
    <div class="props-table-wrapper">
      <table class="props-table">
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td>{{ prop.desc }}</td>
            <td><code>{{ prop.type }}</code></td>
            <td>{{ prop.default }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = [
  { name: 'data', desc: '树形数据', type: 'TreeData[]', default: '[]' },
  { name: 'showLine', desc: '是否显示连接线', type: 'boolean', default: 'false' },
  { name: 'checkable', desc: '是否显示复选框', type: 'boolean', default: 'false' },
  { name: 'multiple', desc: '是否支持多选', type: 'boolean', default: 'false' },
  { name: 'draggable', desc: '是否可拖拽', type: 'boolean', default: 'false' },
  { name: 'defaultExpandAll', desc: '是否默认展开所有节点', type: 'boolean', default: 'false' },
  { name: 'defaultExpandedKeys', desc: '默认展开的节点 key 数组', type: '(string | number)[]', default: '[]' },
  { name: 'showIcon', desc: '是否显示节点图标', type: 'boolean', default: 'false' },
  { name: 'searchable', desc: '是否可搜索', type: 'boolean', default: 'false' },
  { name: 'highlightCurrent', desc: '是否高亮匹配内容', type: 'boolean', default: 'false' },
  { name: 'accordion', desc: '是否手风琴模式', type: 'boolean', default: 'false' }
];
</script>

<style scoped>
.demo-section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.demo-section__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
}

.props-table-wrapper {
  overflow-x: auto;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.props-table th,
.props-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.props-table th {
  font-weight: 600;
  color: var(--color-text-primary);
  background-color: var(--color-gray-50);
}

.props-table td {
  color: var(--color-text-regular);
}

.props-table code {
  padding: 2px 6px;
  background-color: var(--color-gray-100);
  border-radius: 3px;
  font-family: var(--font-family-code);
  font-size: 12px;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .demo-section {
    padding: 20px;
  }
  
  .props-table {
    font-size: 12px;
  }
  
  .props-table th,
  .props-table td {
    padding: 8px 12px;
  }
}
</style>
