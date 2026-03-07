<template>
  <section class="demo-section">
    <h2 class="demo-section__title">方法说明</h2>
    <div class="props-table-wrapper">
      <table class="props-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in methods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.desc }}</td>
            <td><code>{{ method.params }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
const methods = [
  { name: 'expandAll', desc: '展开所有节点', params: '-' },
  { name: 'collapseAll', desc: '收起所有节点', params: '-' },
  { name: 'getSelectedNodes', desc: '获取选中节点', params: '-' },
  { name: 'getCheckedNodes', desc: '获取勾选节点', params: '-' },
  { name: 'getHalfCheckedNodes', desc: '获取半勾选节点', params: '-' },
  { name: 'append', desc: '添加节点', params: '(data, parentKey?)' },
  { name: 'remove', desc: '删除节点', params: '(key)' },
  { name: 'insertBefore', desc: '在参考节点前插入', params: '(data, refKey)' },
  { name: 'insertAfter', desc: '在参考节点后插入', params: '(data, refKey)' },
  { name: 'filter', desc: '过滤节点', params: '(value)' }
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
