class HistoryNode {
    constructor(actionCallback, undoCallback, actionParams, undoParams) {
        this.actionCallback = actionCallback;
        this.undoCallback = undoCallback;
        this.actionParams = actionParams;
        this.undoParams = undoParams;
    }
}

class History {
    constructor() {
        this.head = -1;
        this.historyArr = [];
    }

    addAction(actionCallback, undoCallback, actionParams, undoParams) {
        this.historyArr.splice(
            this.head + 1,
            0,
            new HistoryNode(actionCallback, undoCallback, actionParams, undoParams)
        );
        this.historyArr = this.historyArr.slice(0, this.head + 2);
        this.head++;
    }

    undo() {
        if (this.head == -1) return;
        let params = this.historyArr[this.head].undoParams;
        this.historyArr[this.head].undoCallback(...params);
        this.head--;
    }

    redo() {
        if (this.head == this.historyArr.length - 1) return;
        let params = this.historyArr[this.head + 1].actionParams;
        this.historyArr[this.head + 1].actionCallback(...params);
        this.head++;
    }
}

module.exports = History;
