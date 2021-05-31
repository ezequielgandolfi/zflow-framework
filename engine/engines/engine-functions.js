const events = require("events");
const COMPONENT_CONSTS = require("@zflow/components/consts");

class ArrayUtils {
  static removeDuplicates(array) {
    return array.filter((item, i) => array.indexOf(item) === i);
  }
}

class DatabaseFunctions {
  //
}

class FlowFunctions {
  CONSTS = {
    WATCH: {
      STREAM_END: "stream_end"
    },
    EXEC: {
      AGAIN: "again",
      STATUS_CHANGE: "status"
    }
  };


  #flow;
  #storedComponents = [];
  #watchers = [];

  //#region Internal function
  #hasPendingExec = (id, output) => {
    const next = this.getNext(id, output);
    return !!next.find(n => {
      const component = this.getStoredComponent(n.id);
      if (component) {
        if (component.status !== COMPONENT_CONSTS.COMPONENT_STATUS.FINISHED) {
          return true;
        }
        else {
          const outputs = ArrayUtils.removeDuplicates(this.#flow
            .filter(item => item.source === n.id)
            .map(item => item.sourceHandle));
          if (outputs.length === 0) {
            return false;
          }
          const choosenPath = outputs.find(o => {
            const choosenNext = this.getNext(n.id, o);
            return !!choosenNext.find(cn => !!this.#storedComponents[cn.id]); 
          });
          if (choosenPath) {
            return this.#hasPendingExec(n.id, choosenPath);
          }
          else {
            return true;
          }
        }
      }
      return true;
    });
  };
  //#endregion

  //#region Flow
  setFlow(flow) {
    this.#flow = flow;
  }

  getNext(from, output) {
    return this.#flow
      .filter(item => (item.source === from) && (item.sourceHandle === output))
      .map(o => this.#flow.find(item => item.id === o.target));
  }
  //#endregion

  //#region Stored components
  storeComponent(id, component) {
    this.#storedComponents[id] = component;
  }

  getStoredComponent(id) {
    return this.#storedComponents[id];
  }

  freeComponent(id) {
    const component = this.#storedComponents[id];
    if (component) {
      component.change.removeAllListeners();
      const next = this.#flow.filter(item => item.source === id);
      next.forEach(item => this.freeComponent(item.target));
    }
  }

  freeChildComponents(id) {
    this.#flow.filter(item => item.source === id).forEach(item => this.freeComponent(item.target));
  }
  //#endregion

  //#region Watchers
  watchStreamEnd(from, output) {
    const watcher = { type: this.CONSTS.WATCH.STREAM_END, from, output, event: new events.EventEmitter() };
    this.#watchers.push(watcher);
    return watcher.event;
  }

  removeStreamEndWatcher(from, output) {
    let index;
    do {
      index = this.#watchers.findIndex(item => (item.type === this.CONSTS.WATCH.STREAM_END) && (item.from === from) && (item.output === output));  
      if (index >= 0) {
        this.#watchers.splice(index, 1);
      }
    } while (index < 0);
  }

  updateWatchers() {
    const completedWatchers = this.#watchers.filter(w => w.type === this.CONSTS.WATCH.STREAM_END).filter(w => !this.#hasPendingExec(w.from, w.output));
    completedWatchers.forEach(w => {
      this.removeStreamEndWatcher(w.from, w.output);
      process.nextTick(() => w.event.emit(this.CONSTS.WATCH.STREAM_END));
    });
  }
  //#endregion
}


class EngineFunctions {

  database = new DatabaseFunctions();
  flow = new FlowFunctions();

}

module.exports = EngineFunctions;
