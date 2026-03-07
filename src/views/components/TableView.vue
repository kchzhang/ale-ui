<template>
  <div class="component-demo-view">
    <!-- 头部区域 -->
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Table 表格</h1>
      <p class="component-demo-view__description">
        用于展示多条结构类似的数据，支持排序、筛选、选择等功能。
        参考 Element Plus Table 组件设计规范。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">基础的表格展示用法。</p>
        <AleTable :data="basicData" :columns="basicColumns" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带边框 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带边框</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">使用边框划分单元格。</p>
        <AleTable :data="basicData" :columns="basicColumns" border />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="borderCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">提供了三种尺寸：small、medium（默认）、large。</p>
        <div class="demo-stack">
          <div class="demo-item">
            <span class="demo-label">Small</span>
            <AleTable :data="basicData" :columns="basicColumns" size="small" />
          </div>
          <div class="demo-item">
            <span class="demo-label">Medium (默认)</span>
            <AleTable :data="basicData" :columns="basicColumns" size="medium" />
          </div>
          <div class="demo-item">
            <span class="demo-label">Large</span>
            <AleTable :data="basicData" :columns="basicColumns" size="large" />
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 选择功能 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">选择功能</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">支持多选功能，包括全选和单选。</p>
        <AleTable
          :data="basicData"
          :columns="selectionColumns"
          @selection-change="handleSelectionChange"
        />
        <p class="demo-info">已选择 {{ selectedCount }} 项</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="selectionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 排序功能 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">排序功能</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">对表格进行排序，支持点击表头排序。</p>
        <AleTable
          :data="basicData"
          :columns="sortColumns"
          @sort-change="handleSortChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sortCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 展开行 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">展开行</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">当行内容较多时，可以使用展开行展示详细信息。</p>
        <AleTable :data="basicData" :columns="expandColumns" expandable>
          <template #expand="{ row }">
            <div class="expand-content">
              <h4>{{ row.name }} 的详细信息</h4>
              <p><strong>ID:</strong> {{ row.id }}</p>
              <p><strong>年龄:</strong> {{ row.age }}</p>
              <p><strong>地址:</strong> {{ row.address }}</p>
              <p><strong>状态:</strong> {{ row.status === 'active' ? '激活' : '未激活' }}</p>
            </div>
          </template>
        </AleTable>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="expandCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 固定列 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">固定列</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">横向内容过多时，可选择固定列。</p>
        <div class="fixed-column-demo">
          <AleTable
            :data="fixedColumnData"
            :columns="fixedColumns"
            :scroll="{ x: 800 }"
            border
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="fixedColumnCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义列内容 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义列内容</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">通过 slot 自定义列的显示内容。</p>
        <AleTable :data="basicData" :columns="customColumns">
          <template #status="{ row }">
            <AleTag :type="row.status === 'active' ? 'success' : 'info'" size="small">
              {{ row.status === 'active' ? '激活' : '未激活' }}
            </AleTag>
          </template>
          <template #action="{ row }">
            <AleButton type="primary" size="small" @click="handleEdit(row)">编辑</AleButton>
            <AleButton type="danger" size="small" @click="handleDelete(row)">删除</AleButton>
          </template>
        </AleTable>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载状态</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">数据加载时显示加载动画。</p>
        <AleTable :data="basicData" :columns="basicColumns" :loading="isLoading" />
        <div class="demo-actions">
          <AleButton @click="toggleLoading">
            {{ isLoading ? '停止加载' : '开始加载' }}
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="loadingCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 树形数据 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">树形数据</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">展示树形结构的数据。</p>
        <AleTable :data="treeData" :columns="treeColumns" :tree-config="{ childrenKey: 'children' }" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="treeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 固定表头 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">固定表头</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">设置 height 属性，表格在容器内独立滚动，表头固定，不影响页面其他内容滚动。</p>
        <AleTable
          :data="scrollData"
          :columns="basicColumns"
          :height="300"
          border
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="fixedHeaderCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 完整示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">完整示例</h2>
      <div class="component-demo-view__demo">
        <p class="component-demo-view__section-desc">综合使用各种功能的完整示例。</p>
        <AleTable
          :data="fullData"
          :columns="fullColumns"
          border
          @selection-change="handleFullSelectionChange"
          @sort-change="handleFullSortChange"
          @row-click="handleRowClick"
        >
          <template #status="{ row }">
            <AleTag :type="row.status === 'active' ? 'success' : 'info'" size="small">
              {{ row.status === 'active' ? '激活' : '未激活' }}
            </AleTag>
          </template>
          <template #progress="{ row }">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: row.progress + '%' }"></div>
              <span class="progress-text">{{ row.progress }}%</span>
            </div>
          </template>
          <template #action="{ row }">
            <AleButton type="primary" size="small" @click.stop="handleView(row)">查看</AleButton>
            <AleButton type="success" size="small" @click.stop="handleEdit(row)">编辑</AleButton>
          </template>
        </AleTable>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="fullCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 文档 -->
    <section class="component-demo-view__section api-section">
      <h2 class="component-demo-view__section-title">API 文档</h2>
      
      <h3>Table Props</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>data</td>
            <td>显示的数据</td>
            <td>array</td>
            <td>—</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>columns</td>
            <td>表格列的配置描述</td>
            <td>array</td>
            <td>—</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>size</td>
            <td>表格尺寸</td>
            <td>string</td>
            <td>small / medium / large</td>
            <td>medium</td>
          </tr>
          <tr>
            <td>border</td>
            <td>是否带有纵向边框</td>
            <td>boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          <tr>
            <td>loading</td>
            <td>是否显示加载动画</td>
            <td>boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          <tr>
            <td>height</td>
            <td>表格高度</td>
            <td>string / number</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>show-header</td>
            <td>是否显示表头</td>
            <td>boolean</td>
            <td>—</td>
            <td>true</td>
          </tr>
          <tr>
            <td>highlight-current-row</td>
            <td>是否要高亮当前行</td>
            <td>boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          <tr>
            <td>row-key</td>
            <td>行数据的 Key</td>
            <td>string / function</td>
            <td>—</td>
            <td>id</td>
          </tr>
        </tbody>
      </table>

      <h3>Column 配置</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>prop</td>
            <td>对应列内容的字段名</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>label</td>
            <td>显示的标题</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>type</td>
            <td>对应列的类型</td>
            <td>string</td>
            <td>selection / index / expand</td>
            <td>—</td>
          </tr>
          <tr>
            <td>width</td>
            <td>对应列的宽度</td>
            <td>string / number</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>min-width</td>
            <td>对应列的最小宽度</td>
            <td>string / number</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>fixed</td>
            <td>列是否固定在左侧或者右侧</td>
            <td>string / boolean</td>
            <td>true / left / right</td>
            <td>—</td>
          </tr>
          <tr>
            <td>sortable</td>
            <td>对应列是否可以排序</td>
            <td>boolean / string</td>
            <td>true / false / custom</td>
            <td>false</td>
          </tr>
          <tr>
            <td>align</td>
            <td>对齐方式</td>
            <td>string</td>
            <td>left / center / right</td>
            <td>left</td>
          </tr>
          <tr>
            <td>formatter</td>
            <td>用来格式化内容</td>
            <td>function</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>slot</td>
            <td>自定义列内容的插槽名称</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <h3>Table Events</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>row-click</td>
            <td>当某一行被点击时会触发该事件</td>
            <td>row, index, event</td>
          </tr>
          <tr>
            <td>row-dblclick</td>
            <td>当某一行被双击时会触发该事件</td>
            <td>row, index, event</td>
          </tr>
          <tr>
            <td>selection-change</td>
            <td>当选择项发生变化时会触发该事件</td>
            <td>selection</td>
          </tr>
          <tr>
            <td>sort-change</td>
            <td>当表格的排序条件发生变化的时候会触发该事件</td>
            <td>column, prop, order</td>
          </tr>
          <tr>
            <td>expand-change</td>
            <td>当展开行发生变化时会触发该事件</td>
            <td>expandedRows</td>
          </tr>
        </tbody>
      </table>

      <h3>Table Methods</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>clearSelection</td>
            <td>用于多选表格，清空用户的选择</td>
            <td>—</td>
          </tr>
          <tr>
            <td>toggleRowSelection</td>
            <td>用于多选表格，切换某一行的选中状态</td>
            <td>row, selected</td>
          </tr>
          <tr>
            <td>getSelectionRows</td>
            <td>返回当前选中的行</td>
            <td>—</td>
          </tr>
          <tr>
            <td>toggleRowExpansion</td>
            <td>用于可展开表格，切换某一行的展开状态</td>
            <td>row, expanded</td>
          </tr>
          <tr>
            <td>setCurrentRow</td>
            <td>用于单选表格，设定某一行为选中行</td>
            <td>row</td>
          </tr>
          <tr>
            <td>clearSort</td>
            <td>用于清空排序条件</td>
            <td>—</td>
          </tr>
          <tr>
            <td>clearFilter</td>
            <td>用于清空筛选条件</td>
            <td>columnKey</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleTable, AleButton, AleTag } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import type { TableColumn } from 'ale-ui';

// ==================== 基础数据 ====================
const basicData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区', status: 'active' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区', status: 'inactive' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区', status: 'active' },
  { id: 4, name: '赵六', age: 35, address: '深圳市南山区', status: 'active' }
]);

const basicColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100 }
];

// ==================== 选择功能 ====================
const selectedCount = ref(0);

const selectionColumns: TableColumn[] = [
  { type: 'selection', width: 50 },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 }
];

const handleSelectionChange = (selection: any[]) => {
  selectedCount.value = selection.length;
};

// ==================== 排序功能 ====================
const sortColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'address', label: '地址', minWidth: 200 }
];

const handleSortChange = (column: TableColumn, prop: string, order: any) => {
  console.log('排序变化:', column, prop, order);
};

// ==================== 展开功能 ====================
const expandColumns: TableColumn[] = [
  { type: 'expand', width: 50 },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 }
];

// ==================== 分页功能 ====================
// ==================== 固定列 ====================
const fixedColumnData = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `北京市朝阳区${i + 1}号`,
  phone: `1380013${String(i).padStart(4, '0')}`,
  email: `user${i + 1}@example.com`,
  department: `部门${(i % 5) + 1}`,
  position: `职位${(i % 3) + 1}`
}));

const fixedColumns: TableColumn[] = [
  { type: 'selection', width: 50, fixed: 'left' },
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120, fixed: 'right' }
];

// ==================== 自定义列 ====================
const customColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { label: '操作', width: 150, slot: 'action', fixed: 'right' }
];

const handleEdit = (row: any) => {
  console.log('编辑:', row);
};

const handleDelete = (row: any) => {
  console.log('删除:', row);
};

const handleView = (row: any) => {
  console.log('查看:', row);
};

// ==================== 加载状态 ====================
const isLoading = ref(false);

const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

// ==================== 树形数据 ====================
const treeData = [
  {
    id: 1,
    name: '技术部',
    manager: '张三',
    count: 50,
    children: [
      { id: 11, name: '前端组', manager: '李四', count: 15 },
      { id: 12, name: '后端组', manager: '王五', count: 20 },
      { id: 13, name: '测试组', manager: '赵六', count: 15 }
    ]
  },
  {
    id: 2,
    name: '产品部',
    manager: '钱七',
    count: 20,
    children: [
      { id: 21, name: '产品设计', manager: '孙八', count: 10 },
      { id: 22, name: '用户研究', manager: '周九', count: 10 }
    ]
  }
];

const treeColumns: TableColumn[] = [
  { prop: 'name', label: '部门名称', width: 200 },
  { prop: 'manager', label: '负责人', width: 150 },
  { prop: 'count', label: '人数', width: 100 }
];

// ==================== 固定表头数据 ====================
const scrollData = Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `北京市朝阳区${i + 1}号街道`,
  phone: `1380013${String(i + 1).padStart(4, '0')}`,
  email: `user${i + 1}@example.com`
}));

// ==================== 完整示例 ====================
const fullData = computed(() => {
  return Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + Math.floor(Math.random() * 30),
    address: `北京市朝阳区${i + 1}号`,
    status: Math.random() > 0.3 ? 'active' : 'inactive',
    progress: Math.floor(Math.random() * 100),
    createTime: new Date().toLocaleDateString()
  }));
});

const fullColumns: TableColumn[] = [
  { type: 'selection', width: 50 },
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'address', label: '地址', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' },
  { prop: 'progress', label: '进度', width: 150, slot: 'progress' },
  { label: '操作', width: 150, slot: 'action', fixed: 'right' }
];

const handleFullSelectionChange = (selection: any[]) => {
  console.log('完整示例选择变化:', selection.length);
};

const handleFullSortChange = (column: TableColumn, prop: string, order: any) => {
  console.log('完整示例排序变化:', prop, order);
};

const handleRowClick = (row: any, index: number, event: MouseEvent) => {
  console.log('行点击:', row, index);
};

// ==================== 代码示例 ====================
const basicCode = `<template>
  <AleTable :data="data" :columns="columns" />
<\/template>

<script setup>
const data = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区', status: 'active' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区', status: 'inactive' }
];

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 }
];
<\/script>`;

const borderCode = `<template>
  <AleTable :data="data" :columns="columns" border />
<\/template>`;

const sizeCode = `<template>
  <AleTable :data="data" :columns="columns" size="small" />
  <AleTable :data="data" :columns="columns" size="medium" />
  <AleTable :data="data" :columns="columns" size="large" />
<\/template>`;

const selectionCode = `<template>
  <AleTable
    :data="data"
    :columns="columns"
    @selection-change="handleSelectionChange"
  />
<\/template>

<script setup>
const columns = [
  { type: 'selection', width: 50 },
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' }
];

const handleSelectionChange = (selection) => {
  console.log('选中:', selection);
};
<\/script>`;

const sortCode = `<template>
  <AleTable
    :data="data"
    :columns="columns"
    @sort-change="handleSortChange"
  />
<\/template>

<script setup>
const columns = [
  { prop: 'id', label: 'ID', sortable: true },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄', sortable: true }
];
<\/script>`;

const expandCode = `<template>
  <AleTable :data="data" :columns="columns" expandable>
    <template #expand="{ row }">
      <div class="expand-content">
        <h4>{{ row.name }} 的详细信息</h4>
        <p>ID: {{ row.id }}</p>
        <p>年龄: {{ row.age }}</p>
      </div>
    </template>
  </AleTable>
<\/template>

<script setup>
const columns = [
  { type: 'expand', width: 50 },
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' }
];
<\/script>`;

const fixedColumnCode = `<template>
  <AleTable
    :data="data"
    :columns="columns"
    :scroll="{ x: 800 }"
    border
  />
<\/template>

<script setup>
const columns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址', width: 300 },
  { prop: 'action', label: '操作', width: 150, fixed: 'right' }
];
<\/script>`;

const customCode = `<template>
  <AleTable :data="data" :columns="columns">
    <template #status="{ row }">
      <AleTag :type="row.status === 'active' ? 'success' : 'info'">
        {{ row.status === 'active' ? '激活' : '未激活' }}
      </AleTag>
    </template>
    <template #action="{ row }">
      <AleButton type="link" size="small">编辑</AleButton>
      <AleButton type="link" size="small" danger>删除</AleButton>
    </template>
  </AleTable>
<\/template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态', slot: 'status' },
  { label: '操作', slot: 'action' }
];
<\/script>`;

const loadingCode = `<template>
  <AleTable :data="data" :columns="columns" :loading="isLoading" />
  <AleButton @click="toggleLoading">
    {{ isLoading ? '停止加载' : '开始加载' }}
  </AleButton>
<\/template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};
<\/script>`;

const fixedHeaderCode = `<template>
  <!-- 设置 height 属性，表格在容器内独立滚动 -->
  <AleTable
    :data="data"
    :columns="columns"
    :height="300"
    border
  />
<\/template>

<script setup>
// 大量数据，表格内部滚动，不影响页面其他内容
const data = Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  name: \`用户\${i + 1}\`,
  age: 20 + Math.floor(Math.random() * 30),
  address: \`北京市朝阳区\${i + 1}号街道\`,
  phone: \`1380013\${String(i + 1).padStart(4, '0')}\`,
  email: \`user\${i + 1}@example.com\`
}));

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'email', label: '邮箱', width: 180 }
];
<\/script>`;

const treeCode = `<template>
  <AleTable :data="data" :columns="columns" :tree-config="{ childrenKey: 'children' }" />
<\/template>

<script setup>
const data = [
  {
    id: 1,
    name: '技术部',
    manager: '张三',
    children: [
      { id: 11, name: '前端组', manager: '李四' },
      { id: 12, name: '后端组', manager: '王五' }
    ]
  }
];

const columns = [
  { prop: 'name', label: '部门名称' },
  { prop: 'manager', label: '负责人' }
];
<\/script>`;

const fullCode = `<template>
  <AleTable
    :data="data"
    :columns="columns"
    border
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
  >
    <template #status="{ row }">
      <AleTag :type="row.status === 'active' ? 'success' : 'info'">
        {{ row.status === 'active' ? '激活' : '未激活' }}
      </AleTag>
    </template>
    <template #action="{ row }">
      <AleButton type="link" size="small">查看</AleButton>
      <AleButton type="link" size="small">编辑</AleButton>
    </template>
  </AleTable>
<\/template>`;

// ==================== 省略其他代码字符串 ... ====================
</script>

<style scoped>
.component-demo-view {
  max-width: 1200px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__section-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 16px 0;
  width: 100%;
}

.component-demo-view__demo {
  margin-bottom: 24px;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.demo-info {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-secondary);
}

.demo-actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.fixed-column-demo {
  overflow-x: auto;
}

.expand-content {
  padding: 16px 24px;
}

.expand-content h4 {
  margin: 0 0 12px 0;
  color: var(--color-text-primary);
}

.expand-content p {
  margin: 4px 0;
  color: var(--color-text-secondary);
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-fill {
  height: 8px;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: var(--color-text-secondary);
  min-width: 36px;
}

.api-section {
  overflow-x: auto;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0 32px 0;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  font-weight: 600;
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}

.api-table td {
  color: var(--color-text-secondary);
}

.api-table code {
  padding: 2px 6px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-family: monospace;
  font-size: 12px;
}
</style>