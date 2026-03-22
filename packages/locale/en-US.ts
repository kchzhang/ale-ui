import type { AleUILocale } from './types';

const enUS: AleUILocale = {
  ale: {
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      submit: 'Submit',
      reset: 'Reset',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      prev: 'Previous',
      next: 'Next'
    },
    status: {
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info'
    },
    placeholder: {
      input: 'Please input',
      select: 'Please select',
      search: 'Search by keyword',
      date: 'Select date',
      dateRange: 'Select date range'
    },
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      minLength: 'Minimum {min} characters required',
      maxLength: 'Maximum {max} characters allowed',
      min: 'Minimum value is {min}',
      max: 'Maximum value is {max}'
    }
  },

  datePicker: {
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    custom: 'Custom',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    year: 'Year',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second'
  },

  timePicker: {
    placeholder: 'Select time',
    rangePlaceholder: ['Start time', 'End time'],
    now: 'Now'
  },

  table: {
    emptyText: 'No data',
    confirmFilter: 'Confirm',
    resetFilter: 'Reset',
    filterPlaceholder: 'Enter filter condition',
    selectAll: 'Select All',
    selectionInfo: '{count} items selected'
  },

  pagination: {
    total: 'Total {total} items',
    perPage: '{size} / page',
    goto: 'Go to',
    page: 'page'
  },

  dialog: {
    title: 'Notice',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },

  upload: {
    delete: 'Delete',
    preview: 'Preview',
    download: 'Download',
    upload: 'Upload',
    uploadSuccess: 'Upload success',
    uploadError: 'Upload failed',
    uploadIng: 'Uploading',
    exceedLimit: 'Exceed file limit, max {limit} files allowed',
    fileSizeExceed: 'File size exceeds limit, max {size} allowed',
    invalidType: 'Invalid file type, only {types} are supported',
    dragTip: 'Drag files here, or',
    clickUpload: 'click to upload'
  },

  select: {
    placeholder: 'Please select',
    emptyText: 'No data',
    searchPlaceholder: 'Search by keyword'
  },

  tagInput: {
    placeholder: 'Enter tag',
    maxTags: 'Maximum {max} tags allowed'
  },

  tree: {
    emptyText: 'No data',
    searchPlaceholder: 'Search keyword'
  },

  transfer: {
    searchPlaceholder: 'Enter search content',
    emptyText: 'No data',
    titles: ['List 1', 'List 2'],
    selectAll: 'Select All',
    selectedInfo: '{count} items selected'
  }
};

export default enUS;
