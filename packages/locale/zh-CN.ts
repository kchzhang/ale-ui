import type { AleUILocale } from './types';

const zhCN: AleUILocale = {
  // 通用文本
  ale: {
    button: {
      confirm: '确认',
      cancel: '取消',
      submit: '提交',
      reset: '重置',
      delete: '删除',
      edit: '编辑',
      save: '保存',
      search: '搜索',
      filter: '筛选',
      export: '导出',
      import: '导入',
      prev: '上一页',
      next: '下一页'
    },
    status: {
      loading: '加载中...',
      success: '操作成功',
      error: '操作失败',
      warning: '警告',
      info: '提示'
    },
    placeholder: {
      input: '请输入',
      select: '请选择',
      search: '请输入关键词搜索',
      date: '请选择日期',
      dateRange: '请选择日期范围'
    },
    validation: {
      required: '此项为必填项',
      email: '请输入有效的邮箱地址',
      phone: '请输入有效的手机号码',
      minLength: '最少需要 {min} 个字符',
      maxLength: '最多允许 {max} 个字符',
      min: '最小值为 {min}',
      max: '最大值为 {max}'
    }
  },

  // 日期选择器
  datePicker: {
    today: '今天',
    yesterday: '昨天',
    thisWeek: '本周',
    lastWeek: '上周',
    thisMonth: '本月',
    lastMonth: '上月',
    custom: '自定义',
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
    year: '年',
    month: '月',
    week: '周',
    day: '日',
    hour: '时',
    minute: '分',
    second: '秒'
  },

  // 时间选择器
  timePicker: {
    placeholder: '请选择时间',
    rangePlaceholder: ['开始时间', '结束时间'],
    now: '此刻'
  },

  // 表格
  table: {
    emptyText: '暂无数据',
    confirmFilter: '确认筛选',
    resetFilter: '重置筛选',
    filterPlaceholder: '请输入筛选条件',
    selectAll: '全选',
    selectionInfo: '已选择 {count} 项'
  },

  // 分页
  pagination: {
    total: '共 {total} 条',
    perPage: '{size} 条/页',
    goto: '前往',
    page: '页'
  },

  // 对话框
  dialog: {
    title: '提示',
    confirm: '确定',
    cancel: '取消'
  },

  // 上传
  upload: {
    delete: '删除',
    preview: '预览',
    download: '下载',
    upload: '上传',
    uploadSuccess: '上传成功',
    uploadError: '上传失败',
    uploadIng: '上传中',
    exceedLimit: '超出文件数量限制，最多可上传 {limit} 个文件',
    fileSizeExceed: '文件大小超出限制，最大支持 {size}',
    invalidType: '文件格式不支持，仅支持 {types}',
    dragTip: '将文件拖到此处，或',
    clickUpload: '点击上传'
  },

  // 选择器
  select: {
    placeholder: '请选择',
    emptyText: '暂无数据',
    searchPlaceholder: '请输入关键词搜索'
  },

  // 标签输入
  tagInput: {
    placeholder: '请输入标签',
    maxTags: '最多可输入 {max} 个标签'
  },

  // 树形控件
  tree: {
    emptyText: '暂无数据',
    searchPlaceholder: '搜索关键词'
  },

  // 穿梭框
  transfer: {
    searchPlaceholder: '请输入搜索内容',
    emptyText: '暂无数据',
    titles: ['列表 1', '列表 2'],
    selectAll: '全选',
    selectedInfo: '已选 {count} 项'
  }
};

export default zhCN;
