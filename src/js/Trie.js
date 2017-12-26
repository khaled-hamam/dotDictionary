class TrieNode {
    constructor() {
        this.children = [];
        this.definition = null;
        this.type = null;
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
        this.size = 0;
    }

    insert(word, type, definition) {
        word = word.toLowerCase();

        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }

            node = node.children[word[i]];
        }
        node.type = type;
        node.definition = definition;
        node.end = true;
        this.size++;
    }

    edit(word, newType, newDefinition) {
        word = word.toLowerCase();
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            if (!node.children[word[i]]) {
                return false;
            }

            node = node.children[word[i]];
        }

        if (newType) {
            node.type = newType;
        }
        if (newDefinition) {
            node.definition = newDefinition;
        }

        return true;
    }

    delete(word) {
        word = word.toLowerCase();
        if (!this.contains(word)) {
            return;
        }
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            if (this.search(word.substring(0, i)).length == 1) {
                node.children = [];
                this.size--;
                return;
            } else {
                node = node.children[word[i]];
            }
        }

        node.type = null;
        node.definition = null;
        node.end = false;
        this.size--;
    }

    getAll(head = this.root, path = '', tree = []) {
        if (!head) return;

        if (head.end) {
            tree.push({
                word: path,
                type: head.type,
                definition: head.definition
            });
        }

        for (let i = -1; i < 26; ++i) {
            const child = i != -1 ? String.fromCharCode(97 + i) : ' ';
            if (head.children[child]) {
                this.getAll(head.children[child], path + child, tree);
            }
        }

        return tree;
    }

    search(prefix) {
        prefix = prefix.toLowerCase();
        let node = this.root;

        for (let i = 0; i < prefix.length; ++i) {
            if (!node.children[prefix[i]]) {
                return [];
            }

            node = node.children[prefix[i]];
        }

        return this.getAll(node, prefix);
    }

    getInfo(word) {
        word = word.toLowerCase();
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            if (!node.children[word[i]]) {
                return null;
            }

            node = node.children[word[i]];
        }
        if (!node.end) {
            return null;
        }

        return {
            type: node.type,
            definition: node.definition
        };
    }

    contains(word) {
        word = word.toLowerCase();
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            if (node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return false;
            }
        }
        return node.end;
    }

    length() {
        return this.size;
    }
}

module.exports = Trie;
