/**
 * 组件库语言包类型定义
 */
export interface AleUILocale {
  // 通用文本
  ale: {
    button: {
      confirm: string;
      cancel: string;
      submit: string;
      reset: string;
      delete: string;
      edit: string;
      save: string;
      search: string;
      filter: string;
      export: string;
      import: string;
      prev: string;
      next: string;
    };
    status: {
      loading: string;
      success: string;
      error: string;
      warning: string;
      info: string;
    };
    placeholder: {
      input: string;
      select: string;
      search: string;
      date: string;
      dateRange: string;
    };
    validation: {
      required: string;
      email: string;
      phone: string;
      minLength: string;
      maxLength: string;
      min: string;
      max: string;
    };
  };

  // 日期选择器
  datePicker: {
    today: string;
    yesterday: string;
    thisWeek: string;
    lastWeek: string;
    thisMonth: string;
    lastMonth: string;
    custom: string;
    placeholder: string;
    rangePlaceholder: [string, string];
    year: string;
    month: string;
    week: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };

  // 时间选择器
  timePicker: {
    placeholder: string;
    rangePlaceholder: [string, string];
    now: string;
  };

  // 表格
  table: {
    emptyText: string;
    confirmFilter: string;
    resetFilter: string;
    filterPlaceholder: string;
    selectAll: string;
    selectionInfo: string;
  };

  // 分页
  pagination: {
    total: string;
    perPage: string;
    goto: string;
    page: string;
  };

  // 对话框
  dialog: {
    title: string;
    confirm: string;
    cancel: string;
  };

  // 上传
  upload: {
    delete: string;
    preview: string;
    download: string;
    upload: string;
    uploadSuccess: string;
    uploadError: string;
    uploadIng: string;
    exceedLimit: string;
    fileSizeExceed: string;
    invalidType: string;
    dragTip: string;
    clickUpload: string;
  };

  // 选择器
  select: {
    placeholder: string;
    emptyText: string;
    searchPlaceholder: string;
  };

  // 标签输入
  tagInput: {
    placeholder: string;
    maxTags: string;
  };

  // 树形控件
  tree: {
    emptyText: string;
    searchPlaceholder: string;
  };

  // 穿梭框
  transfer: {
    searchPlaceholder: string;
    emptyText: string;
    titles: [string, string];
    selectAll: string;
    selectedInfo: string;
  };
}

/**
 * 语言代码类型
 */
export type LocaleCode = 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | string;
