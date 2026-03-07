# Table 树形数据功能

Table 组件支持树形数据展示，可以方便地展示层级结构数据。

## 基础用法

```vue
<template>
  <AleTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-config="{ childrenKey: 'children' }"
  />
</template>

<script setup lang="ts">
const treeData = [
  {
    id: 1,
    name: '总部',
    manager: '张总',
    children: [
      {
        id: 11,
        name: '技术部',
        manager: '李经理',
        children: [
          { id: 111, name: '前端组', manager: '王组长' },
          { id: 112, name: '后端组', manager: '刘组长' }
        ]
      },
      {
        id: 12,
        name: '市场部',
        manager: '赵经理',
        children: [
          { id: 121, name: '销售组', manager: '陈组长' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '分公司',
    manager: '孙总',
    children: [
      { id: 21, name: '人事部', manager: '周经理' }
    ]
  }
];

const columns = [
  { prop: 'name', label: '部门名称', width: 200 },
  { prop: 'manager', label: '负责人', width: 150 }
];
</script>
```

## 配置选项

### treeConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| childrenKey | 子节点字段名 | string | 'children' |
| defaultExpandAll | 是否默认展开所有节点 | boolean | false |
| checkable | 是否支持勾选（待实现） | boolean | false |
| draggable | 是否支持拖拽（待实现） | boolean | false |

## 展开/折叠

### 点击展开图标

用户可以通过点击行首的展开/折叠图标来控制节点的展开状态。

### 编程方式控制

通过 ref 引用 Table 组件，可以调用以下方法：

```vue
<template>
  <AleTable
    ref="tableRef"
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-config="treeConfig"
  />
  <button @click="expandAll">展开全部</button>
  <button @click="collapseAll">折叠全部</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableRef = ref();

const expandAll = () => {
  tableRef.value?.expandAll();
};

const collapseAll = () => {
  tableRef.value?.collapseAll();
};

// 展开指定行
const expandRow = (row) => {
  tableRef.value?.expandRow(row);
};

// 折叠指定行
const collapseRow = (row) => {
  tableRef.value?.collapseRow(row);
};

// 切换展开状态
const toggleExpansion = (row) => {
  tableRef.value?.toggleTreeRowExpansion(row);
};

// 检查是否已展开
const isExpanded = (row) => {
  return tableRef.value?.isTreeRowExpanded(row);
};
</script>
```

## 默认展开所有节点

```vue
<template>
  <AleTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-config="{ childrenKey: 'children', defaultExpandAll: true }"
  />
</template>
```

## 自定义子节点字段名

```vue
<template>
  <AleTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-config="{ childrenKey: 'subItems' }"
  />
</template>

<script setup lang="ts">
const treeData = [
  {
    id: 1,
    name: '父节点',
    subItems: [
      { id: 2, name: '子节点' }
    ]
  }
];
</script>
```

## 与其他功能集成

树形数据功能可以与其他 Table 功能一起使用：

### 与选择功能集成

```vue
<template>
  <AleTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-config="{ childrenKey: 'children' }"
  >
    <AleTableColumn type="selection" width="50" />
    <AleTableColumn prop="name" label="名称" />
  </AleTable>
</template>
```

### 与展开行功能集成

```vue
<template>
  <AleTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    expandable
    :tree-config="{ childrenKey: 'children' }"
  >
    <AleTableColumn type="expand" width="50" />
    <AleTableColumn prop="name" label="名称" />
    
    <template #expand="{ row }">
      <div>自定义展开内容: {{ row.name }}</div>
    </template>
  </AleTable>
</template>
```

## 样式定制

树形数据相关样式类：

| 类名 | 说明 |
|------|------|
| `.ale-table__tree-icon` | 树形展开图标容器 |
| `.ale-table__tree-icon.is-expanded` | 展开状态 |
| `.ale-table__tree-icon.is-leaf` | 叶子节点 |
| `.ale-table__tree-arrow` | 展开箭头图标 |
| `.ale-table__tree-placeholder` | 叶子节点占位符 |
| `.ale-table__row--tree` | 树形数据行 |
| `.ale-table__row--tree-expanded` | 已展开的行 |

## 注意事项

1. 使用树形数据时必须设置 `row-key` 属性
2. 树形数据与普通表格数据可以共存（当没有 `treeConfig` 时按普通表格处理）
3. 树形展开/折叠状态是响应式的，数据变化后会自动更新
4. 层级缩进默认为每级 20px
