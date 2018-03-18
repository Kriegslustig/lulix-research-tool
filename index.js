const strings = {
  'contextMenu/title': 'Save',
}

// TODO: should be a uuid
const genId = () => (Math.round(Math.random() * (10 ** 10))).toString()

const _browser = typeof browser === 'undefined'
  ? chrome
  : browser

const menu = _browser.contextMenus.create({
  title: strings['contextMenu/title'],
  contexts: ['selection'],
}, () => {
  _browser.contextMenus.onClicked.addListener((e) => {
    _browser.storage.local.get(['savedItems'], (result) => {
      const savedItems = result.savedItems || { default: {} }
      const topic = 'default'
      console.log(e)

      const newItem = {
        id: genId(),
        source: e.pageUrl,
        text: e.selectionText,
      }

      savedItems[topic][newItem.id] = newItem

      _browser.storage.local.set({ 'savedItems': savedItems })
    })
  })
})
