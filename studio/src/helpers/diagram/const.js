export const NODE_HANDLE_TYPE = {
  input: {
    single: 'single',
    multiple: 'multi'
  },
  output: {
    default: 'ok',
    error: 'error',
    repeat: 'repeat',
    end: 'end',
    true: 'true',
    false: 'false'
  }
}

export const NODE_COLOR = {
  ok: {
    borderColor: 'green'
  },
  error: {
    borderColor: 'red'
  }
};

export const HANDLE_COLOR = {
  ok: {
    backgroundColor: 'green'
  },
  error: {
    backgroundColor: 'red'
  },
  alternative: {
    backgroundColor: 'coral'
  },
  multiple: {
    backgroundColor: 'deepskyblue'
  }
};

export const HANDLE_INPUT_POSITION = {
  single: {
    center: {
    }
  },
  double: {
    top: {
      top: '30%'
    },
    bottom: {
      top: '70%'
    }
  }
}
