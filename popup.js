const _browser = typeof browser === 'undefined'
  ? chrome
  : browser
const root = document.getElementById('app')

const h = (type, props = {}, ...children) => {
  const el = document.createElement(type)
  for (prop in props) {
    el.setAttribute(prop, props[prop])
  }
  children.forEach((child) => {
    if (typeof child === 'string') {
      const node = document.createTextNode(child)
      el.appendChild(node)
    } else if (Node.prototype.isPrototypeOf(child)) {
      el.appendChild(child)
    }
  })

  return el
}

_browser.storage.local.get(['savedItems'], (result) => {
  const savedItems = result.savedItems || { default: {} }
  if (!savedItems) return
  for (topicName in savedItems) {
    const topic = savedItems[topicName]
    const topicList = h('ul', {},
      h('li', {},
        h('h3', {}, topicName),
        h('ul', {},
          ...Object.values(topic).map((item) =>
            h('li', {},
              h('blockquote', {}, item.text || '–'),
              h('a', { href: item.source }, item.source)
            )
          )
        )
      )
    )

    root.appendChild(topicList)
  }
})
