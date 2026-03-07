# Table 组件重构文档

## 重构概述

Table 组件已按照功能模块进行拆分重构，从单一的 `Table.vue` 文件（1175 行）拆分为多个独立的 composable 模块，提高了代码的可维护性和可扩展性。

## 文件结构

```
packages/table/
├── Table.vue                    # 主组件（简化版）
├── Table.css                    # 样式文件
├── types.ts                     # TypeScript 类型定义
├── composables/                 # 功能模块目录
│   ├── index.ts                 # 入口文件
│   ├── useTableState.ts         # 状态管理模块
│   ├── useTableData.ts          # 数据处理模块
│   ├── useTableLayout.ts        # 布局样式模块
│   ├── useTableSelection.ts     # 选择功能模块
│   ├── useTablePagination.ts    # 分页功能模块
│   ├── useTableExpand.ts        # 展开功能模块
│   ├── useTableSortFilter.ts    # 排序筛选模块
│   ├── useTableEvents.ts        # 事件处理模块
│   ├── useTableExpose.ts        # 暴露方法模块
│   └── useTableContext.ts       # 上下文提供模块
└── README.md                    # 本文档
```

## 模块职责说明

### 1. useTableState - 状态管理
**职责**: 管理表格的核心响应式状态

**导出状态**:
- `selectedRows`: 选中的行集合
- `expandedRows`: 展开的行集合
- `currentRow`: 当前高亮行
- `sortColumn/sortOrder`: 排序状态
- `filterState`: 筛选状态
- `currentPage/pageSize`: 分页状态
- `isAllSelected/isIndeterminate`: 全选状态

**导出计算属性**:
- `paginationConfig`: 分页配置
- `showPagination`: 是否显示分页
- `totalPages`: 总页数
- `displayedPages`: 显示的页码数组

### 2. useTableData - 数据处理
**职责**: 处理数据的筛选、排序、分页逻辑

**导出**:
- `filteredData`: 筛选后的数据
- `sortedData`: 排序后的数据
- `displayData`: 最终显示的数据（含分页）
- `getCellValue`: 获取单元格值
- `formatCellValue`: 格式化单元格值
- `getIndex`: 获取行索引
- `getSummaryValue`: 获取汇总值

### 3. useTableLayout - 布局样式
**职责**: 计算表格、表头、单元格的样式和类名

**导出**:
- `tableClass/tableStyle`: 表格整体样式
- `headerWrapperStyle/headerTableStyle`: 表头样式
- `bodyWrapperStyle/bodyTableStyle`: 表格体样式
- `getColumnKey`: 获取列 key
- `getColStyle`: 获取列样式
- `getHeaderCellClass/getHeaderCellStyle`: 表头单元格样式
- `getRowClass/getCellClass`: 行和单元格类名
- `getCellStyle`: 单元格样式

### 4. useTableSelection - 选择功能
**职责**: 处理行选择、全选、反选等功能

**导出**:
- `getRowKeyValue`: 获取行 key
- `handleSelectAll`: 处理全选
- `handleRowSelect`: 处理行选择
- `toggleRowSelection`: 切换行选择状态
- `toggleAllSelection`: 切换全选
- `clearSelection`: 清空选择
- `getSelectionRows`: 获取选中的行

### 5. useTablePagination - 分页功能
**职责**: 处理页码切换、每页条数变化

**导出**:
- `handlePageChange`: 页码变化
- `handlePageSizeChange`: 每页条数变化
- `handleJumpPage`: 跳转页码

### 6. useTableExpand - 展开功能
**职责**: 处理行展开/收起

**导出**:
- `isRowExpanded`: 检查行是否展开
- `handleRowExpand`: 处理行展开
- `toggleRowExpansion`: 切换展开状态

### 7. useTableSortFilter - 排序和筛选
**职责**: 处理列排序和筛选

**导出**:
- `handleSort`: 处理排序
- `handleFilterClick`: 处理筛选点击
- `clearSort`: 清空排序
- `clearFilter`: 清空筛选

### 8. useTableEvents - 事件处理
**职责**: 处理各种用户交互事件

**导出**:
- `handleHeaderClick`: 表头点击
- `handleRowClick`: 行点击
- `handleRowDblclick`: 行双击
- `handleRowContextmenu`: 行右键
- `handleCellClick`: 单元格点击

### 9. useTableExpose - 暴露方法
**职责**: 定义组件暴露的方法供外部调用

**导出方法**:
- `clearSelection`: 清空选择
- `toggleRowSelection`: 切换行选择
- `toggleAllSelection`: 切换全选
- `getSelectionRows`: 获取选中的行
- `toggleRowExpansion`: 切换行展开
- `clearSort`: 清空排序
- `clearFilter`: 清空筛选
- `doLayout`: 重新计算布局
- `scrollToRow`: 滚动到指定行
- `scrollTo`: 滚动到指定位置
- `setCurrentRow`: 设置当前行
- `getCurrentRow`: 获取当前行

### 10. useTableContext - 上下文提供
**职责**: 提供表格上下文供子组件使用

## 主组件 Table.vue

主组件现在非常简洁，主要职责是：
1. 引入并组合各个 composable 模块
2. 定义模板结构
3. 提供生命周期钩子和上下文

## 重构优势

1. **单一职责**: 每个模块只负责一个功能领域
2. **可测试性**: 各个模块可以独立测试
3. **可复用性**: 逻辑可以在不同组件间复用
4. **可维护性**: 代码量减少，逻辑清晰
5. **类型安全**: 完整的 TypeScript 类型支持
6. **易于扩展**: 新增功能只需添加新的 composable

## 使用示例

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :pagination="paginationConfig"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
  />
</template>

<script setup>
import { AleTable } from 'ale-ui';

const tableData = ref([...]);
const columns = ref([...]);
const paginationConfig = { pageSize: 10, total: 100 };

const handleSelectionChange = (selection) => {
  console.log('Selected:', selection);
};
</script>
```

## 注意事项

1. 重构后的组件保持与原组件完全相同的 API 接口
2. 所有现有的 Props、Events、Slots 都保持不变
3. 样式文件 `Table.css` 无需修改
4. 类型定义 `types.ts` 保持不变
