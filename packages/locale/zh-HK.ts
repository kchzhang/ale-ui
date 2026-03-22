import type { AleUILocale } from './types';

const zhHK: AleUILocale = {
  ale: {
    button: {
      confirm: '確定',
      cancel: '取消',
      submit: '提交',
      reset: '重設',
      delete: '刪除',
      edit: '編輯',
      save: '儲存',
      search: '搜尋',
      filter: '篩選',
      export: '匯出',
      import: '匯入',
      prev: '上一頁',
      next: '下一頁'
    },
    status: {
      loading: '載入中...',
      success: '操作成功',
      error: '操作失敗',
      warning: '警告',
      info: '提示'
    },
    placeholder: {
      input: '請輸入',
      select: '請選擇',
      search: '請輸入關鍵字搜尋',
      date: '請選擇日期',
      dateRange: '請選擇日期範圍'
    },
    validation: {
      required: '此項為必填項',
      email: '請輸入有效的電郵地址',
      phone: '請輸入有效的手機號碼',
      minLength: '最少需要 {min} 個字符',
      maxLength: '最多允許 {max} 個字符',
      min: '最小值為 {min}',
      max: '最大值為 {max}'
    }
  },

  datePicker: {
    today: '今天',
    yesterday: '昨天',
    thisWeek: '本週',
    lastWeek: '上週',
    thisMonth: '本月',
    lastMonth: '上月',
    custom: '自訂',
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期'],
    year: '年',
    month: '月',
    week: '週',
    day: '日',
    hour: '時',
    minute: '分',
    second: '秒'
  },

  timePicker: {
    placeholder: '請選擇時間',
    rangePlaceholder: ['開始時間', '結束時間'],
    now: '此刻'
  },

  table: {
    emptyText: '暫無數據',
    confirmFilter: '確定篩選',
    resetFilter: '重設篩選',
    filterPlaceholder: '請輸入篩選條件',
    selectAll: '全選',
    selectionInfo: '已選擇 {count} 項'
  },

  pagination: {
    total: '共 {total} 項',
    perPage: '{size} 項/頁',
    goto: '前往',
    page: '頁'
  },

  dialog: {
    title: '提示',
    confirm: '確定',
    cancel: '取消'
  },

  upload: {
    delete: '刪除',
    preview: '預覽',
    download: '下載',
    upload: '上載',
    uploadSuccess: '上載成功',
    uploadError: '上載失敗',
    uploadIng: '上載中',
    exceedLimit: '超出檔案數量限制，最多可上載 {limit} 個檔案',
    fileSizeExceed: '檔案大小超出限制，最大支援 {size}',
    invalidType: '檔案格式不支援，僅支援 {types}',
    dragTip: '將檔案拖到此處，或',
    clickUpload: '點擊上載'
  },

  select: {
    placeholder: '請選擇',
    emptyText: '暫無數據',
    searchPlaceholder: '請輸入關鍵字搜尋'
  },

  tagInput: {
    placeholder: '請輸入標籤',
    maxTags: '最多可輸入 {max} 個標籤'
  },

  tree: {
    emptyText: '暫無數據',
    searchPlaceholder: '搜尋關鍵字'
  },

  transfer: {
    searchPlaceholder: '請輸入搜尋內容',
    emptyText: '暫無數據',
    titles: ['列表 1', '列表 2'],
    selectAll: '全選',
    selectedInfo: '已選 {count} 項'
  }
};

export default zhHK;
