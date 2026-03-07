<template>
  <section class="demo-section">
    <h2 class="demo-section__title">事件说明</h2>
    <div class="props-table-wrapper">
      <table class="props-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.desc }}</td>
            <td><code>{{ event.params }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
const events = [
  { name: 'expand', desc: '展开/收起节点时触发', params: '(expandedKeys, { expanded, node })' },
  { name: 'select', desc: '选中节点时触发', params: '(selectedKeys, { selected, selectedNodes, node, event })' },
  { name: 'check', desc: '勾选节点时触发', params: '(checkedKeys, { checked, checkedNodes, node, event })' },
  { name: 'click', desc: '点击节点时触发', params: '(node, event)' },
  { name: 'dblclick', desc: '双击节点时触发', params: '(node, event)' }
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
