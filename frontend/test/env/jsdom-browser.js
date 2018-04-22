import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'


function ignoreStyleFiles(exts) {
  exts.forEach((ext) => {
    require.extensions[`.${ext}`] = () => null
  })
}

function setupGlobals(dom) {
  global.window = dom.window
  global.document = dom.window.document
  global.navigator = { userAgent: 'node.js' }

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property]
    }
  })
}

ignoreStyleFiles(['css', 'styl'])
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
setupGlobals(dom)

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())
