export const GRID_SIZE = 5;

export const NODE_HANDLE_TYPE = {
  input: {
    single: 'single',
    multiple: 'multi'
  },
  output: {
    ok: 'ok',
    error: 'error',
    repeat: 'repeat',
    end: 'end',
    true: 'true',
    false: 'false'
  }
}

export const NODE_COLOR = {
  start: {
    borderColor: 'green'
  },
  stop: {
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
  true: {
    backgroundColor: 'green'
  },
  false: {
    backgroundColor: 'coral'
  },
  repeat: {
    backgroundColor: 'green'
  },
  end: {
    backgroundColor: 'coral'
  },
  single: { },
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
